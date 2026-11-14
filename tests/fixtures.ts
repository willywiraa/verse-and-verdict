import type { Content, EchoSoul, FaithChange, Outcome, RootSoul, Soul, Verdict } from '../src/game/types';

type FaithMap = Partial<Record<Verdict, FaithChange>>;

const outcome = (tag: string, faith: FaithChange = 0): Outcome => ({
  fate: `${tag} fate`,
  verse: `${tag} verse`,
  andSo: `${tag} and so`,
  faith,
});

const eyes = { deed: 'deed', heart: 'heart', ripple: 'ripple' };

export function root(
  i: number,
  options: { echoOn?: Verdict[] | null; sameDay?: boolean; faith?: FaithMap; heavy?: boolean } = {},
): RootSoul {
  const id = `r${i}`;
  const echoOn = options.echoOn === undefined ? ['rise', 'fall'] : options.echoOn;
  const f = options.faith ?? {};
  return {
    kind: 'root',
    id,
    name: `Root ${i}`,
    age: 40,
    death: 'Old age.',
    emblem: 'wheat',
    hue: 40,
    record: `Record of ${id}`,
    plea: `Plea of ${id}`,
    eyes,
    verdicts: {
      rise: outcome(`${id} rise`, f.rise),
      return: outcome(`${id} return`, f.return),
      fall: outcome(`${id} fall`, f.fall),
    },
    heavy: options.heavy,
    echo: echoOn ? { soul: `e${i}`, on: echoOn as Verdict[], sameDay: options.sameDay } : undefined,
  };
}

export function echo(i: number, on: Verdict[] = ['rise', 'fall'], faith: FaithMap = {}): EchoSoul {
  const id = `e${i}`;
  return {
    kind: 'echo',
    id,
    name: `Echo ${i}`,
    age: 30,
    death: 'A fever.',
    emblem: 'lock',
    hue: 200,
    origin: `r${i}`,
    eyes,
    verdicts: {
      rise: outcome(`${id} rise`, faith.rise),
      return: outcome(`${id} return`, faith.return),
      fall: outcome(`${id} fall`, faith.fall),
    },
    versions: Object.fromEntries(on.map((v) => [v, { record: `${id} record after ${v}`, plea: `${id} plea after ${v}` }])),
  };
}

/**
 * `rootCount` roots r0…, each with an Echo e0… summoned on Rise and Fall.
 * r0 is the teaching soul: its Echo comes the same Day on any verdict.
 */
export function content(rootCount: number, options: { faith?: FaithMap; heavy?: number[] } = {}): Content {
  const souls: Soul[] = [];
  for (let i = 0; i < rootCount; i++) {
    const teaching = i === 0;
    const on: Verdict[] = teaching ? ['rise', 'return', 'fall'] : ['rise', 'fall'];
    souls.push(root(i, { echoOn: on, sameDay: teaching || undefined, faith: options.faith, heavy: options.heavy?.includes(i) }));
    souls.push(echo(i, on, options.faith));
  }
  return { souls, dayOne: ['r0', 'r1', 'r2', 'r3', 'r4'] };
}
