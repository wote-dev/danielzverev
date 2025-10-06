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
    const t = window.setTimeout(() => setVisible(false), 900); // allow time for chrome to settle
    return () => window.clearTimeout(t);
  }, [theme, enabled]);

  if (!enabled) return null;

  const bg = theme === 'dark' ? '#1c1917' : '#fafaf9';

  const hexToRgb = (hex: string) => {
    const s = hex.replace('#', '');
    const bigint = parseInt(s.length === 3 ? s.split('').map(c => c + c).join('') : s, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const rgb = hexToRgb(bg);

  const common: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: 2147483646,
    transition: 'opacity 300ms ease',
    opacity: visible ? 1 : 0,
  };

  return (
    <>
      {/* Top safe-area gradient cover (blend into content) */}
      <div
        style={{
          ...common,
          top: 0,
          height: 'calc(env(safe-area-inset-top, 0px) + 64px)',
          background: `linear-gradient(to bottom, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0.85) 60%, rgba(${rgb}, 0) 100%)`,
        }}
      />
      {/* Bottom safe-area gradient cover */}
      <div
        style={{
          ...common,
          bottom: 0,
          height: 'calc(env(safe-area-inset-bottom, 0px) + 140px)',
          background: `linear-gradient(to top, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0.85) 60%, rgba(${rgb}, 0) 100%)`,
        }}
      />
    </>
  );
}
