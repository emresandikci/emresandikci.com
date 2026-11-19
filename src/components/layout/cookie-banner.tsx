import { useState, useSyncExternalStore } from 'react';
import {
  CONSENT_ACCEPTED,
  CONSENT_DECLINED,
  CONSENT_EVENT,
  CONSENT_KEY,
} from '~/utils/analytics';

const subscribe = () => () => {};
const readAnswered = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
};
const answeredOnServer = () => true;

const button = 'rounded-full border border-line px-4 py-1.5 transition hover:text-accent';

export function CookieBanner() {
  const answered = useSyncExternalStore(subscribe, readAnswered, answeredOnServer);
  const [dismissed, setDismissed] = useState(false);

  if (answered || dismissed) return null;

  const answer = (value: string) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Storage blocked: the choice applies to this page view only.
    }
    if (value === CONSENT_ACCEPTED) window.dispatchEvent(new Event(CONSENT_EVENT));
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      aria-label="Your privacy"
      className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-line bg-surface p-4 font-mono text-sm text-fg shadow-lg sm:left-auto sm:max-w-sm"
    >
      <p className="font-semibold">Your privacy</p>
      <p className="mt-2">
        We use cookies and similar technologies to keep this site working and, only if you agree,
        to understand how it is used. You can accept or decline, and the site works the same
        either way.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" className={button} onClick={() => answer(CONSENT_ACCEPTED)}>
          accept
        </button>
        <button type="button" className={button} onClick={() => answer(CONSENT_DECLINED)}>
          decline
        </button>
      </div>
    </div>
  );
}
