import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parsePost } from './post';

const posts = readdirSync('content/blog')
  .filter((file) => file.endsWith('.md'))
  .map((file) => parsePost(file, readFileSync(`content/blog/${file}`, 'utf8')));

describe('blog content', () => {
  it('links the four migrated Medium posts', () => {
    const migrated = posts.filter(({ meta }) => meta.medium);
    expect(migrated).toHaveLength(4);
    migrated.forEach(({ meta }) =>
      expect(meta.medium).toMatch(/^https:\/\/([a-z0-9-]+\.)?medium\.com\//)
    );
  });

  it('pairs the freelance posts as translations', () => {
    const translation = (slug: string) =>
      posts.find(({ meta }) => meta.slug === slug)?.meta.translation;
    expect(translation('freelance-calismak')).toBe('work-as-a-freelancer');
    expect(translation('work-as-a-freelancer')).toBe('freelance-calismak');
    expect(translation('evde-mini-datacenter-kurmak')).toBe('building-a-mini-datacenter-at-home');
    expect(translation('building-a-mini-datacenter-at-home')).toBe('evde-mini-datacenter-kurmak');
  });

  it('marks the Turkish posts', () => {
    const tr = posts.filter(({ meta }) => meta.lang === 'tr').map(({ meta }) => meta.slug);
    expect(tr.sort()).toEqual([
      'evde-mini-datacenter-kurmak',
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
