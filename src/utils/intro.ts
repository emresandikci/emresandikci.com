export type IntroLine = { kind: 'command' | 'output'; text: string };

export const introScript = `try{if(!location.pathname.startsWith('/blog/')&&!sessionStorage.getItem('intro')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('intro','1');document.documentElement.dataset.intro='1'}}catch(e){}`;

export function introLines(now: Date, ip: string | null): IntroLine[] {
  const day = now.toDateString();
  const lastLogin = `${day.slice(0, 10)} ${now.toTimeString().slice(0, 8)} ${day.slice(11)}`;

  return [
    { kind: 'command', text: 'ssh guest@emresandikci.com' },
    { kind: 'output', text: 'Connecting to emresandikci.com port 22...' },
    { kind: 'output', text: 'Authenticated with public key (ED25519).' },
    {
      kind: 'output',
      text: `Last login: ${lastLogin} from ${ip ?? 'somewhere on the internet'}`,
    },
    ...(ip
      ? [{ kind: 'output' as const, text: `Hello, ${ip}. Relax, I only use it to say hi.` }]
      : []),
    { kind: 'output', text: 'Welcome, guest. Loading profile...' },
    { kind: 'command', text: 'whoami' },
  ];
}
