export const LANGS = ['en', 'tr'] as const;
export type Lang = (typeof LANGS)[number];

export function postAlternates(post: { slug: string; lang: Lang; translation?: string }) {
  if (!post.translation) return undefined;
  const self = `/blog/${post.slug}`;
  const other = `/blog/${post.translation}`;
  return post.lang === 'en' ? { en: self, tr: other } : { en: other, tr: self };
}
