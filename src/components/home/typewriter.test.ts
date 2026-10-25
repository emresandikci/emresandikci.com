import { describe, expect, it } from 'vitest';
import { typewriterStep } from './typewriter';

const words = ['ab', 'cde'] as const;

describe('typewriterStep', () => {
  it('pauses on a full word, then starts deleting', () => {
    expect(typewriterStep({ index: 0, length: 2, deleting: false }, words)).toEqual({
      state: { index: 0, length: 2, deleting: true },
      delay: 1600,
    });
  });

  it('deletes one character at a time', () => {
    expect(typewriterStep({ index: 0, length: 2, deleting: true }, words)).toEqual({
      state: { index: 0, length: 1, deleting: true },
      delay: 35,
    });
  });

  it('moves to the next word once deleted', () => {
    expect(typewriterStep({ index: 0, length: 0, deleting: true }, words)).toEqual({
      state: { index: 1, length: 0, deleting: false },
      delay: 300,
    });
  });

  it('types one character at a time', () => {
    expect(typewriterStep({ index: 1, length: 1, deleting: false }, words)).toEqual({
      state: { index: 1, length: 2, deleting: false },
      delay: 70,
    });
  });

  it('wraps from the last word to the first', () => {
    expect(typewriterStep({ index: 1, length: 0, deleting: true }, words).state.index).toBe(0);
  });
});
