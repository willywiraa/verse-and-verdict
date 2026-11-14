<script lang="ts" module>
  import type { Look, Mood } from '../court/types';

  /** The case's own outfits, plus the ones the punishment scenes dress them in. */
  export type Outfit = Look['outfit'] | 'prison' | 'vest' | 'vest-dress' | 'singlet';

  const SKIN = ['#f6d7b8', '#e9be94', '#d19a6a', '#a86e45', '#7a4b2e'] as const;
  const HAIR = '#2b2522';

  /** Base colour of each outfit's top. */
  const TOP: Readonly<Record<Outfit, string>> = {
    suit: '#2e3b55',
    uniform: '#8c6a3e',
    shirt: '#4fa3a8',
    apron: '#c9d6df',
    hoodie: '#7d8597',
    dress: '#c2407a',
    boss: '#6b4a2f',
    prison: '#f08a24',
    vest: '#9aa5b1',
    'vest-dress': '#c2407a',
    singlet: '#f4f1ea',
  };
</script>

<script lang="ts">
  let {
    look,
    mood,
    outfit,
    label,
  }: {
    look: Look;
    mood: Mood;
    /** Dress them differently from their case, for a punishment scene. */
    outfit?: Outfit;
    /** Read out by screen readers; leave empty when the name is already on screen. */
    label?: string;
  } = $props();

  const skin = $derived(SKIN[look.skin]);
  const wear = $derived<Outfit>(outfit ?? look.outfit);
  const top = $derived(TOP[wear]);
  const has = (extra: NonNullable<Look['extras']>[number]) => look.extras?.includes(extra) ?? false;
  const pearls = [44, 49, 54.5, 60, 65.5, 71, 76].map((x) => ({ x, y: 96 + Math.abs(x - 60) * -0.18 + 6 }));
</script>

