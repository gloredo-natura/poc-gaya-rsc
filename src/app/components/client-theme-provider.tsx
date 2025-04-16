'use client';

// Removed Theme import as we're using ThemeWrapper
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

  // Theme is applied in ThemeWrapper component

  // Initialize theme from cookie on mount and listen for changes
  useEffect(() => {
    const loadThemeFromCookie = () => {
      const savedTheme = document.cookie
        .split('; ')
        .find(row => row.startsWith('theme='))
        ?.split('=')[1] as 'light' | 'dark' | undefined;

      if (savedTheme) {
        console.log(`ClientThemeProvider: Loading theme from cookie: ${savedTheme}`);
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
      }
    };

    // Load theme initially
    loadThemeFromCookie();

    // Listen for storage events
    window.addEventListener('storage', loadThemeFromCookie);

    return () => {
      window.removeEventListener('storage', loadThemeFromCookie);
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`ClientThemeProvider: Toggling theme from ${theme} to ${newTheme}`);

    // Update state
    setTheme(newTheme);

    // Save theme to cookie
    document.cookie = `theme=${newTheme};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;

    // Update HTML class for immediate visual feedback
    document.documentElement.className = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
