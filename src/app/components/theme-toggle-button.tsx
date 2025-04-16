'use client';

import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export default function ThemeToggleButton({ initialTheme }: { initialTheme: 'light' | 'dark' }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  // Load theme from cookie on initial render
  useEffect(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1];

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme as 'light' | 'dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Theme toggle clicked');

    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`Changing theme from ${theme} to ${newTheme} (client-side)`);
    setTheme(newTheme);

    // Save theme to cookie
    document.cookie = `theme=${newTheme};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    console.log('Theme cookie updated');

    // Update HTML class for immediate visual feedback
    document.documentElement.className = newTheme;

    // Force a refresh of the theme in the UI
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="soft"
      onMouseEnter={() => console.log('Theme button hover (client-side)')}
    >
      Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'} (Client)
    </Button>
  );
}
