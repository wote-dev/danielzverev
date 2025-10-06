import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export function QuickMenu({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const embossed = theme === 'dark'
    ? 'bg-stone-900/40 embossed-subtle-dark hover:bg-stone-900/60'
    : 'bg-stone-50/40 embossed-subtle-light hover:bg-stone-50/60';

  const panelStyle = theme === 'dark'
    ? 'bg-stone-900/95 border border-stone-700/40 embossed-subtle-dark'
    : 'bg-stone-50/95 border border-stone-200/50 embossed-subtle-light';

  return (
    <div ref={menuRef} className={cn('relative select-none', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110',
          embossed,
          theme === 'dark' ? 'focus:ring-stone-500 focus:ring-offset-stone-900' : 'focus:ring-stone-400 focus:ring-offset-stone-50'
        )}
        aria-label="Open quick actions"
      >
        {/* Kebab icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={cn(theme === 'dark' ? 'text-stone-300' : 'text-stone-700')}>
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute right-0 mt-2 min-w-[220px] rounded-2xl p-2 shadow-xl backdrop-blur-lg',
            'transition-all duration-200 origin-top-right',
            panelStyle
          )}
        >
          <a
            role="menuitem"
            href="/DANIEL_E_ZVEREV.pdf"
            download="DANIEL_E_ZVEREV.pdf"
            className={cn('flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:scale-[1.02]',
              theme === 'dark' ? 'text-stone-200 hover:bg-stone-800/50' : 'text-stone-800 hover:bg-white/60')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm6-7V3.5L18.5 9H14z"/></svg>
            Download Resume
          </a>

          <a
            role="menuitem"
            href="https://cal.com/danielzverev"
            target="_blank"
            rel="noopener noreferrer"
            className={cn('flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:scale-[1.02] mt-1',
              theme === 'dark' ? 'text-stone-200 hover:bg-stone-800/50' : 'text-stone-800 hover:bg-white/60')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M7 2h2v2h6V2h2v2h2a1 1 0 0 1 1 1v3H4V5a1 1 0 0 1 1-1h2V2zm-3 8h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9zm4 2v2h2v-2H8zm4 0v2h2v-2h-2z"/></svg>
            Schedule a Call
          </a>

          <a
            role="menuitem"
            href="mailto:admin@blackcubesolutions.com"
            className={cn('flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:scale-[1.02] mt-1',
              theme === 'dark' ? 'text-stone-200 hover:bg-stone-800/50' : 'text-stone-800 hover:bg-white/60')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2zm0 5.2l-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.2z"/></svg>
            Email Me
          </a>

          <button
            role="menuitem"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.origin).catch(() => {});
              setOpen(false);
            }}
            className={cn('w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:scale-[1.02] mt-1',
              theme === 'dark' ? 'text-stone-200 hover:bg-stone-800/50' : 'text-stone-800 hover:bg-white/60')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/></svg>
            Copy Site Link
          </button>

          <div className={cn('mt-2 px-3 py-2 rounded-xl text-[11px] uppercase tracking-wide',
            theme === 'dark' ? 'text-stone-400 bg-stone-800/40' : 'text-stone-600 bg-white/60')}
          >
            Appearance: Follows System
          </div>
        </div>
      )}
    </div>
  );
}