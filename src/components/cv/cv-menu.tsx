import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CV_PDF_EN, CV_PDF_TR } from '~/utils/site';

const OPTIONS = [
  { label: 'English', href: CV_PDF_EN, lang: 'en' },
  { label: 'Türkçe', href: CV_PDF_TR, lang: 'tr' },
];

type CvMenuProps = {
  children: ReactNode;
  triggerClassName: string;
  placement?: 'down' | 'up';
  align?: 'left' | 'right';
};

export function CvMenu({
  children,
  triggerClassName,
  placement = 'down',
  align = 'left',
}: CvMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (
        event instanceof KeyboardEvent
          ? event.key === 'Escape'
          : !ref.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={triggerClassName}
      >
        {children}
      </button>
      {open && (
        <ul
          id={menuId}
          role="menu"
          className={`absolute z-30 min-w-36 rounded-xl border border-line bg-bg p-1 font-mono text-sm shadow-lg ${
            placement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          {OPTIONS.map((option) => (
            <li key={option.lang} role="none">
              <a
                role="menuitem"
                href={option.href}
                download
                hrefLang={option.lang}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-fg transition hover:bg-surface hover:text-accent"
              >
                {option.label}
                <span className="text-xs text-muted">pdf</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
