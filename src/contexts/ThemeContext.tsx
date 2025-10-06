import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if there's a saved preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Otherwise, use system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    const body = document.body;
    
    const darkColor = '#1c1917';
    const lightColor = '#fafaf9';
    const color = theme === 'dark' ? darkColor : lightColor;

    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Helper: force Safari to re-evaluate theme-color by replacing the meta tag
    const forceSafariThemeColorUpdate = (col: string) => {
      // Remove all existing theme-color metas
      document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.parentNode?.removeChild(el));
      // Re-insert a fresh one
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', col);
      document.head.appendChild(meta);

      // Also re-insert apple status bar meta (helps in standalone/PWA)
      const existingApple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (existingApple) existingApple.parentNode?.removeChild(existingApple);
      const apple = document.createElement('meta');
      apple.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      apple.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
      document.head.appendChild(apple);

      // Replace viewport meta to trigger chrome recalculation on some iOS versions
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const clone = viewport.cloneNode(true) as HTMLMetaElement;
        viewport.parentNode?.replaceChild(clone, viewport);
      }

      // Hidden iframe trick to force Safari to recompute browser chrome without a page reload
      try {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        iframe.srcdoc = `<!doctype html><html><head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
          <meta name="theme-color" content="${col}">
          <meta name="apple-mobile-web-app-status-bar-style" content="${theme === 'dark' ? 'black-translucent' : 'default'}">
        </head><body style="background:${col};"></body></html>`;
        document.body.appendChild(iframe);
        setTimeout(() => {
          try { document.body.removeChild(iframe); } catch {}
        }, 200);
      } catch {}

      // Small reflow + scroll nudge can help certain iOS versions repaint the chrome
      void root.offsetHeight;
      requestAnimationFrame(() => {
        window.scrollTo(window.scrollX, window.scrollY + 1);
        window.scrollTo(window.scrollX, window.scrollY);
      });
    };

    // More aggressive: briefly flip to the opposite color, then set to the target color next frame
    const flipSafariThemeColor = (finalCol: string) => {
      const opposite = theme === 'dark' ? '#ffffff' : '#000000';
      forceSafariThemeColorUpdate(opposite);
      requestAnimationFrame(() => {
        forceSafariThemeColorUpdate(finalCol);
      });
    };
    
    console.log('🎨 Theme changing to:', theme, 'Color:', color);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Force background colors everywhere
    root.style.setProperty('background-color', color, 'important');
    body.style.setProperty('background-color', color, 'important');
    
    // Force on #root as well
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      rootDiv.style.setProperty('background-color', color, 'important');
    }
    
    // Set CSS variables and color-scheme
    root.style.setProperty('--color-background', color);
    root.style.setProperty('color-scheme', theme);

    // Update theme-color meta (Safari needs a replacement to repaint)
    if (isIOS) {
      flipSafariThemeColor(color);
    } else {
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) themeColorMeta.setAttribute('content', color);
    }
    
    // Force repaint
    void root.offsetHeight;
    
    console.log('✅ Background colors forced to:', color);
    console.log('HTML bg:', window.getComputedStyle(root).backgroundColor);
    console.log('Body bg:', window.getComputedStyle(body).backgroundColor);
    
    // Save preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no saved preference exists
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}