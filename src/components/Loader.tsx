import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setIsTransitioning(true);
          setTimeout(() => {
            onLoadComplete();
          }, 2500); // Durée allongée pour correspondre à l'animation
          return 100;
        }
        return prev + 0.5; // Progression plus lente
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isTransitioning ? 'animate-fadeToPortfolio' : 'bg-black'
      }`}
    >
      <div className={`relative w-40 h-40 ${
        isComplete ? 'animate-scaleLoader' : ''
      }`}>
        <svg
          className={`w-full h-full transform transition-transform duration-1000 ${
            isComplete ? '-rotate-90' : 'rotate-[270deg]'
          }`}
          viewBox="0 0 100 100"
        >
          <circle
            className={`transition-all duration-1000 ${
              isTransitioning ? 'text-violet-900' : 'text-gray-800'
            }`}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={`transition-all duration-1000 ${
              isTransitioning 
                ? 'text-violet-300 animate-pulse' 
                : 'text-violet-600'
            }`}
            strokeWidth="8"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (progress / 100) * 251.2}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isComplete ? 'scale-150' : 'scale-100'
        }`}>
          <span className={`text-2xl font-bold transition-all duration-1000 ${
            isTransitioning ? 'text-violet-200' : 'text-white'
          }`}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};
