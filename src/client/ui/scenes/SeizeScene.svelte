<script lang="ts">
  import type { Case, Option } from '@shared/court/types';
  import Character from '../rig/Character.svelte';
  import { CAST } from '../rig/cast';
  import Bubble from './kit/Bubble.svelte';
  import Particles from './kit/Particles.svelte';
  import Puff from './kit/Puff.svelte';
  import StampTool from './kit/StampTool.svelte';
  import { SCENE_LENGTH } from './index';
  import { actor, playBeats, type Beat } from './kit/timeline.svelte';
  import Car from './props/Car.svelte';
  import { PICTURE_COLORS, PICTURE_ICONS } from '../pictures';
  import Building from './props/Building.svelte';
  import Mansion from './props/Mansion.svelte';
  import Truck from './props/Truck.svelte';

  /**
   * Take wealth (4 s): SEIZED stamps land on his mansion, his car and the bag of
   * cash in his arms. Everything flies into a truck, which drives off. He runs
   * after it in his undershirt and socks, and the camera follows to the empty
   * lot, where the money builds hospitals.
   */
  let {
    file,
    option,
    skip,
    onend,
  }: {
    file: Case;
    option: Extract<Option, { scene: 'seize' }>;
    skip: boolean;
    /** The scene has played to the end. */
    onend?: () => void;
  } = $props();

  let clock = $state<HTMLElement | null>(null);

  const cast = $state({
    harjo: actor({ mood: 'smug', pose: 'carry', holding: 'cashbag', gaze: { x: -0.8, y: 0 } }),
    mother: actor({ mood: 'happy', gait: 'walk', facing: 'left' }),
    child: actor({ mood: 'happy', gait: 'walk', facing: 'left' }),
  });

  const beats: Beat<keyof typeof cast>[] = [
    { at: 0.2, cue: 'stamp' },
    { at: 0.22, who: 'harjo', set: { mood: 'shocked', gaze: { x: -1, y: -0.3 } }, take: 'jolt' },
    { at: 0.5, cue: 'stamp' },
    { at: 0.52, who: 'harjo', set: { gaze: { x: -0.6, y: 0.5 } }, take: 'shiver' },
    { at: 0.8, cue: 'stamp' },
    { at: 0.82, who: 'harjo', set: { mood: 'nervous', gaze: { x: 0, y: 1 } }, take: 'jolt' },
    { at: 1.1, who: 'harjo', set: { gaze: { x: 0.9, y: -0.2 } }, cue: 'whoosh' },
    { at: 1.4, who: 'harjo', set: { holding: 'none', pose: 'reach', mood: 'shocked' }, cue: 'whoosh' },
    { at: 1.55, who: 'harjo', set: { outfit: 'singlet' }, take: 'jolt', cue: 'pop' },
    { at: 1.85, cue: 'rumble' },
    { at: 1.95, who: 'harjo', set: { gait: 'run', facing: 'right', mood: 'worried', gaze: null } },
    { at: 2.8, cue: 'coins' },
    { at: 2.85, who: 'harjo', set: { gait: 'stand', pose: 'rest', facing: 'front', mood: 'sad', gaze: { x: 0.8, y: 0 } }, take: 'sigh' },
    { at: 3.25, cue: 'twinkle' },
    { at: 3.7, who: 'mother', set: { gait: 'stand', facing: 'front' }, take: 'nod' },
    { at: 3.7, who: 'child', set: { gait: 'stand', facing: 'front', pose: 'wave' }, take: 'hop' },
  ];
  playBeats(cast, beats, { length: SCENE_LENGTH.seize, clock: () => clock, onend: () => onend?.(), skipped: () => skip });

  const SignIcon = $derived(PICTURE_ICONS[option.builds?.picture ?? 'hospital']);
  const hospitals = $derived(Array.from({ length: Math.min(option.builds?.count ?? 0, 6) }, (_, i) => i));
</script>

