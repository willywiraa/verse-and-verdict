<script lang="ts">
  import Hand from '@lucide/svelte/icons/hand';
  import Heart from '@lucide/svelte/icons/heart';
  import LockIcon from '@lucide/svelte/icons/lock';
  import Waves from '@lucide/svelte/icons/waves';
  import type { Eye } from '../game/types';
  import { EYE_HINTS, EYE_LABELS, type CardState } from './labels';

  let {
    eye,
    text,
    state,
    index,
    delay = 0,
    onopen,
  }: { eye: Eye; text: string; state: CardState; index: number; delay?: number; onopen?: () => void } = $props();

  const ICONS = { deed: Hand, heart: Heart, ripple: Waves } as const;
  const Icon = $derived(ICONS[eye]);
  const faceUp = $derived(state === 'open' || state === 'missed');
</script>

<button
  type="button"
  class="eye-card {state}"
  class:face-up={faceUp}
  style:--delay="{delay}s"
  disabled={state !== 'closed'}
  aria-label={faceUp ? `${EYE_LABELS[eye]}: ${text}` : `${EYE_LABELS[eye]}: ${EYE_HINTS[eye]}`}
  onclick={() => onopen?.()}
>
  <span class="inner">
    <span class="face front" aria-hidden="true">
      <span class="key">{index + 1}</span>
      <span class="icon"><Icon size={26} strokeWidth={1.75} /></span>
      <span class="words">
        <span class="label">{EYE_LABELS[eye]}</span>
        <span class="hint">{EYE_HINTS[eye]}</span>
      </span>
      {#if state === 'locked'}<span class="lock"><LockIcon size={14} /></span>{/if}
    </span>
    <span class="face back" aria-hidden="true">
      {#if faceUp}
        <span class="back-label">
          <Icon size={15} strokeWidth={2} />
          {state === 'missed' ? `You missed: ${EYE_LABELS[eye]}` : EYE_LABELS[eye]}
        </span>
        <span class="text">{text}</span>
      {/if}
    </span>
  </span>
</button>

<style>
  .eye-card {
    position: relative;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    text-align: left;
    perspective: 900px;
  }

  .inner {
    display: grid;
    min-height: 7.5rem;
    transform-style: preserve-3d;
    transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1);
    transition-delay: var(--delay);
  }

  .face-up .inner {
    transform: rotateY(180deg);
  }

  .closed:hover .inner,
  .closed:focus-visible .inner {
    transform: translateY(-4px);
  }

  .face {
    grid-area: 1 / 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.75rem 0.6rem;
    border-radius: 14px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .front {
    background: linear-gradient(160deg, #3d3560, #231e3c);
    border: 1.5px solid rgb(224 177 90 / 0.55);
    color: var(--parchment);
    box-shadow: 0 6px 16px rgb(0 0 0 / 0.25);
    transition: opacity 0.3s ease;
  }

  .closed .front {
    animation: beckon 2.4s ease-in-out infinite;
  }

  .locked .front {
    opacity: 0.4;
  }

  .back {
    transform: rotateY(180deg);
    align-items: flex-start;
    justify-content: flex-start;
    background: #fffaf0;
    border: 1.5px solid var(--gold);
    color: var(--ink);
    box-shadow: 0 6px 16px rgb(0 0 0 / 0.18);
  }

  .missed .back {
    border-style: dashed;
    background: #f8efdc;
  }

  .key {
    position: absolute;
    top: 0.4rem;
    left: 0.5rem;
    font-size: 0.7rem;
    opacity: 0.6;
  }

  .icon {
    display: grid;
    color: var(--gold);
  }

  .words {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .label {
    font-weight: 700;
  }

  .hint {
    font-size: 0.78rem;
    opacity: 0.8;
  }

  .lock {
    position: absolute;
    top: 0.45rem;
    right: 0.5rem;
    display: grid;
  }

  .back-label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .text {
    font-size: 0.95rem;
    line-height: 1.35;
  }

  @keyframes beckon {
    50% {
      box-shadow:
        0 0 0 3px rgb(224 177 90 / 0.35),
        0 6px 16px rgb(0 0 0 / 0.25);
    }
  }

  @media (max-width: 520px) {
    .inner {
      min-height: 3.6rem;
    }

    .front {
      flex-direction: row;
      justify-content: flex-start;
      gap: 0.75rem;
      padding-left: 1.6rem;
    }

    .words {
      flex-direction: row;
      align-items: baseline;
      gap: 0.5rem;
    }
  }
</style>
