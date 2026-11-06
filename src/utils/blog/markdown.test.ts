import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('highlights code for both themes', async () => {
    const html = await renderMarkdown('```ts\nconst a: number = 1;\n```');
    expect(html).toContain('class="shiki');
    expect(html).toContain('--shiki-dark');
  });

  it('names the focusable code block', async () => {
    const html = await renderMarkdown('```ts\nconst a = 1;\n```');
    expect(html).toMatch(/<pre[^>]*role="group"/);
    expect(html).toMatch(/<pre[^>]*aria-label="Code sample"/);
    expect(html).toMatch(/<pre[^>]*tabindex="0"/);
  });

  it('replaces low contrast theme colors', async () => {
    const html = (
      await renderMarkdown('```js\n// note\nfunction f(data) {\n  return data;\n}\n```')
    ).toLowerCase();
    expect(html).toContain('--shiki-light:#bc4c00');
    expect(html).not.toContain('#e36209');
    expect(html).toContain('--shiki-dark:#959da5');
    expect(html).not.toContain('--shiki-dark:#6a737d');
    expect(html).toContain('--shiki-light:#6a737d');
  });

  it('falls back to plain text for unknown languages', async () => {
    expect(await renderMarkdown('```foobar\nx\n```')).toContain('class="shiki');
  });

  it('escapes raw html', async () => {
    const html = await renderMarkdown('<script>alert(1)</script>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('opens external links in a new tab', async () => {
    expect(await renderMarkdown('[site](https://example.com)')).toContain(
      '<a href="https://example.com" target="_blank" rel="noreferrer">site</a>'
    );
  });

  it('keeps internal links in the same tab', async () => {
    expect(await renderMarkdown('[cv](/cv)')).toContain('<a href="/cv">cv</a>');
  });
});
