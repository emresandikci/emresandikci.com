import { Link } from '@tanstack/react-router';
import { CvMenu } from '~/components/cv/cv-menu';
import { NAME } from '~/utils/site';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

const navLink = 'transition hover:text-accent';
const activeLink = { className: 'text-accent underline decoration-accent underline-offset-8' };

export function Header() {
  return (
    <header className="sticky top-4 z-20 mx-auto mt-4 w-fit px-4">
      <nav className="flex items-center gap-4 rounded-full border border-line bg-bg/80 py-1.5 pr-1.5 pl-4 font-mono text-sm text-muted shadow-sm backdrop-blur sm:gap-6">
        <Link to="/" aria-label={NAME} className="text-heading transition hover:text-accent">
          <Logo className="size-6" />
        </Link>
        <Link to="/cv" className={navLink} activeProps={activeLink}>
          work
        </Link>
        <Link to="/blog" className={navLink} activeProps={activeLink}>
          blog
        </Link>
        <CvMenu triggerClassName={navLink} align="right">
          cv
        </CvMenu>
        <ThemeToggle />
      </nav>
    </header>
  );
}
