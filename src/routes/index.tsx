import { Link, createFileRoute } from '@tanstack/react-router';
import { PostList } from '~/components/blog/post-list';
import { Contact } from '~/components/home/contact';
import { Hero } from '~/components/home/hero';
import { SelectedWork } from '~/components/home/selected-work';
import { SectionLabel } from '~/components/layout/section-label';
import { cv } from '~/content/cv';
import { getPosts } from '~/utils/blog/posts.functions';
import { pageHead } from '~/utils/seo';

export const Route = createFileRoute('/')({
  loader: async () => (await getPosts()).slice(0, 3),
  head: () => pageHead({ description: cv.about, path: '/' }),
  component: Home,
});

function Home() {
  const posts = Route.useLoaderData();

  return (
    <>
      <Hero />
      <section className="mt-24">
        <SectionLabel index={1}>about</SectionLabel>
        <p className="mt-4 text-lg leading-relaxed">{cv.about}</p>
      </section>
      <section className="mt-32">
        <SectionLabel index={2}>selected work</SectionLabel>
        <div className="mt-8">
          <SelectedWork />
        </div>
      </section>
      <section className="mt-32">
        <SectionLabel index={3}>latest posts</SectionLabel>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
        <Link
          to="/blog"
          className="mt-6 inline-block font-mono text-sm text-accent hover:underline"
        >
          All posts →
        </Link>
      </section>
      <section className="mt-32">
        <SectionLabel index={4}>contact</SectionLabel>
        <div className="mt-8">
          <Contact />
        </div>
      </section>
    </>
  );
}