<svg
  class="defendant {mood}"
  viewBox="0 0 120 130"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  <g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
    <!-- Long hair falls behind the head and shoulders. -->
    {#if look.hair === 'long'}
      <path d="M26 50 Q24 16 60 15 Q96 16 94 50 L97 96 L23 96 Z" fill={HAIR} />
    {/if}

    <!-- Neck and body -->
    <rect x="51" y="74" width="18" height="22" rx="5" fill={skin} />
    <g class="body">
      {#if wear === 'singlet'}
        <path d="M14 130 Q16 97 60 93 Q104 97 106 130 Z" fill={skin} />
        <path d="M38 130 L40 100 Q60 108 80 100 L82 130 Z" fill={top} />
      {:else}
        <path d="M14 130 Q16 97 60 93 Q104 97 106 130 Z" fill={top} />
      {/if}

      {#if wear === 'suit'}
        <path d="M49 94 L60 120 L71 94 Z" fill="#fff" />
        <path d="M57 98 L63 98 L64.5 116 L60 122 L55.5 116 Z" fill="var(--red)" />
        <path d="M49 94 L56 113 L51 130 M71 94 L64 113 L69 130" fill="none" />
      {:else if wear === 'uniform'}
        <path d="M50 94 L60 106 L70 94" fill="#a8875a" />
        <path d="M16 106 L34 100 M104 106 L86 100" fill="none" stroke-width="5" />
        <path d="M80 108 l2.4 4.8 5.3 .8 -3.8 3.7 .9 5.3 -4.8 -2.5 -4.8 2.5 .9 -5.3 -3.8 -3.7 5.3 -.8 Z" fill="var(--gold)" stroke-width="1.5" />
        <path d="M60 106 L60 130" fill="none" stroke-width="1.5" />
      {:else if wear === 'shirt'}
        <path d="M49 94 L57 104 L60 96 Z M71 94 L63 104 L60 96 Z" fill="#e8f4f4" />
        <path d="M60 100 L60 130" fill="none" stroke-width="1.5" />
      {:else if wear === 'apron'}
        <path d="M41 106 L79 106 L84 130 L36 130 Z" fill="#fffdf7" />
        <path d="M44 106 L47 95 M76 106 L73 95" fill="none" stroke-width="2" />
      {:else if wear === 'hoodie'}
        <path d="M38 96 Q60 84 82 96 Q60 106 38 96 Z" fill="#646b7c" />
        <path d="M54 101 L53 116 M66 101 L67 116" fill="none" stroke-width="2" />
        <path d="M44 122 L76 122" fill="none" stroke-width="1.5" />
      {:else if wear === 'dress' || wear === 'vest-dress'}
        <path d="M46 94 Q60 108 74 94" fill={skin} />
      {:else if wear === 'boss'}
        <path d="M50 94 L60 108 L70 94 Z" fill={skin} />
        <path d="M50 94 L57 112 L53 130 M70 94 L63 112 L67 130" fill="none" />
        <path d="M53 101 Q60 108 67 101" fill="none" stroke="var(--gold)" stroke-width="2" />
      {:else if wear === 'prison'}
        <path d="M50 94 L60 108 L70 94" fill="#d9761a" />
        <rect x="68" y="110" width="20" height="10" rx="2" fill="#fff" stroke-width="1.5" />
        <path d="M71 115 L85 115" fill="none" stroke-width="1.5" />
      {/if}

      {#if wear === 'vest' || wear === 'vest-dress'}
        <path d="M30 101 L46 95 L52 130 L24 130 Z M90 101 L74 95 L68 130 L96 130 Z" fill="var(--orange)" />
        <path d="M27 116 L50 116 M93 116 L70 116" fill="none" stroke="#fff6c8" stroke-width="4" />
      {/if}

      {#if has('pearls')}
        {#each pearls as p (p.x)}
          <circle cx={p.x} cy={p.y} r="2.6" fill="#fffdf2" stroke-width="1.2" />
        {/each}
      {/if}

      {#if has('watch')}
        <path d="M6 130 L15 109 L29 113 L24 130 Z" fill={top} />
        <rect x="13" y="103" width="17" height="7" rx="2" fill="var(--gold)" />
        <circle cx="22" cy="97" r="7.5" fill={skin} />
      {/if}
    </g>

    <!-- Head -->
    <g class="head">
      <circle cx="29" cy="54" r="6" fill={skin} />
      <circle cx="91" cy="54" r="6" fill={skin} />
      <circle cx="60" cy="50" r="32" fill={skin} />

      {#if look.hair === 'short'}
        <path d="M28 47 Q29 17 60 16 Q91 17 92 47 Q86 29 60 29 Q34 29 28 47 Z" fill={HAIR} />
      {:else if look.hair === 'parted'}
        <path d="M28 49 Q27 15 62 15 Q93 17 92 46 Q82 25 50 30 Q37 33 28 49 Z" fill={HAIR} />
        <path d="M50 30 Q55 22 66 18" fill="none" stroke="#5a4c45" stroke-width="1.5" />
      {:else if look.hair === 'curly'}
        {#each [[33, 36], [41, 25], [52, 19], [64, 18], [76, 22], [86, 32], [90, 43]] as [x, y] (x)}
          <circle cx={x} cy={y} r="9" fill={HAIR} />
        {/each}
      {:else if look.hair === 'bun'}
        <circle cx="60" cy="13" r="10" fill={HAIR} />
        <path d="M28 47 Q29 18 60 18 Q91 18 92 47 Q84 30 60 31 Q36 30 28 47 Z" fill={HAIR} />
      {:else if look.hair === 'long'}
        <path d="M28 47 Q33 21 60 21 Q87 21 92 47 Q78 33 60 34 Q42 33 28 47 Z" fill={HAIR} />
      {:else}
        <path d="M30 44 Q31 38 35 35 M90 44 Q89 38 85 35" fill="none" stroke={HAIR} stroke-width="4" />
        <ellipse cx="47" cy="29" rx="7" ry="3.5" fill="#fff" opacity="0.45" stroke="none" transform="rotate(-25 47 29)" />
      {/if}

      {#if has('cap')}
        <path d="M27 40 Q28 11 60 11 Q92 11 93 40 Z" fill="var(--red)" />
        <path d="M24 41 Q60 33 96 41 Q96 47 60 46 Q24 47 24 41 Z" fill="var(--red-deep)" />
      {/if}

      <!-- Face -->
      <g class="face" fill="none">
        {#if mood === 'smug'}
          <path d="M42 45 L53 46" />
          <path d="M67 43 Q72 38 78 42" />
          <path d="M43 52 L53 52" />
          <path d="M67 52 L77 52" />
          <path d="M45 52.5 Q48 56 51 52.5 M69 52.5 Q72 56 75 52.5" fill="var(--ink)" stroke-width="1.5" />
          <path d="M51 69 Q62 73 70 64" />
        {:else if mood === 'nervous'}
          <path d="M42 44 Q47 41 53 44 M67 44 Q73 41 78 44" />
          <g class="dart">
            <circle cx="48" cy="52" r="2.6" fill="var(--ink)" stroke="none" />
            <circle cx="72" cy="52" r="2.6" fill="var(--ink)" stroke="none" />
          </g>
          <path d="M50 70 Q53 66 56 70 Q59 74 62 70 Q65 66 68 70" stroke-width="2" />
          <path class="sweat" d="M89 32 Q85 39 89 41 Q93 39 89 32 Z" fill="#9ed3f0" stroke-width="1.5" />
        {:else if mood === 'sad'}
          <path d="M42 45 L53 41 M67 41 L78 45" />
          <circle cx="48" cy="52" r="2.8" fill="var(--ink)" stroke="none" />
          <circle cx="72" cy="52" r="2.8" fill="var(--ink)" stroke="none" />
          <path d="M51 71 Q60 64 69 71" />
          <path class="tear" d="M47 58 Q45 63 47 65 Q49 63 47 58 Z" fill="#9ed3f0" stroke-width="1.2" />
        {:else}
          <path d="M41 39 Q47 34 53 38 M67 38 Q73 34 79 39" />
          <circle cx="48" cy="51" r="6" fill="#fff" />
          <circle cx="72" cy="51" r="6" fill="#fff" />
          <circle cx="48" cy="51" r="1.8" fill="var(--ink)" stroke="none" />
          <circle cx="72" cy="51" r="1.8" fill="var(--ink)" stroke="none" />
          <ellipse cx="60" cy="70" rx="5" ry="6.5" fill="#7a2a2a" />
        {/if}

        {#if has('moustache')}
          <path d="M49 64 Q54 59 60 62.5 Q66 59 71 64 Q66 66.5 60 65 Q54 66.5 49 64 Z" fill={HAIR} stroke-width="1.5" />
        {/if}
        <path d="M60 55 Q63.5 60 59 61.5" stroke-width="2" />
        {#if has('glasses')}
          <circle cx="48" cy="52" r="7.5" fill="rgb(255 255 255 / 0.25)" stroke-width="2" />
          <circle cx="72" cy="52" r="7.5" fill="rgb(255 255 255 / 0.25)" stroke-width="2" />
          <path d="M55.5 52 L64.5 52" stroke-width="2" />
        {/if}
      </g>
    </g>
  </g>
</svg>

<style>
  .defendant {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .head {
    transform-box: view-box;
    transform-origin: 60px 88px;
    animation: bob 3.2s ease-in-out infinite;
  }

  .nervous .head {
    animation: tremble 0.35s linear infinite;
  }

  .nervous .dart {
    animation: dart 1.6s steps(1) infinite;
  }

  .sweat {
    animation: drip 1.8s ease-in infinite;
  }

  .sad .head {
    animation: droop 3.6s ease-in-out infinite;
  }

  .shocked .head {
    animation: jolt 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
  }

  @keyframes bob {
    50% {
      transform: rotate(-3deg);
    }
  }

  @keyframes tremble {
    25% {
      transform: translateX(-0.6px) rotate(-0.6deg);
    }
    75% {
      transform: translateX(0.6px) rotate(0.6deg);
    }
  }

  @keyframes dart {
    0%,
    100% {
      transform: translateX(0);
    }
    35% {
      transform: translateX(-2.5px);
    }
    65% {
      transform: translateX(2.5px);
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

  @keyframes droop {
    50% {
      transform: translateY(2px) rotate(2deg);
    }
  }

  @keyframes jolt {
    0% {
      transform: translateY(0) scale(1);
    }
    40% {
      transform: translateY(-7px) scale(1.06);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
</style>
