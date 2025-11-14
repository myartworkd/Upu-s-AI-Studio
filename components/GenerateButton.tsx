import React from 'react';
import type { Mode } from '../types';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  mode: Mode;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled, mode }) => {
  const buttonText = mode === 'edit' ? 'Edit Image' : 'Generate Image';
  const icon = mode === 'edit' ? 'fa-solid fa-wand-magic-sparkles' : 'fa-solid fa-lightbulb';

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
            <i className={icon}></i>
            {buttonText}
        </>
      )}
    </button>
  );
};
