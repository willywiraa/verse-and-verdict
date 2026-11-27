import { cityOf, crowdOf, decided, type DayState } from './court';
import { SEVERITY, TITLE_GROUP, type Case, type CourtContent, type JudgeTitle, type Option, type Pictures } from './types';

export const TITLES: Readonly<Record<JudgeTitle, { name: string; line: string }>> = {
  iron: { name: 'Iron Judge', line: 'Rules are rules.' },
  fixer: { name: 'Fixer Judge', line: 'Fix the damage first.' },
  kind: { name: 'Kind Judge', line: 'Everyone gets a chance.' },
  balanced: { name: 'Balanced Judge', line: 'A bit of everything.' },
};

/** The judge title for a day: the group used most, if it was used at least 3 times and more than any other. */
export function judgeTitle(options: readonly Option[]): JudgeTitle {
  const counts = { iron: 0, fixer: 0, kind: 0 };
  for (const option of options) counts[TITLE_GROUP[option.scene]]++;
  const ranked = (Object.entries(counts) as [keyof typeof counts, number][]).sort((a, b) => b[1] - a[1]);
  const [top, second] = ranked;
  return top[1] >= 3 && top[1] > second[1] ? top[0] : 'balanced';
}

export type Leaning = 'small' | 'same' | 'big';

export interface Fairness {
  /** The case with the smallest amount, and the one with the largest. */
  small: Case;
  big: Case;
  smallSeverity: number;
  bigSeverity: number;
  /** Who was treated more harshly. */
  leaning: Leaning;
}

/** Compare the smallest crime of the day with the largest. Null until both have a verdict. */
export function fairness(verdicts: readonly { case: Case; option: Option }[]): Fairness | null {
  if (verdicts.length < 2) return null;
  const byAmount = [...verdicts].sort((a, b) => a.case.amount - b.case.amount);
  const small = byAmount[0];
  const big = byAmount[byAmount.length - 1];
  if (small.case.amount === big.case.amount) return null;
  const smallSeverity = SEVERITY[small.option.scene];
  const bigSeverity = SEVERITY[big.option.scene];
  const leaning: Leaning = smallSeverity > bigSeverity ? 'small' : smallSeverity < bigSeverity ? 'big' : 'same';
  return { small: small.case, big: big.case, smallSeverity, bigSeverity, leaning };
}

/** The fairness scale in words. It describes; it never grades. */
export function fairnessLine(f: Fairness): string {
  if (f.leaning === 'small') return `You were tougher on ${f.small.nickname}.`;
  if (f.leaning === 'big') return `You were tougher on ${f.big.nickname}.`;
  return `Same treatment for ${f.small.nickname} and ${f.big.nickname}.`;
}

export type CrowdMood = 'furious' | 'unhappy' | 'calm' | 'happy' | 'cheering';

export function crowdMood(crowd: number): CrowdMood {
  if (crowd <= 2) return 'furious';
  if (crowd <= 4) return 'unhappy';
  if (crowd <= 6) return 'calm';
  if (crowd <= 8) return 'happy';
  return 'cheering';
}

export interface DayReport {
  title: JudgeTitle;
  crowd: number;
  mood: CrowdMood;
  built: Pictures[];
  verdicts: { case: Case; option: Option }[];
  fairness: Fairness | null;
}

export function dayReport(state: DayState, content: CourtContent): DayReport {
  const verdicts = decided(state, content);
  const crowd = crowdOf(state, content);
  return {
    title: judgeTitle(verdicts.map((v) => v.option)),
    crowd,
    mood: crowdMood(crowd),
    built: cityOf(state, content),
    verdicts,
    fairness: fairness(verdicts),
  };
}
