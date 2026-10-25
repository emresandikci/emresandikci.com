import { createFileRoute } from '@tanstack/react-router';
import { loadPostMetas } from '~/utils/blog/posts.server';
import { rssXml } from '~/utils/feeds';

export const Route = createFileRoute('/blog/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(rssXml(loadPostMetas()), {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
        }),
    },
  },
});
