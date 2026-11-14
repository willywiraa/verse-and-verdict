<script lang="ts">
  import type { CrowdMood } from '../court/report';
  import type { Crowd } from '../court/types';
  import CrowdFace from './CrowdFace.svelte';

  /** A row of faces reacting to one verdict, with a shout. */
  let { change, shout }: { change: Crowd; shout: string } = $props();

  const MOOD: Readonly<Record<Crowd, CrowdMood>> = { 2: 'cheering', 1: 'happy', 0: 'calm', [-1]: 'unhappy', [-2]: 'furious' };
  const mood = $derived(MOOD[change]);
  const faces = [0, 1, 2, 3, 4, 5, 6];
</script>

<div class="strip" class:up={change > 0} class:down={change < 0}>
  <div class="faces" aria-hidden="true">
    {#each faces as i (i)}
      <span class="face" style:--d="{i * 0.06}s"><CrowdFace {mood} size={34} /></span>
    {/each}
  </div>
  <p class="shout">
    <span class="words">“{shout}”</span>
    <span class="change">Crowd {change > 0 ? `+${change}` : change < 0 ? `−${-change}` : '±0'}</span>
  </p>
</div>

<style>
  .strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.4rem 1rem;
  }

  .faces {
    display: flex;
    gap: 0.15rem;
  }

  .face {
    display: grid;
    animation: arrive 0.3s ease-out var(--d) both;
  }

  .up .face {
    animation:
      arrive 0.3s ease-out var(--d) both,
      jump 0.5s ease-in-out calc(var(--d) + 0.3s) 3;
  }

  .down .face {
    animation:
      arrive 0.3s ease-out var(--d) both,
      grumble 0.25s ease-in-out calc(var(--d) + 0.3s) 4;
  }

  .shout {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    margin: 0;
  }

  .words {
    font-size: 1.25rem;
    font-weight: 900;
    animation: arrive 0.3s cubic-bezier(0.3, 1.7, 0.5, 1) 0.35s both;
  }

  .change {
    padding: 0.05rem 0.5rem;
    border: 2px solid var(--ink);
    border-radius: 999px;
    background: var(--paper);
    font-weight: 800;
    font-size: 0.85rem;
  }

  .up .change {
    background: #d6efdd;
  }

  .down .change {
    background: #f8d6d2;
  }

  @keyframes arrive {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.6);
    }
  }

  @keyframes jump {
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes grumble {
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }
</style>
