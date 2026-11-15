<script lang="ts">
  import type { Case, Option } from '../../court/types';
  import Character from '../rig/Character.svelte';
  import { CAST } from '../rig/cast';
  import Bubble from './kit/Bubble.svelte';
  import Particles from './kit/Particles.svelte';
  import Puff from './kit/Puff.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';

  /**
   * Community service, in a hospital ward (3.9 s): a puff and he's in overalls
   * with a mop. He mops across the muddy floor, which shines behind him. The
   * patient points at a spot he missed; he goes back for it, then leans on the
   * mop, worn out, while the floor gleams.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'service' }>;
    skip: boolean;
    /** The scene has played to the end. */
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  // The ward, with its patient and nurse, is for hospitals; other places get a plain floor for now.
  const ward = $derived(option.place === 'hospital');

  const cast = $state({
    harjo: actor({ mood: 'shocked' }),
    patient: actor({ mood: 'neutral', facing: 'left' }),
    nurse: actor({ mood: 'neutral', pose: 'clipboard', holding: 'clipboard', gaze: { x: 1, y: 0.2 } }),
  });

  const beats: Beat<keyof typeof cast>[] = [
    { at: 0.3, cue: 'pop' },
    { at: 0.5, who: 'harjo', set: { outfit: 'overalls', holding: 'mop', pose: 'mop', mood: 'grumpy', gaze: { x: 0.4, y: 0.9 } } },
    { at: 0.7, who: 'harjo', set: { scrub: true, gait: 'walk' } },
    { at: 0.95, cue: 'squeak' },
    { at: 1.5, cue: 'squeak' },
    { at: 1.45, who: 'nurse', set: { mood: 'grumpy' }, take: 'nod' },
    { at: 2.05, cue: 'squeak' },
    { at: 2.5, who: 'harjo', set: { scrub: false, gait: 'stand', gaze: { x: 0.8, y: -0.2 } } },
    { at: 2.55, who: 'patient', set: { pose: 'point', mood: 'grumpy' }, take: 'jolt', cue: 'pop' },
    { at: 2.72, who: 'harjo', set: { facing: 'left', mood: 'shocked', gaze: null }, take: 'jolt' },
    { at: 2.85, who: 'harjo', set: { gait: 'walk', scrub: true, mood: 'grumpy' } },
    { at: 3.05, cue: 'twinkle' },
    { at: 3.12, who: 'harjo', set: { gait: 'stand', scrub: false, facing: 'front', mood: 'worried', gaze: null }, take: 'sigh' },
    { at: 3.3, who: 'patient', set: { pose: 'rest', mood: 'happy' }, take: 'nod' },
    { at: 3.35, who: 'nurse', set: { mood: 'happy' }, take: 'nod' },
    { at: 3.35, cue: 'twinkle' },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.service, clock: () => clock, onend: () => onend?.(), skipped: () => skip });

  /** Dirt on the floor, in cqw, and when the mop reaches it. The second one is missed at first. */
  const SPOTS = [
    { x: 34, at: 0.88 },
    { x: 40, at: 3.0 },
    { x: 46, at: 1.48 },
    { x: 52, at: 1.84 },
    { x: 58, at: 2.2 },
  ];
</script>

