import { onDestroy, onMount } from 'svelte';
import type { Mood, Outfit } from '@shared/court/types';
import { court } from '../../court.svelte';
import type { Facing, Gait, Gaze, Holding, Pose, Take, TakeName } from '../../rig/parts';
import type { Cue } from '../../sound';

/** Everything about a character that a scene changes as it plays. */
export interface ActorState {
  mood: Mood;
  pose: Pose;
  gait: Gait;
  facing: Facing;
  gaze: Gaze | null;
  outfit: Outfit | undefined;
  holding: Holding;
  scrub: boolean;
  take: Take | null;
}

export function actor(start: Partial<ActorState> = {}): ActorState {
  return {
    mood: 'neutral',
    pose: 'rest',
    gait: 'stand',
    facing: 'front',
    gaze: null,
    outfit: undefined,
    holding: 'none',
    scrub: false,
    take: null,
    ...start,
  };
}

/** One moment in a scene: what changes, for whom, and what it sounds like. */
export interface Beat<K extends string> {
  /** Seconds from the start of the scene. */
  at: number;
  who?: K;
  set?: Partial<ActorState>;
  /** A one-off reaction. Skipping a scene skips these. */
  take?: TakeName;
  /** A sound. Skipping a scene skips these too. */
  cue?: Cue;
}

export interface Playback {
  /** Seconds the scene lasts. */
  length: number;
  /** The scene's clock: an element with one CSS animation, started with the scene's other animations. */
  clock: () => Element | null;
  /** Called once the scene has played to the end (not when skipped). */
  onend?: () => void;
  /** True once the player skips: jump to the last frame. */
  skipped: () => boolean;
}

/**
 * Plays a scene's beats on its cast. Movement across the stage is CSS; this
 * drives the characters themselves and the sounds. It reads the time from the
 * scene's CSS clock, so the two stay in step even if the first frame is slow.
 * When the scene is skipped, every remaining change is applied at once, so the
 * scene lands on its last frame. Call it while the scene component is set up.
 */
export function playBeats<K extends string>(
  cast: Record<K, ActorState>,
  beats: readonly Beat<K>[],
  playback: Playback,
): void {
  const ordered = [...beats].sort((a, b) => a.at - b.at);
  const timers: ReturnType<typeof setTimeout>[] = [];
  let frame = 0;
  let next = 0;
  let takeId = 0;
  let finished = false;

  function apply(beat: Beat<K>, live: boolean): void {
    if (beat.who && beat.set) Object.assign(cast[beat.who], beat.set);
    if (!live) return;
    if (beat.who && beat.take) cast[beat.who].take = { name: beat.take, id: ++takeId };
    if (beat.cue) court.cue(beat.cue);
  }

  function stop(): void {
    for (const id of timers) clearTimeout(id);
    if (frame && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(frame);
  }

  /** Apply what is left, silently. */
  function finish(): void {
    if (finished) return;
    finished = true;
    stop();
    while (next < ordered.length) apply(ordered[next++], false);
  }

  function end(): void {
    if (finished) return;
    finish();
    playback.onend?.();
  }

  onMount(() => {
    if (playback.skipped()) {
      finish();
      return;
    }
    const clock = playback.clock()?.getAnimations?.()[0];
    if (clock && typeof requestAnimationFrame === 'function') {
      const tick = () => {
        if (finished) return;
        const time = Number(clock.currentTime ?? 0) / 1000;
        while (next < ordered.length && ordered[next].at <= time) apply(ordered[next++], true);
        if (time >= playback.length) end();
        else frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    } else {
      // No Web Animations (tests, very old browsers): plain timers.
      for (const beat of ordered) {
        timers.push(
          setTimeout(() => {
            if (finished) return;
            next++;
            apply(beat, true);
          }, beat.at * 1000),
        );
      }
      timers.push(setTimeout(end, playback.length * 1000));
    }
  });

  $effect(() => {
    if (playback.skipped()) finish();
  });

  onDestroy(stop);
}
