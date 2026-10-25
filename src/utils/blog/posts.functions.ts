import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { renderMarkdown } from './markdown';
import type { Post } from './post';
import { loadPost, loadPostMetas } from './posts.server';

export const getPosts = createServerFn({ method: 'GET' }).handler(() => loadPostMetas());

export const getPost = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<Post> => {
    const post = loadPost(data.slug);
    if (!post) throw notFound();
    return { ...post.meta, html: await renderMarkdown(post.body) };
  });
