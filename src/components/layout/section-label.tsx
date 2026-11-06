import type { ReactNode } from 'react';

export function SectionLabel({ index, children }: { index?: number; children: ReactNode }) {
  const Tag = index === undefined ? 'p' : 'h2';

  return (
    <Tag className="font-mono text-sm text-muted">
      <span aria-hidden>{'// '}</span>
      {index !== undefined && (
        <span className="text-accent">{String(index).padStart(2, '0')} · </span>
      )}
      {children}
    </Tag>
  );
}
