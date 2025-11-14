import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageData, AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function base64ToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType
    },
  };
}

export async function editImageWithGemini(image: ImageData, prompt: string): Promise<string> {
    const model = 'gemini-2.5-flash-image';
    const imagePart = base64ToGenerativePart(image.base64, image.mimeType);

    const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                imagePart,
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });
    
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("No image was generated in the response.");
}

export async function generateImageWithImagen(prompt: string, aspectRatio: AspectRatio): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return base64ImageBytes;
}
