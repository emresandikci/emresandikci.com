import { describe, expect, it } from 'vitest';
import { introLines, introScript } from './intro';

describe('introScript', () => {
  it('checks reduced motion before painting and keeps no session state', () => {
    expect(introScript).toContain('prefers-reduced-motion: reduce');
    expect(introScript).toContain("dataset.intro='1'");
    expect(introScript).not.toContain('sessionStorage');
  });
});

describe('introLines', () => {
  const now = new Date('2026-10-25T14:02:00Z');

  it('logs in over ssh and ends at the whoami prompt', () => {
    const lines = introLines(now, null);
    expect(lines[0]).toEqual({ kind: 'command', text: 'ssh guest@emresandikci.com' });
    expect(lines.some((line) => line.text.startsWith('Last login: Sun Oct 25'))).toBe(true);
    expect(lines.at(-1)).toEqual({ kind: 'command', text: 'whoami' });
  });

  it('greets the visitor by IP with a joke', () => {
    const lines = introLines(now, '85.105.1.2').map((line) => line.text);
    expect(lines.find((text) => text.startsWith('Last login'))).toMatch(/from 85\.105\.1\.2$/);
    expect(lines).toContain('Hello, 85.105.1.2. Relax, I only use it to say hi.');
  });

  it('falls back when the IP is unknown', () => {
    const lines = introLines(now, null).map((line) => line.text);
    expect(lines.find((text) => text.startsWith('Last login'))).toMatch(
      /from somewhere on the internet$/
    );
  });
});
