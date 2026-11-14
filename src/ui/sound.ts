/**
 * Small synthesized cues (Web Audio, no sound files). Bell-like tones from
 * three inharmonic sine partials with an exponential decay.
 */
export type Cue = 'eye' | 'rise' | 'return' | 'fall' | 'day';

/** [frequency Hz, delay s, length s, volume] for each strike. */
const CUES: Readonly<Record<Cue, readonly (readonly [number, number, number, number])[]>> = {
  eye: [[1320, 0, 0.3, 0.04]],
  rise: [
    [880, 0, 1.6, 0.14],
    [1320, 0.12, 1.2, 0.06],
  ],
  return: [
    [660, 0, 1.4, 0.13],
    [495, 0.18, 1.2, 0.07],
  ],
  fall: [[247, 0, 1.8, 0.18]],
  day: [
    [523, 0, 1.2, 0.08],
    [784, 0.25, 1.6, 0.08],
  ],
};

const PARTIALS = [1, 2.76, 5.4];

let context: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  context ??= new AudioContext();
  if (context.state === 'suspended') void context.resume();
  return context;
}

function strike(ac: AudioContext, frequency: number, at: number, length: number, volume: number): void {
  PARTIALS.forEach((ratio, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency * ratio;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(volume / (i + 1.5), at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length / (i + 1));
    osc.connect(gain).connect(ac.destination);
    osc.start(at);
    osc.stop(at + length);
  });
}

export function playCue(cue: Cue): void {
  const ac = audio();
  if (!ac) return;
  for (const [frequency, delay, length, volume] of CUES[cue]) {
    strike(ac, frequency, ac.currentTime + delay, length, volume);
  }
}
