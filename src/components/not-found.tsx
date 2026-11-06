import { Link } from '@tanstack/react-router';
import notFoundImage from '~/images/notFound.svg';
import { NAME } from '~/utils/site';

export function NotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <title>{`Page not found | ${NAME}`}</title>
      <img src={notFoundImage} alt="" className="w-full max-w-md" />
      <h1 className="mt-8 text-2xl font-semibold text-heading">Page not found</h1>
      <Link to="/" className="mt-4 font-mono text-sm text-accent hover:underline">
        {'< back home />'}
      </Link>
    </div>
  );
}
