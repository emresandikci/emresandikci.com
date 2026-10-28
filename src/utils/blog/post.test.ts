import { describe, expect, it } from 'vitest';
import { parsePost, readingMinutes, sortPosts } from './post';

const raw = (front: string, body = 'Hello world') => `---\n${front}\n---\n${body}\n`;
const valid = [
  'title: Work as a freelancer',
  'date: 2021-02-14',
  'description: Notes on freelancing',
  'lang: en',
  'tags: [freelance, career]',
].join('\n');

describe('parsePost', () => {
  it('reads front matter and takes the slug from the file name', () => {
    const { meta, body } = parsePost('work-as-a-freelancer.md', raw(valid));
    expect(meta).toMatchObject({
      slug: 'work-as-a-freelancer',
      title: 'Work as a freelancer',
      date: '2021-02-14',
      description: 'Notes on freelancing',
      lang: 'en',
      tags: ['freelance', 'career'],
      readingMinutes: 1,
    });
    expect(body.trim()).toBe('Hello world');
  });

  it('names the file when a required field is missing', () => {
    const front = valid.replace('title: Work as a freelancer\n', '');
    expect(() => parsePost('broken-post.md', raw(front))).toThrow(/broken-post\.md/);
  });

  it('rejects unknown languages', () => {
    expect(() => parsePost('x.md', raw(valid.replace('lang: en', 'lang: de')))).toThrow(/x\.md/);
  });

  it('keeps an optional translation and Medium link', () => {
    const front = `${valid}\ntranslation: freelance-calismak\nmedium: https://medium.com/@e/x`;
    const { meta } = parsePost('x.md', raw(front));
    expect(meta.translation).toBe('freelance-calismak');
    expect(meta.medium).toBe('https://medium.com/@e/x');
  });
});

describe('readingMinutes', () => {
  it('rounds up at 200 words per minute with a minimum of one', () => {
    expect(readingMinutes('word '.repeat(450))).toBe(3);
    expect(readingMinutes('')).toBe(1);
  });
});

describe('sortPosts', () => {
  it('puts the newest post first', () => {
    const sorted = sortPosts([{ date: '2018-11-15' }, { date: '2021-02-14' }]);
    expect(sorted.map((post) => post.date)).toEqual(['2021-02-14', '2018-11-15']);
  });
});
