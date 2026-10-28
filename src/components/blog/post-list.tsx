import { Link } from '@tanstack/react-router';
import type { PostMeta } from '~/utils/blog/post';

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return <p className="text-muted">No posts yet.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-line py-5">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            hrefLang={post.lang}
            className="group block"
          >
            <h3
              lang={post.lang}
              className="text-lg font-semibold text-heading transition group-hover:text-accent"
            >
              {post.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              <span className="mr-2 rounded-full border border-line px-1.5 py-px uppercase">
                {post.lang}
              </span>
              {post.date} · {post.readingMinutes} min read
            </p>
            <p lang={post.lang} className="mt-2 text-muted">
              {post.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
