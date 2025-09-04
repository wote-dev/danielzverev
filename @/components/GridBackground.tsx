import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';

interface GridBackgroundProps {
  className?: string;
  gridSize?: number;
  opacity?: number;
}

export default function GridBackground({ 
  className = '', 
  gridSize = 32, 
  opacity = 0.4 
}: GridBackgroundProps) {
  const { theme } = useTheme();

  return (
    <div 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: theme === 'light' 
          ? `
            linear-gradient(rgba(120, 113, 108, ${opacity * 0.15}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 113, 108, ${opacity * 0.15}) 1px, transparent 1px),
            linear-gradient(rgba(168, 162, 158, ${opacity * 0.08}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 162, 158, ${opacity * 0.08}) 1px, transparent 1px)
          `
          : `
            linear-gradient(rgba(87, 83, 78, ${opacity * 0.2}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(87, 83, 78, ${opacity * 0.2}) 1px, transparent 1px),
            linear-gradient(rgba(120, 113, 108, ${opacity * 0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 113, 108, ${opacity * 0.1}) 1px, transparent 1px)
          `,
        backgroundSize: theme === 'light'
          ? `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, ${gridSize * 4}px ${gridSize * 4}px, ${gridSize * 4}px ${gridSize * 4}px`
          : `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, ${gridSize * 4}px ${gridSize * 4}px, ${gridSize * 4}px ${gridSize * 4}px`,
        backgroundPosition: theme === 'light'
          ? '0 0, 0 0, 0 0, 0 0'
          : '0 0, 0 0, 0 0, 0 0',
        transition: 'all 0.5s ease-in-out',
      }}
    >
      {/* Subtle radial fade overlay for light theme */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, transparent 0%, rgba(250, 250, 249, 0.3) 70%, rgba(250, 250, 249, 0.6) 100%)`,
            mixBlendMode: 'normal',
          }}
        />
      )}
      
      {/* Subtle embossed effect overlay for light theme */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`,
            backgroundPosition: '0 0, 0 0',
          }}
        />
      )}
    </div>
  );
}