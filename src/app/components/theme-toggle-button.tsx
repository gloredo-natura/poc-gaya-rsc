'use client';

import { Button } from '@radix-ui/themes';
import { useTheme } from './client-theme-provider';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      type="button" 
      variant="soft" 
      onClick={toggleTheme}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </Button>
  );
}
