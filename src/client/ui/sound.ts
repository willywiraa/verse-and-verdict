/**
 * Small synthesized cues (Web Audio, no sound files): bells from inharmonic
 * sine partials, simple oscillator tones, and filtered noise for thuds,
 * paper and crowds.
 */
export type Cue =
  // The courtroom
  | 'flip'
  | 'select'
  | 'count'
  | 'gavel'
  | 'stamp'
  | 'clang'
  | 'coins'
  | 'cheer'
  | 'boo'
  | 'murmur'
  | 'whoosh'
  | 'pop'
  | 'squeak'
  | 'rumble'
  | 'scribble'
  | 'thud'
  | 'twinkle'
  // The earlier soul game, removed with it
  | 'eye'
  | 'rise'
  | 'return'
  | 'fall'
  | 'day';

type Note =
  | { bell: number; at?: number; len: number; vol: number }
  | { wave: OscillatorType; f: number; to?: number; at?: number; len: number; vol: number }
  | { noise: BiquadFilterType; f: number; to?: number; q?: number; at?: number; attack?: number; len: number; vol: number };

const bells = (freqs: number[], step: number, len: number, vol: number, start = 0): Note[] =>
  freqs.map((bell, i) => ({ bell, at: start + i * step, len, vol }));

const CUES: Readonly<Record<Cue, readonly Note[]>> = {
  flip: [
    { noise: 'bandpass', f: 2600, q: 0.9, len: 0.09, vol: 0.3 },
    { noise: 'highpass', f: 4200, at: 0.05, len: 0.06, vol: 0.14 },
  ],
  select: [{ wave: 'triangle', f: 660, to: 880, len: 0.09, vol: 0.09 }],
  count: Array.from({ length: 9 }, (_, i) => ({ wave: 'square' as const, f: 1500 + i * 60, at: i * 0.09, len: 0.025, vol: 0.025 })),
  gavel: [
    { noise: 'lowpass', f: 380, len: 0.28, vol: 1 },
    { wave: 'sine', f: 95, to: 48, len: 0.32, vol: 0.55 },
    { noise: 'bandpass', f: 1900, q: 2, len: 0.05, vol: 0.35 },
  ],
  stamp: [
    { noise: 'lowpass', f: 900, len: 0.13, vol: 0.7 },
    { wave: 'sine', f: 150, to: 80, len: 0.13, vol: 0.3 },
  ],
  clang: [
    { wave: 'square', f: 220, len: 0.5, vol: 0.05 },
    { wave: 'square', f: 331, len: 0.45, vol: 0.035 },
    { bell: 880, len: 0.9, vol: 0.06 },
    { noise: 'highpass', f: 3000, len: 0.12, vol: 0.18 },
  ],
  coins: [...bells([1760, 2217, 2637], 0.07, 0.3, 0.05), ...bells([1976, 2349], 0.08, 0.3, 0.04, 0.24)],
  cheer: [
    { noise: 'bandpass', f: 1300, q: 0.6, attack: 0.25, len: 1.3, vol: 0.4 },
    ...bells([1046, 1318], 0.12, 0.5, 0.03, 0.1),
  ],
  boo: [
    { wave: 'sawtooth', f: 165, to: 120, len: 0.95, vol: 0.06 },
    { wave: 'sawtooth', f: 124, to: 96, at: 0.06, len: 0.95, vol: 0.045 },
    { noise: 'lowpass', f: 520, attack: 0.2, len: 0.95, vol: 0.22 },
  ],
  murmur: [{ noise: 'bandpass', f: 620, q: 0.8, attack: 0.2, len: 0.8, vol: 0.22 }],
  whoosh: [{ noise: 'bandpass', f: 500, to: 2600, q: 1.2, attack: 0.15, len: 0.38, vol: 0.32 }],
  pop: [{ wave: 'sine', f: 480, to: 960, len: 0.1, vol: 0.12 }],
  squeak: [
    { wave: 'sine', f: 1400, to: 2100, len: 0.09, vol: 0.05 },
    { wave: 'sine', f: 1700, to: 1300, at: 0.1, len: 0.08, vol: 0.04 },
  ],
  rumble: [
    { wave: 'sawtooth', f: 52, to: 70, len: 1.1, vol: 0.05 },
    { noise: 'lowpass', f: 260, attack: 0.15, len: 1.1, vol: 0.28 },
  ],
  scribble: [
    { noise: 'bandpass', f: 3200, to: 2200, q: 3, len: 0.16, vol: 0.2 },
    { noise: 'bandpass', f: 2400, to: 3400, q: 3, at: 0.16, len: 0.14, vol: 0.18 },
  ],
  thud: [
    { noise: 'lowpass', f: 300, len: 0.22, vol: 0.8 },
    { wave: 'sine', f: 120, to: 60, len: 0.2, vol: 0.35 },
  ],
  twinkle: bells([2093, 2637, 3136], 0.06, 0.35, 0.035),

  eye: bells([1320], 0, 0.3, 0.04),
  rise: [...bells([880], 0, 1.6, 0.14), ...bells([1320], 0, 1.2, 0.06, 0.12)],
  return: [...bells([660], 0, 1.4, 0.13), ...bells([495], 0, 1.2, 0.07, 0.18)],
  fall: bells([247], 0, 1.8, 0.18),
  day: [...bells([523], 0, 1.2, 0.08), ...bells([784], 0, 1.6, 0.08, 0.25)],
};

const PARTIALS = [1, 2.76, 5.4];

let context: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

function audio(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  context ??= new AudioContext();
  if (context.state === 'suspended') void context.resume();
  return context;
}

/** One second of white noise, made once and reused. */
function noise(ac: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    noiseBuffer = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function envelope(ac: AudioContext, at: number, attack: number, len: number, vol: number): GainNode {
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), at + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + len);
  gain.connect(ac.destination);
  return gain;
}

function play(ac: AudioContext, note: Note, start: number): void {
  const at = start + (note.at ?? 0);
  if ('bell' in note) {
    PARTIALS.forEach((ratio, i) => {
      const osc = ac.createOscillator();
      osc.frequency.value = note.bell * ratio;
      osc.connect(envelope(ac, at, 0.01, note.len / (i + 1), note.vol / (i + 1.5)));
      osc.start(at);
      osc.stop(at + note.len);
    });
  } else if ('wave' in note) {
    const osc = ac.createOscillator();
    osc.type = note.wave;
    osc.frequency.setValueAtTime(note.f, at);
    if (note.to) osc.frequency.exponentialRampToValueAtTime(note.to, at + note.len);
    osc.connect(envelope(ac, at, 0.008, note.len, note.vol));
    osc.start(at);
    osc.stop(at + note.len);
  } else {
    const source = ac.createBufferSource();
    source.buffer = noise(ac);
    const filter = ac.createBiquadFilter();
    filter.type = note.noise;
    filter.frequency.setValueAtTime(note.f, at);
    if (note.to) filter.frequency.exponentialRampToValueAtTime(note.to, at + note.len);
    filter.Q.value = note.q ?? 1;
    source.connect(filter).connect(envelope(ac, at, note.attack ?? 0.005, note.len, note.vol));
    source.start(at);
    source.stop(at + note.len);
  }
}

export function playCue(cue: Cue): void {
  const ac = audio();
  if (!ac) return;
  for (const note of CUES[cue]) play(ac, note, ac.currentTime);
}
