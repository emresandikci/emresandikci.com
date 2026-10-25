import { useEffect, type ReactNode } from 'react';
import {
  HeadContent,
  ScriptOnce,
  Scripts,
  createRootRoute,
  useMatches,
} from '@tanstack/react-router';
import { version } from '../../package.json';
import { Footer } from '~/components/layout/footer';
import { Header } from '~/components/layout/header';
import { NotFound } from '~/components/not-found';
import { rootHead } from '~/utils/seo';
import { themeScript } from '~/utils/theme';
import appCss from '~/styles.css?url';

export const Route = createRootRoute({
  head: () => rootHead(appCss),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function usePageLang() {
  const matches = useMatches();
  const post = matches.find((match) => match.routeId === '/blog/$slug');
  return (post?.loaderData as { lang?: string } | undefined)?.lang ?? 'en';
}

function RootDocument({ children }: { children: ReactNode }) {
  const lang = usePageLang();

  useEffect(() => {
    console.log(`emresandikci.com v${version}`);
  }, []);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ScriptOnce>{themeScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main className="mx-auto max-w-3xl px-4 sm:px-6">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
