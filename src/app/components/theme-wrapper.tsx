'use client';

import { Theme } from '@radix-ui/themes';
import { useTheme } from './client-theme-provider';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  // Update the HTML class when the theme changes
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  return (
    <Theme appearance={theme} accentColor="blue" radius="medium">
      {children}
    </Theme>
  );
}
