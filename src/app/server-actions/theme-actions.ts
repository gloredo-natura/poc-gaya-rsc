'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function toggleThemeServerAction() {
  // Get the current cookies
  const cookieStore = await cookies();

  // Get the current theme
  const themeCookie = cookieStore.get('theme');
  const currentTheme = themeCookie?.value || 'light';

  // Toggle the theme
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  console.log(`[Server Action] Toggling theme from ${currentTheme} to ${newTheme}`);

  // Set the theme cookie
  cookieStore.set('theme', newTheme, {
    path: '/',
    // Make it accessible from client-side JavaScript
    httpOnly: false,
    sameSite: 'lax',
    // Set a long expiration time
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  // Redirect back to the form page to see the theme change
  redirect('/form');
}
