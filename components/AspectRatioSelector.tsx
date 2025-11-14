import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
  disabled: boolean;
}

const ratios: { value: AspectRatio; label: string; icon: string }[] = [
  { value: '1:1', label: 'Square', icon: 'fa-solid fa-square' },
  { value: '4:3', label: 'Landscape', icon: 'fa-solid fa-image' },
  { value: '3:4', label: 'Portrait', icon: 'fa-solid fa-portrait' },
  { value: '16:9', label: 'Widescreen', icon: 'fa-solid fa-film' },
  { value: '9:16', label: 'Story', icon: 'fa-solid fa-mobile-screen-button' },
];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onRatioChange, disabled }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-2">1. Choose Aspect Ratio</h2>
      <div className="grid grid-cols-5 gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => onRatioChange(ratio.value)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-2 border-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 ${
              selectedRatio === ratio.value
                ? 'border-purple-500 bg-purple-900/50 text-white'
                : 'border-slate-600 bg-slate-900 text-slate-400 hover:border-purple-500/50 hover:bg-slate-800'
            }`}
            aria-label={`Aspect ratio ${ratio.value}`}
            title={`${ratio.label} (${ratio.value})`}
          >
            <i className={`${ratio.icon} text-xl`}></i>
            <span className="text-xs mt-1">{ratio.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
