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
  { name: 'Figma', category: 'backend', icon: '/figma.png' },
  { name: 'Vite', category: 'mobile', icon: '/vite.png' },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % techStack.length);
        setIsVisible(true);
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const currentTech = techStack[currentIndex];
  const colors = theme === 'dark' ? categoryColorsDark : categoryColors;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5
          transition-all duration-300 ease-in-out
          ${colors[currentTech.category]}
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {currentTech.icon && (
          <img 
            src={currentTech.icon} 
            alt={currentTech.name} 
            className="w-3 h-3 object-contain"
          />
        )}
        {currentTech.name}
      </div>
    </div>
  );
}