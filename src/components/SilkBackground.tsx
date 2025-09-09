import React from 'react';
import Silk from '../../@/components/Silk';

interface SilkBackgroundProps {
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ className = '' }) => {
  const darkThemeColor = '#44403c'; // stone-600

  return (
    <div 
      className={`fixed w-full ${className}`} 
      style={{ 
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        minHeight: '100vh',
        // Extend beyond safe areas on iOS Safari
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))',
        marginBottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))'
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