import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

function isIOSSafari() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|od|ad)/.test(ua) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
  const isSafari = /^((?!chrome|crios|fxios|edgios|opios).)*safari/i.test(ua);
  return isIOS && isSafari;
}

export default function SafariBarsOverlay() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const enabled = useMemo(() => isIOSSafari(), []);

  // Fade the overlays in briefly on theme changes to hide Safari chrome lag
  useEffect(() => {
    if (!enabled) return;
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(t);
  }, [theme, enabled]);

  if (!enabled) return null;

  // Use the exact CSS variable so it always matches, even mid-render
  const bgVar = 'var(--color-background)';

  const common: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: 9, // keep under interactive UI
    transition: 'opacity 220ms ease',
    opacity: visible ? 1 : 0,
    background: bgVar,
    mixBlendMode: 'normal',
    WebkitBackdropFilter: 'none',
    backdropFilter: 'none',
  };

  return (
    <>
      {/* Top safe-area solid cover (no blur, exact color) */}
      <div
        style={{
          ...common,
          top: 0,
          height: 'calc(env(safe-area-inset-top, 0px) + 2px)',
        }}
      />
      {/* Bottom safe-area solid cover */}
      <div
        style={{
          ...common,
          bottom: 0,
          height: 'calc(env(safe-area-inset-bottom, 0px) + 2px)',
        }}
      />
    </>
  );
}
