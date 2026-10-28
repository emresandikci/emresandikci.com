import { LANGS, type Lang } from './i18n';
import { EMAIL, GA_ID, GITHUB_URL, LINKEDIN_URL, NAME, RSS_PATH, SITE_URL, TITLE } from './site';

type PageHeadOptions = {
  title?: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  lang?: Lang;
  alternates?: Record<Lang, string>;
};

const OG_LOCALES: Record<Lang, string> = { en: 'en_US', tr: 'tr_TR' };

export function pageHead({
  title,
  description,
  path,
  type = 'website',
  lang = 'en',
  alternates,
}: PageHeadOptions) {
  const fullTitle = title ? `${title} | ${NAME}` : `${NAME} · ${TITLE}`;
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/android-chrome-512x512.png`;

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: OG_LOCALES[lang] },
      ...(alternates
        ? LANGS.filter((other) => other !== lang).map((other) => ({
            property: 'og:locale:alternate',
            content: OG_LOCALES[other],
          }))
        : []),
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...(alternates
        ? [
            ...LANGS.map((hrefLang) => ({
              rel: 'alternate',
              hrefLang,
              href: `${SITE_URL}${alternates[hrefLang]}`,
            })),
            { rel: 'alternate', hrefLang: 'x-default', href: `${SITE_URL}${alternates.en}` },
          ]
        : []),
    ],
  };
}

export function rootHead(stylesheet: string) {
  return {
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1,initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#da532c' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `${NAME} blog`,
        href: RSS_PATH,
      },
    ],
    scripts: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
      },
      { type: 'application/ld+json', children: personJsonLd() },
    ],
  };
}

export function personJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: NAME,
    jobTitle: TITLE,
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  });
}
