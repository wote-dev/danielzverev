import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'version-control' | 'design' | 'styling';
  icon?: string;
}

const techStack: TechItem[] = [
  { name: 'React', category: 'frontend', icon: '/react.png' },
  { name: 'TypeScript', category: 'frontend', icon: '/typescript.png' },
  { name: 'HTML', category: 'design', icon: '/html-5.png' },
  { name: 'Tailwind CSS', category: 'styling', icon: '/Tailwind.png' },
  { name: 'Node.js', category: 'backend', icon: '/node-js.png' },
  { name: 'Swift', category: 'tools', icon: '/swift.png' },
  { name: 'Cloudflare', category: 'tools', icon: '/Cloudflare.png' },
  { name: 'Supabase', category: 'backend', icon: '/supabase.png' },
  { name: 'Figma', category: 'design', icon: '/figma.png' },
  { name: 'Vite', category: 'tools', icon: '/vite.png' },
  { name: 'Git', category: 'version-control', icon: '/github.png' },
];

const categoryColors = {
  frontend: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  backend: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  mobile: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  tools: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  'version-control': 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  design: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
  styling: 'bg-stone-100/50 text-stone-600 border-stone-200/50',
};

const categoryColorsDark = {
  frontend: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  backend: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  mobile: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  tools: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  'version-control': 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  design: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
  styling: 'bg-stone-900/50 text-stone-400 border-stone-800/50',
};

export function TechStackCarousel() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [iconLoaded, setIconLoaded] = useState(false);

  useEffect(() => {
    // Initial loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const interval = setInterval(() => {
      setIsVisible(false);
      setIconLoaded(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % techStack.length);
        
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }, 200);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);

  const currentTech = techStack[currentIndex];
  const colors = theme === 'dark' ? categoryColorsDark : categoryColors;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 animate-pulse ${
            theme === 'dark'
              ? 'bg-stone-900/50 border-stone-800/50'
              : 'bg-stone-100/50 border-stone-200/50'
          }`}
        >
          <div className={`w-3 h-3 rounded-sm ${
            theme === 'dark' ? 'bg-stone-700' : 'bg-stone-300'
          }`} />
          <div className={`w-16 h-3 rounded ${
            theme === 'dark' ? 'bg-stone-700' : 'bg-stone-300'
          }`} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5
          transition-all duration-400 ease-out transform
          ${colors[currentTech.category]}
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}
          hover:scale-105 hover:shadow-lg
        `}
      >
        {currentTech.icon && (
          <div className="relative">
            <img 
              src={currentTech.icon} 
              alt={currentTech.name} 
              className={`w-3 h-3 object-contain transition-all duration-300 ${
                iconLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              onLoad={() => setIconLoaded(true)}
            />
            {!iconLoaded && (
              <div className={`absolute inset-0 w-3 h-3 rounded-sm animate-pulse ${
                theme === 'dark' ? 'bg-stone-600' : 'bg-stone-400'
              }`} />
            )}
          </div>
        )}
        <span className={`transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'
        }`}>
          {currentTech.name}
        </span>
      </div>
    </div>
  );
}