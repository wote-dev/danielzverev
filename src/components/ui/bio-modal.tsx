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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto modal-scroll"
      onClick={handleBackdropClick}
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))'
      }}
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
        className={`relative w-full max-w-md mx-auto my-auto transition-all duration-600 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div 
          className={`relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-400 max-h-[90vh] sm:max-h-[85vh] overflow-hidden ${
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
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 group z-50 pointer-events-auto ${
              theme === 'dark'
                ? 'text-stone-400 hover:text-stone-200 embossed-subtle-dark hover:bg-stone-800/40'
                : 'text-stone-500 hover:text-stone-700 embossed-subtle-light hover:bg-white/40'
            }`}
            aria-label="Close"
            type="button"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header Section */}
          <div className={`text-center mb-3 sm:mb-5 transition-all duration-500 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Enhanced Avatar */}
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'ring-2 ring-stone-600/40 shadow-lg sm:shadow-xl embossed-subtle-dark'
                  : 'ring-2 ring-stone-300/40 shadow-md sm:shadow-lg embossed-subtle-light'
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
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-1.5 sm:mb-2 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-stone-100 embossed-text-dark' 
                : 'text-stone-900 embossed-text-light'
            }`}>
              Daniel Zverev
            </h2>
            
            {/* Location badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
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

          {/* Bio Content - Sleeker Layout */}
          <div className={`transition-all duration-500 ease-out delay-200 max-h-[50vh] sm:max-h-[45vh] overflow-y-auto modal-scroll pr-1 sm:pr-2 space-y-4 sm:space-y-5 ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Introduction */}
            <div className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
            }`}>
              <p className="mb-3">
                Hey, I'm Daniel! I'm a self taught full-stack developer passionate about building beautifully designed projects for screens big and small.
              </p>
              <p className="mb-3">
                Currently based in Melbourne, Australia, and available for freelance projects and full-time opportunities.
              </p>
              
              <p>
                I'm fully embracing the new era of software development aided by AI. The builder is only as effective as the architect, and AI has become an essential part of that design process.
              </p>
            </div>

            {/* Journey Timeline - Condensed */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 tracking-wide uppercase ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Journey
              </h3>
              <div className="space-y-2.5">
                {[
                  { year: '2025', title: 'First iOS App Released', description: 'Launched Simplr on the App Store & continuing to freelance and improve my craft' },
                  { year: '2024', title: 'Started Freelancing', description: 'Building custom web applications for clients' },
                  { year: '2023', title: 'Learning to Code', description: 'Started with the basics of web development' },
                ].map((item, index) => (
                  <div key={index} className={`flex gap-4 text-sm`}>
                    <div className={`font-medium min-w-[60px] ${
                      theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
                    }`}>
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium mb-0.5 ${
                        theme === 'dark' ? 'text-stone-200' : 'text-stone-800'
                      }`}>
                        {item.title}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills - Inline Tags */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 tracking-wide uppercase ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Swift', 'SwiftUI', 'Node.js', 'Supabase', 'Git', 'Figma'].map((skill, index) => (
                  <span key={index} className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    theme === 'dark'
                      ? 'bg-stone-800/60 text-stone-300 embossed-subtle-dark hover:bg-stone-800/80'
                      : 'bg-white/60 text-stone-700 embossed-subtle-light hover:bg-white/80'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests - Minimal */}
            <div>
              <h3 className={`text-sm font-semibold mb-3 tracking-wide uppercase ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Interests
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { emoji: '☕', label: 'Coffee' },
                  { emoji: '🎾', label: 'Tennis' },
                  { emoji: '🤖', label: 'AI' },
                  { emoji: '📱', label: 'Mobile Design' },
                  { emoji: '🎨', label: 'UI/UX' },
                ].map((interest, index) => (
                  <span key={index} className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    theme === 'dark'
                      ? 'bg-stone-800/50 text-stone-300 embossed-subtle-dark hover:bg-stone-800/70'
                      : 'bg-white/50 text-stone-700 embossed-subtle-light hover:bg-white/70'
                  }`}>
                    {interest.emoji} {interest.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently - Clean Card */}
            <div className={`p-4 rounded-xl ${
              theme === 'dark'
                ? 'bg-stone-800/30 embossed-subtle-dark'
                : 'bg-white/30 embossed-subtle-light'
            }`}>
              <div className={`text-xs font-semibold mb-2 tracking-wide uppercase ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Currently
              </div>
              <div className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
              }`}>
                Building AI-powered tools for tennis coaches, and working on whatever comes to mind.
              </div>
            </div>
          </div>

          {/* Action Section - Outside scroll area */}
          <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t flex-shrink-0 transition-all duration-500 ease-out delay-400 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            theme === 'dark'
              ? 'border-stone-700/50'
              : 'border-stone-200/50'
          }`}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <a
                href="mailto:admin@blackcubesolutions.com"
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 text-center ${
                  theme === 'dark'
                    ? 'bg-stone-100/90 text-stone-900 embossed-subtle-light hover:bg-white'
                    : 'bg-stone-900/90 text-white embossed-subtle-dark hover:bg-stone-800'
                }`}
              >
                Get In Touch
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-zverev/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 text-center ${
                  theme === 'dark'
                    ? 'text-stone-400 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
                    : 'text-stone-500 hover:text-stone-600 bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
                }`}
              >
                View LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
