import { Theme } from '@radix-ui/themes';
import { cookies } from 'next/headers';

export default async function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value || 'light';

  return (
    <Theme appearance={theme as 'light' | 'dark'} accentColor="blue" radius="medium">
      {children}
    </Theme>
  );
}
