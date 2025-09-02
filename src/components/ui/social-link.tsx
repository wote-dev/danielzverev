import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SkeletonIcon } from './skeleton';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  target?: string;
  rel?: string;
  delay?: number;
}

export function SocialLink({ 
  href, 
  icon, 
  label, 
  target, 
  rel,
  delay = 0 
}: SocialLinkProps) {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return (
      <div className={`p-2.5 rounded-full border transition-all duration-300 ${
        theme === 'dark'
          ? 'border-stone-800/50 bg-stone-900/60'
          : 'border-stone-200/50 bg-white/60'
      }`}>
        <SkeletonIcon />
      </div>
    );
  }

  return (
    <a 
      href={href}
      target={target}
      rel={rel}
      className={`
        p-2.5 rounded-full transition-all duration-300 transform
        ${theme === 'dark'
          ? 'text-stone-500 hover:text-stone-300 hover:bg-stone-900/60 border border-stone-800/50'
          : 'text-stone-400 hover:text-stone-600 hover:bg-white/60 border border-stone-200/50'
        }
        ${isHovered ? 'scale-110 shadow-lg' : 'scale-100'}
        hover:scale-110 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-stone-500' : 'focus:ring-stone-400'}
      `}
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-200 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}>
        {icon}
      </div>
    </a>
  );
}