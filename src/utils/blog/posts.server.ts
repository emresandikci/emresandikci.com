import { parsePost, sortPosts } from './post';

const files = import.meta.glob<string>('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const posts = Object.entries(files).map(([path, raw]) => parsePost(path.split('/').pop()!, raw));
const metas = sortPosts(posts.map(({ meta }) => meta));

export function loadPostMetas() {
  return metas;
}

export function loadPost(slug: string) {
  return posts.find(({ meta }) => meta.slug === slug);
}
