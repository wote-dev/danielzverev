import React from 'react';
import Silk from '../../@/components/Silk';

interface SilkBackgroundProps {
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ className = '' }) => {
  const darkThemeColor = '#44403c'; // stone-600

  return (
    <div 
      className={`fixed inset-0 w-full h-full ${className}`} 
      style={{ 
        zIndex: -1,
        width: '100vw',
        height: '100dvh',
        minHeight: '100dvh',
        // Force extension beyond safe areas
        top: 'calc(-1 * env(safe-area-inset-top, 0px))',
        left: 'calc(-1 * env(safe-area-inset-left, 0px))',
        right: 'calc(-1 * env(safe-area-inset-right, 0px))',
        bottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
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