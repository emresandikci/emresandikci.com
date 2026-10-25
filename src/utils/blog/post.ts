import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  lang: 'en' | 'tr';
  tags: string[];
  canonical?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

const LANGS = ['en', 'tr'] as const;

export function readingMinutes(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function sortPosts<T extends { date: string }>(posts: T[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function toDate(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

export function parsePost(fileName: string, raw: string) {
  const { data, content } = matter(raw);
  const fail = (reason: string) => new Error(`Invalid blog post ${fileName}: ${reason}`);

  for (const field of ['title', 'description'] as const) {
    if (typeof data[field] !== 'string' || !data[field].trim()) throw fail(`missing ${field}`);
  }
  const date = toDate(data.date);
  if (!date) throw fail('missing or invalid date (YYYY-MM-DD)');
  if (!LANGS.includes(data.lang)) throw fail(`lang must be one of ${LANGS.join(', ')}`);

  const meta: PostMeta = {
    slug: fileName.replace(/\.md$/, ''),
    title: data.title,
    date,
    description: data.description,
    lang: data.lang,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
    ...(typeof data.canonical === 'string' && { canonical: data.canonical }),
  };

  return { meta, body: content };
}
