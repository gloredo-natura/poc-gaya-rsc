import { Button } from '@radix-ui/themes';
import { toggleTheme } from '../actions';

export default function ServerThemeToggle({ currentTheme }: { currentTheme: 'light' | 'dark' }) {
  return (
    <form action={toggleTheme}>
      <input type="hidden" name="currentTheme" value={currentTheme} />
      <Button type="submit" variant="soft">
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Theme (Server-side)
      </Button>
    </form>
  );
}
