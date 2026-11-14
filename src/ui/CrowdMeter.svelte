<script lang="ts">
  import { untrack } from 'svelte';
  import { CROWD_MAX } from '../court/court';
  import { crowdMood } from '../court/report';
  import CrowdFace from './CrowdFace.svelte';

  let { crowd }: { crowd: number } = $props();

  const mood = $derived(crowdMood(crowd));

  // When the crowd moves, float the change above the meter and bounce or droop the face.
  let previous = untrack(() => crowd);
  let delta = $state(0);
  let bump = $state(0);

  $effect(() => {
    const now = crowd;
    if (now === previous) return;
    delta = now - previous;
    previous = now;
    bump += 1;
    const id = setTimeout(() => (delta = 0), 1500);
    return () => clearTimeout(id);
  });
</script>

<div class="meter" class:up={delta > 0} class:down={delta < 0} role="img" aria-label="Crowd {crowd} of {CROWD_MAX}, {mood}">
  {#key bump}
    <span class="face"><CrowdFace {mood} /></span>
  {/key}
  <span class="pips" aria-hidden="true">
    {#each Array.from({ length: CROWD_MAX }, (_, i) => i) as i (i)}
      <span class="pip" class:on={i < crowd}></span>
    {/each}
  </span>
  {#if delta !== 0}
    <span class="delta" aria-hidden="true">{delta > 0 ? `+${delta}` : `−${-delta}`}</span>
  {/if}
</div>

<style>
  .meter {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .face {
    display: grid;
  }

  .up .face {
    animation: cheer 0.6s cubic-bezier(0.3, 1.8, 0.5, 1);
  }

  .down .face {
    animation: droop 0.6s ease;
  }

  .pips {
    display: flex;
    gap: 2px;
  }

  .pip {
    width: 0.5rem;
    height: 0.9rem;
    border: 1.5px solid var(--ink);
    border-radius: 3px;
    background: var(--paper);
    transition: background-color 0.3s ease;
  }

  .pip.on {
    background: var(--gold);
  }

  .up .pip.on {
    background: var(--green);
  }

  .down .pip.on {
    background: var(--red);
  }

  .delta {
    position: absolute;
    left: 1.6rem;
    top: -0.2rem;
    font-weight: 900;
    pointer-events: none;
    animation: float 1.5s ease-out forwards;
  }

  .up .delta {
    color: var(--green-deep);
  }

  .down .delta {
    color: var(--red-deep);
  }

  @keyframes cheer {
    40% {
      transform: translateY(-6px) scale(1.2);
    }
  }

  @keyframes droop {
    40% {
      transform: translateY(3px) rotate(-12deg);
    }
  }

  @keyframes float {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-1.6rem);
    }
  }

  @media (max-width: 520px) {
    .pip {
      width: 0.35rem;
    }
  }
</style>
