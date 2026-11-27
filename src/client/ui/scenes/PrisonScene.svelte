<script lang="ts">
  import type { Case, Option } from '@shared/court/types';
  import Character from '../rig/Character.svelte';
  import Bubble from './kit/Bubble.svelte';
  import Particles from './kit/Particles.svelte';
  import Puff from './kit/Puff.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';

  /**
   * Prison (3.6 s): a puff and he's in orange. He edges toward the open door,
   * which slides shut with a clang. He grips the bars and sighs while the
   * sunlight crosses the floor and the years are scratched onto the wall.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'prison' }>;
    skip: boolean;
    /** The scene has played to the end. */
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  const cast = $state({ harjo: actor({ mood: 'shocked' }) });

  const beats: Beat<'harjo'>[] = [
    { at: 0.35, cue: 'pop' },
    { at: 0.55, who: 'harjo', set: { outfit: 'prison', mood: 'worried', gaze: { x: 0.9, y: 0 } } },
    { at: 0.8, who: 'harjo', set: { gait: 'walk', facing: 'right', gaze: null } },
    { at: 1.3, who: 'harjo', set: { gait: 'stand', mood: 'shocked' } },
    { at: 1.62, who: 'harjo', take: 'jolt', cue: 'clang' },
    { at: 1.95, who: 'harjo', set: { facing: 'front', pose: 'bars', mood: 'sad', gaze: { x: 0, y: 0.2 } } },
    { at: 2.35, who: 'harjo', take: 'sigh' },
    { at: 2.45, cue: 'count' },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.prison, clock: () => clock, onend: () => onend?.(), skipped: () => skip });

  // Tally marks in groups of five, at most 50.
  const marks = $derived(
    Array.from({ length: Math.min(option.years, 50) }, (_, i) => ({
      i,
      group: Math.floor(i / 5),
      fifth: i % 5 === 4,
      x: Math.floor(i / 5) * 22 + (i % 5) * 4,
    })),
  );
  const groups = $derived(Math.max(1, Math.ceil(marks.length / 5)));
</script>

