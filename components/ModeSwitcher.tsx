import React from 'react';
import type { Mode } from '../types';

interface ModeSwitcherProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  disabled: boolean;
}

const buttons: { mode: Mode; label: string; icon: string }[] = [
  { mode: 'edit', label: 'Image Editing', icon: 'fa-solid fa-pen-ruler' },
  { mode: 'generate', label: 'Image Generation', icon: 'fa-solid fa-image' },
];

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, setMode, disabled }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 mb-2">Select Mode</h2>
      <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
        {buttons.map((button) => (
          <button
            key={button.mode}
            onClick={() => setMode(button.mode)}
            disabled={disabled}
            className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 ${
              mode === button.mode
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-slate-400 hover:bg-slate-800'
            }`}
          >
            <i className={`${button.icon} mr-2`}></i>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};
