import logoUrl from '~/images/Logo.svg';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{
        maskImage: `url("${logoUrl}")`,
        WebkitMaskImage: `url("${logoUrl}")`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  );
}
