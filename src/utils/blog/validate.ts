import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { parsePost } from './post';

export function validatePosts(dir: string) {
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    parsePost(file, readFileSync(join(dir, file), 'utf8'));
  }
}

export function validatePostsPlugin(dir: string): Plugin {
  return {
    name: 'validate-blog-posts',
    buildStart() {
      validatePosts(dir);
    },
  };
}
