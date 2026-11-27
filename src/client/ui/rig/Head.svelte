<svelte:options namespace="svg" />

<script lang="ts">
  import type { Look, Mood } from '@shared/court/types';
  import { EXPRESSIONS, HAIR_COLORS, HEADS, SKIN, type Gaze } from './parts';

  let {
    look,
    mood,
    gaze,
    blink,
    blinkDelay,
    glanceDelay,
    watching = false,
    fidgetDelay = 0,
    hat = null,
  }: {
    look: Look;
    mood: Mood;
    /** Where they look; null lets the eyes wander now and then. */
    gaze: Gaze | null;
    /** Seconds between blinks, and an offset so people don't blink together. */
    blink: number;
    blinkDelay: number;
    glanceDelay: number;
    /** Glancing down at a wristwatch, in time with the arm. */
    watching?: boolean;
    fidgetDelay?: number;
    /** A cap, in the colour of their outfit. */
    hat?: 'red' | 'blue' | null;
  } = $props();

  const shape = $derived(look.face ?? 'round');
  const head = $derived(HEADS[shape]);
  const skin = $derived(SKIN[look.skin]);
  const hair = $derived(HAIR_COLORS[look.hairColor ?? 'black']);
  const face = $derived(EXPRESSIONS[mood]);
  const has = (extra: NonNullable<Look['extras']>[number]) => look.extras?.includes(extra) ?? false;
  const old = $derived(look.age === 'old');
  const browWidth = $derived(look.brows === 'thin' ? 2.2 : look.brows === 'bushy' ? 4.6 : 3.2);
  const browColor = $derived(look.brows === 'bushy' ? hair : 'var(--ink)');
  // Hair is drawn for a round head and stretched to fit the others.
  const fit = $derived(`translate(60 ${head.top}) scale(${head.hw / 32} 1) translate(-60 -20)`);

  const BROWS = {
    flat: ['M42 43.5 L53 43.5', 'M67 43.5 L78 43.5'],
    raised: ['M42 41 Q47.5 37 53 40', 'M67 40 Q72.5 37 78 41'],
    smug: ['M42 44 L53 44.5', 'M67 41 Q72 36 78 40'],
    worried: ['M42 44.5 L53 40.5', 'M67 40.5 L78 44.5'],
    angry: ['M42 40.5 L53 45', 'M67 45 L78 40.5'],
    high: ['M41 37 Q47 33 53 36', 'M67 36 Q73 33 79 37'],
    soft: ['M42 43.5 Q47.5 41 53 43.5', 'M67 43.5 Q72.5 41 78 43.5'],
  } as const;

  const MOUTHS = {
    flat: 'M53 69 L67 69',
    smile: 'M52 67 Q60 74.5 68 67',
    smirk: 'M51 69 Q62 73 70 64',
    wavy: 'M50 70 Q53 66 56 70 Q59 74 62 70 Q65 66 68 70',
    frown: 'M52 71.5 Q60 64.5 68 71.5',
    pout: 'M55 71 Q60 66.5 65 71',
    tight: 'M54 69.5 Q60 67.8 66 69.5',
  } as const;

  const EYE_X = [48, 72] as const;
</script>

