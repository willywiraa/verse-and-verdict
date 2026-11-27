<script lang="ts">
  import type { Case, Look, Option, Picture } from '@shared/court/types';
  import { untrack } from 'svelte';
  import { PICTURE_ICONS } from '../pictures';
  import Character from '../rig/Character.svelte';
  import { CAST } from '../rig/cast';
  import Bubble from './kit/Bubble.svelte';
  import Particles from './kit/Particles.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';
  import Car from './props/Car.svelte';

  /**
   * Second chance (3.8 s): the judge's finger wags a warning and the defendant
   * promises to do better. "1 month later…" and we find them at honest work:
   * at the bakery, the phone stall, or back on the street corner.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'chance' }>;
    skip: boolean;
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  /** Where they turn up a month later, and who works beside them. */
  const LATER: Partial<Record<Picture, { place: 'counter' | 'street'; boss: Look; goods: Picture }>> = {
    bread: { place: 'counter', boss: CAST.baker, goods: 'bread' },
    phone: { place: 'counter', boss: CAST.shopkeeper, goods: 'phone' },
    police: { place: 'street', boss: CAST.rider, goods: 'car' },
  };
  // A scene's case never changes while it plays, so these are read once.
  const later = untrack(() => LATER[option.later] ?? { place: 'counter' as const, boss: CAST.shopkeeper, goods: option.later });
  const Goods = PICTURE_ICONS[later.goods];
  const street = later.place === 'street';

  const cast = $state({
    defendant: actor({ mood: 'worried', gaze: { x: 0.8, y: -0.6 } }),
    boss: actor({ mood: 'happy' }),
  });

  const beats: Beat<keyof typeof cast>[] = [
    { at: 0.3, cue: 'pop' },
    { at: 0.9, who: 'defendant', take: 'nod' },
    { at: 1.15, who: 'defendant', set: { mood: 'relieved', gaze: null } },
    { at: 1.5, cue: 'whoosh' },
    {
      at: 1.95,
      who: 'defendant',
      set: { mood: 'happy', outfit: street ? undefined : 'apron', pose: street ? 'point' : 'wave', facing: street ? 'right' : 'front' },
    },
    { at: 1.95, who: 'boss', set: { pose: street ? 'wave' : 'thumbs', facing: street ? 'left' : 'front' } },
    { at: 2.5, who: 'boss', take: 'nod', cue: 'twinkle' },
    { at: 2.7, who: 'defendant', take: 'hop' },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.chance, clock: () => clock, onend: () => onend?.(), skipped: () => skip });
</script>

