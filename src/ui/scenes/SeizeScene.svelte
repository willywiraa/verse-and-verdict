<script lang="ts">
  import type { Case, Option } from '../../court/types';
  import Defendant from '../Defendant.svelte';
  import { PICTURE_COLORS, PICTURE_ICONS } from '../pictures';
  import Puff from './Puff.svelte';

  /** Take wealth: SEIZED stamps, everything into a truck, and what the money builds pops up. */
  let { file, option }: { file: Case; option: Extract<Option, { scene: 'seize' }> } = $props();

  // Each item starts in a row and flies right into the truck. Distances are in % of the scene width.
  const items = $derived(
    option.items.map((picture, i) => ({ picture, i, x: 26 + i * 15, dx: 74 - (26 + i * 15) })),
  );
  const builds = $derived(option.builds ? Array.from({ length: option.builds.count }, (_, i) => i) : []);
</script>

<div class="scene seize">
  <div class="sky"></div>
  <div class="ground"></div>

  {#each items as item (item.i)}
    {@const Icon = PICTURE_ICONS[item.picture]}
    <div class="item" style:left="{item.x}%" style:--dx={item.dx} style:--stamp="{0.3 + item.i * 0.3}s" style:--fly="{1.25 + item.i * 0.08}s">
      <span class="thing" style:color={PICTURE_COLORS[item.picture]}><Icon size="100%" strokeWidth={1.75} /></span>
      <span class="seized">Seized</span>
    </div>
  {/each}

  <svg class="truck" viewBox="0 0 100 60" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
      <rect x="4" y="6" width="62" height="40" rx="3" fill="#e8eef2" />
      <path d="M66 18 L84 18 L96 32 L96 46 L66 46 Z" fill="var(--red)" />
      <path d="M72 22 L82 22 L90 32 L72 32 Z" fill="#bfe6ea" stroke-width="2" />
      <circle cx="22" cy="48" r="8" fill="var(--ink)" />
      <circle cx="80" cy="48" r="8" fill="var(--ink)" />
    </g>
  </svg>

  {#if option.builds}
    {@const Built = PICTURE_ICONS[option.builds.picture]}
    <div class="built" style:color={PICTURE_COLORS[option.builds.picture]}>
      {#each builds as i (i)}
        <span class="new" style:--d="{2.15 + i * 0.12}s"><Built size="100%" strokeWidth={2} /></span>
      {/each}
    </div>
  {/if}

  <div class="person">
    <div class="before"><Defendant look={file.person.look} mood="shocked" /></div>
    <div class="after"><Defendant look={file.person.look} mood="sad" outfit="singlet" /></div>
    <Puff at={1.05} />
  </div>
</div>

<style>
  .scene {
    position: absolute;
    inset: 0;
    container-type: inline-size;
    overflow: hidden;
  }

  .sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #bfe6ea, #e6f4f2);
  }

  .ground {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 16%;
    border-top: var(--line);
    background: #c9b48a;
  }

  .item {
    position: absolute;
    bottom: 16%;
    width: 13%;
    aspect-ratio: 1;
    opacity: 0;
    transform: translateX(calc(var(--dx) * 1cqi)) scale(0.25);
    animation: fly 0.55s ease-in var(--fly) both;
  }

  .thing {
    display: grid;
    width: 100%;
    height: 100%;
    padding: 8%;
    border: var(--line);
    border-radius: 10px;
    background: #fffdf7;
    box-shadow: var(--shadow-small);
  }

  .seized {
    position: absolute;
    left: 50%;
    top: 40%;
    padding: 0 0.3em;
    border: 3px solid var(--red);
    border-radius: 4px;
    background: rgb(255 255 255 / 0.7);
    color: var(--red-deep);
    font-weight: 900;
    font-size: clamp(0.55rem, 2.6cqi, 1rem);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transform: translate(-50%, -50%) rotate(-12deg);
    animation: stamp 0.25s cubic-bezier(0.3, 1.6, 0.5, 1) var(--stamp) both;
  }

  .truck {
    position: absolute;
    left: 72%;
    bottom: 11%;
    width: 22%;
    transform: translateX(60cqi);
    animation: drive 0.5s ease-in 1.85s both;
  }

  .built {
    position: absolute;
    left: 30%;
    right: 4%;
    bottom: 16%;
    display: flex;
    justify-content: center;
    gap: 2%;
  }

  .new {
    display: grid;
    width: 17%;
    max-width: 5rem;
    aspect-ratio: 1;
    padding: 2%;
    border: var(--line);
    border-bottom: 0;
    border-radius: 8px 8px 0 0;
    background: #fffdf7;
    transform-origin: bottom;
    animation: rise 0.35s cubic-bezier(0.3, 1.6, 0.5, 1) var(--d) both;
  }

  .person {
    position: absolute;
    left: 3%;
    bottom: 4%;
    height: 64%;
    aspect-ratio: 120 / 130;
  }

  .before {
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: hide 1.2s step-end both;
  }

  .after {
    animation: show 0.01s linear 1.2s both;
  }

  @container (max-width: 520px) {
    .person {
      height: 48%;
    }
  }

  @keyframes fly {
    from {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    85% {
      opacity: 1;
    }
  }

  @keyframes stamp {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-12deg) scale(2.6);
    }
  }

  @keyframes drive {
    from {
      transform: translateX(0);
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
    }
  }
</style>
