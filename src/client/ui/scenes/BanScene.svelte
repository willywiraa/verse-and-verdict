<script lang="ts">
  import type { Case, Option } from '@shared/court/types';
  import Character from '../rig/Character.svelte';
  import { CAST } from '../rig/cast';
  import Bubble from './kit/Bubble.svelte';
  import Particles from './kit/Particles.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';

  /**
   * Ban (3.9 s): he leans back at his desk, smug. A red marker crosses out his
   * nameplate, which cracks and drops into the bin. He packs his plant into a
   * box and walks out. An honest new boss walks in, sits down behind a fresh
   * nameplate and waves, while what the city builds rises outside.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'ban' }>;
    skip: boolean;
    /** The scene has played to the end. */
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  const cast = $state({
    harjo: actor({ mood: 'smug', pose: 'relax' }),
    boss: actor({ mood: 'happy', gait: 'walk', facing: 'right' }),
  });

  const beats: Beat<keyof typeof cast>[] = [
    { at: 0.4, who: 'harjo', set: { mood: 'worried', gaze: { x: -0.6, y: 1 } } },
    { at: 0.45, cue: 'scribble' },
    { at: 0.52, who: 'harjo', set: { mood: 'shocked', pose: 'rest' }, take: 'jolt' },
    { at: 0.62, cue: 'scribble' },
    { at: 0.85, cue: 'thud' },
    { at: 1.0, who: 'harjo', set: { gaze: { x: -1, y: 0.8 } } },
    { at: 1.35, cue: 'thud' },
    { at: 1.45, who: 'harjo', set: { mood: 'sad', gaze: { x: 0, y: 0.4 } }, take: 'sigh' },
    { at: 1.55, cue: 'pop' },
    { at: 1.8, who: 'harjo', set: { holding: 'box', pose: 'carry' } },
    { at: 1.95, who: 'harjo', set: { facing: 'left', gait: 'walk', gaze: null } },
    { at: 3.0, who: 'harjo', set: { gait: 'stand' } },
    { at: 3.3, who: 'boss', set: { gait: 'stand', facing: 'front' } },
    { at: 3.4, cue: 'twinkle' },
    { at: 3.5, who: 'boss', set: { pose: 'wave' }, take: 'nod', cue: 'pop' },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.ban, clock: () => clock, onend: () => onend?.(), skipped: () => skip });
</script>

