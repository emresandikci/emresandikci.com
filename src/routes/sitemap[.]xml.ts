import { createFileRoute } from '@tanstack/react-router';
import { loadPostMetas } from '~/utils/blog/posts.server';
import { sitemapXml } from '~/utils/feeds';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(loadPostMetas()), {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        }),
    },
  },
});
