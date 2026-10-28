import { Link, createFileRoute } from '@tanstack/react-router';
import { getPost } from '~/utils/blog/posts.functions';
import { postAlternates } from '~/utils/i18n';
import { pageHead } from '~/utils/seo';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getPost({ data: { slug: params.slug } }),
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: loaderData.title,
          description: loaderData.description,
          path: `/blog/${loaderData.slug}`,
          type: 'article',
          lang: loaderData.lang,
          alternates: postAlternates(loaderData),
        })
      : {},
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <article lang={post.lang} className="pt-8">
      <Link to="/blog" className="font-mono text-sm text-muted hover:text-accent">
        {'< blog'}
      </Link>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-heading">{post.title}</h1>
      <p className="mt-3 font-mono text-xs text-muted">
        {post.date} · {post.readingMinutes} min read
        {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
      </p>
      {post.medium && (
        <p className="mt-2 text-sm text-muted">
          Originally published on{' '}
          <a href={post.medium} target="_blank" rel="noreferrer" className="text-accent">
            Medium
          </a>
          .
        </p>
      )}
      <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