<div class="scene ban">
  <i class="scene-clock" bind:this={clock}></i>
  <div class="wall"></div>

  <svg class="window" viewBox="0 0 120 80" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round">
      <rect x="2" y="2" width="116" height="76" rx="3" fill="#bfe6ea" />
      <g fill="#8fa3b8" stroke-width="2">
        <path d="M8 78 V44 H22 V78 Z" />
        <path d="M24 78 V30 H38 V78 Z" />
        <path d="M40 78 V52 H52 V78 Z" />
        <path d="M100 78 V38 H114 V78 Z" />
      </g>
      {#if option.builds}
        <g class="new-building tl">
          <path d="M60 78 V50 H90 V78 Z" fill="#fffdf7" />
          <path d="M57 50 L75 40 L93 50 Z" fill="#e8eef2" />
          <path d="M72 54 H78 V58 H82 V64 H78 V68 H72 V64 H68 V58 H72 Z" fill="var(--red)" stroke-width="1.4" />
        </g>
      {/if}
      <path d="M60 2 V78 M2 40 H118" fill="none" stroke-width="3" />
      <rect x="2" y="2" width="116" height="76" rx="3" fill="none" stroke-width="3" />
    </g>
  </svg>

  <svg class="certificate" viewBox="0 0 40 30" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2.2">
      <rect x="2" y="2" width="36" height="26" fill="var(--gold)" />
      <rect x="6" y="6" width="28" height="18" fill="#fffdf7" stroke-width="1.6" />
      <path d="M11 11 H29 M11 15 H29 M14 19 H26" stroke-width="1.4" />
    </g>
  </svg>

  <svg class="door" viewBox="0 0 40 120" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 2 H38 V120 H2 Z" fill="#7a5530" stroke="var(--ink)" stroke-width="2.5" vector-effect="non-scaling-stroke" />
    <path d="M8 10 H32 V52 H8 Z M8 62 H32 V110 H8 Z" fill="none" stroke="var(--ink)" stroke-width="1.6" vector-effect="non-scaling-stroke" opacity="0.6" />
  </svg>

  <svg class="chair tl" viewBox="0 0 60 80" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round">
      <path d="M8 6 Q8 2 14 2 H46 Q52 2 52 6 V60 H8 Z" fill="#5a3a2a" />
      <path d="M16 12 V52 M30 12 V52 M44 12 V52" stroke="#7a5240" stroke-width="2" fill="none" />
    </g>
  </svg>

  <div class="actor harjo tl"><Character look={file.person.look} {...cast.harjo} /></div>
  <div class="actor boss tl"><Character look={CAST.newBoss} {...cast.boss} /></div>

  <!-- The desk, with what sits on it. -->
  <svg class="plant tl" viewBox="0 0 30 34" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2" stroke-linejoin="round">
      <path d="M15 20 Q4 14 6 4 Q14 8 15 20 Z M15 20 Q26 12 25 2 Q16 8 15 20 Z" fill="var(--green)" />
      <path d="M7 20 H23 L21 33 H9 Z" fill="#c96f4a" />
    </g>
  </svg>
  <div class="floor"></div>
  <div class="desk-top"></div>
  <div class="desk-front"></div>

  <div class="plate old tl">
    <span class="sign">{option.sign}</span>
    <svg class="cross" viewBox="0 0 100 40" aria-hidden="true">
      <path class="x1 tl" d="M4 4 L96 36" pathLength="1" />
      <path class="x2 tl" d="M96 4 L4 36" pathLength="1" />
    </svg>
    <span class="crack tl"></span>
  </div>

  <svg class="pen tl" viewBox="0 0 40 40" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round">
      <path d="M4 36 L10 30 L34 6 L40 12 L16 36 L10 38 Z" fill="var(--red)" />
      <path d="M4 36 L10 30 L13 34 Z" fill="#fff" />
    </g>
  </svg>

  <svg class="box tl" viewBox="0 0 40 40" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round">
      <path d="M12 16 Q6 4 14 2 Q16 10 14 16 Z" fill="var(--green)" />
      <path d="M22 6 L32 8 L30 18 L20 16 Z" fill="#fffdf7" />
      <path d="M4 16 H36 V38 H4 Z" fill="#c9a26b" />
    </g>
  </svg>

  <div class="plate fresh tl"><span class="sign">{option.sign}</span></div>

  <svg class="bin tl" viewBox="0 0 40 50" aria-hidden="true">
    <path d="M4 6 H36 L32 48 H8 Z" fill="#8f9aa8" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round" />
    <path d="M12 14 L14 40 M20 14 V40 M28 14 L26 40" stroke="var(--ink)" stroke-width="1.6" opacity="0.5" />
  </svg>

  <Particles kind="dust" x={37} y={62} at={0.86} count={6} spread={3} />
  <Particles kind="dust" x={17} y={86} at={1.36} count={8} spread={4} />
  <Particles kind="sparkle" x={36} y={61} at={3.42} count={8} spread={5} />
  {#if option.builds}
    <Particles kind="sparkle" x={77} y={32} at={3.6} count={7} spread={4} />
  {/if}
  <Bubble text="Hmph." x={63} y={33} at={1.5} until={2.3} />
</div>

<style>
  .wall {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, transparent 0 9.6cqw, rgb(31 42 68 / 0.18) 9.6cqw 10cqw),
      linear-gradient(180deg, #cfa77c, #b98d62);
  }

  .window {
    position: absolute;
    left: 55cqw;
    top: 7cqh;
    width: 36cqw;
  }

  .new-building {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: rise 0.45s cubic-bezier(0.3, 1.5, 0.5, 1) 3.5s both;
  }

  .certificate {
    position: absolute;
    left: 13cqw;
    top: 14cqh;
    width: 12cqw;
  }

  .door {
    position: absolute;
    left: -1cqw;
    top: 14cqh;
    width: 9cqw;
    bottom: 0;
    height: 86cqh;
  }

  .chair {
    position: absolute;
    left: 41cqw;
    top: 29cqh;
    width: 18cqw;
    animation: chair 3.9s ease-in-out both;
  }

  /* Seated, feet hidden behind the desk; standing lifts them 4cqh, onto the floor. */
  .harjo {
    bottom: 3cqh;
    height: 62cqh;
    transform-origin: 50% 100%;
    transform: translate(calc(-16cqw - 50%), -4cqh);
    animation: harjo 3.9s linear both;
  }

  .boss {
    bottom: 3cqh;
    height: 60cqh;
    transform: translate(calc(50cqw - 50%), 0);
    animation: boss 3.9s linear both;
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 8cqh;
    border-top: 0.35cqw solid var(--ink);
    background: #8a5a35;
  }

  .plant {
    position: absolute;
    left: 61cqw;
    top: 57cqh;
    width: 6cqw;
    opacity: 0;
    animation: plant 3.9s linear both;
  }

  .desk-top {
    position: absolute;
    left: 22cqw;
    width: 56cqw;
    top: 66cqh;
    height: 4.5cqh;
    border: 0.35cqw solid var(--ink);
    border-radius: 0.6cqw;
    background: #b07a48;
  }

  .desk-front {
    position: absolute;
    left: 24cqw;
    width: 52cqw;
    top: 70.5cqh;
    bottom: -1cqh;
    border: 0.35cqw solid var(--ink);
    border-top: 0;
    background:
      linear-gradient(transparent 12%, rgb(31 42 68 / 0.12) 12% 13%, transparent 13%),
      #8f5f36;
  }

  .plate {
    position: absolute;
    left: 30cqw;
    top: 59cqh;
    width: 13cqw;
    height: 7cqh;
    display: grid;
    place-items: center;
    border: 0.35cqw solid var(--ink);
    border-radius: 0.5cqw;
    background: linear-gradient(180deg, #f1cf6b, var(--gold));
    box-shadow: 0 0.6cqh 0 #7a5530;
  }

  .sign {
    font-size: max(0.45rem, 1.35cqw);
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .cross {
    position: absolute;
    inset: -12%;
    width: 124%;
    height: 124%;
    overflow: visible;
  }

  .cross path {
    fill: none;
    stroke: var(--red);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-dasharray: 1;
  }

  .x1 {
    animation: draw 0.16s ease-out 0.45s both;
  }

  .x2 {
    animation: draw 0.16s ease-out 0.62s both;
  }

  .crack {
    position: absolute;
    left: 58%;
    top: 0;
    width: 1cqw;
    height: 100%;
    background: var(--ink);
    clip-path: polygon(40% 0, 70% 30%, 30% 55%, 75% 100%, 55% 100%, 15% 55%, 50% 30%, 20% 0);
    animation: appear 0.1s linear 0.85s both;
  }

  /* The old nameplate cracks, tips off the desk and drops into the bin. */
  .plate.old {
    transform-origin: 0% 100%;
    transform: translate(-11cqw, 29cqh) rotate(-100deg) scale(0.7);
    animation: drop 3.9s linear both;
  }

  .plate.fresh {
    opacity: 1;
    animation: fresh 0.35s cubic-bezier(0.3, 1.7, 0.5, 1) 3.4s both;
  }

  .pen {
    position: absolute;
    left: 0;
    top: 0;
    width: 6cqw;
    opacity: 0;
    transform: translate(18cqw, 34cqh);
    animation: pen 3.9s linear both;
  }

  .box {
    position: absolute;
    left: 59cqw;
    top: 56cqh;
    width: 7cqw;
    opacity: 0;
    animation: box 3.9s linear both;
  }

  .bin {
    position: absolute;
    left: 12cqw;
    bottom: 3cqh;
    width: 8.5cqw;
    transform-origin: 50% 100%;
    animation: jiggle 0.4s ease-out 1.35s;
  }

  @keyframes harjo {
    0% {
      transform: translate(calc(50cqw - 50%), 0) rotate(-3deg);
    }
    12%,
    37% {
      transform: translate(calc(50cqw - 50%), 0) rotate(0);
    }
    44%,
    50% {
      transform: translate(calc(50cqw - 50%), -4cqh);
    }
    77%,
    100% {
      transform: translate(calc(-16cqw - 50%), -4cqh);
    }
  }

  @keyframes boss {
    0%,
    69% {
      transform: translate(calc(-18cqw - 50%), -4cqh);
    }
    85% {
      transform: translate(calc(50cqw - 50%), -4cqh);
    }
    90%,
    100% {
      transform: translate(calc(50cqw - 50%), 0);
    }
  }

  @keyframes chair {
    0%,
    38% {
      transform: translateX(0) rotate(0);
    }
    46%,
    82% {
      transform: translateX(4cqw) rotate(4deg);
    }
    90%,
    100% {
      transform: translateX(0) rotate(0);
    }
  }

  @keyframes plant {
    0%,
    39% {
      opacity: 1;
    }
    40%,
    100% {
      opacity: 0;
    }
  }

  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
  }

  @keyframes drop {
    0%,
    24% {
      transform: translate(0, 0) rotate(0) scale(1);
      animation-timing-function: ease-in;
    }
    28% {
      transform: translate(-2cqw, 1cqh) rotate(-70deg) scale(1);
      animation-timing-function: ease-in;
    }
    35%,
    100% {
      transform: translate(-11cqw, 29cqh) rotate(-100deg) scale(0.7);
    }
  }

  @keyframes fresh {
    from {
      opacity: 0;
      transform: translateY(-3cqh) scale(0.4);
    }
  }

  @keyframes pen {
    0%,
    9% {
      opacity: 0;
      transform: translate(48cqw, 40cqh);
    }
    10% {
      opacity: 1;
      transform: translate(30cqw, 50cqh);
    }
    15.4% {
      transform: translate(41.8cqw, 55.8cqh);
    }
    15.9% {
      transform: translate(41.8cqw, 50cqh);
    }
    20% {
      opacity: 1;
      transform: translate(30cqw, 55.8cqh);
    }
    25%,
    100% {
      opacity: 0;
      transform: translate(18cqw, 34cqh);
    }
  }

  @keyframes box {
    0%,
    39.5% {
      opacity: 0;
      transform: scale(0.3);
    }
    42%,
    45.5% {
      opacity: 1;
      transform: scale(1);
    }
    46%,
    100% {
      opacity: 0;
    }
  }

  @keyframes jiggle {
    30% {
      transform: rotate(-6deg);
    }
    60% {
      transform: rotate(4deg);
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
  }
</style>