<g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
  <!-- Ears, then the head -->
  <circle cx={61 - head.hw} cy="55" r="6" fill={skin} />
  <circle cx={59 + head.hw} cy="55" r="6" fill={skin} />
  {#if has('earrings')}
    <circle cx={61 - head.hw} cy="62.5" r="2.2" fill="var(--gold)" stroke-width="1.4" />
    <circle cx={59 + head.hw} cy="62.5" r="2.2" fill="var(--gold)" stroke-width="1.4" />
  {/if}

  {#if shape === 'round'}
    <circle cx="60" cy="52" r="32" fill={skin} />
  {:else if shape === 'oval'}
    <ellipse cx="60" cy="51" rx="28.5" ry="34" fill={skin} />
  {:else if shape === 'square'}
    <path d="M30 42 Q30 18 60 18 Q90 18 90 42 L90 60 Q90 84 60 84 Q30 84 30 60 Z" fill={skin} />
  {:else}
    <ellipse cx="60" cy="54" rx="34.5" ry="30" fill={skin} />
  {/if}

  <!-- Skin details that stay put -->
  {#if has('stubble')}
    <path d="M36 62 Q60 92 84 62 Q60 76 36 62 Z" fill="rgb(31 42 68 / 0.13)" stroke="none" />
  {/if}
  {#if has('beard')}
    <path d="M33 54 Q35 88 60 89 Q85 88 87 54 Q82 72 60 74 Q38 72 33 54 Z" fill={hair} />
  {/if}
  {#if old}
    <g fill="none" stroke-width="1.4" opacity="0.55">
      <path d="M50 30 Q60 28 70 30" />
      <path d="M49 63 Q47 67 49.5 70.5 M71 63 Q73 67 70.5 70.5" />
    </g>
  {/if}

  <!-- Hair -->
  <g transform={fit} fill={hair}>
    {#if look.hair === 'short'}
      <path d="M28 47 Q29 17 60 16 Q91 17 92 47 Q86 29 60 29 Q34 29 28 47 Z" />
    {:else if look.hair === 'parted'}
      <path d="M28 49 Q27 15 62 15 Q93 17 92 46 Q82 25 50 30 Q37 33 28 49 Z" />
      <path d="M50 30 Q55 22 66 18" fill="none" stroke="rgb(255 255 255 / 0.35)" stroke-width="1.5" />
    {:else if look.hair === 'curly'}
      {#each [[30, 46], [33, 35], [41, 25], [52, 19], [64, 18], [76, 22], [86, 32], [90, 44]] as [x, y] (x * 100 + y)}
        <circle cx={x} cy={y} r="9" />
      {/each}
    {:else if look.hair === 'bun'}
      <circle cx="60" cy="12" r="10" />
      <path d="M28 47 Q29 18 60 18 Q91 18 92 47 Q84 30 60 31 Q36 30 28 47 Z" />
    {:else if look.hair === 'long'}
      <path d="M28 47 Q33 21 60 21 Q87 21 92 47 Q78 33 60 34 Q42 33 28 47 Z" />
    {:else if look.hair === 'bob'}
      <path d="M27 60 Q23 18 60 17 Q97 18 93 60 L86 60 Q87 36 72 31 Q62 37 47 31 Q33 37 34 60 Z" />
    {:else if look.hair === 'spiky'}
      <path d="M28 47 L29 27 L37 31 L40 16 L49 26 L57 11 L64 24 L73 13 L77 27 L87 21 L92 47 Q85 31 60 31 Q35 31 28 47 Z" />
    {:else if look.hair === 'receding'}
      <path d="M28 56 Q26 36 35 29 L38 41 Q33 46 33 56 Z M92 56 Q94 36 85 29 L82 41 Q87 46 87 56 Z" />
      <path d="M50 23 Q55 18 62 21 M57 22 Q62 17 68 22" fill="none" stroke={hair} stroke-width="2" />
    {:else}
      <path d="M30 47 Q31 40 35 36 M90 47 Q89 40 85 36" fill="none" stroke={hair} stroke-width="4" />
      <ellipse cx="47" cy="29" rx="7" ry="3.5" fill="#fff" opacity="0.45" stroke="none" transform="rotate(-25 47 29)" />
    {/if}
  </g>
  {#if hat}
    <path d="M27 40 Q28 11 60 11 Q92 11 93 40 Z" fill={hat === 'red' ? 'var(--red)' : '#6f8fb3'} />
    <path d="M24 41 Q60 33 96 41 Q96 47 60 46 Q24 47 24 41 Z" fill={hat === 'red' ? 'var(--red-deep)' : '#4f6f93'} />
  {/if}

  <!-- The face: it turns a little toward where they look, and pops when the mood changes. -->
  <g
    class="features"
    class:free={gaze === null && !watching}
    class:watching
    style:--gx={gaze?.x ?? 0}
    style:--gy={gaze?.y ?? 0}
    style:--fidget-delay="{fidgetDelay}s"
  >
    {#key mood}
      <g class="pop">
        {#if face.blush || has('blush')}
          <ellipse cx="41" cy="62" rx="5.5" ry="3.2" fill="#f08a8a" opacity="0.42" stroke="none" />
          <ellipse cx="79" cy="62" rx="5.5" ry="3.2" fill="#f08a8a" opacity="0.42" stroke="none" />
        {/if}
        {#if old}
          <path d="M37 49 l-3.5 -1.5 M37 53.5 l-3.5 1.5 M83 49 l3.5 -1.5 M83 53.5 l3.5 1.5" fill="none" stroke-width="1.3" opacity="0.6" />
        {/if}

        <!-- Eyes: each blinks by squashing; lids sit over them for sleepy, smug or sad looks. -->
        {#each EYE_X as cx, i (cx)}
          <g class="eye" style:--blink="{blink}s" style:--blink-delay="{blinkDelay}s" style:transform-origin="{cx}px 52px">
            {#if face.eyes === 'happy'}
              <path d="M{cx - 5.5} 54 Q{cx} 47.5 {cx + 5.5} 54" fill="none" stroke-width="2.6" />
            {:else}
              {@const wide = face.eyes === 'wide'}
              <ellipse {cx} cy="52" rx={wide ? 6.6 : 5.3} ry={wide ? 7.4 : 6.1} fill="#fff" stroke-width="1.6" />
              <g class="glance" style:animation-delay="{glanceDelay}s">
                <g class="aim">
                  <circle {cx} cy="52.5" r={face.small ? 1.9 : 2.8} fill="var(--ink)" stroke="none" />
                  <circle cx={cx + 0.9} cy="51.4" r="0.85" fill="#fff" stroke="none" />
                </g>
              </g>
              {#if face.eyes === 'half'}
                <path d="M{cx - 6.6} 44.5 H{cx + 6.6} V52.3 H{cx - 6.6} Z" fill={skin} stroke="none" />
                <path d="M{cx - 5.6} 52.3 H{cx + 5.6}" stroke-width="2.2" />
              {:else if face.eyes === 'droop'}
                {@const outer = i === 0 ? cx - 6 : cx + 6}
                {@const inner = i === 0 ? cx + 6 : cx - 6}
                <path d="M{outer} 44 L{outer} 51.2 L{inner} 48 L{inner} 44 Z" fill={skin} stroke="none" />
                <path d="M{outer} 51.2 L{inner} 48" stroke-width="2" />
              {/if}
            {/if}
          </g>
        {/each}

        <!-- Brows -->
        <path d={BROWS[face.brows][0]} fill="none" stroke={browColor} stroke-width={browWidth} />
        <path d={BROWS[face.brows][1]} fill="none" stroke={browColor} stroke-width={browWidth} />

        <!-- Nose -->
        {#if look.nose === 'round'}
          <circle cx="60" cy="59.5" r="3.6" fill={skin} stroke-width="2" />
        {:else if look.nose === 'long'}
          <path d="M59 50 Q63.5 59 64 61 Q61.5 63.2 58 61.8" fill="none" stroke-width="2" />
        {:else}
          <path d="M60 55 Q63.5 60 59 61.5" fill="none" stroke-width="2" />
        {/if}

        <!-- Mouth -->
        {#if face.mouth === 'o'}
          <ellipse cx="60" cy="70.5" rx="4.6" ry="6" fill="#7a2a2a" />
        {:else if face.mouth === 'grin'}
          <path d="M50 65.5 Q60 80 70 65.5 Z" fill="#7a2a2a" />
          <path d="M52.5 66.6 L67.5 66.6 L66.6 69.2 L53.4 69.2 Z" fill="#fff" stroke="none" />
        {:else}
          <path d={MOUTHS[face.mouth]} fill="none" />
        {/if}
        {#if has('moustache')}
          <path d="M49 64 Q54 59 60 62.5 Q66 59 71 64 Q66 66.5 60 65 Q54 66.5 49 64 Z" fill={hair} stroke-width="1.5" />
        {/if}

        {#if has('glasses')}
          <g fill="rgb(255 255 255 / 0.18)" stroke-width="2">
            <circle cx="48" cy="52" r="8" />
            <circle cx="72" cy="52" r="8" />
            <path d="M56 51.5 Q60 49.5 64 51.5" fill="none" />
          </g>
        {/if}

        {#if face.sweat}
          <path class="sweat" d="M89 31 Q85 38.5 89 40.5 Q93 38.5 89 31 Z" fill="#9ed3f0" stroke-width="1.5" />
        {/if}
        {#if face.tear}
          <path class="tear" d="M45 59 Q43 64 45 66 Q47 64 45 59 Z" fill="#9ed3f0" stroke-width="1.2" />
        {/if}
      </g>
    {/key}
  </g>
</g>

<style>
  .features {
    transform: translate(calc(var(--gx) * 2.6px), calc(var(--gy) * 1.6px));
    transition: transform 0.3s ease;
  }

  .pop {
    transform-origin: 60px 58px;
    animation: pop 0.2s ease-out;
  }

  .eye {
    animation: blink var(--blink) linear var(--blink-delay) infinite;
  }

  .aim {
    transform: translate(calc(var(--gx) * 2.2px), calc(var(--gy) * 2px));
    transition: transform 0.25s ease;
  }

  /* Left alone, the eyes wander now and then. */
  .free .glance {
    animation: glance 7.5s ease-in-out infinite;
  }

  /* Looking down at the watch while the arm brings it up (same timing as the arm). */
  .watching .glance {
    animation: look-at-watch 8s ease-in-out var(--fidget-delay) infinite;
  }

  .sweat {
    animation: drip 1.8s ease-in infinite;
  }

  .tear {
    animation: drip 2.4s ease-in 0.4s infinite;
  }

  @keyframes pop {
    from {
      transform: scale(1.07, 0.93);
    }
  }

  @keyframes blink {
    0%,
    94%,
    100% {
      transform: scaleY(1);
    }
    96.5% {
      transform: scaleY(0.08);
    }
  }

  @keyframes glance {
    0%,
    30%,
    44%,
    62%,
    80%,
    100% {
      transform: translate(0, 0);
    }
    34%,
    40% {
      transform: translate(1.8px, 0.4px);
    }
    66%,
    76% {
      transform: translate(-2px, 0.8px);
    }
  }

  @keyframes look-at-watch {
    0%,
    70%,
    100% {
      transform: translate(0, 0);
    }
    76%,
    92% {
      transform: translate(-2px, 2.4px);
    }
  }

  @keyframes drip {
    0% {
      transform: translateY(-2px);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translateY(10px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .eye,
    .glance,
    .pop,
    .sweat,
    .tear {
      animation: none;
    }
  }
</style>
