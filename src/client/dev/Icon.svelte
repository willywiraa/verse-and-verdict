<script lang="ts">
  /**
   * Development only: the app icon, drawn with the game's own rig, for a
   * 1024 × 1024 screenshot (assets/icon.png). Open the dev server with ?icon.
   */
  import Gavel from '@lucide/svelte/icons/gavel';
  import { CASES } from '@shared/cases';
  import Character from '../ui/rig/Character.svelte';

  const harjo = CASES.find((c) => c.id === 'hospital-money')!.person.look;
</script>

<main class="icon">
  <div class="mug"><Character look={harjo} mood="shocked" framing="bust" idle={false} /></div>
  <div class="stamp">Sentenced</div>
  <span class="gavel"><Gavel size="100%" strokeWidth={2.2} /></span>
</main>

<style>
  .icon {
    position: relative;
    width: 1024px;
    height: 1024px;
    background:
      radial-gradient(ellipse 70% 50% at 50% 20%, rgb(255 255 255 / 0.7), transparent 70%),
      linear-gradient(180deg, var(--wall), var(--wall-deep));
    overflow: hidden;
  }

  .mug {
    position: absolute;
    left: 170px;
    top: 120px;
    width: 684px;
    padding: 40px 30px 0;
    border: 18px solid var(--ink);
    border-radius: 60px;
    background:
      repeating-linear-gradient(180deg, transparent 0 58px, rgb(31 42 68 / 0.18) 58px 68px),
      #e4ecef;
    box-shadow: 28px 28px 0 var(--ink);
    overflow: hidden;
  }

  .stamp {
    position: absolute;
    left: 50%;
    top: 690px;
    padding: 6px 40px;
    border: 22px solid var(--red);
    border-radius: 30px;
    background: rgb(255 255 255 / 0.9);
    color: var(--red-deep);
    font-size: 118px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transform: translateX(-50%) rotate(-9deg);
  }

  .gavel {
    position: absolute;
    right: 70px;
    top: 60px;
    width: 230px;
    height: 230px;
    display: grid;
    color: var(--red);
    transform: rotate(-12deg);
  }
</style>
