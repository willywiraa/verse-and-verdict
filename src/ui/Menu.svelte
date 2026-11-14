<script lang="ts">
  import BookOfVerses from './BookOfVerses.svelte';
  import { game } from './game.svelte';

  let dialog: HTMLDialogElement | undefined;
  let confirmReset = $state(false);

  const SIZES = [
    { value: 0, label: 'Normal' },
    { value: 1, label: 'Large' },
    { value: 2, label: 'Larger' },
  ] as const;

  $effect(() => {
    dialog?.showModal();
    return () => dialog?.close();
  });

  function close() {
    game.overlay = null;
  }
</script>

<dialog bind:this={dialog} class="panel" aria-labelledby="panel-title" onclose={close}>
  {#if game.overlay === 'book' && game.state}
    <h2 id="panel-title">Book of Verses</h2>
    <BookOfVerses reign={game.state} />
    <div class="actions">
      <button type="button" class="btn" onclick={() => (game.overlay = 'menu')}>Back</button>
      <button type="button" class="btn primary" onclick={close}>Close</button>
    </div>
  {:else}
    <h2 id="panel-title">Menu</h2>

    <fieldset>
      <legend>Text size</legend>
      <div class="actions">
        {#each SIZES as size (size.value)}
          <button
            type="button"
            class="btn"
            aria-pressed={game.settings.textSize === size.value}
            onclick={() => game.setTextSize(size.value)}>{size.label}</button
          >
        {/each}
      </div>
    </fieldset>

    <fieldset>
      <legend>Sound</legend>
      <div class="actions">
        <button type="button" class="btn" aria-pressed={game.settings.sound} onclick={() => game.setSound(true)}>On</button>
        <button type="button" class="btn" aria-pressed={!game.settings.sound} onclick={() => game.setSound(false)}>Off</button>
      </div>
    </fieldset>

    <div class="actions column">
      {#if game.state && game.state.history.length > 0}
        <button type="button" class="btn" onclick={() => (game.overlay = 'book')}>Book of Verses</button>
      {/if}
      {#if game.screen === 'play'}
        <button type="button" class="btn" onclick={() => game.toTitle()}>Return to title</button>
      {/if}
      {#if confirmReset}
        <p class="warning">This forgets your current reign and every ending you have seen. Settings stay.</p>
        <div class="actions">
          <button type="button" class="btn danger" onclick={() => game.resetProgress()}>Yes, reset</button>
          <button type="button" class="btn" onclick={() => (confirmReset = false)}>Cancel</button>
        </div>
      {:else}
        <button type="button" class="btn" onclick={() => (confirmReset = true)}>Reset progress</button>
      {/if}
      <button type="button" class="btn primary" onclick={close}>Close</button>
    </div>

    <p class="credits">Icons: Lucide (ISC). Type: Cormorant Garamond (SIL Open Font License).</p>
  {/if}
</dialog>

<style>
  .panel {
    width: min(92vw, 30rem);
    max-height: 85vh;
    padding: 1.5rem;
    border: 1px solid rgb(245 236 215 / 0.25);
    border-radius: 18px;
    background: var(--night);
    color: var(--parchment);
    text-align: center;
  }

  .panel::backdrop {
    background: rgb(8 9 20 / 0.7);
  }

  h2 {
    margin: 0 0 1rem;
    font-family: var(--serif);
    font-size: 1.8rem;
    font-weight: 600;
  }

  fieldset {
    margin: 0 0 1.25rem;
    padding: 0;
    border: none;
  }

  legend {
    margin: 0 auto 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  .warning {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
  }

  .credits {
    margin: 1.5rem 0 0;
    font-size: 0.75rem;
    opacity: 0.7;
  }
</style>
