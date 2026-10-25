import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parsePost } from './post';

const posts = readdirSync('content/blog')
  .filter((file) => file.endsWith('.md'))
  .map((file) => parsePost(file, readFileSync(`content/blog/${file}`, 'utf8')));

describe('blog content', () => {
  it('has the four migrated Medium posts', () => {
    expect(posts).toHaveLength(4);
    posts.forEach(({ meta }) =>
      expect(meta.canonical).toMatch(/^https:\/\/([a-z0-9-]+\.)?medium\.com\//)
    );
  });

  it('marks the Turkish posts', () => {
    const tr = posts.filter(({ meta }) => meta.lang === 'tr').map(({ meta }) => meta.slug);
    expect(tr.sort()).toEqual([
      'freelance-calismak',
      'jquery-gunumuzde-ne-kadar-gerekli',
      'y-ve-z-kusaginda-bilisim-ve-teknoloji',
    ]);
  });

  it('only references images that exist locally', () => {
    posts.forEach(({ body }) => {
      for (const [, src] of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
        expect(src, src).toMatch(/^\/blog\//);
        expect(existsSync(`public${src}`), src).toBe(true);
      }
    });
  });
});
