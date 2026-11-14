<script lang="ts">
  import Ending from './ui/Ending.svelte';
  import { game } from './ui/game.svelte';
  import { TEXT_SIZES } from './ui/labels';
  import Menu from './ui/Menu.svelte';
  import { NIGHT_SKY, daySky } from './ui/sky';
  import SoulScreen from './ui/SoulScreen.svelte';
  import Title from './ui/Title.svelte';
  import WorldBelow from './ui/WorldBelow.svelte';

  const playing = $derived(game.screen === 'play' ? game.state : null);
  const sky = $derived(playing?.phase === 'soul' ? daySky(playing.index, playing.docket.length) : NIGHT_SKY);

  $effect(() => {
    document.documentElement.style.fontSize = TEXT_SIZES[game.settings.textSize];
  });

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && !game.overlay && game.screen === 'play') {
      event.preventDefault();
      game.overlay = 'menu';
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div class="sky" class:night={sky === NIGHT_SKY} style:--sky-top={sky.top} style:--sky-bottom={sky.bottom}>
  {#if !playing}
    <Title />
  {:else if playing.phase === 'soul'}
    <SoulScreen reign={playing} />
  {:else if playing.phase === 'dayEnd'}
    <WorldBelow reign={playing} />
  {:else}
    <Ending reign={playing} />
  {/if}

  {#if game.overlay}
    <Menu />
  {/if}
</div>
