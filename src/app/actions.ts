'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function submitForm(formData: FormData) {

  // Process form data
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Validate form data
  if (!name || !email || !message) {
    // Just return without redirecting if validation fails
    console.log('Validation failed: All fields are required');
    return;
  }

  // In a real app, you would save this data to a database
  console.log('Form submitted:', { name, email, message });

  // Simulate a delay to show processing
  await new Promise(resolve => setTimeout(resolve, 500));

  // Redirect to success page
  redirect('/success');
}

export async function clearForm() {
  // Simply redirect back to the form page
  redirect('/form');
}

export async function toggleTheme(formData: FormData) {

  // Get the current cookies
  const cookieStore = await cookies();

  // Get the current theme
  const themeCookie = cookieStore.get('theme');
  const currentTheme = themeCookie?.value || 'light';

  // Toggle the theme
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  console.log(`Toggling theme from ${currentTheme} to ${newTheme}`);

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
