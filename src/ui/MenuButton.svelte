<script lang="ts">
  import MenuIcon from '@lucide/svelte/icons/menu';
  import { game } from './game.svelte';
</script>

<button type="button" class="menu-button" aria-label="Menu" title="Menu (Esc)" onclick={() => (game.overlay = 'menu')}>
  <MenuIcon size={22} aria-hidden="true" />
</button>

<style>
  .menu-button {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid rgb(245 236 215 / 0.35);
    background: rgb(15 18 38 / 0.5);
  }

  .menu-button:hover {
    background: rgb(15 18 38 / 0.8);
  }
</style>
