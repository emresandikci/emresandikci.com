import { useEffect, useState } from 'react';
import { introLines, type IntroLine } from '~/utils/intro';
import { loadVisitorIp } from '~/utils/visitor-ip';

const TYPE_DELAY = 55;
const LINE_DELAY = { command: 450, output: 380 };
const HOLD = 900;
const LEAVE = 900;

function finish() {
  const root = document.documentElement;
  if (root.dataset.intro !== '1') return;
  root.dataset.intro = 'leaving';
  setTimeout(() => delete root.dataset.intro, LEAVE);
}

function Prompt({ index }: { index: number }) {
  return <span className="text-[#42e6a4]">{index === 0 ? '~ $' : 'guest@emresandikci:~$'} </span>;
}

export function TerminalIntro() {
  const [lines, setLines] = useState<IntroLine[]>([]);
  const [step, setStep] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (document.documentElement.dataset.intro !== '1') return;
    let active = true;
    loadVisitorIp().then((ip) => {
      if (active) setLines(introLines(new Date(), ip));
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!lines.length) return;
    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);
    return () => {
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, [lines]);

  useEffect(() => {
    if (!lines.length) return;
    const line = lines[step.line];
    const timer = !line
      ? setTimeout(finish, HOLD)
      : line.kind === 'command' && step.chars < line.text.length
        ? setTimeout(() => setStep({ line: step.line, chars: step.chars + 1 }), TYPE_DELAY)
        : setTimeout(() => setStep({ line: step.line + 1, chars: 0 }), LINE_DELAY[line.kind]);
    return () => clearTimeout(timer);
  }, [lines, step]);

  const current = lines[step.line];

  return (
    <div
      aria-hidden
      className="terminal-intro fixed inset-0 z-50 items-center justify-center bg-[#0d1117] p-4 font-mono text-sm text-[#c9d1d9]"
    >
      <div className="terminal-window w-full max-w-2xl overflow-hidden rounded-xl border border-[#21262d] bg-[#161b22] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-[#21262d] px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-[#8b949e]">guest — ssh emresandikci.com</span>
        </div>
        <div className="min-h-52 space-y-1 p-5 leading-relaxed">
          {lines.slice(0, step.line).map((line, index) => (
            <p key={index}>
              {line.kind === 'command' && <Prompt index={index} />}
              {line.text}
            </p>
          ))}
          <p>
            {current?.kind === 'command' && (
              <>
                <Prompt index={step.line} />
                {current.text.slice(0, step.chars)}
              </>
            )}
            {!lines.length && <Prompt index={0} />}
            <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-[#42e6a4]" />
          </p>
        </div>
      </div>
      <p className="absolute bottom-6 text-xs text-[#8b949e]">press any key to skip</p>
    </div>
  );
}
