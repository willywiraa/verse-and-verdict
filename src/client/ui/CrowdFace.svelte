<script lang="ts">
  import type { CrowdMood } from '@shared/court/report';

  let { mood, size = 28 }: { mood: CrowdMood; size?: number } = $props();

  const FILL: Readonly<Record<CrowdMood, string>> = {
    furious: '#f19a8f',
    unhappy: '#f4c58f',
    calm: '#f6e2a4',
    happy: '#c8e6a0',
    cheering: '#a6dd9a',
  };
</script>

<svg class="face" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
  <g stroke="var(--ink)" stroke-width="2" stroke-linecap="round" fill="none">
    <circle cx="16" cy="16" r="13" fill={FILL[mood]} />
    {#if mood === 'furious'}
      <path d="M9 10 L14 12.5 M23 10 L18 12.5" />
      <path d="M10 23 Q16 17 22 23" />
    {:else if mood === 'unhappy'}
      <path d="M10 22 Q16 18 22 22" />
    {:else if mood === 'calm'}
      <path d="M11 21 L21 21" />
    {:else if mood === 'happy'}
      <path d="M10 19 Q16 24 22 19" />
    {:else}
      <path d="M9 18 Q16 27 23 18 Z" fill="var(--ink)" />
    {/if}
    {#if mood === 'furious'}
      <circle cx="11.5" cy="15" r="1.4" fill="var(--ink)" stroke="none" />
      <circle cx="20.5" cy="15" r="1.4" fill="var(--ink)" stroke="none" />
    {:else if mood === 'cheering'}
      <path d="M9 13 Q11.5 10 14 13 M18 13 Q20.5 10 23 13" />
    {:else}
      <circle cx="11.5" cy="13.5" r="1.4" fill="var(--ink)" stroke="none" />
      <circle cx="20.5" cy="13.5" r="1.4" fill="var(--ink)" stroke="none" />
    {/if}
  </g>
</svg>

<style>
  .face {
    display: block;
    flex: none;
  }
</style>
