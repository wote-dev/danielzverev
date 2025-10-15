import { useTheme } from '@/contexts/ThemeContext';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({ 
  className = '', 
  variant = 'default',
  width,
  height,
  animate = true 
}: SkeletonProps) {
  const { theme } = useTheme();
  
  const baseClasses = `${
    theme === 'dark' 
      ? 'bg-neutral-700/50' 
      : 'bg-stone-200/50'
  } ${animate ? 'animate-pulse' : ''}`;
  
  const variantClasses = {
    default: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none'
  };
  
  const style = {
    width: width || undefined,
    height: height || undefined
  };
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Specialized skeleton components
export function SkeletonButton({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      className={`h-10 w-24 rounded-full ${className}`}
      variant="rectangular"
    />
  );
}

export function SkeletonIcon({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      className={`w-4 h-4 ${className}`}
      variant="circular"
    />
  );
}

export function SkeletonText({ 
  lines = 1, 
  className = '' 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton 
          key={index}
          className={`h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}