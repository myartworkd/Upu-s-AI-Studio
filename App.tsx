
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { GenerateButton } from './components/GenerateButton';
import { ResultDisplay } from './components/ResultDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { ModeSwitcher } from './components/ModeSwitcher';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { editImageWithGemini, generateImageWithImagen } from './services/geminiService';
import type { ImageData, Mode, AspectRatio } from './types';

export default function App() {
  const [mode, setMode] = useState<Mode>('edit');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    // Reset state when changing modes
    setOriginalImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); // Clear previous result

    if (mode === 'edit') {
      if (!originalImage || !prompt) {
        setError('Please upload an image and provide a prompt.');
        setIsLoading(false);
        return;
      }
      try {
        const resultBase64 = await editImageWithGemini(originalImage, prompt);
        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
      } catch (e) {
        console.error(e);
        setError('Failed to edit image. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    } else { // mode === 'generate'
      if (!prompt) {
        setError('Please provide a prompt to generate an image.');
        setIsLoading(false);
        return;
      }
      try {
        setOriginalImage(null); 
        const resultBase64 = await generateImageWithImagen(prompt, aspectRatio);
        setGeneratedImage(`data:image/jpeg;base64,${resultBase64}`);
      } catch (e) {
        console.error(e);
        setError('Failed to generate image. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const isGenerateDisabled = isLoading || (mode === 'edit' 
    ? !originalImage || !prompt 
    : !prompt);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="flex flex-col gap-6 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg">
            <ModeSwitcher mode={mode} setMode={handleModeChange} disabled={isLoading} />
            
            {mode === 'edit' ? (
              <ImageUploader onImageUpload={setOriginalImage} />
            ) : (
              <AspectRatioSelector selectedRatio={aspectRatio} onRatioChange={setAspectRatio} disabled={isLoading} />
            )}
            
            <PromptInput value={prompt} onChange={setPrompt} disabled={isLoading} mode={mode} />
            <GenerateButton onClick={handleGenerate} isLoading={isLoading} disabled={isGenerateDisabled} mode={mode}/>
            <p className="text-xs text-slate-500 text-center">
              This is a demo application. To share, you must deploy this code and configure your own API key.
            </p>
          </div>

          {/* Display Panel */}
          <div className="flex flex-col gap-6 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg min-h-[500px] lg:min-h-0">
             {error && <ErrorMessage message={error} />}
            <ResultDisplay
              originalImage={originalImage?.base64}
              generatedImage={generatedImage}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
