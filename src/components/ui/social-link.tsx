import { useState, useEffect } from 'react';
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
      <div className="p-2.5 rounded-full transition-all duration-300 bg-stone-900/40 embossed-subtle-dark">
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
        text-stone-500 hover:text-stone-300 bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60
        ${isHovered ? 'scale-110' : 'scale-100'}
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-stone-500
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