import { sortPosts, type PostMeta } from './blog/post';
import { NAME, SITE_URL } from './site';

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char]);
}

export function sitemapXml(posts: PostMeta[]) {
  const urls: { path: string; lastmod?: string }[] = [
    { path: '/' },
    { path: '/cv' },
    { path: '/blog' },
    ...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.date })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${SITE_URL}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;
}

export function rssXml(posts: PostMeta[]) {
  const items = sortPosts(posts).map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on software engineering, architecture, DevOps and freelancing.</description>
${items.join('\n')}
  </channel>
</rss>
`;
}

export function robotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
