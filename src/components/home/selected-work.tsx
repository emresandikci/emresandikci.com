import { Link } from '@tanstack/react-router';
import { featuredItems, type FeaturedItem } from '~/content/cv';

function ItemLink({ item }: { item: FeaturedItem }) {
  const className = 'font-mono text-sm text-accent hover:underline';
  if (item.href.startsWith('/')) {
    const [, hash] = item.href.split('#');
    return (
      <Link to="/cv" hash={hash} className={className}>
        read in cv →
      </Link>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noreferrer" className={className}>
      visit site ↗
    </a>
  );
}

function Row({ item, index }: { item: FeaturedItem; index: number }) {
  return (
    <article className="grid items-center gap-6 sm:grid-cols-2 sm:gap-12">
      <div className={index % 2 ? 'sm:order-last' : ''}>
        {item.image ? (
          <img
            src={item.image}
            alt={`${item.name} website`}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-2xl border border-line object-cover object-top"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-line bg-surface font-mono text-2xl text-muted">
            {item.name}
          </div>
        )}
      </div>
      <div>
        <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold text-heading">{item.name}</h3>
          {index === 0 && (
            <span className="rounded-full border border-accent px-2 py-0.5 font-mono text-xs text-accent">
              building now
            </span>
          )}
        </div>
        <p className="mt-1 font-mono text-xs text-muted">{item.title}</p>
        <p className="mt-4 leading-relaxed">{item.summary}</p>
        <p className="mt-4 font-mono text-xs text-muted">{item.facts.join(' · ')}</p>
        <div className="mt-4">
          <ItemLink item={item} />
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <div>
      <div className="space-y-20">
        {featuredItems().map((item, index) => (
          <Row key={item.id} item={item} index={index} />
        ))}
      </div>
      <Link to="/cv" className="mt-10 inline-block font-mono text-sm text-accent hover:underline">
        Full CV →
      </Link>
    </div>
  );
}
