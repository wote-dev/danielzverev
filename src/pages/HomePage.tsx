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
          <span className="tracking-wider">📍 37.8136° S, 144.9631° E</span>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-4 sm:right-6">
        <ThemeToggle />
      </div>

      {/* Status Indicator - Top Left */}
      <div className="absolute top-6 left-4 sm:left-6 flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
        <span className={`text-sm font-medium transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-300' 
            : 'text-stone-600'
        }`}>
          Available for work
        </span>
      </div>
      
      {/* Social Links - Bottom Left */}
      <div className="absolute bottom-6 left-4 sm:left-6 flex items-center gap-4">
        {/* Email */}
        <a 
          href="mailto:admin@blackcubesolutions.com" 
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200'
          }`}
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
        
        {/* X (Twitter) */}
        <a 
          href="https://x.com/wote_dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200'
          }`}
          aria-label="X (Twitter)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        
        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/daniel-zverev/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200'
          }`}
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        </a>
        
        {/* Cal.com */}
        <a 
          href="https://cal.com/danielzverev" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200'
          }`}
          aria-label="Schedule a meeting"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Projects - Bottom Right */}
      <div className="absolute bottom-6 right-4 sm:right-6 flex items-center gap-3">
        <div className={`text-sm font-medium transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-300' 
            : 'text-stone-600'
        }`}>
          Projects:
        </div>
        <a 
          href="https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-200'
              : 'text-stone-600 hover:text-stone-800'
          }`}
        >
          Simplr
        </a>
      </div>

      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-stone-100' 
            : 'text-stone-800'
        }`}>
          Hi, I'm Daniel Zverev.
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