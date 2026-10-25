import { describe, expect, it } from 'vitest';
import type { PostMeta } from './blog/post';
import { escapeXml, robotsTxt, rssXml, sitemapXml } from './feeds';

const posts: PostMeta[] = [
  {
    slug: 'y-ve-z',
    title: 'Y ve Z Kuşağında Bilişim & <Teknoloji>',
    date: '2017-06-30',
    description: 'Çocuklar "ve" teknoloji',
    lang: 'tr',
    tags: [],
    readingMinutes: 3,
  },
  {
    slug: 'work-as-a-freelancer',
    title: 'Work as a freelancer',
    date: '2021-02-14',
    description: 'Freelancing',
    lang: 'en',
    tags: [],
    readingMinutes: 4,
  },
];

describe('escapeXml', () => {
  it('escapes the five XML entities', () => {
    expect(escapeXml(`a & <b> "c" 'd'`)).toBe('a &amp; &lt;b&gt; &quot;c&quot; &apos;d&apos;');
  });
});

describe('sitemapXml', () => {
  it('lists the static pages and every post with its date', () => {
    const xml = sitemapXml(posts);
    for (const path of ['/', '/cv', '/blog', '/blog/y-ve-z', '/blog/work-as-a-freelancer']) {
      expect(xml).toContain(`<loc>https://www.emresandikci.com${path}</loc>`);
    }
    expect(xml).toContain('<lastmod>2017-06-30</lastmod>');
  });
});

describe('rssXml', () => {
  it('has one escaped item per post, newest first', () => {
    const xml = rssXml(posts);
    const titles = [...xml.matchAll(/<item>\s*<title>(.*?)<\/title>/g)].map((m) => m[1]);
    expect(titles).toEqual([
      'Work as a freelancer',
      'Y ve Z Kuşağında Bilişim &amp; &lt;Teknoloji&gt;',
    ]);
    expect(xml).toContain('<link>https://www.emresandikci.com/blog/y-ve-z</link>');
    expect(xml).toContain('<pubDate>Sun, 14 Feb 2021 00:00:00 GMT</pubDate>');
    expect(xml).toContain('Çocuklar &quot;ve&quot; teknoloji');
  });
});

describe('robotsTxt', () => {
  it('points to the sitemap', () => {
    expect(robotsTxt()).toContain('Sitemap: https://www.emresandikci.com/sitemap.xml');
  });
});
