
import React, { useState, useCallback } from 'react';
import type { ImageData } from '../types';

interface ImageUploaderProps {
  onImageUpload: (imageData: ImageData | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload({ base64: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onImageUpload(null);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-400');
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-purple-400');
  };
  
  const onDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-400');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-2">1. Upload Image</h2>
      <label
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className="cursor-pointer flex justify-center items-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:text-purple-400 hover:border-purple-400/50 transition-colors duration-300 bg-slate-900"
      >
        {preview ? (
          <img src={preview} alt="Image preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-center">
            <i className="fa-solid fa-cloud-arrow-up text-4xl mb-2"></i>
            <p>Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, WEBP, etc.</p>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
      </label>
    </div>
  );
};
