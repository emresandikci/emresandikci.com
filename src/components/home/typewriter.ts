import { useEffect, useState } from 'react';

type TypewriterState = { index: number; length: number; deleting: boolean };

export function typewriterStep(state: TypewriterState, words: readonly string[]) {
  const { index, length, deleting } = state;

  if (!deleting && length === words[index].length) {
    return { state: { index, length, deleting: true }, delay: 1600 };
  }
  if (deleting && length === 0) {
    return {
      state: { index: (index + 1) % words.length, length: 0, deleting: false },
      delay: 300,
    };
  }
  return {
    state: { index, length: length + (deleting ? -1 : 1), deleting },
    delay: deleting ? 35 : 70,
  };
}

export function useTypewriter(words: readonly string[]) {
  const [state, setState] = useState<TypewriterState>({
    index: 0,
    length: words[0].length,
    deleting: false,
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { delay, state: next } = typewriterStep(state, words);
    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, words]);

  return words[state.index].slice(0, state.length);
}
