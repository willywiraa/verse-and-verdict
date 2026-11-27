<script lang="ts">
  import Gavel from '@lucide/svelte/icons/gavel';
  import type { Option } from '@shared/court/types';
  import ScenePreview from './ScenePreview.svelte';

  let {
    option,
    keyHint,
    selected,
    dimmed = false,
    onselect,
    onactive,
  }: {
    option: Option;
    keyHint: string;
    selected: boolean;
    /** Another card is chosen. */
    dimmed?: boolean;
    /** `byKeyboard` is true for Enter or Space on the focused card. */
    onselect: (byKeyboard: boolean) => void;
    /** Hovered with a mouse, or focused with the keyboard. */
    onactive: (active: boolean) => void;
  } = $props();

  let hovered = $state(false);
  let focused = $state(false);
  let tilt = $state({ x: 0, y: 0 });
  const level = $derived(selected ? 'selected' : hovered || focused ? 'active' : 'idle');

  // Only a mouse or pen tilts the card and counts as hovering; a tap selects instead.
  function enter(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    hovered = true;
    onactive(true);
  }

  function move(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    tilt = { x: ((event.clientX - box.left) / box.width - 0.5) * 2, y: ((event.clientY - box.top) / box.height - 0.5) * 2 };
  }

  function leave(): void {
    hovered = false;
    tilt = { x: 0, y: 0 };
    if (!focused) onactive(false);
  }

  function focus(event: FocusEvent): void {
    // Only keyboard focus shows the hover look; a click focuses too, but selects.
    let keyboard = true;
    try {
      keyboard = (event.currentTarget as HTMLElement).matches(':focus-visible');
    } catch {
      // Very old browsers: treat every focus as keyboard focus.
    }
    if (!keyboard) return;
    focused = true;
    onactive(true);
  }

  function blur(): void {
    focused = false;
    if (!hovered) onactive(false);
  }
</script>

<button
  type="button"
  class="card {option.scene} {level}"
  class:dimmed
  aria-pressed={selected}
  aria-label="{option.label}, {option.detail}"
  style:--rx="{-tilt.y * 6}deg"
  style:--ry="{tilt.x * 8}deg"
  onclick={(event) => onselect(event.detail === 0)}
  onpointerenter={enter}
  onpointermove={move}
  onpointerleave={leave}
  onfocus={focus}
  onblur={blur}
>
  <span class="key-hint" aria-hidden="true">{keyHint}</span>
  <span class="art" aria-hidden="true"><ScenePreview scene={option.scene} {level} /></span>
  <span class="label" aria-hidden="true">{option.label}</span>
  <span class="detail" aria-hidden="true">{option.detail}</span>
  {#if selected}
    <span class="badge" aria-hidden="true"><Gavel size={16} strokeWidth={2.5} /></span>
  {/if}
</button>

<style>
  .card {
    --lift: 0px;
    --scale: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.6rem 0.6rem 0.7rem;
    border: var(--line);
    border-radius: 14px;
    background: #fffdf7;
    box-shadow:
      var(--shadow),
      0 6px 14px rgb(31 42 68 / 0.08);
    text-align: center;
    transform: perspective(700px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(var(--lift)) scale(var(--scale));
    transition:
      transform 0.22s cubic-bezier(0.3, 1.4, 0.5, 1),
      box-shadow 0.22s ease,
      background-color 0.2s ease,
      opacity 0.25s ease,
      filter 0.25s ease;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  /* A sweep of light across the card when it becomes active or is chosen. */
  .card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 35%, rgb(255 255 255 / 0.65) 48%, transparent 60%);
    background-size: 260% 100%;
    background-position: 130% 0;
    pointer-events: none;
  }

  .card.active::after,
  .card.selected::after {
    animation: sheen 0.8s ease-out;
  }

  .card.active {
    --lift: -6px;
    --scale: 1.02;
    box-shadow:
      5px 7px 0 var(--ink),
      0 14px 24px rgb(31 42 68 / 0.14);
  }

  .card.selected {
    --lift: -12px;
    --scale: 1.05;
    background: #fff4dc;
    box-shadow:
      0 0 0 4px var(--red),
      6px 9px 0 var(--ink),
      0 18px 28px rgb(31 42 68 / 0.18);
  }

  .card:active {
    --scale: 0.97;
  }

  .card.dimmed {
    opacity: 0.72;
    filter: saturate(0.55);
  }

  .card.dimmed:hover,
  .card.dimmed:focus-visible {
    opacity: 1;
    filter: none;
  }

  .art {
    width: 100%;
    max-width: 8.5rem;
    padding: 0.25rem;
    border-radius: 8px;
    background: var(--paper-deep);
    transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.5, 1);
  }

  .selected .art {
    transform: scale(1.06);
  }

  .label {
    margin-top: 0.35rem;
    font-size: 1.02rem;
    font-weight: 900;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .detail {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--ink-soft);
  }

  .key-hint {
    position: absolute;
    top: 0.4rem;
    left: 0.45rem;
    text-transform: uppercase;
  }

  .badge {
    position: absolute;
    top: 0.35rem;
    right: 0.35rem;
    display: grid;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border: 2px solid var(--ink);
    border-radius: 50%;
    background: var(--red);
    color: #fff;
    animation: badge 0.35s cubic-bezier(0.3, 1.8, 0.5, 1);
  }

  @keyframes sheen {
    from {
      background-position: 130% 0;
    }
    to {
      background-position: -30% 0;
    }
  }

  @keyframes badge {
    from {
      transform: scale(0) rotate(-40deg);
    }
  }

  @media (hover: none) {
    .card {
      --rx: 0deg !important;
      --ry: 0deg !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card {
      transform: none;
    }
  }
</style>
