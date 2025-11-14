
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
      <strong className="font-bold mr-2"><i className="fa-solid fa-triangle-exclamation"></i> Error:</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
