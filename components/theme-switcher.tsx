import { useTheme } from '@/hooks/theme';
import { Button } from '@/uis/button';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="icon"
      className="size-10.5"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </Button>
  );
};
