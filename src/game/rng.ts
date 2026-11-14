/**
 * Small seeded PRNG (mulberry32). Integer maths only, so the same seed
 * gives the same sequence in every browser.
 */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
}

/** Fisher–Yates shuffle driven by a seed. Returns a new array. */
export function shuffle<T>(items: readonly T[], seed: number): T[] {
  const next = createRng(seed);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
