import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { validatePosts } from './validate';

const post = (front: string) => `---\n${front}\n---\nBody\n`;

describe('validatePosts', () => {
  it('throws with the file name when a post is invalid', () => {
    const dir = mkdtempSync(join(tmpdir(), 'posts-'));
    writeFileSync(
      join(dir, 'good.md'),
      post('title: A\ndate: 2026-01-01\ndescription: d\nlang: en')
    );
    writeFileSync(join(dir, 'broken-post.md'), post('title: B\ndate: 2026-01-01\nlang: en'));
    expect(() => validatePosts(dir)).toThrow(/broken-post\.md/);
  });

  it('passes the real content', () => {
    expect(() => validatePosts('content/blog')).not.toThrow();
  });
});