<div class="scene seize">
  <i class="scene-clock" bind:this={clock}></i>
  <div class="sky"></div>
  <div class="clouds tl" aria-hidden="true">
    {#each [[8, 10, 14], [46, 6, 10], [78, 16, 12], [118, 8, 14], [160, 14, 11]] as [x, y, w] (x)}
      <span class="cloud" style:left="{x}cqw" style:top="{y}cqh" style:width="{w}cqw"></span>
    {/each}
  </div>

  <div class="world tl">
    <div class="ground"></div>

    <!-- His things, each stamped, then flown into the truck. -->
    <div class="thing mansion tl">
      <Mansion />
      <span class="seized tl" style:--at="0.2s">Seized</span>
    </div>
    <div class="thing car tl">
      <Car />
      <span class="seized small tl" style:--at="0.5s">Seized</span>
    </div>
    <span class="seized bagmark tl">Seized</span>
    <svg class="bag tl" viewBox="-20 -22 40 36" aria-hidden="true">
      <g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round">
        <path d="M-13 7 Q-18 -9 -7 -13 L-5 -18 H5 L7 -13 Q18 -9 13 7 Q0 12 -13 7 Z" fill="#cdb67a" />
        <circle cx="0" cy="-1" r="5.5" fill="var(--gold)" stroke-width="1.8" />
      </g>
    </svg>

    <!-- The empty lot, where the money goes. -->
    <div class="sign" aria-hidden="true">
      <span class="board" style:color={PICTURE_COLORS[option.builds?.picture ?? 'hospital'] ?? 'var(--red)'}>
        <SignIcon size="100%" strokeWidth={2.4} />
      </span>
      <span class="post"></span>
    </div>
    <div class="truck tl"><Truck driveAt={1.85} /></div>

    <div class="actor harjo tl">
      <Character look={file.person.look} {...cast.harjo} />
      <Puff at={1.4} />
    </div>

    {#each hospitals as i (i)}
      <div class="hospital tl" style:left="{126 + i * 13}cqw" style:--d="{2.75 + i * 0.14}s"><Building picture={option.builds?.picture ?? 'hospital'} /></div>
      <Particles kind="dust" x={131.5 + i * 13} y={83} at={2.75 + i * 0.14} count={8} spread={5} />
      <Particles kind="sparkle" x={131.5 + i * 13} y={58} at={2.95 + i * 0.14} count={5} spread={4} />
    {/each}

    <div class="actor mother tl"><Character look={CAST.mother} {...cast.mother} /></div>
    <div class="actor child tl"><Character look={CAST.child} {...cast.child} /></div>

    <Particles kind="ink" x={20} y={60} at={0.2} count={9} spread={4} />
    <Particles kind="ink" x={49} y={75} at={0.5} count={8} spread={3.5} />
    <Particles kind="ink" x={66} y={64} at={0.8} count={8} spread={3.5} />
    <StampTool x={20} y={60} at={0.2} size={11} />
    <StampTool x={49} y={75} at={0.5} size={8} />
    <StampTool x={66} y={64} at={0.8} size={7} />
    <Bubble text="My money!" x={63} y={30} at={1.45} until={2.4} />
  </div>
</div>

<style>
  .sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #a8dde3, #e2f2ef);
  }

  /* Clouds drift by more slowly than the ground: a touch of parallax. */
  .clouds {
    position: absolute;
    inset: 0;
    transform: translateX(-28cqw);
    animation: clouds 4s linear both;
  }

  .cloud {
    position: absolute;
    aspect-ratio: 3 / 1;
    border-radius: 999px;
    background: #fffdf7;
    box-shadow: 0 0 0 0.3cqw rgb(31 42 68 / 0.12);
  }

  .world {
    position: absolute;
    left: 0;
    top: 0;
    width: 200cqw;
    height: 100%;
    transform: translateX(-100cqw);
    animation: pan 4s linear both;
  }

  .ground {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18cqh;
    border-top: 0.35cqw solid var(--ink);
    background: linear-gradient(180deg, #a9cf8a, #8fbf73 30%, #c9b48a 30%, #bfa77a);
  }

  .thing {
    position: absolute;
    transform-origin: 50% 50%;
  }

  .mansion {
    left: 1cqw;
    bottom: 17cqh;
    width: 38cqw;
    opacity: 0;
    transform: translate(56cqw, 16cqh) scale(0.05) rotate(25deg);
    animation: mansion 4s linear both;
  }

  .car {
    left: 40cqw;
    bottom: 16cqh;
    width: 18cqw;
    opacity: 0;
    transform: translate(27cqw, -2cqh) scale(0.05) rotate(-20deg);
    animation: car 4s linear both;
  }

  .seized {
    position: absolute;
    left: 50%;
    top: 55%;
    padding: 0 0.35em;
    border: 0.5cqw solid var(--red);
    border-radius: 0.6cqw;
    background: rgb(255 255 255 / 0.6);
    color: var(--red-deep);
    font-weight: 900;
    font-size: max(0.6rem, 2.2cqw);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transform: translate(-50%, -50%) rotate(-12deg);
    animation: mark 0.25s cubic-bezier(0.3, 1.6, 0.5, 1) calc(var(--at) + 0.02s) both;
  }

  .seized.small {
    top: 40%;
    font-size: max(0.5rem, 1.6cqw);
  }

  /* The mark on the bag in his arms; it goes when the bag is taken. */
  .bagmark {
    left: 66cqw;
    top: 66cqh;
    opacity: 0;
    font-size: max(0.45rem, 1.4cqw);
    animation: bagmark 4s linear both;
  }

  .bag {
    position: absolute;
    left: 66cqw;
    top: 68cqh;
    width: 5cqw;
    opacity: 0;
    transform: translate(-50%, -50%) translate(10cqw, 6cqh) scale(0.2);
    animation: bag 4s linear both;
  }

  .truck {
    position: absolute;
    left: 75cqw;
    bottom: 13cqh;
    width: 25cqw;
    transform: translateX(140cqw);
    animation: truck 4s linear both;
  }

  .sign {
    position: absolute;
    left: 102cqw;
    bottom: 17cqh;
    width: 7cqw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .board {
    display: grid;
    width: 100%;
    aspect-ratio: 3 / 2;
    padding: 0.6cqw;
    border: 0.35cqw solid var(--ink);
    border-radius: 0.6cqw;
    background: #fffdf7;
  }

  .post {
    width: 0.5cqw;
    height: 6cqh;
    background: var(--ink);
  }

  .hospital {
    position: absolute;
    bottom: 17cqh;
    width: 11cqw;
    transform-origin: 50% 100%;
    animation: rise 0.42s cubic-bezier(0.3, 1.5, 0.5, 1) var(--d) both;
  }

  .harjo {
    bottom: 12cqh;
    height: 52cqh;
    transform: translateX(calc(118cqw - 50%));
    animation: harjo 4s linear both;
  }

  .mother {
    bottom: 12cqh;
    height: 48cqh;
    transform: translateX(calc(152cqw - 50%));
    animation: mother 4s linear both;
  }

  .child {
    bottom: 12cqh;
    height: 34cqh;
    transform: translateX(calc(163cqw - 50%));
    animation: child 4s linear both;
  }

  @keyframes pan {
    0%,
    48% {
      transform: translateX(0);
      animation-timing-function: ease-in-out;
    }
    72%,
    100% {
      transform: translateX(-100cqw);
    }
  }

  @keyframes clouds {
    0%,
    48% {
      transform: translateX(0);
      animation-timing-function: ease-in-out;
    }
    72%,
    100% {
      transform: translateX(-28cqw);
    }
  }

  @keyframes mansion {
    0%,
    27.5% {
      opacity: 1;
      transform: translate(0, 0) scale(1) rotate(0);
      animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
    }
    30% {
      transform: translate(-1cqw, -4cqh) scale(1.03) rotate(-3deg);
    }
    39% {
      opacity: 1;
    }
    40%,
    100% {
      opacity: 0;
      transform: translate(56cqw, 16cqh) scale(0.05) rotate(25deg);
    }
  }

  @keyframes car {
    0%,
    31.25% {
      opacity: 1;
      transform: translate(0, 0) scale(1) rotate(0);
      animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6);
    }
    41% {
      opacity: 1;
    }
    42%,
    100% {
      opacity: 0;
      transform: translate(27cqw, -2cqh) scale(0.05) rotate(-20deg);
    }
  }

  @keyframes mark {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-12deg) scale(2.4);
    }
  }

  @keyframes bagmark {
    0%,
    21% {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-12deg) scale(2);
    }
    23%,
    34.5% {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(-12deg) scale(1);
    }
    35%,
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-12deg) scale(1);
    }
  }

  @keyframes bag {
    0%,
    34.9% {
      opacity: 0;
      transform: translate(-50%, -50%);
    }
    35% {
      opacity: 1;
      transform: translate(-50%, -50%);
      animation-timing-function: cubic-bezier(0.4, 0, 0.9, 0.7);
    }
    42% {
      opacity: 1;
    }
    43%,
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) translate(10cqw, 6cqh) scale(0.2);
    }
  }

  @keyframes truck {
    0%,
    46.25% {
      transform: translateX(0);
      animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.7);
    }
    47.5% {
      transform: translateX(-0.6cqw);
    }
    77.5%,
    100% {
      transform: translateX(140cqw);
    }
  }

  @keyframes harjo {
    0%,
    48.75% {
      transform: translateX(calc(66cqw - 50%));
    }
    71.25%,
    100% {
      transform: translateX(calc(118cqw - 50%));
    }
  }

  @keyframes mother {
    0%,
    73.75% {
      transform: translateX(calc(214cqw - 50%));
    }
    92.5%,
    100% {
      transform: translateX(calc(152cqw - 50%));
    }
  }

  @keyframes child {
    0%,
    75% {
      transform: translateX(calc(222cqw - 50%));
    }
    92.5%,
    100% {
      transform: translateX(calc(163cqw - 50%));
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
  }
</style>
