'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './client-theme-provider';

export default function ServerFormThemeWrapper() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div>
      <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
        Tema atual (client-side): {theme === 'light' ? 'claro' : 'escuro'}
      </p>
    </div>
  );
}
