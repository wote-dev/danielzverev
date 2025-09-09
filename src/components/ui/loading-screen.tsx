import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInitial, setShowInitial] = useState(false);

  useEffect(() => {
    // Show initial after a brief delay
    const initialTimer = setTimeout(() => {
      setShowInitial(true);
    }, 300);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
            return 100;
          }
          return prev + Math.random() * 12 + 3;
        });
      }, 60);

      return () => clearInterval(interval);
    }, 800);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        isComplete ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
      } bg-stone-900`}
    >

      <div className="flex flex-col items-center space-y-12 relative z-10">
        {/* Elegant Initial */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ease-out ${
              showInitial ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
            } bg-stone-800/50 border border-stone-700/50 shadow-2xl shadow-stone-900/20`}
            style={{
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              className="text-2xl font-light tracking-wider transition-all duration-700 text-stone-200"
              style={{
                opacity: showInitial ? 1 : 0,
                transform: `scale(${showInitial ? 1 : 0.8})`,
              }}
            >
              DZ
            </span>
          </div>
          
          {/* Subtle glow effect */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-1000 bg-stone-400/5"
            style={{
              opacity: showInitial ? 0.6 : 0,
              transform: `scale(${1.2 + (progress / 100) * 0.1})`,
              filter: 'blur(8px)',
            }}
          />
        </div>

        {/* Minimal Progress Indicator */}
        <div className="w-64 space-y-6">
          {/* Elegant progress bar */}
          <div className="relative">
            <div
              className="h-px w-full transition-all duration-500 bg-stone-800"
            />
            <div
              className="absolute top-0 left-0 h-px transition-all duration-700 ease-out bg-stone-400"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(168, 162, 158, 0.3)',
              }}
            />
          </div>
          
          {/* Refined status text */}
          <div className="flex items-center justify-center">
            <span
              className="text-xs font-light tracking-widest uppercase transition-all duration-500 text-stone-500"
              style={{
                opacity: progress > 10 ? 1 : 0,
                transform: `translateY(${progress > 10 ? 0 : 8}px)`,
              }}
            >
              Crafting Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}