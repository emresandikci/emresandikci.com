import type { Role } from '~/content/cv';

export function RoleCard({ role }: { role: Role }) {
  return (
    <li id={role.id} className="relative scroll-mt-24 pb-14 pl-8 last:pb-0">
      <span
        aria-hidden
        className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-accent bg-bg"
      />
      <span className="inline-block rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
        {role.period}
        {role.location && ` · ${role.location}`}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-heading">
        {role.site ? (
          <a href={role.site} target="_blank" rel="noreferrer" className="hover:text-accent">
            {role.company}
          </a>
        ) : (
          role.company
        )}
      </h3>
      <p className="mt-1 text-sm text-muted">{role.title}</p>
      {role.image && (
        <img
          src={role.image}
          alt={`${role.company} website`}
          loading="lazy"
          className="mt-5 aspect-[16/9] w-full rounded-lg border border-line object-cover object-top"
        />
      )}
      <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-accent">
        {role.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {role.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {role.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
