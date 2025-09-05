import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BioModal: React.FC<BioModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Trigger staggered animations
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Stagger content animations
        setTimeout(() => setAnimationStage(1), 200);
        setTimeout(() => setAnimationStage(2), 350);
        setTimeout(() => setAnimationStage(3), 500);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setAnimationStage(0);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setAnimationStage(0);
    setTimeout(onClose, 400); // Wait for animation to complete
  }, [onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Enhanced Backdrop */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          isVisible 
            ? 'opacity-100' 
            : 'opacity-0'
        } ${
          theme === 'dark'
            ? 'bg-stone-900/85 backdrop-blur-md'
            : 'bg-stone-50/85 backdrop-blur-md'
        }`}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg mx-auto transition-all duration-600 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div 
          className={`relative w-full rounded-3xl p-8 transition-all duration-400 ${
            theme === 'dark'
              ? 'bg-stone-900/95 embossed-subtle-dark backdrop-blur-lg border border-stone-700/30'
              : 'bg-stone-50/95 embossed-subtle-light backdrop-blur-lg border border-stone-200/30'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className={`absolute top-6 right-6 p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 group z-50 pointer-events-auto ${
              theme === 'dark'
                ? 'text-stone-400 hover:text-stone-200 embossed-subtle-dark hover:bg-stone-800/40'
                : 'text-stone-500 hover:text-stone-700 embossed-subtle-light hover:bg-white/40'
            }`}
            aria-label="Close"
            type="button"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Section */}
          <div className={`text-center mb-8 transition-all duration-500 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Enhanced Avatar */}
            <div className="flex justify-center mb-6">
              <div className={`relative w-24 h-24 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'ring-3 ring-stone-600/40 shadow-2xl embossed-subtle-dark'
                  : 'ring-3 ring-stone-300/40 shadow-xl embossed-subtle-light'
              }`}>
                <img 
                  src="/me.png" 
                  alt="Daniel Zverev" 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Subtle overlay for depth */}
                <div className={`absolute inset-0 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-transparent via-transparent to-stone-900/20'
                    : 'bg-gradient-to-br from-transparent via-transparent to-stone-900/10'
                }`} />
              </div>
            </div>

            {/* Name with enhanced typography */}
            <h2 className={`text-3xl font-light tracking-wide mb-2 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-stone-100 embossed-text-dark' 
                : 'text-stone-900 embossed-text-light'
            }`}>
              Daniel Zverev
            </h2>
            
            {/* Location badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-stone-800/40 text-stone-400 embossed-subtle-dark'
                : 'bg-white/40 text-stone-600 embossed-subtle-light'
            }`}>
              <svg className="w-3 h-3 fill-red-500" viewBox="0 0 16 16">
                <path d="M8 0a5 5 0 0 0-5 5c0 5 5 10 5 10s5-5 5-10a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              <span>Melbourne, Australia</span>
            </div>
          </div>

          {/* Bio Content with enhanced styling */}
          <div className={`space-y-5 transition-all duration-500 ease-out delay-200 ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className={`text-base leading-relaxed ${
              theme === 'dark' 
                ? 'text-stone-300' 
                : 'text-stone-600'
            }`}>
              <p className="mb-4">
                Full-stack developer with a passion for creating elegant, user-focused digital experiences. 
                I specialise in modern web technologies and mobile app development, always striving for 
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                }`}> clean design and intuitive interfaces</span>.
              </p>
              
              <p className="mb-4">
                Currently building 
                <span className={`inline-flex items-center gap-1.5 font-semibold ${
                  theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                }`}>
                  <img src="/simplr.png" alt="Simplr" className="w-4 h-4 rounded" />
                  Simplr
                </span>, 
                a minimal to-do app for iOS that helps users focus on what matters most. 
                I believe in the power of purposeful technology that enhances rather than complicates our lives.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring Melbourne's coffee scene, 
                experimenting with new technologies, or working on side projects that solve real-world problems.
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className={`mt-8 pt-6 border-t transition-all duration-500 ease-out delay-400 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            theme === 'dark'
              ? 'border-stone-700/50'
              : 'border-stone-200/50'
          }`}>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 focus:scale-105 ${
                  theme === 'dark'
                    ? 'text-stone-300 hover:text-stone-100 embossed-subtle-dark hover:bg-stone-800/40'
                    : 'text-stone-600 hover:text-stone-800 embossed-subtle-light hover:bg-white/60'
                }`}
              >
                <img src="/simplr.png" alt="Simplr" className="w-4 h-4 rounded" />
                <span>View Simplr</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};