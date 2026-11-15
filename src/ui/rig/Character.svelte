<script lang="ts">
  import { untrack } from 'svelte';
  import type { Look, Mood, Outfit } from '../../court/types';
  import Arm from './Arm.svelte';
  import Head from './Head.svelte';
  import Leg from './Leg.svelte';
  import {
    BUILDS,
    HAIR_COLORS,
    HEADS,
    POSES,
    SKIN,
    TAKES,
    fidgetFor,
    outfitStyle,
    type Facing,
    type Gait,
    type Gaze,
    type Holding,
    type Pose,
    type Take,
  } from './parts';
  import Torso from './Torso.svelte';

  let {
    look,
    mood = 'neutral',
    pose = 'rest',
    gait = 'stand',
    facing = 'front',
    gaze = null,
    framing = 'full',
    outfit,
    holding = 'none',
    take = null,
    scrub = false,
    idle = true,
    label,
  }: {
    look: Look;
    mood?: Mood;
    pose?: Pose;
    gait?: Gait;
    /** Front, or turned toward one side; turning left mirrors the drawing. */
    facing?: Facing;
    /** Where they look. Null lets the eyes wander. */
    gaze?: Gaze | null;
    /** The whole body, or head and shoulders for the case file. */
    framing?: 'full' | 'bust';
    /** Dress them differently from their look, for a punishment scene. */
    outfit?: Outfit;
    holding?: Holding;
    /** A one-off reaction; change its id to play it again. */
    take?: Take | null;
    /** Mopping: the arms and mop swing back and forth. */
    scrub?: boolean;
    /** Breathing, blinking, glancing and small habits. */
    idle?: boolean;
    /** Read out by screen readers; leave empty when the name is already on screen. */
    label?: string;
  } = $props();

  const wear = $derived<Outfit>(outfit ?? look.outfit);
  const style = $derived(outfitStyle(wear, look.color));
  const skin = $derived(SKIN[look.skin]);
  const hair = $derived(HAIR_COLORS[look.hairColor ?? 'black']);
  const build = $derived(BUILDS[look.build ?? 'average']);
  const head = $derived(HEADS[look.face ?? 'round']);
  const angles = $derived(POSES[pose]);
  const fore = $derived(style.sleeves === 'long' ? style.sleeve : skin);
  const upper = $derived(style.sleeves === 'none' ? skin : style.sleeve);
  const fidget = $derived(idle && pose === 'rest' && gait === 'stand' && gaze === null ? fidgetFor(look) : null);
  // Turned to one side, they look the way they face (mirroring makes "right" mean left).
  const eyes = $derived<Gaze | null>(gaze ?? (facing === 'front' ? null : { x: 0.85, y: 0 }));
  // A cleaner's overalls come with a matching cap.
  const hat = $derived(look.extras?.includes('cap') ? 'red' : wear === 'overalls' ? 'blue' : null);
  const hairFit = $derived(`translate(60 ${head.top}) scale(${head.hw / 32} 1) translate(-60 -20)`);

  // Everyone breathes and blinks at their own pace.
  const blink = 3.2 + Math.random() * 2.6;
  const blinkDelay = -Math.random() * blink;
  const glanceDelay = -Math.random() * 7.5;
  const swayDelay = -Math.random() * 7;
  const fidgetDelay = -Math.random() * 4;
  const uid = $props.id();

  let rootEl = $state<SVGGElement | null>(null);
  let bodyEl = $state<SVGGElement | null>(null);
  let headEl = $state<SVGGElement | null>(null);

  // Play each new reaction once. Nothing plays with reduced motion.
  $effect(() => {
    const current = take;
    if (!current) return;
    untrack(() => {
      const spec = TAKES[current.name];
      const el = spec.part === 'root' ? rootEl : spec.part === 'body' ? bodyEl : headEl;
      if (!el || typeof el.animate !== 'function') return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      el.animate(spec.keyframes, { duration: spec.duration, easing: 'ease-out' });
    });
  });
</script>

