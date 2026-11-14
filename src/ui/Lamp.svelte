<script lang="ts">
  import { FAITH_MAX } from '../game/config';

  let { faith }: { faith: number } = $props();

  const glow = $derived(0.15 + (faith / FAITH_MAX) * 0.85);
</script>

<div class="lamp" role="img" aria-label="Faith {faith} of {FAITH_MAX}" title="Faith: how much the living trust your judgment">
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

  .halo,
  .flame {
    transition: opacity 0.4s ease;
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
</style>
