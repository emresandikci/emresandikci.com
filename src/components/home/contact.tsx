import { GITHUB_URL, LINKEDIN_URL, MAILTO } from '~/utils/site';

const link = 'transition hover:text-accent';

export function Contact() {
  return (
    <div>
      <p className="text-lg">Have a project, a role or a question? I’d love to hear about it.</p>
      <a
        href={MAILTO}
        className="mt-4 inline-block font-mono text-xl text-heading underline decoration-accent underline-offset-4 hover:text-accent"
      >
        Tell me about it →
      </a>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 font-mono text-sm text-muted">
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={link}>
          linkedin
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={link}>
          github
        </a>
      </div>
    </div>
  );
}
