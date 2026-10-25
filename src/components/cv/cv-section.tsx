import type { ReactNode } from 'react';
import { SectionLabel } from '~/components/layout/section-label';

export function CvSection({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-20">
      <SectionLabel index={index}>{label}</SectionLabel>
      <div className="mt-8">{children}</div>
    </section>
  );
}
