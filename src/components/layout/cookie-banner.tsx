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
      aria-label="Analytics cookies"
      className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-line bg-surface p-4 font-mono text-sm text-fg shadow-lg sm:left-auto sm:max-w-sm"
    >
      <p>
        Can I use Google Analytics to count visits? It sets cookies and sends your visit to
        Google. Nothing loads unless you accept.
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
