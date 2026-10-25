import { Link } from '@tanstack/react-router';
import { MAILTO, NAME, ROLES } from '~/utils/site';
import { useTypewriter } from './typewriter';

export function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section className="pt-16 pb-8 sm:pt-28">
      <p className="font-mono text-sm text-muted">
        <span className="text-accent">~ $</span> whoami
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        {NAME}
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-3 min-h-[1.75em] font-mono text-lg text-accent" aria-live="off">
        {'> '}
        {role}
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-accent motion-safe:animate-blink"
        />
      </p>
      <p className="mt-8 max-w-2xl text-2xl leading-snug font-normal text-heading sm:text-3xl">
        I turn slow, fragile systems into{' '}
        <em className="text-accent not-italic">simple, automated ones</em>, across code,
        infrastructure and teams.
      </p>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm text-muted">
        <dt className="text-accent">work →</dt>
        <dd>
          Staff Engineer & Team Lead at{' '}
          <a
            href="https://www.walnutlab.com.tr"
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-line underline-offset-4 hover:text-accent"
          >
            Walnut Lab
          </a>
        </dd>
        <dt className="text-accent">side →</dt>
        <dd>
          Building{' '}
          <a
            href="https://keysty.com"
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-line underline-offset-4 hover:text-accent"
          >
            Keysty
          </a>
          , a platform for real estate agencies
        </dd>
      </dl>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={MAILTO}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
        >
          Get in touch
        </a>
        <Link
          to="/blog"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-heading transition hover:border-accent hover:text-accent"
        >
          Read the blog
        </Link>
      </div>
    </section>
  );
}
