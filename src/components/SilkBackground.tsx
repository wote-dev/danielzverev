import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Silk from '../../@/components/Silk';

interface SilkBackgroundProps {
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  // Define colors for light and dark themes
  const lightThemeColor = '#e7e5e4'; // stone-200
  const darkThemeColor = '#44403c'; // stone-600

  return (
    <div className={`fixed inset-0 w-full h-full ${className}`} style={{ zIndex: -1 }}>
      <Silk
        color={theme === 'dark' ? darkThemeColor : lightThemeColor}
        speed={3}
        scale={2}
        noiseIntensity={0.8}
        rotation={0.1}
      />
    </div>
  );
};

export default SilkBackground;