import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { TechStackCarousel } from '@/components/ui/tech-stack-carousel';
import { SocialLink } from '@/components/ui/social-link';
import DarkVeil from '@/components/DarkVeil';
import GridBackground from '../../@/components/GridBackground';
import { BioModal } from '@/components/ui/bio-modal';
import { InteractiveSubtitle } from '@/components/ui/interactive-subtitle';
import { useTheme } from '@/contexts/ThemeContext';


interface HomePageProps {
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isVisible }) => {
  const { theme } = useTheme();
  const [animationStage, setAnimationStage] = useState(0);

  const [showBioModal, setShowBioModal] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isHoveringName, setIsHoveringName] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const stages = [1, 2, 3, 4, 5];
      stages.forEach((stage, index) => {
        setTimeout(() => {
          setAnimationStage(stage);
        }, index * 150);
      });
      

    }
  }, [isVisible]);
  

  
  return (
    <div className={`w-full h-full min-h-screen min-h-svh flex items-center justify-center overflow-hidden fixed inset-0 ${
      theme === 'dark' 
        ? 'bg-stone-900' 
        : 'bg-stone-50'
    }`}>
      {/* DarkVeil Background - Always mounted for smooth transitions */}
      <div className={`fixed inset-0 w-screen h-screen z-0 transition-opacity duration-500 ease-in-out ${
        theme === 'dark' ? 'opacity-100' : 'opacity-0'
      }`}>
        <DarkVeil 
          hueShift={222}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={0}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>
      
      {/* Grid Background for Light Theme */}
      <div className={`fixed inset-0 w-screen h-screen z-0 transition-opacity duration-500 ease-in-out ${
        theme === 'light' ? 'opacity-100' : 'opacity-0'
      }`}>
        <GridBackground 
          gridSize={24}
          opacity={0.6}
        />
      </div>
      {/* Coordinates - Top Center */}
      <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ease-out hidden sm:block ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className={`px-4 py-2 font-sans text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
          theme === 'dark'
            ? 'bg-stone-900/40 text-stone-400 embossed-subtle-dark hover:bg-stone-900/60 hover:text-stone-300'
            : 'bg-stone-50/40 text-stone-500 embossed-subtle-light hover:bg-stone-50/60 hover:text-stone-600'
        }`}>
          <span className="tracking-wide flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="#ef4444" viewBox="0 0 16 16">
              <path d="M8 0a5 5 0 0 0-5 5c0 5 5 10 5 10s5-5 5-10a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span>Melbourne, AU</span>
          </span>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className={`absolute top-8 sm:top-8 right-6 z-10 transition-all duration-700 ease-out delay-75 ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <ThemeToggle />
      </div>

      {/* Status Indicator - Top Left */}
      <div className={`absolute top-8 sm:top-8 left-6 z-10 transition-all duration-700 ease-out delay-150 ${
        animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className={`px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
          theme === 'dark'
            ? 'bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
            : 'bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className={`text-xs font-medium transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-stone-400' 
                : 'text-stone-500'
            }`}>
              Available
            </span>
          </div>
        </div>
      </div>
      
      {/* Social Links - Bottom Left */}
      <div className={`absolute bottom-8 sm:bottom-8 left-6 z-10 transition-all duration-700 ease-out delay-300 ${
        animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center gap-2">
          <SocialLink
            href="mailto:admin@blackcubesolutions.com"
            label="Email"
            delay={100}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />
          
          <SocialLink
            href="https://x.com/wote_dev"
            target="_blank"
            rel="noopener noreferrer"
            label="X (Twitter)"
            delay={200}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            }
          />
          
          <SocialLink
            href="https://www.linkedin.com/in/daniel-zverev/"
            target="_blank"
            rel="noopener noreferrer"
            label="LinkedIn"
            delay={300}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            }
          />
          
          <SocialLink
            href="https://cal.com/danielzverev"
            target="_blank"
            rel="noopener noreferrer"
            label="Schedule a meeting"
            delay={400}
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Projects - Bottom Right */}
      <div className={`absolute right-6 z-10 transition-all duration-700 ease-out delay-375 ${
        animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`} style={{ bottom: `calc(4rem + env(safe-area-inset-bottom))` }}>
        <a 
          href="https://apps.apple.com/us/app/simplr-minimal-to-do-app/id6748098464" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'text-stone-400 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
              : 'text-stone-500 hover:text-stone-600 bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
          }`}
        >
          <img src="/simplr.png" alt="Simplr" className="w-4 h-4 rounded" />
          <span>Simplr (iOS)</span>
        </a>
      </div>

      {/* Central Content */}
      <div className="flex flex-col items-center justify-center h-full px-4 relative z-0" style={{ paddingTop: `calc(2rem + env(safe-area-inset-top))`, paddingBottom: `calc(6rem + env(safe-area-inset-bottom))` }}>
        <div className="text-center space-y-8 relative z-10">
          <div className={`space-y-3 transition-all duration-1000 ease-out delay-450 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Avatar */}
            <div className="flex justify-center mb-3">
              <div className="relative">
                {/* Tooltip */}
                <div
                  className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                    isHoveringAvatar
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1'
                  } ${
                    theme === 'dark'
                      ? 'bg-stone-800/90 text-stone-200 shadow-lg'
                      : 'bg-white/90 text-stone-700 shadow-lg'
                  }`}
                >
                  Click to read my bio
                  {/* Arrow */}
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent ${
                      theme === 'dark' ? 'border-t-stone-800/90' : 'border-t-white/90'
                    }`}
                  />
                </div>
                
                <button
                  onClick={() => setShowBioModal(true)}
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    theme === 'dark'
                      ? 'ring-2 ring-stone-700/50 shadow-xl focus:ring-stone-500 focus:ring-offset-stone-900'
                      : 'ring-2 ring-stone-200/50 shadow-lg focus:ring-stone-400 focus:ring-offset-stone-50'
                  }`}
                  aria-label="View bio"
                >
                  <img 
                    src="/me.png" 
                    alt="Daniel Zverev" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Tooltip */}
              <div
                className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-200 z-20 ${
                  isHoveringName
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1'
                } ${
                  theme === 'dark'
                    ? 'bg-stone-800/90 text-stone-200 shadow-lg'
                    : 'bg-white/90 text-stone-700 shadow-lg'
                }`}
              >
                Click to read my bio
                {/* Arrow */}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent ${
                    theme === 'dark' ? 'border-t-stone-800/90' : 'border-t-white/90'
                  }`}
                />
              </div>
              
              <button
                onClick={() => setShowBioModal(true)}
                onMouseEnter={() => setIsHoveringName(true)}
                onMouseLeave={() => setIsHoveringName(false)}
                className={`text-5xl sm:text-6xl md:text-7xl font-light tracking-tight transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg px-2 py-1 ${
                  theme === 'dark' 
                    ? 'text-stone-100 hover:text-stone-200 focus:ring-stone-500 focus:ring-offset-stone-900' 
                    : 'text-stone-900 hover:text-stone-700 focus:ring-stone-400 focus:ring-offset-stone-50'
                }`}
                aria-label="View bio"
              >
                Daniel Zverev
              </button>
            </div>
            
            <InteractiveSubtitle animationStage={animationStage} />
          </div>
          
          {/* Tech Stack Carousel - Below Subtitle{/* Tech Stack */}
          <div className={`-mt-6 transition-all duration-700 ease-out delay-600 ${
            animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <TechStackCarousel />
          </div>
          
          {/* Call to Action */}
        <div className={`flex flex-row items-center justify-center gap-3 -mt-4 transition-all duration-700 ease-out delay-700 ${
          animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
            <a 
              href="mailto:admin@blackcubesolutions.com" 
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-stone-100/90 text-stone-900 embossed-subtle-light hover:bg-white'
                  : 'bg-stone-900/90 text-white embossed-subtle-dark hover:bg-stone-800'
              }`}
            >
              Get In Touch
            </a>
            
            <a 
              href="https://cal.com/danielzverev" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'text-stone-400 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
                  : 'text-stone-500 hover:text-stone-600 bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
              }`}
            >
              Schedule a Call
            </a>
          </div>

        </div>
      </div>
      

      

      
      {/* Bio Modal */}
      <BioModal 
        isOpen={showBioModal} 
        onClose={() => setShowBioModal(false)} 
      />
    </div>
  );
};

export default HomePage;