import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showInitial, setShowInitial] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing Security Protocol');

  useEffect(() => {
    // Show initial after a brief delay
    const initialTimer = setTimeout(() => {
      setShowInitial(true);
    }, 300);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 12 + 3;
          
          // Update status messages based on progress
          if (newProgress >= 90) {
            setStatusMessage('Granting Access');
          } else if (newProgress >= 60) {
            setStatusMessage('Authenticating User');
          } else if (newProgress >= 30) {
            setStatusMessage('Verifying Credentials');
          } else if (newProgress >= 10) {
            setStatusMessage('Scanning Security Protocols');
          }
          
          if (prev >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
            return 100;
          }
          return newProgress;
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
      } ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-stone-50'
      }`}
    >

      <div className="flex flex-col items-center space-y-12 relative z-10">
        {/* Security Lock Icon */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ease-out ${
              showInitial ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'
            } ${
              theme === 'dark'
                ? 'bg-stone-800/50 border border-stone-700/50 shadow-2xl shadow-stone-900/20'
                : 'bg-stone-100/80 border border-stone-200/60 shadow-2xl shadow-stone-900/10'
            }`}
            style={{
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Lock Icon SVG */}
            <svg
              className={`w-8 h-8 transition-all duration-700 ${
                theme === 'dark' ? 'text-stone-200' : 'text-stone-700'
              }`}
              style={{
                opacity: showInitial ? 1 : 0,
                transform: `scale(${showInitial ? 1 : 0.8})`,
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"/>
            </svg>
          </div>
          
          {/* Enhanced glow effect with pulse animation */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              theme === 'dark' ? 'bg-stone-400/8' : 'bg-stone-600/8'
            }`}
            style={{
              opacity: showInitial ? 0.8 : 0,
              transform: `scale(${1.2 + (progress / 100) * 0.2})`,
              filter: 'blur(12px)',
              animation: progress > 0 ? 'pulse 2s ease-in-out infinite' : 'none',
            }}
          />
          
          {/* Scanning line effect */}
          {progress > 0 && (
            <div
              className={`absolute inset-0 rounded-full border-2 border-transparent ${
                theme === 'dark' ? 'border-t-stone-400' : 'border-t-stone-600'
              }`}
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                borderTopColor: theme === 'dark' ? 'rgba(168, 162, 158, 0.8)' : 'rgba(87, 83, 78, 0.8)',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
            />
          )}
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="w-64 space-y-6">
          {/* Security progress bar with gradient */}
          <div className="relative">
            <div
              className={`h-px w-full transition-all duration-500 ${
                theme === 'dark' ? 'bg-stone-800' : 'bg-stone-200'
              }`}
            />
            <div
              className={`absolute top-0 left-0 h-px transition-all duration-700 ease-out ${
                theme === 'dark' ? 'bg-stone-400' : 'bg-stone-600'
              }`}
              style={{
                width: `${progress}%`,
                boxShadow: theme === 'dark' 
                  ? '0 0 12px rgba(168, 162, 158, 0.4), 0 0 24px rgba(168, 162, 158, 0.2)' 
                  : '0 0 12px rgba(87, 83, 78, 0.4), 0 0 24px rgba(87, 83, 78, 0.2)',
              }}
            />
          </div>
          
          {/* Dynamic status text with security theme */}
          <div className="flex items-center justify-center">
            <span
              className={`text-xs font-light tracking-widest uppercase transition-all duration-500 ${
                theme === 'dark' ? 'text-stone-500' : 'text-stone-400'
              }`}
              style={{
                opacity: progress > 10 ? 1 : 0,
                transform: `translateY(${progress > 10 ? 0 : 8}px)`,
              }}
            >
              {statusMessage}
            </span>
          </div>
          
          {/* Security indicators */}
          <div className="flex items-center justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  progress > (i + 1) * 25
                    ? theme === 'dark' 
                      ? 'bg-stone-400 shadow-sm shadow-stone-400/50' 
                      : 'bg-stone-600 shadow-sm shadow-stone-600/50'
                    : theme === 'dark'
                      ? 'bg-stone-700'
                      : 'bg-stone-300'
                }`}
                style={{
                  opacity: progress > 10 ? 1 : 0,
                  transform: `scale(${progress > (i + 1) * 25 ? 1.2 : 1})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}