export type Role = {
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

export type Entry = {
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

const tech = (list: string) => list.split(', ');

const startOf = (period: string) => {
  const [month, year] = period.split(' ')[0].split('/');
  return `${year}-${month}`;
};

const newestFirst = (roles: Role[]) =>
  [...roles].sort((a, b) => startOf(b.period).localeCompare(startOf(a.period)));

export const cv = {
  summary:
    'I’m a software engineer who enjoys building things, understanding how they work, and making them better. Over the past 10+ years, my career has evolved from frontend and full-stack development into software architecture, DevOps, and technical leadership. I’m particularly interested in the parts of engineering where code, infrastructure, architecture, and developer experience come together. I like taking complex systems and workflows, finding what makes them slow or fragile, and turning them into simpler, more reliable, and automated solutions.',
  about:
    'I’m a software engineer with 10+ years of experience, grown from frontend and full-stack development into software architecture, DevOps, and technical leadership. I like taking complex systems and workflows, finding what makes them slow or fragile, and turning them into simpler, more reliable, and automated solutions.',
  softSkills: [
    'Leadership',
    'Strategic Thinking',
    'Communication',
    'Team Collaboration',
    'Problem Solving',
    'Adaptability',
  ],
  roles: newestFirst([
    {
      id: 'walnut-lab',
      company: 'Walnut Lab',
      title: 'Staff Software Engineer & Engineering Team Lead',
      period: '04/2025 – Present',
      site: 'https://www.walnutlab.com.tr',
      image: '/work/walnut-lab.jpg',
      summary:
        'Leading architecture and team, with release and developer experience improved by over 80% through automation, GitOps and DevOps.',
      bullets: [
        'Leading front-end and back-end architecture (micro-frontend, micro-service & monorepo) and cross-functional technical strategy for human-centered digital solutions across the full stack. Responsible for system architecture, hands-on development, infrastructure setup & team leadership with a key focus on building scalable solutions.',
        'Refactor the current projects to improve developer experience and code standardization by implementing a linter, Prettier, commit hooks, and fully automated semantic versioning with pipelines and automated deployment. Increase release and developer experience by over 80% through automation, a self-hosted platform with GitOps and DevOps.',
        'Promoted to Engineering Team Lead following my role as Staff Software Engineer.',
      ],
      tech: tech(
        'JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, React-Query, Redux, HTML, CSS, Scrum, SQL, Express, PostgreSQL, Cross-functional team leadership (Backend, Frontend and Mobile), Nginx, Docker'
      ),
    },
    {
      id: 'cinar-tech',
      company: 'Cinar Tech',
      title: 'Senior Software Engineer - Co-Founder',
      period: '04/2023 – 04/2025',
      site: 'https://cinartech.com',
      image: '/work/cinar-tech.jpg',
      summary:
        'Co-founded a software company delivering custom products to US and European companies.',
      bullets: [
        'Co-founded a software company with a partner, delivering custom software solutions to US- and Europe-based companies across logistics, healthcare, real estate, and restaurant industries.',
        'Contributed to the development of multiple customer-specific software products from the ground up, including application architecture, infrastructure setup, and both frontend and backend development.',
      ],
      tech: tech(
        'Go, C# (.NET Core), JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Pocketbase, Figma, React-Query, Redux, HTML, CSS, Scrum, SQL, MongoDB'
      ),
    },
    {
      id: 'brandbastion',
      company: 'BrandBastion',
      title: 'Senior Frontend Engineer (Contractor)',
      period: '01/2023 – 04/2023',
      site: 'https://www.brandbastion.com',
      image: '/work/brandbastion.jpg',
      summary:
        'Built micro-frontend modules, build optimizations and a shared UI kit library.',
      bullets: [
        'Contributed to the development of multiple modules within a micro-frontend architecture.',
        'Contributed to build optimization, application performance improvements, and the development of a shared UI kit library.',
      ],
      tech: tech(
        'JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Redux, HTML, CSS, Scrum'
      ),
    },
    {
      id: 'norma',
      company: 'Norma',
      title: 'Senior Frontend Engineer – Team Lead',
      period: '12/2021 – 01/2023',
      summary:
        'Led the frontend team of a fintech app and built its design system and shared UI kit.',
      bullets: [
        'Led the frontend team developing a fintech application serving accounting and online banking use cases.',
        'Worked closely with the design team to establish a Design System and develop a shared UI kit.',
        'Developed a reusable UI library used across multiple dashboards and websites.',
        'Designed and integrated end-to-end GitOps and DevOps workflows across the projects.',
      ],
      tech: tech(
        'JavaScript, TypeScript, React.js, Next.js, Node.js, Tailwind CSS, Figma, React-Query, Redux, Scrum, HTML, CSS, UI-kit'
      ),
    },
    {
      id: 'finedine',
      company: 'FineDine Digital Menus',
      title: 'Senior Frontend Engineer',
      period: '05/2020 – 11/2021',
      site: 'https://www.finedinemenu.com',
      image: '/work/finedine.jpg',
      summary:
        'Led the AngularJS to React migration of 60+ language restaurant apps and a shared design system.',
      bullets: [
        'Led the redevelopment of 60+ language frontend applications covering digital menus, restaurant management, and kitchen management workflows, migrating the platform from AngularJS to React.js. Designed the architecture and remained actively involved in hands-on development throughout the migration.',
        'Contributed to the creation of a shared Design System that reduced development time by 40%.',
        'Developed a unified UI library bringing multiple projects under a single Design System, increasing development speed by 80%.',
        'Played an active role in transitioning the engineering team to Scrum processes.',
      ],
      tech: tech(
        'JavaScript, TypeScript, React.js, Next.js, Node.js, Styled-Components, Figma, Redux, UI-kit, HTML, CSS'
      ),
    },
    {
      id: 'talent-mondo',
      company: 'Talent Mondo',
      title: 'Senior Software Engineer - Team Lead',
      period: '03/2020 – 05/2020',
      site: 'https://www.talentmondo.com',
      image: '/work/talent-mondo.jpg',
      summary: 'Led the team building a live-streaming wellness platform and its dashboards.',
      bullets: [
        'Contributed to the development of a live-streaming wellness platform.',
        'Led the engineering team for a spin-off project of Evdeki Bakıcım while remaining hands-on across both backend and frontend development.',
        'Developed the main website and two management dashboards for teachers and students.',
        'Extended the existing Evdeki Bakıcım UI library for the platform and management dashboards, increasing development efficiency by 30%.',
        'Designed and integrated end-to-end GitOps and DevOps workflows across the projects.',
      ],
      tech: tech(
        'React.js, Next.js, JavaScript, Redux, HTML, CSS, Scrum, Cross-functional Team Leadership'
      ),
    },
    {
      id: 'evdeki-bakicim',
      company: 'Evdeki Bakıcım',
      title: 'Senior Software Engineer',
      period: '11/2018 – 05/2020',
      site: 'https://www.evdekibakicim.com',
      image: '/work/evdeki-bakicim.jpg',
      summary:
        'Started the shared UI kit and design system, and rebuilt the apps and website with React and Next.js.',
      bullets: [
        'Worked hands-on across multiple frontend and backend applications.',
        'Contributed to the migration of legacy backend applications from .NET Framework to .NET Core.',
        'Initiated the development of a shared UI kit and worked closely with the design team to establish a Design System.',
        'Rebuilt legacy applications with React.js using the newly developed UI library.',
        'Optimized Webpack configurations to reduce build times and application bundle sizes.',
        'Rebuilt the project and company website with Next.js and optimized its SEO performance.',
        'Designed and integrated end-to-end GitOps and DevOps workflows across the projects.',
      ],
      tech: tech(
        'JavaScript, TypeScript, React.js, Next.js, Node.js, LESS, SCSS, Styled-Components, UI-kit, Redux, HTML, CSS, Scrum, .NET Core, C#, SQL'
      ),
    },
    {
      id: 'muhsis',
      company: 'Muhsis',
      title: 'Senior Software Engineer - Co-Founder',
      period: '11/2017 – 06/2019',
      site: 'https://www.muhsis.com',
      image: '/work/muhsis.jpg',
      summary: 'Co-founded a cloud accounting and finance app for small businesses.',
      bullets: [
        'Co-founded and developed a cloud-based accounting and financial management web application used by small and medium-sized businesses and early-stage companies.',
      ],
      tech: tech('JavaScript, TypeScript, React.js, Node.js, C#, Redux, SQL'),
    },
    {
      id: 'kanal-education',
      company: 'KanalEducation',
      title: 'Senior Software Engineer (Freelance)',
      period: '03/2018 – 10/2022',
      location: 'NJ, USA',
      site: 'https://www.kanaleducation.com',
      image: '/work/kanal-education.jpg',
      summary:
        'Built a multilingual website and back office for a US language school, lifting enrollment conversion by 50%.',
      bullets: [
        'Developed a multilingual website and back-office application for a US-based language school, increasing enrollment conversion rates by 50%.',
        'Digitized enrollment and lesson management workflows, reducing operational workload by 70%.',
      ],
      tech: [],
    },
  ]),
  volunteering: [
    {
      id: 'pelican-cove',
      title: 'Senior Software Engineer',
      org: 'Pelican Cove Counselling Centers',
      period: '03/2023 – Present',
      location: 'LA, USA',
      text: 'Developed a client management dashboard that increased appointment scheduling efficiency by 60% and reduced operational workload by 25%.',
    },
    {
      id: 'topluluk',
      title: 'Organizer/Mentor',
      org: 'Topluluk',
      period: '2018 – 2022',
      text: 'Organized regular monthly meetups and mentored software engineers throughout their careers.',
    },
    {
      id: 'devoxx4kids',
      title: 'Co-Founder/Trainer/Speaker',
      org: 'Devoxx4Kids Turkey',
      period: '2016 – Present',
      location: 'Turkey',
      text: 'Organized and delivered workshops on game development, robotics, and electronics for children, providing hands-on training to 100+ students.',
    },
  ] satisfies Entry[] as Entry[],
  openSource: [
    {
      name: 'Pocketbase Query',
      github: 'https://github.com/emresandikci/pocketbase-query',
      npm: 'https://www.npmjs.com/package/@emresandikci/pocketbase-query',
      text: 'A TypeScript based query builder designed to generate complex filter queries for PocketBase.',
    },
    {
      name: 'axios-affected-checker',
      github: 'https://github.com/emresandikci/axios-affected-checker',
      npm: 'https://www.npmjs.com/package/@emstack/axios-affected-checker',
      text: 'Scans your machine and Node.js projects for indicators of the axios supply chain attack, then fixes them.',
    },
    {
      name: 'request',
      github: 'https://github.com/emresandikci/request',
      npm: 'https://www.npmjs.com/package/@emstack/request',
      text: 'Lightweight, fetch-based TypeScript HTTP client with zero dependencies, for both Browser and Node.js.',
    },
  ],
  talks: [
    {
      event: 'Kodla.co, weekly meet-ups',
      text: 'Mastering non-technical skills is as important as technical expertise for career growth. Resilience, emotional intelligence, teamwork, and communication are vital for success in the software development industry.',
    },
    {
      event: 'Devoxx4Kids Turkey',
      text: 'Workshop for Kids: Game Development with Scratch.',
    },
  ],
  skills: tech(
    'C#, JavaScript, TypeScript, SQL, Node.js, .NET Framework, .NET Core, ASP.NET MVC, Entity Framework, Express.js, React.js, Next.js, Redux, React-Query, Styled-Components, Tailwind CSS, HTML, CSS, Figma, Azure, Heroku, GitHub Actions, Vercel, Webpack, Vite, Storybook, Docker, Self-Hosting, Nginx, MS SQL, Postgres, SQLite, MongoDB'
  ),
  education: [
    { title: 'Associate Degree in Computer Programming', period: '2010 – 2012' },
    { title: 'Bachelor’s Degree in Software Engineering', period: '2014 – Incomplete' },
  ],
};

export const projects = [
  {
    id: 'keysty',
    name: 'Keysty',
    title: 'Mobile app · Web app · Dashboard · Back office · Website',
    site: 'https://keysty.com',
    image: '/work/keysty.jpg',
    summary:
      'The operating system for real estate agencies: listings, leads, agents and their own storefront in one place. I work across the whole product: the mobile app, web app, dashboard, back office and website.',
  },
];

export const FEATURED_ROLE_IDS = [
  'keysty',
  'walnut-lab',
  'finedine',
  'norma',
  'kanal-education',
] as const;

export type FeaturedItem = {
  id: string;
  name: string;
  title: string;
  summary: string;
  image?: string;
  href: string;
  facts: string[];
};

export function featuredItems(): FeaturedItem[] {
  return FEATURED_ROLE_IDS.map((id) => {
    const project = projects.find((item) => item.id === id);
    if (project) return { ...project, href: project.site, facts: ['Ongoing'] };
    const role = cv.roles.find((item) => item.id === id);
    if (role) {
      const { company: name, title, summary, image } = role;
      const facts = [
        role.period,
        ...(role.location ? [role.location] : []),
        ...role.tech.slice(0, 3),
      ];
      return { id, name, title, summary, image, href: `/cv#${id}`, facts };
    }
    const entry = cv.volunteering.find((item) => item.id === id)!;
    const { org: name, title, image } = entry;
    const facts = [entry.period, ...(entry.location ? [entry.location] : [])];
    const summary = entry.summary ?? entry.text;
    return { id, name, title, summary, image, href: `/cv#${id}`, facts };
  });
}