<div class="scene chance">
  <i class="scene-clock" bind:this={clock}></i>

  <!-- First: the courtroom, and a warning. -->
  <div class="court-room tl">
    <div class="panel"></div>
    <div class="floor"></div>
    <svg class="finger tl" viewBox="0 0 60 70" aria-hidden="true">
      <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <path d="M30 70 L26 44 Q20 40 22 32 L34 30 Q42 34 40 44 L38 70 Z" fill="#2e3b55" />
        <path d="M22 34 Q14 30 18 22 L32 22 Q38 24 36 32 Z" fill="#e9be94" />
        <path d="M26 24 L26 4 Q30 0 34 4 L33 24 Z" fill="#e9be94" />
      </g>
    </svg>
  </div>

  <!-- Then: a month later, at honest work. -->
  <div class="later tl" class:street>
    {#if street}
      <div class="sky"></div>
      <div class="road"></div>
      <div class="zebra"></div>
      <div class="car tl"><Car /></div>
    {:else}
      <div class="shop-wall"></div>
      <div class="shelf" aria-hidden="true">
        {#each [0, 1, 2, 3, 4, 5] as i (i)}<span class="goods"><Goods size="100%" strokeWidth={2} /></span>{/each}
      </div>
      <div class="floor"></div>
    {/if}
  </div>

  <div class="actor boss tl"><Character look={later.boss} {...cast.boss} /></div>
  <div class="actor defendant tl"><Character look={file.person.look} {...cast.defendant} /></div>

  {#if !street}
    <div class="counter tl">
      <span class="display" aria-hidden="true">
        {#each [0, 1, 2] as i (i)}<span class="goods"><Goods size="100%" strokeWidth={2} /></span>{/each}
      </span>
    </div>
  {/if}

  <Bubble text="Don't do it again!" x={70} y={12} at={0.3} until={1.45} tail="right" />
  <div class="later-card tl"><span>1 month later…</span></div>
  <Particles kind="sparkle" x={46} y={32} at={2.5} count={9} spread={6} />
</div>

<style>
  .court-room,
  .later {
    position: absolute;
    inset: 0;
  }

  /* The courtroom shows first and is gone by the end; the later place is the last frame. */
  .court-room {
    opacity: 0;
    animation: until-cut 3.8s linear both;
  }

  @keyframes until-cut {
    0%,
    51% {
      opacity: 1;
    }
    52%,
    100% {
      opacity: 0;
    }
  }

  .later {
    animation: after-cut 3.8s linear both;
  }

  @keyframes after-cut {
    0%,
    51% {
      opacity: 0;
    }
    52%,
    100% {
      opacity: 1;
    }
  }

  .panel {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(90deg, transparent 0 9.6cqw, rgb(31 42 68 / 0.18) 9.6cqw 10cqw),
      linear-gradient(180deg, #cfa77c, #b98d62);
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 12cqh;
    border-top: 0.35cqw solid var(--ink);
    background: #8a5a35;
  }

  /* The judge's finger wags from the top right. */
  .finger {
    position: absolute;
    right: 10cqw;
    top: 18cqh;
    width: 11cqw;
    transform-origin: 50% 100%;
    transform: rotate(0);
    animation: wag 1.2s ease-in-out 0.25s both;
  }

  @keyframes wag {
    0% {
      opacity: 0;
      transform: translateY(20cqh) rotate(0);
    }
    12% {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
    25%,
    58% {
      transform: rotate(-14deg);
    }
    41%,
    75% {
      transform: rotate(14deg);
    }
    100% {
      opacity: 1;
      transform: rotate(0);
    }
  }

  .shop-wall {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent 0 7cqh, rgb(31 42 68 / 0.08) 7cqh 7.5cqh),
      linear-gradient(180deg, #f6e7c7, #ecd6ab);
  }

  .shelf {
    position: absolute;
    left: 10cqw;
    right: 10cqw;
    top: 14cqh;
    display: flex;
    justify-content: space-around;
    padding-bottom: 1cqh;
    border-bottom: 0.6cqw solid #8a5a35;
  }

  .goods {
    display: inline-grid;
    width: 6cqw;
    aspect-ratio: 1;
    color: #8a5a35;
  }

  .sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #a8dde3, #e2f2ef);
  }

  .road {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 26cqh;
    border-top: 0.35cqw solid var(--ink);
    background: #8f96a3;
  }

  .zebra {
    position: absolute;
    left: 30cqw;
    width: 30cqw;
    bottom: 3cqh;
    height: 18cqh;
    background: repeating-linear-gradient(90deg, #f4f1ea 0 3cqw, transparent 3cqw 6cqw);
    opacity: 0.85;
  }

  .car {
    position: absolute;
    left: 0;
    bottom: 12cqh;
    width: 20cqw;
    transform: translateX(110cqw);
    animation: drive-by 3.8s linear both;
  }

  @keyframes drive-by {
    0%,
    62% {
      transform: translateX(-25cqw);
    }
    100% {
      transform: translateX(110cqw);
    }
  }

  .defendant {
    bottom: 6cqh;
    height: 60cqh;
    transform: translateX(calc(42cqw - 50%));
  }

  .boss {
    bottom: 6cqh;
    height: 56cqh;
    transform: translateX(calc(68cqw - 50%));
    animation: after-cut 3.8s linear both;
  }

  .counter {
    position: absolute;
    left: 22cqw;
    right: 14cqw;
    bottom: 0;
    height: 26cqh;
    border: 0.35cqw solid var(--ink);
    border-bottom: 0;
    background: linear-gradient(180deg, #b07a48, #8f5f36);
    animation: after-cut 3.8s linear both;
  }

  .display {
    position: absolute;
    left: 50%;
    top: -9cqh;
    display: flex;
    gap: 2cqw;
    transform: translateX(-50%);
  }

  .later-card {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: var(--paper);
    transform: translateX(105%);
    animation: card 3.8s linear both;
  }

  .later-card span {
    font-family: var(--serif);
    font-size: max(1.2rem, 5cqw);
    font-weight: 600;
    font-style: italic;
  }

  @keyframes card {
    0%,
    39% {
      transform: translateX(-105%);
      animation-timing-function: ease-out;
    }
    46%,
    57% {
      transform: translateX(0);
      animation-timing-function: ease-in;
    }
    64%,
    100% {
      transform: translateX(105%);
    }
  }
</style>
