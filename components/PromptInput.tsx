import React from 'react';
import type { Mode } from '../types';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  mode: Mode;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, disabled, mode }) => {
  const stepNumber = mode === 'edit' ? '2.' : '2.';
  const label = mode === 'edit' ? 'Describe Your Edit' : 'Describe The Image You Want';
  const placeholder = mode === 'edit'
    ? "e.g., 'Make the background a futuristic cityscape at night, keep the person the same'"
    : "e.g., 'An astronaut riding a horse on Mars, cinematic lighting, hyperrealistic'";

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-2">{stepNumber} {label}</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full h-32 p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 resize-none disabled:opacity-50"
      />
    </div>
  );
};
