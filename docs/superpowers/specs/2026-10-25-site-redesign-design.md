# emresandikci.com redesign

## Intent

emresandikci.com is Emre Sandıkçı's personal site. Today it is a single green page with a typed-style intro, social icons and a "Hire me" mailto button (React 16 SPA, esducad-ui, styled-components, served by `serve`).

The redesign turns it into a portfolio, CV and blog for a wide audience: HR and recruiters, developers, IT and software companies, and people who want to hire him for freelance projects. Most visitors stay under a minute. In that time they should understand "a senior engineer with 10+ years, from frontend into architecture, DevOps and leadership, and reachable", and then contact him.

## Goals

- Primary action: the visitor emails Emre ("Get in touch"). Secondary: LinkedIn, GitHub, reading the blog, downloading the CV.
- Show the full CV on the site and offer the same CV as a downloadable PDF.
- Show what he built at each company, with visuals of those products.
- A blog written as Markdown files in the repo. Publishing a post = adding a `.md` file and pushing to `master`.
- Search engines get real HTML for every page (SSR), including blog posts.

## Non-goals

- No CMS, admin panel or database.
- No contact form (it would need a backend); contact is a `mailto:` link.
- No i18n/locale routing. The site UI is English. Each blog post carries its own language.
- No monorepo. One app.

## Anti-goals

- A wall of text that a recruiter has to dig through to find "who is this and how do I reach him".
- Losing the existing logo.
- Breaking the existing release and deploy pipeline (semantic-release, GHCR image, Coolify webhook).

## Decided by Emre

- Stack: TanStack Start, following the architecture of `/Users/emresan/projects/cinartech/keysty-fe/apps/web` (see "Reference architecture").
- Look: one layout, two modes. Light mode is clean and editorial (off-white background, big sans-serif type, lots of space). Dark mode is a terminal look (near-black background, monospace details, green accent). Default follows the visitor's system setting; a toggle in the header switches it.
- Hero: `~ $ whoami`, his name, and a line that types and deletes a rotating list of roles with a blinking cursor. Primary button "Get in touch" (mailto), secondary "Read the blog".
- Logo: the current logo, unchanged (`src/images/Logo.svg`, plus the existing favicons and icons in `public/`).
- Page split: a short home page and a full `/cv` page (details below). Blog at `/blog`.
- CV: shown in full on `/cv` and downloadable as a PDF. "Download PDF" downloads Emre's existing PDF file as is.
- Medium posts: migrate all of them to the blog.
- Company visuals: use product images from each project's own website. When a site has none, use a screenshot of the site's home page (an "overview").
- Analytics: keep the existing Google Analytics tag (`UA-74837009-2`) for now; it will be changed later.

## Pages

### Home `/`

1. Header: logo, nav (Work → `/cv`, Blog → `/blog`, CV PDF download), light/dark toggle.
2. Hero (as above).
3. About: 2-3 sentences drawn from the CV summary.
4. Selected work: 4 cards, each with a visual, company, role, one-sentence outcome, linking to the matching section on `/cv`. Cards: Walnut Lab (architecture and release automation, ~80% better release/developer experience), FineDine (AngularJS → React migration, 60+ languages, design system), Norma (fintech, design system and UI kit), KanalEducation (multilingual site and back office, +50% enrollment conversion). Then a "Full CV →" link.
5. Latest posts: the 3 newest blog posts.
6. Contact: email, LinkedIn, GitHub, Download CV.

### CV `/cv`

Header with name, title, links and "Download PDF". Then all sections of the CV in Appendix A: summary, work history (all 8 roles: bullets, technology tags, visuals), volunteering and freelance, open source libraries, talks, technical skills, soft skills, education. Each role has an anchor so home cards can link to it.

### Blog `/blog` and `/blog/$slug`

- Posts live in `content/blog/*.md` with front matter: `title`, `date`, `description`, `lang` (`en` or `tr`), `tags`, optional `canonical`.
- The list shows title, date, language tag, reading time and description, newest first.
- A post page renders the Markdown with syntax-highlighted code blocks, and sets `<html lang>` / meta from the front matter.
- Medium migration: the 4 posts from `https://medium.com/feed/@emresandikci` ("Work as a freelancer" 2021-02-14, "Freelance Çalışmak" 2018-11-15, "JQuery Günümüzde Ne kadar gerekli?" 2018-04-03, "Y ve Z Kuşağında Bilişim ve Teknoloji" 2017-06-30). Convert to Markdown, keep original dates, download their images into the repo, set `canonical` to the Medium URL.

