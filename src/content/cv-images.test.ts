import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cv } from './cv';

const items = [...cv.roles, ...cv.volunteering];

describe('cv images', () => {
  it('has a committed image for every entry with a site', () => {
    items
      .filter((item) => item.site)
      .forEach((item) => {
        expect(item.image, item.id).toMatch(/^\/work\//);
        expect(existsSync(`public${item.image}`), item.image).toBe(true);
      });
  });

  it('has no image for entries without a site', () => {
    items.filter((item) => !item.site).forEach((item) => expect(item.image, item.id).toBeUndefined());
  });
});
