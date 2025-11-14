
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        <i className="fa-solid fa-wand-magic-sparkles mr-3"></i>
        Upu's AI Studio
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Transform your images with generative fill. Add details, change styles, and bring your vision to life.
      </p>
    </header>
  );
};
