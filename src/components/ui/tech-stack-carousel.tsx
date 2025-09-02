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
  frontend: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
  backend: 'bg-green-500/20 text-green-600 border-green-500/30',
  mobile: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
  tools: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  'version-control': 'bg-gray-800/20 text-gray-800 border-gray-800/30',
  design: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
  styling: 'bg-cyan-400/20 text-cyan-600 border-cyan-400/30',
};

const categoryColorsDark = {
  frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  backend: 'bg-green-500/10 text-green-400 border-green-500/20',
  mobile: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  tools: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'version-control': 'bg-gray-200/10 text-gray-200 border-gray-200/20',
  design: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  styling: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
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
          px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2
          transition-all duration-300 ease-in-out
          ${colors[currentTech.category]}
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {currentTech.icon && (
          <img 
            src={currentTech.icon} 
            alt={currentTech.name} 
            className="w-4 h-4 object-contain"
          />
        )}
        {currentTech.name}
      </div>
    </div>
  );
}