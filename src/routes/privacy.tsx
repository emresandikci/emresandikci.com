import type { ReactNode } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { CONSENT_KEY } from '~/utils/analytics';
import { pageHead } from '~/utils/seo';
import { EMAIL, NAME } from '~/utils/site';

const LAST_UPDATED = 'November 19, 2026';

export const Route = createFileRoute('/privacy')({
  head: () =>
    pageHead({
      title: 'Privacy & Cookie Policy',
      description:
        'What this site stores, what it sends to Google Analytics and how to change it.',
      path: '/privacy',
    }),
  component: PrivacyPage,
});

const link = 'text-accent underline underline-offset-4';
const code = 'font-mono text-sm text-fg';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-heading">{title}</h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  const mail = (
    <a href={`mailto:${EMAIL}`} className={link}>
      {EMAIL}
    </a>
  );

  return (
    <article className="max-w-2xl pt-8">
      <h1 className="text-4xl font-bold tracking-tight text-heading">Privacy & Cookie Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

      <Section title="Who I am">
        <p>
          This is the personal website of {NAME}. If you have a question about this policy or your
          data, email me at {mail}.
        </p>
      </Section>

      <Section title="What I collect">
        <p>
          The site has no account, sign-up or contact form. I only receive personal data when you
          email me, and I use it to answer you.
        </p>
        <p>
          The site is served through Cloudflare, which processes technical data such as your IP
          address and browser details to deliver pages and protect the site from abuse. The footer
          shows your IP address back to you; the site reads it for that request and does not store
          it.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          If you accept, I use Google Analytics to count visits and see which pages are read. It
          sets cookies and sends data about your visit (pages viewed, device and browser details,
          approximate location) to Google. Google signals and ad personalization are turned off,
          and the data is not used for advertising.
        </p>
        <p>
          Google Analytics does not load until you click accept. If you decline, or make no
          choice, nothing is sent to Google.
        </p>
      </Section>

      <Section title="Cookies and browser storage">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className={code}>{CONSENT_KEY}</span> (local storage): remembers your analytics
            choice.
          </li>
          <li>
            <span className={code}>theme</span> (local storage): remembers light or dark mode.
          </li>
          <li>
            <span className={code}>intro</span> (session storage): skips the intro animation for
            the rest of your visit.
          </li>
          <li>
            <span className={code}>_ga, _ga_*</span> (cookies, only after you accept): set by
            Google Analytics to tell visits apart.
          </li>
          <li>Cloudflare may set strictly necessary security cookies to protect the site.</li>
        </ul>
      </Section>

      <Section title="Changing your choice">
        <p>
          To change your analytics choice, clear this site&apos;s data in your browser settings.
          The banner will appear again on your next visit.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask what personal data I hold about you, and ask me to correct or delete it, by
          emailing {mail}.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If the way this site handles data changes, I will update this page and the date at the
          top.
        </p>
      </Section>
    </article>
  );
}
