import { describe, expect, it } from 'vitest';
import { resolveTheme, themeScript } from './theme';

describe('resolveTheme', () => {
  it('lets a stored choice beat the system setting', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });

  it('falls back to the system setting', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme('garbage', false)).toBe('light');
  });
});

describe('themeScript', () => {
  it('guards storage access and reads the system setting', () => {
    expect(themeScript).toMatch(/try\{[^}]*localStorage/);
    expect(themeScript).toContain('prefers-color-scheme: dark');
  });
});
