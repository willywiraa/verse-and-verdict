const UNITS: [number, string][] = [
  [1e12, 'trillion'],
  [1e9, 'billion'],
  [1e6, 'million'],
];

/**
 * Rupiah in plain English: "Rp50,000", "Rp30 million", "Rp1.5 billion".
 * Large amounts use words, because a row of zeros is hard to read at a glance.
 */
export function formatRp(amount: number): string {
  const value = Math.max(0, Math.round(amount));
  for (const [size, word] of UNITS) {
    if (value >= size) {
      const scaled = Math.round((value / size) * 10) / 10;
      return `Rp${scaled.toLocaleString('en-US')} ${word}`;
    }
  }
  return `Rp${value.toLocaleString('en-US')}`;
}
