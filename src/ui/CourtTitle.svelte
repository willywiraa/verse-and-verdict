<script lang="ts">
  import Gavel from '@lucide/svelte/icons/gavel';
  import { court } from './court.svelte';
</script>

<main class="title">
  <div class="logo">
    <span class="gavel" aria-hidden="true"><Gavel size={64} strokeWidth={2} /></span>
    <h1>Fit the Crime</h1>
    <p class="tagline">Pick the punishment. Watch what happens.</p>
  </div>

  <p class="intro">You are the new judge of Kota Damai. Six cases today. No right answers.</p>

  <div class="actions column">
    {#if court.dayInProgress}
      <button type="button" class="btn primary" onclick={() => court.continueDay()}>Continue</button>
      <button type="button" class="btn quiet" onclick={() => court.startDay()}>Start a new day</button>
    {:else}
      <button type="button" class="btn primary" onclick={() => court.startDay()}>Start court</button>
    {/if}
  </div>

  <p class="note">Cartoon crimes and punishments. Nothing graphic. Every person and place is made up.</p>
</main>

<style>
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 100vh;
    min-height: 100dvh;
    max-width: 36rem;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
  }

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gavel {
    display: grid;
    color: var(--red);
    transform-origin: 80% 80%;
    animation: knock 2.8s ease-in-out infinite;
  }

  h1 {
    margin: 0.2rem 0 0;
    font-family: var(--serif);
    font-weight: 600;
    font-size: clamp(2.8rem, 11vw, 4.2rem);
    line-height: 1;
  }

  .tagline {
    margin: 0.4rem 0 0;
    font-weight: 800;
    font-size: 1.05rem;
  }

  .intro {
    margin: 0;
    color: var(--ink-soft);
    font-weight: 600;
  }

  .note {
    margin: 1rem 0 0;
    font-size: 0.8rem;
    color: var(--ink-soft);
  }

  @keyframes knock {
    0%,
    70%,
    100% {
      transform: rotate(0);
    }
    78% {
      transform: rotate(-28deg);
    }
    84% {
      transform: rotate(6deg);
    }
    90% {
      transform: rotate(0);
    }
  }
</style>
