import vm from 'node:vm';
import { describe, expect, it } from 'vitest';
import { CONSENT_EVENT, analyticsScript } from './analytics';

function run(stored: string | null) {
  const listeners: Record<string, () => void> = {};
  const loaded: string[] = [];
  const sandbox: Record<string, unknown> = {
    addEventListener: (name: string, fn: () => void) => (listeners[name] = fn),
    localStorage: { getItem: () => stored },
    document: {
      createElement: () => ({}),
      head: { appendChild: (script: { src: string }) => loaded.push(script.src) },
    },
  };
  sandbox.window = sandbox;
  const context = vm.createContext(sandbox);
  vm.runInContext(analyticsScript, context);
  return { loaded, accept: () => listeners[CONSENT_EVENT]?.() };
}

describe('analyticsScript', () => {
  it('loads nothing before consent', () => {
    expect(run(null).loaded).toEqual([]);
    expect(run('declined').loaded).toEqual([]);
  });

  it('loads Google Analytics once consent is stored or given', () => {
    expect(run('accepted').loaded).toHaveLength(1);
    const visit = run(null);
    visit.accept();
    visit.accept();
    expect(visit.loaded).toHaveLength(1);
    expect(visit.loaded[0]).toContain('googletagmanager.com/gtag/js');
  });

  it('turns off Google signals and ad personalization', () => {
    expect(analyticsScript).toContain('"allow_google_signals":false');
    expect(analyticsScript).toContain('"allow_ad_personalization_signals":false');
  });
});
