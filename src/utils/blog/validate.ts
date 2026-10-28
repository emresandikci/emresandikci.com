import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { parsePost, type PostMeta } from './post';

export function validateTranslations(metas: PostMeta[]) {
  for (const meta of metas) {
    if (!meta.translation) continue;
    const other = metas.find((item) => item.slug === meta.translation);
    if (!other || other.lang === meta.lang || other.translation !== meta.slug) {
      throw new Error(
        `Invalid blog post ${meta.slug}.md: translation must name a post in the other language that links back`
      );
    }
  }
}

export function validatePosts(dir: string) {
  const metas = readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((file) => parsePost(file, readFileSync(join(dir, file), 'utf8')).meta);
  validateTranslations(metas);
}

export function validatePostsPlugin(dir: string): Plugin {
  return {
    name: 'validate-blog-posts',
    buildStart() {
      validatePosts(dir);
    },
  };
}
