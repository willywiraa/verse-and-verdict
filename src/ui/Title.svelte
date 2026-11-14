<script lang="ts">
  import { game } from './game.svelte';
  import Wisp from './Wisp.svelte';

  let confirmNew = $state(false);
</script>

<main class="night-page title">
  <Wisp hue={44} emblem="lamp" />
  <h1>Verse &amp; Verdict</h1>
  <p class="tagline">Judge the dead. The living are taking notes.</p>

  <div class="actions column">
    {#if game.reignInProgress && game.state}
      <button type="button" class="btn primary" onclick={() => game.continueReign()}>
        Continue · Day {game.state.day}
      </button>
      {#if confirmNew}
        <p class="confirm">Abandon your current reign and begin again?</p>
        <div class="actions">
          <button type="button" class="btn" onclick={() => game.beginReign()}>Yes, begin again</button>
          <button type="button" class="btn" onclick={() => (confirmNew = false)}>Keep my reign</button>
        </div>
      {:else}
        <button type="button" class="btn" onclick={() => (confirmNew = true)}>Begin a new reign</button>
      {/if}
    {:else}
      <button type="button" class="btn primary" onclick={() => game.beginReign()}>Begin</button>
    {/if}
    <button type="button" class="btn quiet" onclick={() => (game.overlay = 'menu')}>Settings</button>
  </div>

  <p class="note">A game about death and judgment. Nothing graphic. Some stories are sad.</p>
</main>

<style>
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
  }

  h1 {
    margin: 0.5rem 0 0;
    font-family: var(--serif);
    font-weight: 600;
    font-size: clamp(2.6rem, 9vw, 4rem);
    line-height: 1;
  }

  .tagline {
    margin: 0.75rem 0 2rem;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.3rem;
  }

  .confirm {
    margin: 0.5rem 0 0;
  }

  .note {
    margin: 2.5rem 0 0;
    font-size: 0.85rem;
    opacity: 0.8;
  }
</style>
