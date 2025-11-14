export interface ImageData {
  base64: string;
  mimeType: string;
}

export type Mode = 'edit' | 'generate';

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
