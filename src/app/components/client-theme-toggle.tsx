'use client';

import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { useTheme } from './client-theme-provider';

export default function ClientThemeToggle() {
  // Use the theme context from ClientThemeProvider
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="soft"
      onClick={toggleTheme}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme (Client-side)
    </Button>
  );
}
