# emresandikci.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-page React 16 site with a TanStack Start SSR site: short home page, full `/cv`, Markdown blog, light/dark theme, deployed by the existing pipeline on port 80.

**Architecture:** One TanStack Start app (file-based routes in `src/routes`, SSR) served in production by a custom `server.mjs` (static files from `dist/client`, everything else to `dist/server/server.js`). CV content is one typed data file; blog posts are `content/blog/*.md` read and rendered on the server through server functions so Markdown tooling never ships to the browser. Sitemap, robots and RSS are server routes.

**Tech Stack:** TanStack Start 1.168.x / Router 1.170.x, React 19, TypeScript 6, Vite 8, Tailwind v4, React Compiler, markdown-it + Shiki, gray-matter, Vitest, ESLint 10 flat config, Prettier 3, pnpm 10, Docker (node:22-alpine).

**Spec:** `docs/superpowers/specs/2026-10-25-site-redesign-design.md`

## Global Constraints

- Never run `git commit` or `git push`. Each task ends by leaving its changes in the working tree and listing the changed files (Emre's rule; it overrides any "Commit" step).
- Versions (copy from `/Users/emresan/projects/me/kanal-education/pnpm-workspace.yaml` catalog): `@tanstack/react-start` 1.168.60, `@tanstack/react-router` 1.170.41, `react`/`react-dom` ^19.3.0, `vite` ^8.3.5, `@vitejs/plugin-react` ^6.1.1, `@rolldown/plugin-babel` ^0.2.4, `babel-plugin-react-compiler` ^1.0.0, `@babel/core` ^7.29.0, `tailwindcss`/`@tailwindcss/vite` ^4.3.3, `typescript` ~6.0.3, `eslint` ^10.11.0, `@eslint/js` ^10.0.1, `typescript-eslint` ^8.71.0, `eslint-plugin-react-hooks` ^7.1.1, `eslint-plugin-react-refresh` ^0.5.7, `globals` ^17.13.0, `prettier` ^3.9.9, `prettier-plugin-tailwindcss` ^0.8.1, `react-icons` ^5.7.0. New: `vitest` ^5.0.5, `markdown-it` ^15.0.3, `@types/markdown-it` ^14.2.0, `@shikijs/markdown-it` ^4.5.0, `shiki` ^4.5.0, `gray-matter` ^4.0.3, `@fontsource-variable/inter` ^5.3.0, `@fontsource-variable/jetbrains-mono` ^5.3.0.
- Keep `packageManager: pnpm@10.30.1`, `engines.node >=20.19.0`, `type: module`, `.npmrc` `engine-strict=true`.
- Site origin: `https://www.emresandikci.com`. Email: `me@emresandikci.com`; mailto subject "Hello from emresandikci.com". LinkedIn `https://linkedin.com/in/emresandikci`, GitHub `https://github.com/emresandikci`.
- No phone number anywhere on the site.
- UI copy is English. Never use em-dashes in copy, code or comments.
- Production port stays 80: Dockerfile `ENV PORT=80`; `server.mjs` reads `PORT` (default 3000 for local `pnpm start`).
- Keep the console line `emresandikci.com v<version>` with the version read from `package.json`.
- Keep Google Analytics `UA-74837009-2`.
- Logo: current `src/images/Logo.svg`, unchanged. Favicons/manifest in `public/` unchanged.
- Accent green: `#42E6A4` (dark), `#0f9d6b` (light). Light background `#fafaf7`, dark background `#0d1117`.
- Rotating roles, in order: Senior Software Engineer, Engineering Team Lead, Software Architect, DevOps & GitOps builder, Design System maker, Open source author, Devoxx4Kids trainer.
- Per-task verification is focused: the task's tests, `pnpm lint`, `pnpm type-check`, and `pnpm build` when routes change. Full verification only in Task 11.

## Review Focus

1. Unknown blog slug (`/blog/does-not-exist`): renders the 404 page with HTTP 404, never a 500. Test in Task 7.
2. Visitor without JavaScript or with `prefers-reduced-motion`: the server HTML already shows the first role and working contact links; reduced motion shows a static role. Test in Task 9.
3. Theme: a stored choice beats the system setting; blocked `localStorage` never throws; the class is set before first paint. Test in Task 2.
4. A post with missing `title`, `date`, `description` or `lang` front matter fails the build with the file name in the error, instead of rendering a broken page. Test in Task 6.
5. RSS and sitemap escape `&`, `<`, `>`, quotes and Turkish characters correctly (post "Y ve Z Kuşağında Bilişim ve Teknoloji"). Test in Task 10.

---

### Task 1: Replace the stack with a TanStack Start skeleton

**Files:**

- Delete: `index.html`, `vite.config.mjs`, `jsconfig.json`, `.eslintrc.json`, `.eslintignore`, `.prettierignore` (recreate below), `src/index.jsx`, `src/pages/**`, `src/components/**`, `src/utils/**`, `src/images/index.js`, `src/images/{github,linkedin,medium,twitter}.svg`, `public/web.config`
- Keep: `src/images/Logo.svg`, `src/images/notFound.svg`, `public/*` favicons/manifest/PDFs, `release.config.cjs`, `.github/`, `docker-compose*.yml`
- Create: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `.prettierrc.json` (replace), `.prettierignore`, `vitest.config.ts`, `server.mjs`, `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles.css`
- Modify: `package.json`, `.gitignore` (add `dist/`, `src/routeTree.gen.ts` stays committed like kanal)

**Interfaces:**

- Produces: `getRouter()` in `src/router.tsx`; root route in `src/routes/__root.tsx` with `shellComponent: RootDocument` rendering `<html lang="en">`, `<HeadContent />`, `<Scripts />`; import alias `~/*` → `src/*`; `src/styles.css` imported with `?url` as `appCss`.

- [ ] **Step 1: Rewrite `package.json`.** Scripts: `dev: vite dev`, `build: vite build`, `preview: vite preview`, `start: node server.mjs`, `lint: eslint src --max-warnings 0`, `lint:fix: eslint src --fix`, `format: prettier --write .`, `format:check: prettier --check .`, `type-check: tsc --noEmit`, `test: vitest run`. Dependencies and devDependencies per Global Constraints; remove esducad-ui, react-helmet, react-router-dom, styled-components, prop-types, old eslint plugins, husky 4 and its `husky` block. `lint-staged`: `"*.{ts,tsx}": ["prettier --write", "eslint --fix"]`. Run `pnpm install`.
- [ ] **Step 2: Config files.** `vite.config.ts` mirrors `kanal-education/apps/web/vite.config.ts` (tailwindcss, tanstackStart, react, babel with `reactCompilerPreset()`, alias `~`), `server.port: 3000`, no `envPrefix`. `tsconfig.json`: strict, `moduleResolution: bundler`, `jsx: react-jsx`, `resolveJsonModule: true`, `types: ["node", "vite/client"]`, `paths: {"~/*": ["./src/*"]}`, include `src`, `vite.config.ts`, `vitest.config.ts`. `eslint.config.js`: copy `kanal-education/packages/configs/eslint.config.js` inline. `.prettierrc.json`: kanal's, with `tailwindStylesheet: "./src/styles.css"`. `vitest.config.ts`: `environment: 'node'`, alias `~`, `include: ['src/**/*.test.ts']`, `passWithNoTests: true`.
- [ ] **Step 3: `server.mjs`.** Copy `/Users/emresan/projects/me/kanal-education/apps/web/server.mjs` unchanged (it already reads `process.env.PORT`).
- [ ] **Step 4: Skeleton routes.** `__root.tsx` and `router.tsx` follow kanal's (no i18n, no drift, no runtime env). `index.tsx` renders `<h1>Emre Sandıkçı</h1>`. `styles.css`: `@import 'tailwindcss';` plus the fontsource imports.
- [ ] **Step 5: Verify.** Run `pnpm lint && pnpm type-check && pnpm test && pnpm build`, then `PORT=3999 node server.mjs` and `curl -s localhost:3999/ | grep -c 'Emre Sandıkçı'`. Expected: all pass, curl prints `1`. Stop the server.

### Task 2: Site constants, SEO helpers, theme, layout

**Files:**

- Create: `src/utils/site.ts`, `src/utils/seo.ts`, `src/utils/seo.test.ts`, `src/utils/theme.ts`, `src/utils/theme.test.ts`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/theme-toggle.tsx`, `src/components/layout/section-label.tsx`
- Modify: `src/routes/__root.tsx`, `src/styles.css`

**Interfaces:**

- Produces:
  - `site.ts`: `SITE_URL`, `EMAIL`, `MAILTO` (`mailto:me@emresandikci.com?subject=Hello%20from%20emresandikci.com`), `LINKEDIN_URL`, `GITHUB_URL`, `CV_PDF_EN = '/emre-sandikci-resume-en.pdf'`, `CV_PDF_TR = '/emre-sandikci-resume-tr.pdf'`, `ROLES: readonly string[]`, `NAME = 'Emre Sandıkçı'`.
  - `seo.ts`: `pageHead(opts: { title?: string; description: string; path: string; canonical?: string; type?: 'website' | 'article'; lang?: string }): { meta: object[]; links: object[] }` (title becomes `"<title> | Emre Sandıkçı"`, or `"Emre Sandıkçı · Senior Software Engineer"` when omitted; canonical defaults to `SITE_URL + path`); `rootHead(stylesheet: string)`; `personJsonLd(): string`.
  - `theme.ts`: `resolveTheme(stored: string | null, prefersDark: boolean): 'light' | 'dark'`; `themeScript: string`; `useTheme(): { dark: boolean; toggle(): void }`.
  - `SectionLabel({ children })` renders monospace `// children`.

- [ ] **Step 1: Write failing tests.** `seo.test.ts`: `pageHead({ description: 'd', path: '/cv', title: 'CV' })` has `{ title: 'CV | Emre Sandıkçı' }` and a canonical link `https://www.emresandikci.com/cv`; `pageHead({ ..., canonical: 'https://medium.com/x' })` uses that canonical; `personJsonLd()` parses as JSON with `@type: 'Person'`, `email: 'mailto:me@emresandikci.com'` and `sameAs` containing the LinkedIn and GitHub URLs. `theme.test.ts`: `resolveTheme('dark', false) === 'dark'`, `resolveTheme('light', true) === 'light'`, `resolveTheme(null, true) === 'dark'`, `resolveTheme('garbage', false) === 'light'`; `themeScript` contains `try` around the `localStorage` read and uses `prefers-color-scheme: dark`.
- [ ] **Step 2: Run `pnpm test`.** Expected: FAIL (modules missing).
- [ ] **Step 3: Implement.** `theme.ts` follows `kanal-education/apps/web/src/theme.ts` but stores `'light'`/`'dark'` explicitly and falls back to `matchMedia('(prefers-color-scheme: dark)')`; theme-color meta `#fafaf7` / `#0d1117`. `styles.css`: `@custom-variant dark (&:where(.dark, .dark *));` and CSS variables for background, foreground, muted, line and accent per Global Constraints; `font-sans` Inter, `font-mono` JetBrains Mono. Root route: `ScriptOnce` with `themeScript` before `HeadContent`, `rootHead(appCss)` (favicons as in today's `index.html`, GA `UA-74837009-2` gtag scripts), JSON-LD script, `Header` (logo linking `/`, nav `Work → /cv`, `Blog → /blog`, `CV ↓` to `CV_PDF_EN` and a small `TR` to `CV_PDF_TR`, both with `download`, theme toggle), `Footer` (email, LinkedIn, GitHub, CV EN + TR). `useEffect` in `RootDocument` logs `emresandikci.com v${version}` from `package.json`.
- [ ] **Step 4: Run `pnpm test && pnpm lint && pnpm type-check`.** Expected: PASS.
- [ ] **Step 5: Leave changes in the working tree;** list changed files.

### Task 3: CV data

**Files:**

- Create: `src/content/cv.ts`, `src/content/cv.test.ts`

**Interfaces:**

- Produces:

  ```ts
  type Role = {
    id: string;
    company: string;
    title: string;
    period: string;
    location?: string;
    site?: string;
    image?: string;
    summary: string;
    bullets: string[];
    tech: string[];
  };
  type Entry = {
    id: string;
    title: string;
    org: string;
    period: string;
    location?: string;
    text: string;
    summary?: string;
    site?: string;
    image?: string;
  };
  export const cv: {
    summary: string;
    about: string;
    softSkills: string[];
    roles: Role[];
    volunteering: Entry[];
    openSource: { name: string; text: string; url?: string }[];
    talks: { event: string; text: string }[];
    skills: string[];
    education: { title: string; period: string }[];
  };
  export const FEATURED_ROLE_IDS: readonly string[];
  ```

  `image` is a path under `/work/`, filled in Task 4.

- [ ] **Step 1: Write failing tests** in `cv.test.ts`: role and volunteering ids are unique kebab-case across both lists; `cv.roles.length === 8` and the first is Walnut Lab; `FEATURED_ROLE_IDS` equals `['walnut-lab', 'finedine', 'norma', 'kanal-education']` and each resolves to a role or volunteering entry; `JSON.stringify(cv)` does not match `/\+?\d[\d\s().-]{8,}\d/` (no phone numbers); every `site` starts with `https://`.
- [ ] **Step 2: Run `pnpm test src/content`.** Expected: FAIL.
- [ ] **Step 3: Fill `cv.ts`** with the spec's Appendix A text verbatim, the sites from the spec's "Calls made after the builder check" list, and `about` = 2-3 sentences condensed from the summary. KanalEducation is a volunteering/freelance entry with id `kanal-education` and a one-sentence `summary` usable by home cards; give entries the same `summary` field where needed. Each role's `summary` is one sentence with its headline outcome (Walnut Lab ~80% release/DX improvement, FineDine 60+ languages AngularJS → React, Norma fintech design system and UI kit, KanalEducation +50% enrollment conversion).
- [ ] **Step 4: Run `pnpm test src/content && pnpm type-check`.** Expected: PASS.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 4: Company visuals

**Files:**

- Create: `public/work/<id>.jpg` for every role/entry with a `site`, `src/content/cv-images.test.ts`
- Modify: `src/content/cv.ts` (`image` fields)

**Interfaces:**

- Consumes: `cv.roles`, `cv.volunteering` with `site`.

- [ ] **Step 1: Write failing test** `cv-images.test.ts`: for every role/entry with `site`, `image` is set and `fs.existsSync('public' + image)` is true; for those without `site` (Norma, Pelican Cove, Topluluk, Devoxx4Kids), `image` is undefined.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Collect images.** For each site, first look for a product image on the site (Open Graph image or a hero/product screenshot); download it if it shows the product. Otherwise take a 1440x900 home-page screenshot with `npx playwright@1.64.1 screenshot --viewport-size=1440,900 --wait-for-timeout=3000 <url> <file>` (install Chromium with `npx playwright@1.64.1 install chromium` first). Save as JPEG, max 1440px wide, under 300 KB. Run downloads and scripts from the scratchpad, not the repo; only the final images land in `public/work/`. Set `image` in `cv.ts`.
- [ ] **Step 4: Run the test and open two images** to confirm they are not cookie banners or blank pages. Expected: PASS.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 5: `/cv` page

**Files:**

- Create: `src/routes/cv.tsx`, `src/components/cv/role-card.tsx`, `src/components/cv/cv-section.tsx`, `src/components/cv/download-buttons.tsx`

**Interfaces:**

- Consumes: `cv`, `pageHead`, `SectionLabel`, `CV_PDF_EN`, `CV_PDF_TR`.
- Produces: `DownloadButtons()` (primary "Download PDF" → EN with `download`, small "TR" link → TR), reused on home in Task 9. Each role and volunteering entry renders with `id={id}` so `/cv#walnut-lab` and `/cv#kanal-education` work.

- [ ] **Step 1: Build the page:** header (name, "Senior Software Engineer", email/LinkedIn/GitHub, `DownloadButtons`), then sections with `SectionLabel`: summary, experience (role cards: company, title, period, image if any with `alt="<company> website"` and `loading="lazy"`, bullets, tech tags), volunteering & freelance, open source, talks, skills, soft skills, education. Head: `pageHead({ title: 'CV', description: <summary first sentence>, path: '/cv' })`.
- [ ] **Step 2: Verify.** `pnpm lint && pnpm type-check && pnpm build`, run the server and `curl -s localhost:3999/cv` contains all 8 company names, `emre-sandikci-resume-en.pdf`, `emre-sandikci-resume-tr.pdf` and `id="walnut-lab"`. Check `/cv` in the browser in light and dark mode and at 375px width.
- [ ] **Step 3: Leave changes in the working tree.**

### Task 6: Blog core

**Files:**

- Create: `src/utils/blog/post.ts`, `src/utils/blog/post.test.ts`, `src/utils/blog/markdown.ts`, `src/utils/blog/markdown.test.ts`, `src/utils/blog/posts.functions.ts`, `content/blog/.gitkeep`

**Interfaces:**

- Produces:

  ```ts
  type PostMeta = { slug: string; title: string; date: string; description: string;
    lang: 'en' | 'tr'; tags: string[]; canonical?: string; readingMinutes: number };
  type Post = PostMeta & { html: string };
  parsePost(fileName: string, raw: string): { meta: PostMeta; body: string }   // post.ts
  readingMinutes(text: string): number                                          // post.ts, ceil(words / 200), min 1
  sortPosts<T extends { date: string }>(posts: T[]): T[]                         // post.ts, newest first
  renderMarkdown(body: string): Promise<string>                                 // markdown.ts
  getPosts: server fn () => PostMeta[]                                           // posts.functions.ts
  getPost: server fn ({ slug }) => Post                                          // throws notFound() if missing
  ```

  `slug` = file name without `.md`. `date` is `YYYY-MM-DD`.

- [ ] **Step 1: Write failing tests.** `post.test.ts`: parses front matter into `PostMeta` with `slug` from file name; missing `title` throws an error whose message contains the file name; `lang: 'de'` throws; a `Date` value from YAML is normalized to `YYYY-MM-DD`; `readingMinutes('word '.repeat(450)) === 3`, `readingMinutes('') === 1`; `sortPosts` orders `2021-02-14` before `2018-11-15`. `markdown.test.ts`: a fenced `ts` block renders with Shiki classes for both themes (`github-light` / `github-dark`, CSS-variable mode); raw `<script>` in Markdown is escaped (markdown-it `html: false`); links render as `<a>`.
- [ ] **Step 2: Run `pnpm test src/utils/blog`.** Expected: FAIL.
- [ ] **Step 3: Implement.** `post.ts` with gray-matter; `markdown.ts` builds one markdown-it instance with `@shikijs/markdown-it` (themes `{ light: 'github-light', dark: 'github-dark' }`, `defaultColor: false`) and caches it. `posts.functions.ts` uses `createServerFn({ method: 'GET' })` (input validation API as in the installed version) and `import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })`. Add CSS in `styles.css` that switches Shiki variables under `.dark`, and a `.prose` style for post bodies (headings, lists, links in accent, code blocks, images max-width 100%).
- [ ] **Step 4: Run `pnpm test src/utils/blog && pnpm lint && pnpm type-check`.** Expected: PASS.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 7: Blog pages and 404

**Files:**

- Create: `src/routes/blog/index.tsx`, `src/routes/blog/$slug.tsx`, `src/components/blog/post-list.tsx`, `src/components/not-found.tsx`
- Modify: `src/routes/__root.tsx` (`notFoundComponent: NotFound`)

**Interfaces:**

- Consumes: `getPosts`, `getPost`, `pageHead`.
- Produces: `PostList({ posts: PostMeta[] })` (title, date, `en`/`tr` tag, reading minutes, description), reused on home in Task 9.

- [ ] **Step 1: Pages.** `/blog`: loader `getPosts()`, `PostList`, empty state "No posts yet." when the list is empty. `/blog/$slug`: loader `getPost({ data: { slug } })`, renders title, date, reading time, tags, `<article lang={post.lang} className="prose" dangerouslySetInnerHTML>`; head `pageHead({ title, description, path: '/blog/' + slug, canonical: post.canonical, type: 'article', lang })`. If `canonical` is set, show "Originally published on Medium" with the link. `NotFound`: `notFound.svg`, "Page not found", link home.
- [ ] **Step 2: Add a temporary post** `content/blog/hello.md` (all front matter fields, one code block) to exercise the pages.
- [ ] **Step 3: Verify.** Build, run the server: `curl -s localhost:3999/blog | grep -c hello` ≥ 1; `curl -s localhost:3999/blog/hello` contains `lang="en"` and `shiki`; `curl -s -o /dev/null -w '%{http_code}' localhost:3999/blog/does-not-exist` prints `404`; same for `/nope`.
- [ ] **Step 4: Delete `content/blog/hello.md`.** Leave changes in the working tree.

### Task 8: Medium import

**Files:**

- Create: `content/blog/work-as-a-freelancer.md`, `content/blog/freelance-calismak.md`, `content/blog/jquery-gunumuzde-ne-kadar-gerekli.md`, `content/blog/y-ve-z-kusaginda-bilisim-ve-teknoloji.md`, `public/blog/<slug>/*` images, `src/utils/blog/content.test.ts`

**Interfaces:**

- Consumes: `parsePost`.

- [ ] **Step 1: Write failing test** `content.test.ts`: reads every file in `content/blog/` with `fs`, `parsePost` succeeds, there are exactly 4 posts, the two Turkish slugs have `lang: 'tr'`, every post has `canonical` starting with `https://medium.com/`, and every image referenced in a body exists under `public/`.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Convert.** From the scratchpad (not the repo), fetch `https://medium.com/feed/@emresandikci`, convert each item's `content:encoded` HTML to Markdown with `turndown` 7.2.4, download its images into `public/blog/<slug>/`, rewrite image URLs to `/blog/<slug>/<file>`, drop Medium tracking pixels, and write front matter: `title`, `date` (pubDate as `YYYY-MM-DD`), `description` (first sentence, max 160 chars), `lang`, `tags` (Medium categories), `canonical` (item link without query string). Read each result and fix conversion artifacts by hand.
- [ ] **Step 4: Run `pnpm test src/utils/blog`.** Expected: PASS. Open one Turkish post in the browser.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 9: Home page

**Files:**

- Create: `src/components/home/hero.tsx`, `src/components/home/typewriter.ts`, `src/components/home/typewriter.test.ts`, `src/components/home/selected-work.tsx`, `src/components/home/contact.tsx`
- Modify: `src/routes/index.tsx`

**Interfaces:**

- Consumes: `ROLES`, `MAILTO`, `cv`, `FEATURED_ROLE_IDS`, `getPosts`, `PostList`, `DownloadButtons`, `SectionLabel`.
- Produces: `typewriterStep(state: { index: number; length: number; deleting: boolean }, words: readonly string[]): { state; delay: number }` and `useTypewriter(words): string`.

- [ ] **Step 1: Write failing tests** `typewriter.test.ts`: from `{ index: 0, length: ROLES[0].length, deleting: false }` the next step starts deleting with `delay` 1600; while deleting `delay` is 35; typing `delay` is 70; after deleting to 0 it moves to the next index with `delay` 300 and wraps from the last word to 0.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement.** `useTypewriter` starts from the full first word (so server HTML and no-JS show `ROLES[0]`), uses `typewriterStep` with `setTimeout`, and returns `ROLES[0]` without animating when `matchMedia('(prefers-reduced-motion: reduce)')` matches. Hero: monospace `~ $ whoami`, `<h1>Emre Sandıkçı</h1>`, `> {role}` with a blinking block cursor (CSS animation disabled under reduced motion), "Get in touch" (`MAILTO`) and "Read the blog" (`/blog`). Home sections in order: hero, about (`cv.about`), `// selected work` (4 cards from `FEATURED_ROLE_IDS`: image when present, company, title, summary, link `/cv#<id>`, then "Full CV →"), `// latest posts` (3 newest via loader `getPosts()`), `// contact` (email, LinkedIn, GitHub, `DownloadButtons`). Head: `pageHead({ description: cv.about, path: '/' })`.
- [ ] **Step 4: Verify.** `pnpm test && pnpm lint && pnpm type-check && pnpm build`; `curl -s localhost:3999/` contains `Senior Software Engineer`, `mailto:me@emresandikci.com`, `/cv#walnut-lab` and the newest post title. In the browser: typing works, theme toggle works and survives reload, 375px width has no horizontal scroll, reduced motion (emulate) shows a static role.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 10: Sitemap, robots, RSS

**Files:**

- Create: `src/utils/feeds.ts`, `src/utils/feeds.test.ts`, `src/routes/sitemap[.]xml.ts`, `src/routes/robots[.]txt.ts`, `src/routes/blog/rss[.]xml.ts`
- Delete: `public/sitemap.xml`, `public/robots.txt` (static files would shadow the routes)
- Modify: `src/routes/__root.tsx` (RSS `<link rel="alternate" type="application/rss+xml" href="/blog/rss.xml">`)

**Interfaces:**

- Consumes: `PostMeta`, `SITE_URL`, `getPosts` logic.
- Produces: `sitemapXml(posts: PostMeta[]): string`, `rssXml(posts: PostMeta[]): string`, `robotsTxt(): string`, `escapeXml(s: string): string`.

- [ ] **Step 1: Write failing tests** `feeds.test.ts`: `escapeXml('a & <b> "c" \'d\'')` returns `a &amp; &lt;b&gt; &quot;c&quot; &apos;d&apos;`; `sitemapXml` lists `https://www.emresandikci.com/`, `/cv`, `/blog` and `/blog/<slug>` with `<lastmod>` = post date; `rssXml` has one `<item>` per post, newest first, with escaped title "Y ve Z Kuşağında Bilişim ve Teknoloji" kept as UTF-8, `<link>` to the site URL, `<pubDate>` in RFC 822; `robotsTxt()` contains `Sitemap: https://www.emresandikci.com/sitemap.xml`.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Implement** the builders and the three server routes (`server: { handlers: { GET } }`, content types `application/xml; charset=utf-8`, `application/rss+xml; charset=utf-8`, `text/plain; charset=utf-8`). Posts are read through the same glob as Task 6, not over HTTP.
- [ ] **Step 4: Verify.** Tests pass; after build, `curl -sI localhost:3999/sitemap.xml` shows the XML content type and `curl -s localhost:3999/blog/rss.xml | grep -c '<item>'` prints `4`.
- [ ] **Step 5: Leave changes in the working tree.**

### Task 11: Docker, docs, full verification

**Files:**

- Modify: `Dockerfile`, `.dockerignore`, `README.md`, `.github/workflows/release.yml` only if the build context changes (it should not)

- [ ] **Step 1: Dockerfile.** Build stage as today (`node:22-alpine`, corepack, `pnpm install --frozen-lockfile --ignore-scripts`, `COPY . .`, `pnpm build`). Runtime stage: `node:22-alpine`, `WORKDIR /app`, `ENV NODE_ENV=production PORT=80`, copy `package.json pnpm-lock.yaml .npmrc`, `corepack enable && pnpm install --prod --frozen-lockfile --ignore-scripts`, copy `dist/` and `server.mjs` from the build stage, `EXPOSE 80`, `HEALTHCHECK` with `wget -qO /dev/null http://127.0.0.1:80/`, `CMD ["node", "server.mjs"]`. Remove `serve`. `.dockerignore`: add `dist`, `docs`, `.superpowers`; keep `content/` included.
- [ ] **Step 2: README.** Short sections: run locally (`pnpm dev`), write a post (front matter fields, file name = slug, push to `master`), release and deploy (existing pipeline, port 80).
- [ ] **Step 3: Full verification.** `pnpm format:check && pnpm lint && pnpm type-check && pnpm test && pnpm build`; `docker compose -f docker-compose.dev.yml up -d --build`; wait for `healthy`; check `/`, `/cv`, `/blog`, one post, `/blog/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/emre-sandikci-resume-en.pdf` return 200 and `/nope` returns 404 on `localhost:8080`; browser check of home in light and dark mode; console shows `emresandikci.com v1.1.0`. `docker compose -f docker-compose.dev.yml down`.
- [ ] **Step 4: Report** the changed files and tell Emre the work is ready to commit (suggested commit groups: stack migration, CV, blog + Medium posts, home, feeds, Docker/docs; the spec and this plan go with the first one).