<svg
  class="character {framing}"
  class:idle
  viewBox={framing === 'full' ? '0 6 120 184' : '6 8 108 122'}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  <g class="take" bind:this={rootEl}>
    <g class="mirror" class:left={facing === 'left'}>
      <g class="bob {gait}">
        {#if look.hair === 'long' || look.hair === 'bob'}
          <g transform={hairFit} fill={hair} stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round">
            {#if look.hair === 'long'}
              <path d="M26 50 Q24 16 60 15 Q96 16 94 50 L97 104 L23 104 Z" />
            {:else}
              <path d="M27 52 Q25 17 60 16 Q95 17 93 52 L94 72 L26 72 Z" />
            {/if}
          </g>
        {/if}

        {#if framing === 'full'}
          <Leg x={build.hip} {style} {skin} {gait} />
          <Leg x={120 - build.hip} {style} {skin} {gait} second />
          {#if style.legs === 'skirt'}
            <path d="M37 140 H83 L89 166 H31 Z" fill={style.pants} stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" />
          {:else if style.legs === 'bare'}
            <path d="M39 140 H81 L85 158 H35 Z" fill={style.top} stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" />
          {/if}
        {/if}

        <g class="body-take" bind:this={bodyEl}>
          <g class="breath">
            <rect x="52.5" y="72" width="15" height="22" rx="5" fill={skin} stroke="var(--ink)" stroke-width="2.5" />
            <Torso {look} outfit={wear} {style} {holding} uid={uid} />

            <g class="arms" class:scrub>
              <g class="fidget-l" class:watch={fidget === 'watch'} style:--fidget-delay="{fidgetDelay}s">
                <Arm
                  side="l"
                  x={build.shoulder}
                  y={build.shoulderY}
                  angles={angles.l}
                  sleeve={upper}
                  {fore}
                  {skin}
                  watch={look.extras?.includes('watch')}
                  swing={pose === 'rest' ? (gait === 'stand' ? 'none' : gait) : 'none'}
                />
              </g>
              <Arm
                side="r"
                x={build.shoulder}
                y={build.shoulderY}
                angles={angles.r}
                sleeve={upper}
                {fore}
                {skin}
                mop={holding === 'mop'}
                thumb={pose === 'thumbs'}
                wave={pose === 'wave'}
                swing={pose === 'rest' ? (gait === 'stand' ? 'none' : gait) : 'none'}
              />
            </g>

            <g class="head-take" bind:this={headEl}>
              <g class="sway" style:animation-delay="{swayDelay}s">
                <Head {look} {mood} gaze={eyes} {blink} {blinkDelay} {glanceDelay} watching={fidget === 'watch'} {fidgetDelay} {hat} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

<style>
  .character {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .take {
    transform-origin: 60px 186px;
  }

  .mirror {
    transform-origin: 60px 100px;
    transition: transform 0.18s ease;
  }

  .mirror.left {
    transform: scaleX(-1);
  }

  .body-take {
    transform-origin: 60px 146px;
  }

  .head-take {
    transform-origin: 60px 84px;
  }

  .breath {
    transform-origin: 60px 146px;
  }

  .sway {
    transform-origin: 60px 84px;
  }

  /* Idle life: slow breathing and a slight sway of the head. */
  .idle .breath {
    animation: breathe 3.6s ease-in-out infinite;
  }

  .idle .sway {
    animation: sway 7s ease-in-out infinite;
  }

  /* Walking bobs the whole body twice per stride. */
  .bob.walk {
    animation: bob 0.28s ease-in-out infinite alternate;
  }

  .bob.run {
    animation: bob-run 0.18s ease-in-out infinite alternate;
  }

  /* Mopping: both arms and the mop sweep together. */
  .arms {
    transform-origin: 60px 108px;
  }

  .arms.scrub {
    animation: scrub 0.42s ease-in-out infinite alternate;
  }

  /* Checking the gold watch every few seconds. */
  .fidget-l.watch :global(.upper) {
    animation: watch-upper 8s ease-in-out var(--fidget-delay) infinite;
  }

  .fidget-l.watch :global(.fore) {
    animation: watch-fore 8s ease-in-out var(--fidget-delay) infinite;
  }

  @keyframes breathe {
    50% {
      transform: translateY(-0.6px) scaleY(1.016);
    }
  }

  @keyframes sway {
    50% {
      transform: rotate(-1.6deg);
    }
  }

  @keyframes bob {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-2.5px);
    }
  }

  @keyframes bob-run {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-4px);
    }
  }

  @keyframes scrub {
    from {
      transform: rotate(-8deg);
    }
    to {
      transform: rotate(8deg);
    }
  }

  @keyframes watch-upper {
    0%,
    70%,
    100% {
      transform: rotate(var(--a));
    }
    76%,
    92% {
      transform: rotate(25deg);
    }
  }

  @keyframes watch-fore {
    0%,
    70%,
    100% {
      transform: rotate(var(--a));
    }
    76%,
    92% {
      transform: rotate(-136deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .idle .breath,
    .idle .sway,
    .bob,
    .arms.scrub,
    .fidget-l.watch :global(.upper),
    .fidget-l.watch :global(.fore) {
      animation: none;
    }
  }
</style>
