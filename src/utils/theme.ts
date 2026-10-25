import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#fafaf7', dark: '#0d1117' };
const listeners = new Set<() => void>();

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

export const themeScript = `(function(){var s=null;try{s=localStorage.getItem('${STORAGE_KEY}')}catch(e){}var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');var m=document.createElement('meta');m.name='theme-color';m.content=d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}';document.head.appendChild(m)})()`;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const isDark = () => document.documentElement.classList.contains('dark');

function persist(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the theme still applies until the next reload.
  }
}

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next: Theme = isDark() ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[next]);
    persist(next);
    listeners.forEach((listener) => listener());
  };

  return { dark, toggle };
}
