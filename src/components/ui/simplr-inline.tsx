import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SimplrInlineProps {
  onClose: () => void;
}

export const SimplrInline: React.FC<SimplrInlineProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  return (
    <div 
      className={`w-full max-w-2xl sm:max-w-sm mx-auto transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      <div 
        className={`relative w-full rounded-2xl p-4 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-black/80 border border-neutral-700/50 backdrop-blur-sm'
            : 'bg-white/80 border border-stone-200/50 backdrop-blur-md'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
            theme === 'dark'
              ? 'text-neutral-400 hover:text-neutral-300 bg-black/40 border border-neutral-800/50 hover:bg-neutral-800/60'
              : 'text-stone-500 hover:text-stone-600 bg-stone-50/40 border border-stone-200/50 hover:bg-stone-100/60'
          }`}
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
              <img 
                src="/simplr.png" 
                alt="Simplr App Icon" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-neutral-100' : 'text-stone-900'
              }`}>
                Try Simplr
              </h3>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                 theme === 'dark'
                   ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                   : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
               }`}>
                 New
               </div>
            </div>
            
            <p className={`text-xs leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-stone-600'
            }`}>
              A minimal to-do app that helps you focus on what matters most. Clean, simple, effective.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <a
                href="https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 hover:scale-105 transform shadow-sm ${
                   theme === 'dark'
                     ? 'bg-neutral-100/90 text-black hover:bg-white hover:shadow-md'
                     : 'bg-stone-900/90 text-white hover:bg-stone-800 hover:shadow-lg'
                 }`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.5 6.82c.18-.22.31-.52.31-.82 0-.08-.01-.17-.02-.25-.3.01-.66.2-.87.46-.18.21-.36.55-.36.89 0 .08.01.17.02.19.03.01.08.01.13.01.27 0 .6-.18.79-.48z"/>
                </svg>
                Download
              </a>
              
              <button
                onClick={handleClose}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 hover:scale-105 transform border ${
                   theme === 'dark'
                     ? 'text-neutral-400 hover:text-neutral-300 bg-black/40 border-neutral-700/50 hover:bg-neutral-800/60 hover:border-neutral-600'
                     : 'text-stone-600 hover:text-stone-700 bg-stone-50/40 border-stone-200/50 hover:bg-stone-50/80 hover:border-stone-300'
                 }`}
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};