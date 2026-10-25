import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '~/utils/theme';

export function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full border border-line p-2 text-muted transition hover:text-accent"
    >
      {dark ? <LuSun className="size-4" /> : <LuMoon className="size-4" />}
    </button>
  );
}
