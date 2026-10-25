# emresandikci.com

Personal site, CV and blog. Built with TanStack Start (SSR), React 19, Tailwind CSS 4 and Vite 8.

## Run locally

```bash
pnpm install
pnpm dev
```

The dev server runs on http://localhost:3000. `pnpm build && pnpm start` runs the production server (`server.mjs`).

Checks: `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm format:check`.

## Content

- CV: `src/content/cv.ts` feeds both `/cv` and the home page cards. Company images live in `public/work/`. The downloadable PDFs are `public/emre-sandikci-resume-en.pdf` and `public/emre-sandikci-resume-tr.pdf`.
- Blog: add a Markdown file to `content/blog/`. The file name is the slug. Front matter:

  ```yaml
  ---
  title: 'Post title'
  date: 2026-10-25
  description: 'One or two sentences for lists, SEO and RSS.'
  lang: en # or tr
  tags: [architecture, devops]
  canonical: https://example.com/original # optional
  ---
  ```

  Images go to `public/blog/<slug>/` and are referenced as `/blog/<slug>/<file>`. A post with a missing or invalid field fails the build with the file name in the error.

## Release and deploy

Pushing to `master` runs `.github/workflows/release.yml`: semantic-release cuts a version from Conventional Commits, the Docker image is pushed to `ghcr.io/emresandikci/emresandikci.com` and Coolify is told to redeploy. The container serves the site on port 80 (`node server.mjs`).

## Release notifications

Every release and every failed run of `.github/workflows/release.yml` sends a Telegram message. Add these repository secrets:

- `TELEGRAM_BOT_TOKEN`: token of a bot created with @BotFather.
- `TELEGRAM_CHAT_ID`: your chat id (send the bot a message, then read `chat.id` from `https://api.telegram.org/bot<TOKEN>/getUpdates`).

The step is skipped with a warning when they are not set.
