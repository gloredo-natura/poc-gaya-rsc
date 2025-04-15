'use client';

import { Theme } from '@radix-ui/themes';
import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for theme management
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export default function ClientThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: 'light' | 'dark';
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  // Apply theme to document when it changes
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Initialize theme from cookie on mount
  useEffect(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1] as 'light' | 'dark' | undefined;
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.cookie = `theme=${newTheme};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme appearance={theme} accentColor="blue" radius="medium">
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
