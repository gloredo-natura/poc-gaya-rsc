'use client';

import { Button } from '@radix-ui/themes';
import { useTheme } from './client-theme-provider';

export default function ClientThemeButton() {
  // Use the theme context from ClientThemeProvider
  const { theme, toggleTheme } = useTheme();

  // Handle button click
  const handleClick = () => {
    console.log(`Changing theme from ${theme} (client-side)`);
    toggleTheme();
  };

  return (
    <Button
      onClick={handleClick}
      variant="soft"
    >
      Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'} (Client)
    </Button>
  );
}
