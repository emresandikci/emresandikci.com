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

  it('prefers an explicit canonical', () => {
    const head = pageHead({
      description: 'd',
      path: '/blog/x',
      canonical: 'https://medium.com/x',
    });
    expect(canonicalOf(head)).toBe('https://medium.com/x');
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
