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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return (
      <div className={`p-2.5 rounded-full transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-stone-900/40 embossed-subtle-dark'
          : 'bg-stone-50/40 embossed-subtle-light'
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
          ? 'text-stone-500 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
          : 'text-stone-400 hover:text-stone-600 bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60'
        }
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-stone-500' : 'focus:ring-stone-400'}
      `}
      aria-label={label}
    >
      {icon}
    </a>
  );
}