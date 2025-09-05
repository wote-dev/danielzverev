import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage:
          'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--grid-color) calc(var(--grid-opacity) * 100%), transparent) 1px, transparent 0)',
        backgroundSize: 'var(--grid-size) var(--grid-size)',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GridBackground;