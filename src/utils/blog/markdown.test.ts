import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('highlights code for both themes', async () => {
    const html = await renderMarkdown('```ts\nconst a: number = 1;\n```');
    expect(html).toContain('class="shiki');
    expect(html).toContain('--shiki-dark');
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
