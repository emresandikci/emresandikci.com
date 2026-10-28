import { describe, expect, it } from 'vitest';
import { pageHead, personJsonLd } from './seo';

const canonicalOf = (head: ReturnType<typeof pageHead>) =>
  head.links.find((link) => link.rel === 'canonical')?.href;

describe('pageHead', () => {
  it('suffixes the title and builds the canonical from the path', () => {
    const head = pageHead({ title: 'CV', description: 'd', path: '/cv' });
    expect(head.meta).toContainEqual({ title: 'CV | Emre Sandıkçı' });
    expect(canonicalOf(head)).toBe('https://www.emresandikci.com/cv');
  });

  it('uses the default title when none is given', () => {
    const head = pageHead({ description: 'd', path: '/' });
    expect(head.meta).toContainEqual({ title: 'Emre Sandıkçı · Senior Software Engineer' });
  });

  it('links a translated post with a self canonical and an English x-default', () => {
    const head = pageHead({
      description: 'd',
      path: '/blog/tr-post',
      lang: 'tr',
      alternates: { en: '/blog/en-post', tr: '/blog/tr-post' },
    });
    expect(canonicalOf(head)).toBe('https://www.emresandikci.com/blog/tr-post');
    expect(head.links.filter((link) => link.rel === 'alternate')).toEqual([
      { rel: 'alternate', hrefLang: 'en', href: 'https://www.emresandikci.com/blog/en-post' },
      { rel: 'alternate', hrefLang: 'tr', href: 'https://www.emresandikci.com/blog/tr-post' },
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: 'https://www.emresandikci.com/blog/en-post',
      },
    ]);
    expect(head.meta).toContainEqual({ property: 'og:locale', content: 'tr_TR' });
    expect(head.meta).toContainEqual({ property: 'og:locale:alternate', content: 'en_US' });
  });

  it('adds no hreflang without a translation', () => {
    const head = pageHead({ description: 'd', path: '/blog/x', lang: 'tr' });
    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://www.emresandikci.com/blog/x' },
    ]);
    expect(head.meta).not.toContainEqual(
      expect.objectContaining({ property: 'og:locale:alternate' })
    );
  });
});

describe('personJsonLd', () => {
  it('describes Emre as a Person with his profiles', () => {
    const data = JSON.parse(personJsonLd());
    expect(data['@type']).toBe('Person');
    expect(data.email).toBe('mailto:me@emresandikci.com');
    expect(data.sameAs).toEqual(
      expect.arrayContaining([
        'https://linkedin.com/in/emresandikci',
        'https://github.com/emresandikci',
      ])
    );
  });
});
