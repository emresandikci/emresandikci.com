import { GITHUB_URL, LINKEDIN_URL, MAILTO, NAME, RSS_PATH } from '~/utils/site';
import { CvMenu } from '~/components/cv/cv-menu';

const link = 'transition hover:text-accent';

export function Footer() {
  return (
    <footer className="mx-auto mt-32 max-w-3xl border-t border-line px-4 py-8 font-mono text-sm text-muted sm:px-6">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href={MAILTO} className={link}>
          contact me
        </a>
        <a href={LINKEDIN_URL} className={link} target="_blank" rel="noreferrer">
          linkedin
        </a>
        <a href={GITHUB_URL} className={link} target="_blank" rel="noreferrer">
          github
        </a>
        <CvMenu triggerClassName={link} placement="up">
          cv.pdf
        </CvMenu>
        <a href={RSS_PATH} className={link}>
          rss
        </a>
      </div>
      <p className="mt-4 flex flex-wrap justify-between gap-2 text-xs">
        <span>
          © {new Date().getFullYear()} {NAME}
        </span>
        <span>Istanbul · UTC+3</span>
      </p>
    </footer>
  );
}