<div class="scene service">
  <i class="scene-clock" bind:this={clock}></i>
  <div class="wall"></div>
  <div class="dado"></div>

  <svg class="window" viewBox="0 0 64 52" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
      <rect x="2" y="2" width="60" height="48" rx="3" fill="#bfe6ea" />
      <path d="M14 20 Q14 13 21 13 Q24 8 30 10 Q36 8 38 14 Q44 14 44 20 Z" fill="#fffdf7" stroke-width="2" />
      <path d="M32 2 V50 M2 26 H62" fill="none" />
    </g>
  </svg>
  <svg class="plaque" viewBox="0 0 30 30" aria-hidden="true">
    <rect x="2" y="2" width="26" height="26" rx="4" fill="#fffdf7" stroke="var(--ink)" stroke-width="2.5" />
    <path d="M12 7 H18 V12 H23 V18 H18 V23 H12 V18 H7 V12 H12 Z" fill="var(--red)" stroke="var(--ink)" stroke-width="1.6" />
  </svg>
  <svg class="clock" viewBox="0 0 30 30" aria-hidden="true">
    <circle cx="15" cy="15" r="13" fill="#fffdf7" stroke="var(--ink)" stroke-width="2.5" />
    <path d="M15 15 V6" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
    <path d="M15 15 L20 18" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
  </svg>

  {#if ward}
    <svg class="iv" viewBox="0 0 20 100" aria-hidden="true">
      <g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
        <path d="M10 8 V96 M3 96 H17" fill="none" />
        <path d="M4 10 H16 V30 Q10 34 4 30 Z" fill="#cfe8f4" />
      </g>
    </svg>
    <svg class="bed" viewBox="0 0 120 60" aria-hidden="true">
      <g stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round">
        <path d="M108 4 H116 V58 H108 Z" fill="#c9ced8" />
        <path d="M6 30 V58 M100 30 V58" fill="none" />
        <path d="M4 22 H110 V34 H4 Z" fill="#e8eef2" />
        <path d="M84 12 Q84 8 88 8 H104 Q108 8 108 12 V22 H84 Z" fill="#fffdf7" />
      </g>
    </svg>
    <div class="actor patient"><Character look={CAST.patient} {...cast.patient} /></div>
    <svg class="blanket" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 48 Q0 18 22 14 Q46 4 70 10 Q92 12 98 30 V48 Z"
        fill="#9ec5e8"
        stroke="var(--ink)"
        stroke-width="2.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>
    <div class="actor nurse"><Character look={CAST.nurse} {...cast.nurse} /></div>
  {/if}

  <div class="floor">
    <div class="clean tl"></div>
    <div class="gleam-track"><div class="gleam tl"></div></div>
    {#each SPOTS as spot (spot.x)}
      <span class="spot tl" style:left="{spot.x}cqw" style:--at="{spot.at}s"></span>
    {/each}
    {#each [31, 37, 43, 49, 55, 61] as x, i (x)}
      <span class="print tl" style:left="{x}cqw" style:--at="{0.75 + i * 0.32}s" class:up={i % 2 === 1}></span>
    {/each}
  </div>

  <div class="actor harjo tl">
    <Character look={file.person.look} {...cast.harjo} />
    <Puff at={0.3} />
  </div>

  {#each SPOTS as spot (spot.x)}
    <Particles kind="sparkle" x={spot.x} y={88} at={spot.at + 0.05} count={6} spread={3} />
  {/each}
  <Particles kind="drop" x={48} y={30} at={3.2} count={4} spread={3} />
  <Particles kind="sparkle" x={38} y={86} at={3.4} count={7} spread={6} />
  <Particles kind="sparkle" x={54} y={88} at={3.5} count={7} spread={6} />
  {#if ward}
    <Bubble text="Missed a spot!" x={74} y={28} at={2.55} until={3.25} tail="right" />
  {/if}
</div>

<style>
  .wall {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #e2f1ea, #d3e9df);
  }

  .dado {
    position: absolute;
    left: 0;
    right: 0;
    top: 52%;
    bottom: 0;
    border-top: 0.3cqw solid var(--ink);
    background:
      repeating-linear-gradient(90deg, transparent 0 5.8cqw, rgb(31 42 68 / 0.12) 5.8cqw 6cqw),
      repeating-linear-gradient(0deg, transparent 0 5.8cqw, rgb(31 42 68 / 0.12) 5.8cqw 6cqw),
      #eef7f3;
  }

  .window {
    position: absolute;
    left: 5cqw;
    top: 9cqh;
    width: 17cqw;
  }

  .plaque {
    position: absolute;
    left: 40cqw;
    top: 11cqh;
    width: 5.5cqw;
  }

  .clock {
    position: absolute;
    left: 52cqw;
    top: 10cqh;
    width: 5.5cqw;
  }

  .iv {
    position: absolute;
    left: 63cqw;
    bottom: 7cqh;
    height: 46cqh;
  }

  .bed {
    position: absolute;
    left: 64cqw;
    bottom: 6cqh;
    width: 33cqw;
  }

  .patient {
    bottom: 12.5cqh;
    height: 50cqh;
    transform: translateX(calc(80cqw - 50%));
  }

  .blanket {
    position: absolute;
    left: 66cqw;
    bottom: 10cqh;
    width: 29cqw;
    height: 26cqh;
  }

  .nurse {
    bottom: 7cqh;
    height: 58cqh;
    transform: translateX(calc(12cqw - 50%));
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 16cqh;
    border-top: 0.35cqw solid var(--ink);
    background: linear-gradient(180deg, #c7b48c, #b9a67d);
  }

  /* The clean, shiny part of the floor grows behind the mop. */
  .clean {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgb(255 255 255 / 0.55), transparent 45%),
      #efe6d2;
    clip-path: inset(0 39% 0 29%);
    animation: clean 3.9s linear both;
  }

  .gleam-track {
    position: absolute;
    left: 29cqw;
    width: 32cqw;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .gleam {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 6cqw;
    background: linear-gradient(100deg, transparent, rgb(255 255 255 / 0.9), transparent);
    transform: translateX(40cqw) skewX(-20deg);
    animation: gleam 0.7s ease-in-out 3.2s both;
  }

  .spot {
    position: absolute;
    top: 30%;
    width: 4.6cqw;
    height: 2.2cqw;
    margin-left: -2.3cqw;
    border-radius: 50% 45% 55% 50%;
    background: #7c5b33;
    opacity: 0;
    animation: wipe 0.25s ease-out var(--at) both;
  }

  .print {
    position: absolute;
    top: 64%;
    width: 1.6cqw;
    height: 0.9cqw;
    border-radius: 50%;
    background: #7c5b33;
    opacity: 0;
    animation: wipe 0.2s ease-out var(--at) both;
  }

  .print.up {
    top: 48%;
  }

  .harjo {
    bottom: 6cqh;
    height: 62cqh;
    transform: translateX(calc(46cqw - 50%));
    animation: harjo 3.9s linear both;
  }

  @keyframes harjo {
    0%,
    17.9% {
      transform: translateX(calc(26cqw - 50%));
    }
    64.1%,
    73.1% {
      transform: translateX(calc(56cqw - 50%));
      animation-timing-function: ease-in-out;
    }
    79.5%,
    100% {
      transform: translateX(calc(46cqw - 50%));
    }
  }

  @keyframes clean {
    0%,
    17.9% {
      clip-path: inset(0 71% 0 29%);
    }
    64.1%,
    100% {
      clip-path: inset(0 39% 0 29%);
    }
  }

  @keyframes wipe {
    from {
      opacity: 0.85;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.6);
    }
  }

  @keyframes gleam {
    from {
      transform: translateX(-8cqw) skewX(-20deg);
    }
  }
</style>
