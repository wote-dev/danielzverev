import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TechStackCarousel } from '@/components/ui/tech-stack-carousel';
import { useTheme } from '@/contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`h-full flex items-center justify-center overflow-hidden relative transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-stone-900' 
        : 'bg-stone-50'
    }`}>
      {/* Coordinates - Top Center */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 sm:top-6 top-20">
        <div className={`px-4 py-3 font-mono text-xs sm:text-sm font-semibold transition-all duration-300 ${
          theme === 'dark'
            ? 'text-stone-700 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.1)]'
            : 'text-stone-500 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]'
        }`}>
          <span className="tracking-wider">37.8136° S, 144.9631° E</span>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-4 sm:right-6">
        <ThemeToggle />
      </div>

      {/* X (Twitter) Button - Top Left */}
      <a
        href="https://x.com/wote_dev"
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute top-6 left-4 sm:left-6 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 sm:gap-3 shadow-sm hover:shadow-md ${
          theme === 'dark'
            ? 'bg-stone-800 border border-stone-700 text-stone-100 hover:bg-stone-700 hover:border-stone-600'
            : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm font-semibold">@wote_dev</span>
      </a>
      
      {/* Status Indicator - Bottom Left */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
        <span className={`text-sm font-medium transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-300' 
            : 'text-stone-600'
        }`}>
          Available for work
        </span>
      </div>

      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-100' 
            : 'text-stone-800'
        }`}>
          Hi, I'm Daniel.
        </h1>
        <p className={`text-xl font-medium px-8 sm:px-0 mb-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-300' 
            : 'text-stone-600'
        }`}>
           I am a software developer and enjoy building websites and iOS apps.
         </p>
         
         {/* Tech Stack Carousel */}
         <div className="mt-3">
           <TechStackCarousel />
         </div>
      </div>
    </div>
  );
};

export default HomePage;