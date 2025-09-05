import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Force light theme for now
    return 'light';
  });

  useEffect(() => {
    // Always remove dark class and keep light theme
    const root = document.documentElement;
    root.classList.remove('dark');
    
    // Save preference (always light for now)
    localStorage.setItem('theme', 'light');
  }, [theme]);

  useEffect(() => {
    // Disable system theme changes - always stay light
    // Keep this effect for future when dark theme is re-enabled
  }, []);

  const toggleTheme = () => {
    // Keep toggle functional but force light theme for now
    // setTheme(prev => prev === 'light' ? 'dark' : 'light');
    setTheme('light');
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