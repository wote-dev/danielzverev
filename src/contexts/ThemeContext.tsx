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
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    const darkColor = '#1c1917';
    const lightColor = '#fafaf9';
    const color = theme === 'dark' ? darkColor : lightColor;
    
    console.log('🎨 Theme changing to:', theme, 'Color:', color);
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // NUCLEAR OPTION: Force background colors everywhere
    root.style.setProperty('background-color', color, 'important');
    body.style.setProperty('background-color', color, 'important');
    
    // Force on #root as well
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      rootDiv.style.setProperty('background-color', color, 'important');
    }
    
    // Update meta theme-color for browser chrome
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    }

    // Explicitly tell the browser which UI color scheme to use (affects iOS Safari top/bottom bars)
    root.style.setProperty('color-scheme', theme);
    
    // Update apple status bar for iOS (PWA/standalone)
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBar) {
      appleStatusBar.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
    }
    
    // Set CSS variables
    root.style.setProperty('--color-background', color);
    
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
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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