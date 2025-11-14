import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ResultDisplayProps {
  originalImage: string | null | undefined;
  generatedImage: string | null;
  isLoading: boolean;
}

const ImagePanel: React.FC<{ title: string; src: string | null; isLoading?: boolean }> = ({ title, src, isLoading = false }) => (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
        <div className="relative w-full aspect-square bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700 group">
            {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <svg className="animate-spin h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
            {src ? (
                <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
                                <button onClick={() => zoomIn()} className="w-8 h-8 bg-slate-800/80 hover:bg-purple-600 rounded-md flex items-center justify-center text-white" title="Zoom In">
                                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                                </button>
                                <button onClick={() => zoomOut()} className="w-8 h-8 bg-slate-800/80 hover:bg-purple-600 rounded-md flex items-center justify-center text-white" title="Zoom Out">
                                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                                </button>
                                <button onClick={() => resetTransform()} className="w-8 h-8 bg-slate-800/80 hover:bg-purple-600 rounded-md flex items-center justify-center text-white" title="Reset Zoom">
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </button>
                            </div>
                            <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                                <img src={src} alt={title} className="w-full h-full object-contain cursor-grab" />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            ) : (
                <div className="text-slate-500 text-center p-4">
                    <i className={`fa-solid ${title === 'Original' ? 'fa-image' : 'fa-wand-magic-sparkles'} text-4xl`}></i>
                    <p className="mt-2 text-sm">{title === 'Original' ? 'Upload an image to see it here' : 'Your generated image will appear here'}</p>
                </div>
            )}
        </div>
        {src && !isLoading && (
            <a href={src} download={`${title.toLowerCase().replace(' ', '_')}_image.png`} className="mt-3 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
                <i className="fa-solid fa-download mr-2"></i>
                Download
            </a>
        )}
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  if (!originalImage && !generatedImage && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-500">
        <div className="text-center">
            <i className="fa-solid fa-palette text-6xl"></i>
            <p className="mt-4 text-lg">Your results will appear here</p>
            <p className="text-sm">Get started by selecting a mode and providing a prompt.</p>
        </div>
      </div>
    );
  }
  
  const gridCols = originalImage ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className={`w-full h-full grid grid-cols-1 ${gridCols} gap-6 items-start justify-center`}>
      {originalImage && <ImagePanel title="Original" src={originalImage} />}
      <div className={!originalImage ? 'max-w-md mx-auto w-full' : 'w-full'}>
        <ImagePanel title="Generated" src={generatedImage} isLoading={isLoading} />
      </div>
    </div>
  );
};