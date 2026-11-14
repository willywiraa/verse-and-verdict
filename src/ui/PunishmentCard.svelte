<script lang="ts">
  import type { Option } from '../court/types';
  import ScenePreview from './ScenePreview.svelte';

  let {
    option,
    keyHint,
    selected,
    onselect,
  }: { option: Option; keyHint: string; selected: boolean; onselect: () => void } = $props();

  let hover = $state(false);
</script>

<button
  type="button"
  class="card {option.scene}"
  class:selected
  aria-pressed={selected}
  aria-label="{option.label}, {option.detail}"
  onclick={onselect}
  onpointerenter={() => (hover = true)}
  onpointerleave={() => (hover = false)}
>
  <span class="key-hint" aria-hidden="true">{keyHint}</span>
  <span class="art" aria-hidden="true"><ScenePreview scene={option.scene} playing={selected || hover} /></span>
  <span class="label" aria-hidden="true">{option.label}</span>
  <span class="detail" aria-hidden="true">{option.detail}</span>
</button>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.6rem 0.6rem 0.7rem;
    border: var(--line);
    border-radius: 14px;
    background: #fffdf7;
    box-shadow: var(--shadow);
    text-align: center;
    transition:
      transform 0.18s cubic-bezier(0.3, 1.5, 0.5, 1),
      box-shadow 0.18s ease,
      background-color 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px) rotate(-1deg);
  }

  .card.selected {
    transform: translateY(-10px) scale(1.04);
    background: #fff4dc;
    box-shadow:
      0 0 0 4px var(--red),
      6px 8px 0 var(--ink);
  }

  .art {
    width: 100%;
    max-width: 8.5rem;
    padding: 0.25rem;
    border-radius: 8px;
    background: var(--paper-deep);
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
</style>
