<script lang="ts">
  import type { Case, Look, Option, Picture } from '@shared/court/types';
  import { untrack } from 'svelte';
  import Character from '../rig/Character.svelte';
  import { CAST } from '../rig/cast';
  import Particles from './kit/Particles.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';

  /**
   * Repay (3.6 s): the defendant walks over with a bag of money and pays each
   * victim back. Coins arc across; each victim cheers up in turn. The bag ends
   * empty, and so does the defendant.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'repay' }>;
    skip: boolean;
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  /** Who gets paid back, by the case's victims picture. */
  const VICTIMS: Partial<Record<Picture, Look[]>> = {
    bread: [CAST.baker, CAST.mother],
    shop: [CAST.shopkeeper, CAST.child],
    family: [CAST.mother, CAST.child, CAST.patient],
    motorbike: [CAST.driver, CAST.rider],
    fish: [CAST.fisher, CAST.mother, CAST.child],
  };
  const victims = $derived(VICTIMS[option.victims] ?? [CAST.mother, CAST.child]);
  const X = [62, 75, 88];
  const height = (look: Look) => (look === CAST.child ? 38 : look === CAST.patient ? 48 : 52);
  const payAt = (i: number) => 1.0 + i * 0.38;

  const cast = $state({
    defendant: actor({ mood: 'grumpy', pose: 'carry', holding: 'cashbag', gait: 'walk', facing: 'right' }),
    v0: actor({ mood: 'sad', facing: 'left' }),
    v1: actor({ mood: 'sad', facing: 'left' }),
    v2: actor({ mood: 'sad', facing: 'left' }),
  });
  const keys = ['v0', 'v1', 'v2'] as const;

  const beats: Beat<keyof typeof cast>[] = [
    { at: 0.9, who: 'defendant', set: { gait: 'stand', mood: 'worried', gaze: { x: 1, y: 0 } } },
    ...[0, 1, 2].flatMap((i): Beat<keyof typeof cast>[] => [
      { at: payAt(i), cue: 'coins' },
      { at: payAt(i) + 0.45, who: keys[i], set: { mood: 'happy' }, take: 'hop' },
    ]),
    { at: 2.35, who: 'defendant', set: { holding: 'none', pose: 'rest', mood: 'sad', gaze: null, facing: 'front' }, take: 'sigh' },
    { at: 2.8, who: 'v0', set: { pose: 'wave' } },
    { at: 3.0, cue: untrack(() => (option.builds ? 'twinkle' : 'pop')) },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.repay, clock: () => clock, onend: () => onend?.(), skipped: () => skip });
</script>

<div class="scene repay">
  <i class="scene-clock" bind:this={clock}></i>
  <div class="sky"></div>
  <div class="shops" aria-hidden="true">
    {#each [['#e3b341', 4], ['#6cc3c9', 24], ['#d2433a', 44], ['#3e9b5f', 64], ['#f08a24', 84]] as [color, x] (x)}
      <div class="shop" style:left="{x}cqw" style:--awning={color}>
        <span class="awning"></span>
        <span class="window"></span>
      </div>
    {/each}
  </div>
  <div class="ground"></div>

  {#each victims as look, i (i)}
    <div class="actor victim" style:height="{height(look)}cqh" style:transform="translateX(calc({X[i]}cqw - 50%))">
      <Character {look} {...cast[keys[i]]} />
    </div>
  {/each}

  <div class="actor defendant tl"><Character look={file.person.look} {...cast.defendant} /></div>

  <svg class="empty-bag tl" viewBox="0 0 40 20" aria-hidden="true">
    <path d="M2 18 Q4 8 14 9 L26 9 Q36 8 38 18 Z" fill="#cdb67a" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" />
  </svg>

  {#each victims as _, i (i)}
    {#each [0, 1, 2, 3] as k (k)}
      <span class="coin-x tl" style:--dx="{X[i] - 40}cqw" style:--d="{payAt(i) + k * 0.07}s">
        <span class="coin-y tl" style:--d="{payAt(i) + k * 0.07}s"></span>
      </span>
    {/each}
    <Particles kind="sparkle" x={X[i]} y={38} at={payAt(i) + 0.45} count={6} spread={3} />
  {/each}
</div>

<style>
  .sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #a8dde3, #e2f2ef);
  }

  .shops {
    position: absolute;
    inset: 0;
  }

  .shop {
    position: absolute;
    bottom: 18cqh;
    width: 17cqw;
    height: 34cqh;
    border: 0.3cqw solid var(--ink);
    background: #fffdf7;
  }

  .awning {
    position: absolute;
    left: -1cqw;
    right: -1cqw;
    top: 0;
    height: 7cqh;
    border: 0.3cqw solid var(--ink);
    background: repeating-linear-gradient(90deg, var(--awning) 0 2.4cqw, #fffdf7 2.4cqw 4.8cqw);
  }

  .window {
    position: absolute;
    left: 15%;
    right: 15%;
    top: 34%;
    height: 34%;
    border: 0.3cqw solid var(--ink);
    background: #bfe6ea;
  }

  .ground {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18cqh;
    border-top: 0.35cqw solid var(--ink);
    background: linear-gradient(180deg, #c9ced8, #b2b9c6);
  }

  .victim {
    bottom: 8cqh;
  }

  .defendant {
    bottom: 8cqh;
    height: 56cqh;
    transform: translateX(calc(34cqw - 50%));
    animation: walk-in 3.6s linear both;
  }

  @keyframes walk-in {
    0%,
    5% {
      transform: translateX(calc(14cqw - 50%));
    }
    25%,
    100% {
      transform: translateX(calc(34cqw - 50%));
    }
  }

  .empty-bag {
    position: absolute;
    left: 38cqw;
    bottom: 7cqh;
    width: 5cqw;
    opacity: 1;
    animation: bag-drop 3.6s linear both;
  }

  @keyframes bag-drop {
    0%,
    64% {
      opacity: 0;
      transform: translateY(-10cqh);
    }
    70%,
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Each coin flies from the bag to a victim in an arc: across in one layer, up and down in the other. */
  .coin-x {
    position: absolute;
    left: 40cqw;
    top: 62cqh;
    width: 2.2cqw;
    height: 2.2cqw;
    opacity: 0;
    animation: coin-x 0.45s linear var(--d) both;
  }

  .coin-y {
    display: block;
    width: 100%;
    height: 100%;
    border: 0.25cqw solid var(--ink);
    border-radius: 50%;
    background: var(--gold);
    animation: coin-y 0.45s ease-in-out var(--d) both;
  }

  @keyframes coin-x {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    6% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(var(--dx));
    }
  }

  @keyframes coin-y {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-22cqh);
    }
  }
</style>
