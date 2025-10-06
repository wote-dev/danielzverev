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
    
    // Force background colors with !important via style property
    root.style.setProperty('background-color', color, 'important');
    body.style.setProperty('background-color', color, 'important');
    
    // Update meta theme-color
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
      console.log('✅ Meta theme-color updated to:', color);
    }
    
    // Update apple status bar for iOS
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBar) {
      appleStatusBar.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
      console.log('✅ Apple status bar updated to:', theme === 'dark' ? 'black-translucent' : 'default');
    }
    
    // Also set CSS variables
    root.style.setProperty('--color-background', color);
    
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