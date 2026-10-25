import { createFileRoute } from '@tanstack/react-router';
import { LuRss } from 'react-icons/lu';
import { PostList } from '~/components/blog/post-list';
import { SectionLabel } from '~/components/layout/section-label';
import { getPosts } from '~/utils/blog/posts.functions';
import { pageHead } from '~/utils/seo';
import { RSS_PATH } from '~/utils/site';

export const Route = createFileRoute('/blog/')({
  loader: () => getPosts(),
  head: () =>
    pageHead({
      title: 'Blog',
      description: 'Notes on software engineering, architecture, DevOps and freelancing.',
      path: '/blog',
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <div className="pt-8">
      <SectionLabel>blog</SectionLabel>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-heading">Writing</h1>
        <a
          href={RSS_PATH}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition hover:text-accent"
        >
          <LuRss className="size-4" />
          rss
        </a>
      </div>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
