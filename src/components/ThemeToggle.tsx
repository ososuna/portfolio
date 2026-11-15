import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHydrated } from '@/hooks/use-hydrated';

interface Props {
  label: string;
}

const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// The theme is applied before first paint by the inline script in Layout.astro, so both icons
// render on the server and `dark:` classes pick the visible one without reading the theme here.
export default function ThemeToggle({ label }: Props) {
  const hydrated = useHydrated();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      disabled={!hydrated}
      onClick={toggleTheme}
    >
      <Sun className="dark:hidden" aria-hidden="true" />
      <Moon className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
