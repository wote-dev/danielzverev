import React from 'react';

interface GridBackgroundProps {
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}>
      {/* Grid Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
          }}
        />
        
        {/* Dark Theme Grid */}
        <div 
          className="absolute inset-0 w-full h-full dark:block hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 163, 175, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%)',
          }}
        />
        
        {/* Light Theme Grid */}
        <div 
          className="absolute inset-0 w-full h-full dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 75%)',
          }}
        />
      </div>
      
      {/* Smooth transition overlay for theme changes */}
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'var(--color-background)',
          opacity: 0,
          animation: 'fadeIn 0.5s ease-in-out forwards',
        }}
      />
    </div>
  );
};

export default GridBackground;