<div class="scene prison tl">
  <i class="scene-clock" bind:this={clock}></i>
  <div class="wall"></div>

  <svg class="window" viewBox="0 0 60 40" aria-hidden="true">
    <rect x="2" y="2" width="56" height="36" rx="3" fill="#bfe6ea" stroke="var(--ink)" stroke-width="3" />
    <circle class="sun" cx="40" cy="14" r="6" fill="var(--gold)" />
    <path d="M14 2 V38 M30 2 V38 M46 2 V38" stroke="#5b6478" stroke-width="4" />
    <rect x="2" y="2" width="56" height="36" rx="3" fill="none" stroke="var(--ink)" stroke-width="3" />
  </svg>
  <div class="beam tl"></div>

  <div class="tally" aria-hidden="true">
    <svg viewBox="-3 0 {groups * 22 + 2} 24" preserveAspectRatio="xMinYMid meet">
      {#each marks as m (m.i)}
        <path
          class="mark tl"
          d={m.fifth ? `M${m.group * 22 - 2} 18 L${m.group * 22 + 16} 4` : `M${m.x} 2 L${m.x} 22`}
          style:--d="{2.45 + m.i * 0.045}s"
        />
      {/each}
    </svg>
    <span class="years tl">{option.detail}</span>
  </div>

  <svg class="cot" viewBox="0 0 100 50" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
      <path d="M4 22 H96 V34 H4 Z" fill="#8e96a6" />
      <path d="M8 14 H92 Q96 14 96 18 V24 H4 V18 Q4 14 8 14 Z" fill="#e8eef2" />
      <path d="M10 10 H34 Q38 10 38 14 V18 H6 V14 Q6 10 10 10 Z" fill="#fffdf7" />
      <path d="M10 34 V48 M90 34 V48" fill="none" />
    </g>
  </svg>

  <div class="floor"></div>

  <div class="actor harjo tl">
    <Character look={file.person.look} {...cast.harjo} />
    <Puff at={0.35} />
  </div>

  <svg class="door tl" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <g fill="#5b6478" stroke="var(--ink)" stroke-width="2" vector-effect="non-scaling-stroke">
      {#each Array.from({ length: 12 }, (_, i) => 3 + i * 8.6) as x (x)}
        <rect {x} y="-2" width="2.8" height="104" vector-effect="non-scaling-stroke" />
      {/each}
      <rect x="0" y="16" width="100" height="3.4" vector-effect="non-scaling-stroke" />
      <rect x="0" y="74" width="100" height="3.4" vector-effect="non-scaling-stroke" />
      <rect x="0.5" y="40" width="5" height="14" rx="1" fill="#8f9aa8" vector-effect="non-scaling-stroke" />
      <rect x="2.4" y="45" width="1.2" height="4" fill="var(--ink)" stroke="none" />
    </g>
  </svg>

  <Particles kind="dust" x={4} y={90} at={1.62} count={12} spread={7} />
  <Particles kind="dust" x={50} y={92} at={1.62} count={8} spread={6} />
  <Bubble text="Sigh…" x={70} y={26} at={2.4} until={3.4} />
</div>

<style>
  .prison {
    animation: shake 0.3s ease-out 1.62s;
  }

  .wall {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent 0 4.2cqh, rgb(31 42 68 / 0.16) 4.2cqh 4.7cqh),
      repeating-linear-gradient(90deg, transparent 0 7.6cqw, rgb(31 42 68 / 0.1) 7.6cqw 8cqw),
      linear-gradient(180deg, #c3c9d4, #aeb6c3);
  }

  .window {
    position: absolute;
    left: 13%;
    top: 9%;
    width: 13%;
  }

  .sun {
    animation: glow 3s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  /* Sunlight through the window: it swings across the floor as the years pass. */
  .beam {
    position: absolute;
    left: 11%;
    top: 31%;
    width: 30%;
    height: 56%;
    background: linear-gradient(180deg, rgb(255 244 200 / 0.55), rgb(255 244 200 / 0.12));
    clip-path: polygon(8% 0, 46% 0, 100% 100%, 34% 100%);
    transform-origin: 26% 0;
    transform: rotate(14deg);
    animation: sweep 1.3s ease-in-out 2.15s both;
  }

  .tally {
    position: absolute;
    left: 3%;
    top: 38%;
    width: 15%;
    display: flex;
    flex-direction: column;
    gap: 0.4cqh;
  }

  .tally svg {
    width: 100%;
    max-height: 9cqh;
    overflow: visible;
  }

  .mark {
    fill: none;
    stroke: var(--ink);
    stroke-width: 2.5;
    stroke-linecap: round;
    animation: scratch 0.12s ease-out var(--d) both;
  }

  .years {
    font-weight: 900;
    font-size: max(0.7rem, 2.6cqw);
    text-transform: uppercase;
    animation: appear 0.3s ease-out 2.3s both;
  }

  .cot {
    position: absolute;
    right: 3%;
    bottom: 12%;
    width: 25%;
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 15%;
    border-top: 0.35cqw solid var(--ink);
    background: linear-gradient(180deg, #969eae, #858d9d);
  }

  .harjo {
    bottom: 5%;
    height: 68%;
    transform-origin: 50% 100%;
    transform: translateX(calc(60cqw - 50%)) scale(1.06);
    animation: harjo 3.6s linear both;
  }

  /* The barred door slides in from the right and slams shut. */
  .door {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
    animation: door 3.6s linear both;
  }

  @keyframes harjo {
    0%,
    22% {
      transform: translateX(calc(46cqw - 50%)) scale(1);
      animation-timing-function: ease-in-out;
    }
    36%,
    54% {
      transform: translateX(calc(60cqw - 50%)) scale(1);
      animation-timing-function: ease-out;
    }
    64%,
    100% {
      transform: translateX(calc(60cqw - 50%)) scale(1.06);
    }
  }

  @keyframes door {
    0%,
    36% {
      transform: translateX(102cqw);
      animation-timing-function: cubic-bezier(0.55, 0, 0.9, 0.5);
    }
    45% {
      transform: translateX(-1.2cqw);
    }
    48% {
      transform: translateX(0.7cqw);
    }
    51%,
    100% {
      transform: translateX(0);
    }
  }

  @keyframes sweep {
    from {
      transform: rotate(-10deg);
    }
  }

  @keyframes glow {
    50% {
      transform: scale(1.15);
    }
  }

  @keyframes scratch {
    from {
      opacity: 0;
      stroke-dasharray: 30;
      stroke-dashoffset: 30;
    }
    to {
      opacity: 1;
      stroke-dasharray: 30;
      stroke-dashoffset: 0;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
  }

  @keyframes shake {
    20% {
      transform: translate(-0.8cqw, 0.4cqh);
    }
    45% {
      transform: translate(0.6cqw, -0.4cqh);
    }
    70% {
      transform: translate(-0.4cqw, 0.2cqh);
    }
  }
</style>
