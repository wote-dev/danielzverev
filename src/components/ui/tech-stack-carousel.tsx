import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: 'React', icon: '/react.png' },
  { name: 'TypeScript', icon: '/typescript.png' },
  { name: 'HTML', icon: '/html-5.png' },
  { name: 'Tailwind CSS', icon: '/Tailwind.png' },
  { name: 'Node.js', icon: '/node-js.png' },
  { name: 'Swift', icon: '/swift.png' },
  { name: 'Cloudflare', icon: '/Cloudflare.png' },
  { name: 'Supabase', icon: '/supabase.png' },
  { name: 'Figma', icon: '/figma.png' },
  { name: 'Vite', icon: '/vite.png' },
  { name: 'Git', icon: '/github-mark.svg' },
];

export function TechStackCarousel() {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1.5 px-2 py-1">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            <div
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap pointer-events-none transition-all duration-200 z-10 ${
                hoveredIndex === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              } ${
                theme === 'dark'
                  ? 'bg-stone-800/80 text-stone-200'
                  : 'bg-white/80 text-stone-700'
              }`}
            >
              {tech.name}
              {/* Arrow */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[3px] border-l-transparent border-r-transparent ${
                  theme === 'dark' ? 'border-t-stone-800' : 'border-t-white'
                }`}
              />
            </div>
            
            {/* Icon */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ease-out cursor-pointer ${
                hoveredIndex === index
                  ? 'scale-110 shadow-md'
                  : 'scale-100 hover:scale-105'
              }`}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className={`w-3.5 h-3.5 object-contain transition-all duration-300 ${
                  tech.name === 'Git' && theme === 'dark' ? 'filter invert' : ''
                }`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}