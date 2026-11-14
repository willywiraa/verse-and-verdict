<script lang="ts">
  import { untrack } from 'svelte';
  import { FAITH_MAX } from '../game/config';

  let { faith }: { faith: number } = $props();

  const glow = $derived(0.15 + (faith / FAITH_MAX) * 0.85);

  // When Faith changes, flare or flicker the lamp and float the change above it.
  let previous = untrack(() => faith);
  let delta = $state(0);
  let flash = $state(0);

  $effect(() => {
    const now = faith;
    if (now === previous) return;
    delta = now - previous;
    previous = now;
    flash += 1;
    const id = setTimeout(() => (delta = 0), 1400);
    return () => clearTimeout(id);
  });
</script>

<div
  class="lamp"
  class:up={delta > 0}
  class:down={delta < 0}
  role="img"
  aria-label="Faith {faith} of {FAITH_MAX}"
  title="Faith: how much the living trust you"
>
  <span class="art">
    <svg viewBox="0 0 32 40" width="26" height="33" aria-hidden="true">
      <defs>
        <radialGradient id="lamp-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0" stop-color="#fff4d6" />
          <stop offset="0.55" stop-color="#e0b15a" />
          <stop offset="1" stop-color="#e0b15a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle class="halo" cx="16" cy="24" r="16" fill="url(#lamp-glow)" style:opacity={glow} />
      <path d="M11 6h10M16 2v4M9 10h14l-2 22H11z" fill="none" stroke="#f5ecd7" stroke-width="1.6" stroke-linejoin="round" />
      <path class="flame" d="M16 15c2 3 3 5 3 7a3 3 0 0 1-6 0c0-2 1-4 3-7z" fill="#ffd27a" style:opacity={0.25 + glow * 0.75} />
    </svg>
    {#key flash}
      {#if delta !== 0}
        <span class="delta" aria-hidden="true">{delta > 0 ? '+' : '−'}{Math.abs(delta)}</span>
      {/if}
    {/key}
  </span>
  <span class="pips" aria-hidden="true">
    {#each { length: FAITH_MAX } as _, i (i)}
      <span class="pip" class:lit={i < faith}></span>
    {/each}
  </span>
</div>

<style>
  .lamp {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .art {
    position: relative;
    display: grid;
  }

  .halo,
  .flame {
    transition: opacity 0.5s ease;
  }

  .up .art {
    animation: flare 0.8s ease-out;
  }

  .down .art {
    animation: flicker 0.8s steps(2, jump-none);
  }

  .delta {
    position: absolute;
    left: 50%;
    top: -0.2rem;
    transform: translateX(-50%);
    font-weight: 800;
    font-size: 0.9rem;
    pointer-events: none;
    animation: float-up 1.3s ease-out forwards;
  }

  .up .delta {
    color: #ffd27a;
  }

  .down .delta {
    color: #ff9a6b;
  }

  .pips {
    display: grid;
    grid-template-columns: repeat(10, 0.45rem);
    gap: 0.18rem;
  }

  .pip {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    border: 1px solid rgb(245 236 215 / 0.55);
    transition: background-color 0.4s ease;
  }

  .pip.lit {
    background: var(--gold);
    border-color: var(--gold);
  }

  @keyframes flare {
    40% {
      transform: scale(1.25);
      filter: brightness(1.5) drop-shadow(0 0 8px #e0b15a);
    }
  }

  @keyframes flicker {
    25%,
    75% {
      opacity: 0.35;
    }
  }

  @keyframes float-up {
    0% {
      opacity: 0;
      transform: translate(-50%, 0.4rem);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -1.6rem);
    }
  }

  @media (max-width: 420px) {
    .pips {
      grid-template-columns: repeat(10, 0.35rem);
    }

    .pip {
      width: 0.35rem;
      height: 0.35rem;
    }
  }
</style>
