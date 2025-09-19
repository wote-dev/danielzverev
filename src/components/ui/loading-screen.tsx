import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { theme } = useTheme();
  const [isComplete, setIsComplete] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Show loader after a brief delay
    const showTimer = setTimeout(() => {
      setShowLoader(true);
    }, 200);

    // Complete loading after 2.5 seconds (similar to original timing)
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 600);
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-600 ease-out ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        theme === 'dark' ? 'bg-stone-900' : 'bg-stone-50'
      }`}
    >
      {/* 3-Dot Loader */}
       <div className={`flex items-center space-x-2 transition-all duration-500 ease-out ${
         showLoader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
       }`}>
         {[...Array(3)].map((_, i) => (
           <div
             key={i}
             className={`w-3 h-3 rounded-full ${
               theme === 'dark' 
                 ? 'bg-stone-400' 
                 : 'bg-stone-600'
             }`}
             style={{
               animation: showLoader ? `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite` : 'none',
             }}
           />
         ))}
       </div>

       {/* CSS Animation Styles */}
       <style dangerouslySetInnerHTML={{
         __html: `
           @keyframes dotPulse {
             0%, 80%, 100% {
               transform: scale(0.8);
               opacity: 0.5;
             }
             40% {
               transform: scale(1.2);
               opacity: 1;
             }
           }
         `
       }} />
    </div>
  );
}