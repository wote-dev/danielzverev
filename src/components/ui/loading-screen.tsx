import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 50);

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-stone-50'
      }`}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo/Initial */}
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-full border-2 transition-all duration-1000 ${
              theme === 'dark'
                ? 'border-stone-700 bg-stone-800'
                : 'border-stone-200 bg-white'
            }`}
            style={{
              transform: `scale(${0.8 + (progress / 100) * 0.2})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/me.png"
                alt="Daniel Zverev"
                className="w-12 h-12 rounded-full object-cover transition-all duration-1000"
                style={{
                  opacity: Math.min(progress / 50, 1),
                  transform: `translateY(${Math.max(10 - progress / 5, 0)}px)`,
                }}
                loading="eager"
              />
            </div>
          </div>
          
          {/* Rotating border */}
          <div
            className={`absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent transition-all duration-1000 ${
              theme === 'dark' ? 'border-t-stone-400' : 'border-t-stone-600'
            }`}
            style={{
              transform: `rotate(${progress * 3.6}deg)`,
              opacity: Math.min(progress / 30, 1),
            }}
          />
        </div>

        {/* Progress indicator */}
        <div className="w-48 space-y-3">
          <div
            className={`h-0.5 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-stone-800' : 'bg-stone-200'
            }`}
          >
            <div
              className={`h-full transition-all duration-300 ease-out ${
                theme === 'dark' ? 'bg-stone-400' : 'bg-stone-600'
              }`}
              style={{
                width: `${progress}%`,
                transform: `translateX(${progress < 100 ? '-2px' : '0px'})`,
              }}
            />
          </div>
          
          {/* Loading text */}
          <div className="flex items-center justify-center space-x-1">
            {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
              <span
                key={index}
                className={`text-sm font-medium transition-all duration-300 ${
                  theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
                }`}
                style={{
                  opacity: Math.min(Math.max((progress - index * 10) / 20, 0), 1),
                  transform: `translateY(${Math.max(5 - (progress - index * 10) / 4, 0)}px)`,
                }}
              >
                {letter}
              </span>
            ))}
            
            {/* Animated dots */}
            <div className="flex space-x-1 ml-2">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    theme === 'dark' ? 'bg-stone-400' : 'bg-stone-500'
                  }`}
                  style={{
                    opacity: progress > 20 ? 1 : 0,
                    transform: `scale(${1 + Math.sin((progress * 0.1) + (dot * 0.5)) * 0.3})`,
                    animationDelay: `${dot * 200}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}