import React from 'react';
import Silk from '../../@/components/Silk';

interface SilkBackgroundProps {
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ className = '' }) => {
  const darkThemeColor = '#44403c'; // stone-600

  return (
    <div 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: -1 }}
    >
      <Silk
        color={darkThemeColor}
        speed={3}
        scale={2}
        noiseIntensity={0.8}
        rotation={0.1}
      />
    </div>
  );
};

export default SilkBackground;