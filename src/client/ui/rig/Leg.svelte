<svelte:options namespace="svg" />

<script lang="ts">
  import type { Gait, OutfitStyle } from './parts';

  let {
    x,
    style,
    skin,
    gait,
    second = false,
  }: { x: number; style: OutfitStyle; skin: string; gait: Gait; second?: boolean } = $props();

  const leg = $derived(style.legs === 'pants' ? style.pants : skin);
</script>

<g transform="translate({x} 143)" stroke-linecap="round" stroke-linejoin="round">
  <g class="leg {gait}" class:second>
    <line y2="38" stroke="var(--ink)" stroke-width="15" />
    <line y2="38" stroke={leg} stroke-width="11.5" />
    {#if style.legs === 'shorts'}
      <path d="M-7.5 -3 H7.5 V13 H-7.5 Z" fill={style.pants} stroke="var(--ink)" stroke-width="2" />
      <path d="M-4 3 V9 M2 1 V7" stroke="#fff" stroke-width="1.6" opacity="0.7" />
    {/if}
    {#if style.socks}
      <path d="M-6.5 33 H6.5 V40 Q6.5 45 0 45 Q-6.5 45 -6.5 40 Z" fill="#fff" stroke="var(--ink)" stroke-width="2" />
    {:else}
      <ellipse cx="0.8" cy="40.5" rx="8.8" ry="5.4" fill={style.shoes} stroke="var(--ink)" stroke-width="2.2" />
    {/if}
  </g>
</g>

<style>
  .leg {
    transform-origin: 0 0;
  }

  .leg.walk {
    animation: step 0.56s ease-in-out infinite alternate;
  }

  .leg.run {
    animation: step-run 0.36s ease-in-out infinite alternate;
  }

  /* The other leg is half a step behind. */
  .leg.second {
    animation-direction: alternate-reverse;
  }

  @keyframes step {
    from {
      transform: rotate(-17deg);
    }
    to {
      transform: rotate(17deg);
    }
  }

  @keyframes step-run {
    from {
      transform: rotate(-28deg);
    }
    to {
      transform: rotate(28deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .leg {
      animation: none !important;
    }
  }
</style>