### Other

- 404 page in the new style (the current `notFound.svg` illustration may be reused).
- `sitemap.xml` (home, `/cv`, `/blog`, every post) and `robots.txt` generated from routes. An RSS feed at `/blog/rss.xml`.

## Visual details

These are Claude's calls, made from the mockups Emre picked; the builder may refine them.

- Fonts: sans-serif for headings and body (Inter or similar, self-hosted). Monospace for labels, dates, the hero prompt and the typing line.
- Accent: green from the current brand. `#42E6A4` in dark mode; a darker green (around `#0f9d6b`) in light mode for contrast.
- Section labels in monospace with a comment style, e.g. `// latest posts`.
- Rotating roles: Senior Software Engineer, Engineering Team Lead, Software Architect, DevOps & GitOps builder, Design System maker, Open source author, Devoxx4Kids trainer.
- The typing animation respects `prefers-reduced-motion` (show a static role instead).
- The theme choice is stored per visitor and applied before first paint (no flash).
- Responsive down to phone width.
- Reference mockups: `.superpowers/brainstorm/94230-1792893975/content/hybrid.html` (option 2) and `page-structure.html` (option B).

## Constraints

- Repo: `/Users/emresan/projects/me/emresandikci.com`, branch `master`, pnpm. It currently uses Vite 8 (migrated from webpack), React 16, esducad-ui and styled-components; all of these are replaced.
- Commits follow Conventional Commits; semantic-release on `master` cuts versions (currently 1.1.0). `.github/workflows/release.yml` builds the Docker image, pushes it to `ghcr.io/emresandikci/emresandikci.com` and calls the Coolify webhook. Keep this flow.
- Deployment: Coolify runs `docker-compose.yml` (image with `pull_policy: always`, no Traefik labels; Coolify adds routing). The image currently serves static files with `serve` on port 80. With SSR it becomes `node server.mjs`, but it stays on port 80 (Emre's decision): the Dockerfile sets `ENV PORT=80`, `server.mjs` reads `PORT`, and `docker-compose.yml` `expose`, the `HEALTHCHECK` and the Coolify domain stay as they are.
- The app logs `emresandikci.com v<version>` to the console, reading the version from `package.json`; keep it.
- Image licensing: product images come from the companies' own public sites, used for portfolio purposes as Emre decided.

## Reference architecture

Follow `keysty-fe/apps/web`, adapted to a single app:

- TanStack Start with file-based routes in `src/routes` (`__root.tsx` with `head()` for title, description, robots, Open Graph, Twitter, canonical built from a site URL; child routes override in their own `head()`), `src/router.tsx`, generated `routeTree.gen.ts`.
- Folders: `src/components/{layout,home,cv,blog}`, `src/utils`, bare imports from `src` (baseUrl).
- Tailwind v4 via `@tailwindcss/vite`. No DaisyUI and no shared UI package.
- React 19, TypeScript, React Compiler as in the reference.
- SSR (`ssr: true`), build output `dist/client` and `dist/server/server.js`, served by a custom `server.mjs` (static files from `dist/client` with immutable caching for hashed assets, brotli/gzip, everything else to `app.fetch`). `/Users/emresan/projects/me/kanal-education/apps/web/server.mjs` is a working copy of this pattern on Vite 8.
- JSON-LD `Person` schema in the root route.
- Use the same versions as `/Users/emresan/projects/me/kanal-education` (Vite 8, `@tanstack/react-start` 1.168.x, `@vitejs/plugin-react` 6, ESLint 10 flat config, Prettier 3), since keysty is still on Vite 7.
- Dockerfile like kanal-education's `apps/web/Dockerfile` but for a single app.

## Calls made after the builder check

Claude's calls, for Emre to check:

- Canonical origin is `https://www.emresandikci.com` (the bare domain redirects there today). Canonical URLs, sitemap, RSS, Open Graph and JSON-LD use it.
- All `mailto:` links use `me@emresandikci.com` with subject "Hello from emresandikci.com".
- Every role with a live site gets a visual; a role without one shows no image (text only, no placeholder box). Live sites found on 2026-10-25:
  - Walnut Lab: `https://www.walnutlab.com.tr`
  - Cinar Tech: `https://cinartech.com`
  - BrandBastion: `https://www.brandbastion.com`
  - FineDine: `https://www.finedinemenu.com`
  - Talent Mondo: `https://www.talentmondo.com`
  - Evdeki Bakıcım: `https://www.evdekibakicim.com`
  - Muhsis: `https://www.muhsis.com`
  - KanalEducation: `https://www.kanaleducation.com`
- Norma and Pelican Cove have no known live site, so they show no visual until Emre gives URLs.
- `.superpowers/` goes into `.gitignore`. This spec under `docs/` is committed with the redesign.

## CV PDFs

Emre provided two PDFs. They are already in `public/` with the phone number removed (Emre's request; the text is redacted, not just covered):

- `public/emre-sandikci-resume-en.pdf` (from `emre-sandikci-resume-en-2026.pdf`)
- `public/emre-sandikci-resume-tr.pdf` (from `emre-sandikci-resume-tr-2026.pdf`)

No phone number appears anywhere on the site.

"Download PDF" downloads the English one (Claude's call, since the site is English). Next to it, a smaller "TR" link downloads the Turkish one. The same pair appears on `/cv`, in the header nav and in the home contact section.

## Left to the builder

- Markdown pipeline and highlighter choice, as long as posts are rendered at build or on the server and the output is SSR HTML.
- CV data format (one typed data file is preferred so `/cv` and the home cards share it).
- Exact component breakdown, spacing and type scale.
- How screenshots are captured and optimized (they are committed as image files; no screenshots at runtime).
- Whether esducad-ui-era files (`.babelrc` remnants, `jsconfig.json`, old images) are deleted; unused ones should go.

## Appendix A: CV content (source of truth for `/cv`)

EMRE SANDIKCI, Senior Software Engineer. Email me@emresandikci.com, LinkedIn https://linkedin.com/in/emresandikci, GitHub https://github.com/emresandikci, Website https://www.emresandikci.com.

**Professional summary.** I'm a software engineer who enjoys building things, understanding how they work, and making them better. Over the past 10+ years, my career has evolved from frontend and full-stack development into software architecture, DevOps, and technical leadership. I'm particularly interested in the parts of engineering where code, infrastructure, architecture, and developer experience come together. I like taking complex systems and workflows, finding what makes them slow or fragile, and turning them into simpler, more reliable, and automated solutions.

**Soft skills.** Leadership, Strategic Thinking, Communication, Team Collaboration, Problem Solving, Adaptability.

**Work history**

1. Staff Software Engineer & Engineering Team Lead, Walnut Lab, 04/2025 – Present
   - Leading front-end and back-end architecture (micro-frontend, micro-service & monorepo) and cross-functional technical strategy for human-centered digital solutions across the full stack. Responsible for system architecture, hands-on development, infrastructure setup & team leadership with a key focus on building scalable solutions.
   - Refactor the current projects to improve developer experience and code standardization by implementing a linter, Prettier, commit hooks, and fully automated semantic versioning with pipelines and automated deployment. Increase release and developer experience by over 80% through automation, a self-hosted platform with GitOps and DevOps.
   - Promoted to Engineering Team Lead following my role as Staff Software Engineer.
   - Technologies: JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, React-Query, Redux, HTML, CSS, Scrum, SQL, Express, PostgreSQL, Cross-functional team leadership (Backend, Frontend and Mobile), Nginx, Docker.
2. Senior Software Engineer - Co-Founder, Cinar Tech, 04/2023 – 04/2025
   - Co-founded a software company with a partner, delivering custom software solutions to US- and Europe-based companies across logistics, healthcare, real estate, and restaurant industries.
   - Contributed to the development of multiple customer-specific software products from the ground up, including application architecture, infrastructure setup, and both frontend and backend development.
   - Technologies: Go, C# (.NET Core), JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Pocketbase, Figma, React-Query, Redux, HTML, CSS, Scrum, SQL, MongoDB.
3. Senior Frontend Engineer (Contractor), BrandBastion, 01/2023 – 04/2023
   - Contributed to the development of multiple modules within a micro-frontend architecture.
   - Contributed to build optimization, application performance improvements, and the development of a shared UI kit library.
   - Technologies: JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Redux, HTML, CSS, Scrum.
4. Senior Frontend Engineer – Team Lead, Norma, 12/2021 – 01/2023
   - Led the frontend team developing a fintech application serving accounting and online banking use cases.
   - Worked closely with the design team to establish a Design System and develop a shared UI kit.
   - Developed a reusable UI library used across multiple dashboards and websites.
   - Designed and integrated end-to-end GitOps and DevOps workflows across the projects.
   - Technologies: JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Figma, React-Query, Redux, Scrum, HTML, CSS, UI-kit.
5. Senior Frontend Engineer, FineDine Digital Menus, 05/2020 – 11/2021
   - Led the redevelopment of 60+ language frontend applications covering digital menus, restaurant management, and kitchen management workflows, migrating the platform from AngularJS to React.js. Designed the architecture and remained actively involved in hands-on development throughout the migration.
   - Contributed to the creation of a shared Design System that reduced development time by 40%.
   - Developed a unified UI library bringing multiple projects under a single Design System, increasing development speed by 80%.
   - Played an active role in transitioning the engineering team to Scrum processes.
   - Technologies: JavaScript, TypeScript, React.js, Next.js, Node.js, Styled-Components, Figma, Redux, UI-kit, HTML, CSS.
6. Senior Software Engineer - Team Lead, Talent Mondo, 03/2020 – 05/2020
   - Contributed to the development of a live-streaming wellness platform.
   - Led the engineering team for a spin-off project of Evdeki Bakıcım while remaining hands-on across both backend and frontend development.
   - Developed the main website and two management dashboards for teachers and students.
   - Extended the existing Evdeki Bakıcım UI library for the platform and management dashboards, increasing development efficiency by 30%.
   - Designed and integrated end-to-end GitOps and DevOps workflows across the projects.
   - Technologies: React.js, Next.js, JavaScript, Redux, HTML, CSS, Scrum, Cross-functional Team Leadership.
7. Senior Software Engineer, Evdeki Bakıcım, 11/2018 – 05/2020
   - Worked hands-on across multiple frontend and backend applications.
   - Contributed to the migration of legacy backend applications from .NET Framework to .NET Core.
   - Initiated the development of a shared UI kit and worked closely with the design team to establish a Design System.
   - Rebuilt legacy applications with React.js using the newly developed UI library.
   - Optimized Webpack configurations to reduce build times and application bundle sizes.
   - Rebuilt the project and company website with Next.js and optimized its SEO performance.
   - Designed and integrated end-to-end GitOps and DevOps workflows across the projects.
   - Technologies: JavaScript, TypeScript, React.js, Next.js, Node.js, LESS, SCSS, Styled-Components, UI-kit, Redux, HTML, CSS, Scrum, .NET Core, C#, SQL.
8. Senior Software Engineer - Co-Founder, Muhsis, 11/2017 – 06/2019
   - Co-founded and developed a cloud-based accounting and financial management web application used by small and medium-sized businesses and early-stage companies.
   - Technologies: JavaScript, TypeScript, React.js, Node.js, C#, Redux, SQL.

**Volunteering and freelance**

- Senior Software Engineer, Pelican Cove Counselling Centers, 03/2023 – Present, LA, USA: Developed a client management dashboard that increased appointment scheduling efficiency by 60% and reduced operational workload by 25%.
- Organizer/Mentor, Topluluk, 2018 – 2022: Organized regular monthly meetups and mentored software engineers throughout their careers.
- Co-Founder/Trainer/Speaker, Devoxx4Kids Turkey, 2016 – Present, Turkey: Organized and delivered workshops on game development, robotics, and electronics for children, providing hands-on training to 100+ students.
- Freelancing: Senior Software Engineer, KanalEducation, 03/2018 – 10/2022, NJ, USA: Developed a multilingual website and back-office application for a US-based language school, increasing enrollment conversion rates by 50%. Digitized enrollment and lesson management workflows, reducing operational workload by 70%.

**Education**

- Associate Degree in Computer Programming, 2010 – 2012
- Bachelor's Degree in Software Engineering (2014 - Incomplete)

**Technical skills.** C#, JavaScript, TypeScript, SQL, Node.js, .NET Framework, .NET Core, ASP.NET MVC, Entity Framework, Express.js, React.js, Next.js, Redux, React-Query, Styled-Components, Tailwind CSS, HTML, CSS, Figma, Azure, Heroku, GitHub Actions, Vercel, Webpack, Vite, Storybook, Docker, Self-Hosting, Nginx, MS SQL, Postgres, SQLite, MongoDB.

**Conferences / talks**

- Kodla.co, weekly meet-ups: Mastering non-technical skills is as important as technical expertise for career growth. Resilience, emotional intelligence, teamwork, and communication are vital for success in the software development industry.
- Devoxx4Kids Turkey, Workshop for Kids: Game Development with Scratch.

**Open source libraries**

- Pocketbase Query: a TypeScript based query builder designed to generate complex filter queries for PocketBase.
- axios-affected-checker: scans your machine and Node.js projects for indicators of the axios supply chain attack, then fixes them.
- request: lightweight, fetch-based TypeScript HTTP client with zero dependencies, for both Browser and Node.js.
