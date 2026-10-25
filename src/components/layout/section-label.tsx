import type { ReactNode } from 'react';

export function SectionLabel({ index, children }: { index?: number; children: ReactNode }) {
  return (
    <p className="font-mono text-sm text-muted">
      {'// '}
      {index !== undefined && (
        <span className="text-accent">{String(index).padStart(2, '0')} · </span>
      )}
      {children}
    </p>
  );
}
