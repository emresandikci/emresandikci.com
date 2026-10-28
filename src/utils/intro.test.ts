import { describe, expect, it } from 'vitest';
import { introLines, introScript } from './intro';

function runIntroScript(pathname: string, { seen = false, reducedMotion = false } = {}) {
  const store = new Map(seen ? [['intro', '1']] : []);
  const document = { documentElement: { dataset: {} as Record<string, string> } };
  new Function('window', 'document', 'location', 'sessionStorage', introScript)(
    { matchMedia: () => ({ matches: reducedMotion }) },
    document,
    { pathname },
    { getItem: (key: string) => store.get(key) ?? null, setItem: store.set.bind(store) }
  );
  return document.documentElement.dataset.intro;
}

describe('introScript', () => {
  it('plays on the first page of a session', () => {
    expect(runIntroScript('/')).toBe('1');
    expect(runIntroScript('/blog')).toBe('1');
  });

  it('skips once played in this session', () => {
    expect(runIntroScript('/', { seen: true })).toBeUndefined();
  });

  it('skips blog posts and reduced motion', () => {
    expect(runIntroScript('/blog/evde-mini-datacenter-kurmak')).toBeUndefined();
    expect(runIntroScript('/', { reducedMotion: true })).toBeUndefined();
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
