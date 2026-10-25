import { createFileRoute } from '@tanstack/react-router';
import { CvSection } from '~/components/cv/cv-section';
import { DownloadButtons } from '~/components/cv/download-buttons';
import { RoleCard } from '~/components/cv/role-card';
import { cv } from '~/content/cv';
import { pageHead } from '~/utils/seo';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, MAILTO, NAME, TITLE } from '~/utils/site';

export const Route = createFileRoute('/cv')({
  head: () =>
    pageHead({
      title: 'CV',
      description: `${NAME}, ${TITLE}. ${cv.about}`,
      path: '/cv',
    }),
  component: CvPage,
});

const link = 'transition hover:text-accent';

function CvPage() {
  return (
    <div className="pt-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-heading">{NAME}</h1>
        <p className="mt-2 font-mono text-accent">{TITLE}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted">
          <a href={MAILTO} className={link}>
            {EMAIL}
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={link}>
            linkedin
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={link}>
            github
          </a>
        </div>
        <div className="mt-6">
          <DownloadButtons />
        </div>
      </header>

      <CvSection index={1} label="summary">
        <p className="leading-relaxed">{cv.summary}</p>
      </CvSection>

      <CvSection index={2} label="experience">
        <ol className="ml-1 border-l border-line">
          {cv.roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </ol>
      </CvSection>

      <CvSection index={3} label="volunteering & freelance">
        <div className="space-y-10">
          {cv.volunteering.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="scroll-mt-24 border-t border-line pt-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold text-heading">
                  {entry.site ? (
                    <a href={entry.site} target="_blank" rel="noreferrer" className={link}>
                      {entry.org}
                    </a>
                  ) : (
                    entry.org
                  )}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {entry.period}
                  {entry.location && ` · ${entry.location}`}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{entry.title}</p>
              {entry.image && (
                <img
                  src={entry.image}
                  alt={`${entry.org} website`}
                  loading="lazy"
                  className="mt-4 aspect-[16/9] w-full rounded-lg border border-line object-cover object-top"
                />
              )}
              <p className="mt-3">{entry.text}</p>
            </article>
          ))}
        </div>
      </CvSection>

      <CvSection index={4} label="open source">
        <ul className="space-y-3">
          {cv.openSource.map((lib) => (
            <li key={lib.name}>
              <a
                href={lib.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-medium text-heading underline decoration-line underline-offset-4 hover:text-accent"
              >
                {lib.name}
              </a>
              <span className="text-muted">: {lib.text}</span>{' '}
              <a
                href={lib.npm}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-accent hover:underline"
              >
                npm ↗
              </a>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection index={5} label="talks">
        <ul className="space-y-3">
          {cv.talks.map((talk) => (
            <li key={talk.event}>
              <span className="font-medium text-heading">{talk.event}</span>
              <span className="text-muted">: {talk.text}</span>
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection index={6} label="skills">
        <p className="leading-relaxed">{cv.skills.join(' · ')}</p>
        <p className="mt-4 text-muted">{cv.softSkills.join(' · ')}</p>
      </CvSection>

      <CvSection index={7} label="education">
        <ul className="space-y-2">
          {cv.education.map((item) => (
            <li key={item.title} className="flex flex-wrap justify-between gap-x-4">
              <span>{item.title}</span>
              <span className="font-mono text-xs text-muted">{item.period}</span>
            </li>
          ))}
        </ul>
      </CvSection>
    </div>
  );
}
