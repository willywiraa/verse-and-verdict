const NIGHT_DEEP = '#0f1226';
const NIGHT = '#1b1f3b';
const DAWN = '#4a3f6b';
const DUSK = '#d98c5f';
const GOLD = '#e9b97a';

export interface Sky {
  top: string;
  bottom: string;
}

export const NIGHT_SKY: Sky = { top: NIGHT_DEEP, bottom: NIGHT };

function channel(hex: string, i: number): number {
  return parseInt(hex.slice(1 + 2 * i, 3 + 2 * i), 16);
}

export function mix(a: string, b: string, t: number): string {
  return `#${[0, 1, 2]
    .map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;
}

/** Pre-dawn indigo for the first soul of a Day, dusk gold for the last (GDD §8.2). */
export function daySky(index: number, count: number): Sky {
  const t = count > 1 ? Math.min(1, index / (count - 1)) : 0;
  if (t <= 0.5) {
    const u = t / 0.5;
    return { top: mix(NIGHT, DAWN, u), bottom: mix(DAWN, DUSK, u) };
  }
  const u = (t - 0.5) / 0.5;
  return { top: mix(DAWN, DUSK, u), bottom: mix(DUSK, GOLD, u) };
}
