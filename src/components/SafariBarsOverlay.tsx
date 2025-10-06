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
    const t = window.setTimeout(() => setVisible(false), 450); // slightly longer than theme transition
    return () => window.clearTimeout(t);
  }, [theme, enabled]);

  if (!enabled) return null;

  const bg = theme === 'dark' ? '#1c1917' : '#fafaf9';
  const common: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    background: bg,
    pointerEvents: 'none',
    zIndex: 2147483646, // under tooltips/dialogs if any
    transition: 'background-color 200ms ease, opacity 250ms ease',
    opacity: visible ? 1 : 0,
  };

  return (
    <>
      {/* Top safe-area cover */}
      <div
        style={{
          ...common,
          top: 0,
          height: 'calc(env(safe-area-inset-top, 0px) + 6px)',
        }}
      />
      {/* Bottom safe-area cover */}
      <div
        style={{
          ...common,
          bottom: 0,
          height: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
        }}
      />
    </>
  );
}