<script lang="ts">
  import type { Evidence } from '@shared/court/types';
  import { PICTURE_ICONS } from './pictures';

  let {
    evidence,
    index,
    flipped,
    onflip,
  }: { evidence: Evidence; index: number; flipped: boolean; onflip: () => void } = $props();

  const Icon = $derived(PICTURE_ICONS[evidence.picture]);
</script>

<button
  type="button"
  class="tag"
  class:flipped
  class:twist={evidence.twist}
  aria-label={flipped ? `Evidence ${index + 1}: ${evidence.text}` : `Evidence ${index + 1}: tap to look`}
  aria-disabled={flipped}
  onclick={() => !flipped && onflip()}
>
  <span class="inner">
    <span class="face front" aria-hidden="true">
      <span class="key-hint">{index + 1}</span>
      <Icon size={30} strokeWidth={2} />
      <span class="q">?</span>
    </span>
    <span class="face back" aria-hidden="true">
      {#if evidence.twist}<span class="bang">!</span>{/if}
      <span class="small-icon"><Icon size={18} strokeWidth={2.25} /></span>
      <span class="text">{evidence.text}</span>
    </span>
  </span>
</button>

<style>
  .tag {
    position: relative;
    padding: 0;
    border: 0;
    background: none;
    text-align: left;
    perspective: 800px;
  }

  .inner {
    display: grid;
    min-height: 3.9rem;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.3, 1.3, 0.5, 1);
  }

  .flipped .inner {
    transform: rotateY(180deg);
  }

  .tag:not(.flipped):hover .inner,
  .tag:not(.flipped):focus-visible .inner {
    transform: translateY(-3px) rotate(-1deg);
  }

  .face {
    grid-area: 1 / 1;
    position: relative;
    display: flex;
    align-items: center;
    border: var(--line);
    border-radius: 10px;
    box-shadow: var(--shadow-small);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .front {
    justify-content: center;
    gap: 0.3rem;
    background: repeating-linear-gradient(-45deg, #fff9ea 0 8px, #f6edd6 8px 16px);
  }

  /* The string hole of a luggage-style evidence tag. */
  .front::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0.55rem;
    width: 0.55rem;
    height: 0.55rem;
    margin-top: -0.275rem;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--wall);
  }

  .q {
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--red);
  }

  .front .key-hint {
    position: absolute;
    top: 0.35rem;
    right: 0.45rem;
  }

  .back {
    transform: rotateY(180deg);
    gap: 0.5rem;
    padding: 0.5rem 0.65rem;
    background: #fffdf7;
  }

  .twist .back {
    background: #fff1c9;
  }

  .small-icon {
    display: grid;
    flex: none;
  }

  .text {
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.25;
  }

  .bang {
    position: absolute;
    top: -0.7rem;
    right: -0.5rem;
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--gold);
    font-weight: 900;
    animation: glint 1.6s ease-in-out 0.5s infinite;
  }

  /* On phones the three tags sit in one row; a flipped tag shows only its words. */
  @media (max-width: 560px) {
    .inner {
      min-height: 2.9rem;
    }

    .front::before {
      display: none;
    }

    .back {
      padding: 0.3rem 0.4rem;
    }

    .small-icon {
      display: none;
    }

    .text {
      font-size: 0.7rem;
      line-height: 1.15;
    }
  }

  @keyframes glint {
    0%,
    100% {
      transform: scale(1) rotate(0);
    }
    10% {
      transform: scale(1.25) rotate(12deg);
    }
    20% {
      transform: scale(1) rotate(0);
    }
  }
</style>
