import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { FEATURED_ROLE_IDS, cv, featuredItems } from './cv';

const ids = [...cv.roles.map((role) => role.id), ...cv.volunteering.map((entry) => entry.id)];

describe('cv', () => {
  it('has unique kebab-case ids across roles and volunteering', () => {
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('lists all 9 roles sorted by start date, newest first', () => {
    expect(cv.roles.map((role) => role.id)).toEqual([
      'walnut-lab',
      'cinar-tech',
      'brandbastion',
      'norma',
      'finedine',
      'talent-mondo',
      'evdeki-bakicim',
      'kanal-education',
      'muhsis',
    ]);
    expect(cv.volunteering.map((entry) => entry.id)).not.toContain('kanal-education');
  });

  it('links every open source project to GitHub and npm', () => {
    expect(cv.openSource.map(({ github, npm }) => [github, npm])).toEqual([
      [
        'https://github.com/emresandikci/pocketbase-query',
        'https://www.npmjs.com/package/@emresandikci/pocketbase-query',
      ],
      [
        'https://github.com/emresandikci/axios-affected-checker',
        'https://www.npmjs.com/package/@emstack/axios-affected-checker',
      ],
      ['https://github.com/emresandikci/request', 'https://www.npmjs.com/package/@emstack/request'],
    ]);
  });

  it('features Keysty first, then the four agreed CV entries', () => {
    expect(FEATURED_ROLE_IDS).toEqual(['keysty', 'walnut-lab', 'finedine', 'norma', 'kanal-education']);
    const items = featuredItems();
    expect(items.map((item) => item.id)).toEqual(FEATURED_ROLE_IDS);
    expect(items[0]).toMatchObject({ name: 'Keysty', href: 'https://keysty.com' });
    expect(existsSync(`public${items[0].image}`)).toBe(true);
    items.slice(1).forEach((item) => expect(item.href).toBe(`/cv#${item.id}`));
  });

  it('gives each featured item a facts strip of period and top stack', () => {
    const [keysty, walnut, , , kanal] = featuredItems();
    expect(keysty.facts).toEqual(['Ongoing']);
    expect(walnut.facts).toEqual(['04/2025 – Present', 'JavaScript', 'TypeScript', 'React.js']);
    expect(kanal.facts).toEqual(['03/2018 – 10/2022', 'NJ, USA']);
    expect(kanal.href).toBe('/cv#kanal-education');
  });

  it('contains no phone number', () => {
    expect(JSON.stringify(cv)).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
  });

  it('uses https for every site', () => {
    [...cv.roles, ...cv.volunteering]
      .filter((item) => item.site)
      .forEach((item) => expect(item.site).toMatch(/^https:\/\//));
  });
});
