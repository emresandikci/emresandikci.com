import { describe, expect, it } from 'vitest';
import { postAlternates } from './i18n';

describe('postAlternates', () => {
  it('pairs a post with its translation', () => {
    expect(
      postAlternates({
        slug: 'freelance-calismak',
        lang: 'tr',
        translation: 'work-as-a-freelancer',
      })
    ).toEqual({ en: '/blog/work-as-a-freelancer', tr: '/blog/freelance-calismak' });
  });

  it('has no alternates without a translation', () => {
    expect(postAlternates({ slug: 'evde-mini-datacenter-kurmak', lang: 'tr' })).toBeUndefined();
  });
});
