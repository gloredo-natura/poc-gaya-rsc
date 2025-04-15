import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Get the current cookies
  const cookieStore = await cookies();

  // Get the current theme
  const themeCookie = cookieStore.get('theme');
  const currentTheme = themeCookie?.value || 'light';

  // Toggle the theme
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  console.log(`[API Route] Toggling theme from ${currentTheme} to ${newTheme}`);

  // Set the theme cookie
  cookieStore.set('theme', newTheme, {
    path: '/',
    // Make it accessible from client-side JavaScript
    httpOnly: false,
    sameSite: 'lax',
    // Set a long expiration time
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  // Redirect back to the form page
  return NextResponse.redirect(new URL('/form', request.url), 303);
}
