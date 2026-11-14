<script lang="ts">
  import type { SceneId } from '../court/types';
  import ScenePreview from './ScenePreview.svelte';

  /** The city's paper reports the verdict. It spins in, like in old films. */
  let { headline, scene, caseNumber }: { headline: string; scene: SceneId; caseNumber: number } = $props();
</script>

<article class="paper" aria-label="Newspaper">
  <header class="masthead">
    <span class="rule"></span>
    <span class="name">The Damai Daily</span>
    <span class="rule"></span>
  </header>
  <div class="body">
    <h2 class="headline">{headline}</h2>
    <div class="photo" aria-hidden="true"><ScenePreview {scene} /></div>
  </div>
  <p class="dateline">Court Day · Case {caseNumber}</p>
</article>

<style>
  .paper {
    width: min(100%, 34rem);
    padding: 0.6rem 0.9rem 0.5rem;
    border: var(--line);
    border-radius: 4px;
    background:
      repeating-linear-gradient(90deg, transparent 0 4px, rgb(31 42 68 / 0.02) 4px 5px),
      #f4f1e8;
    box-shadow: var(--shadow);
    transform: rotate(-1.5deg);
    animation: spin-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.1) both;
  }

  .masthead {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .rule {
    flex: 1;
    height: 3px;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--ink);
  }

  .name {
    font-family: var(--serif);
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.04em;
  }

  .body {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 0.35rem;
    border-top: 2px solid var(--ink);
    padding-top: 0.4rem;
  }

  .headline {
    flex: 1;
    margin: 0;
    font-family: var(--serif);
    font-weight: 600;
    font-size: clamp(1.4rem, 4.2vw, 2rem);
    line-height: 1.02;
    text-transform: uppercase;
    font-variant-numeric: lining-nums;
  }

  .photo {
    flex: none;
    width: 6.5rem;
    padding: 0.2rem;
    border: 2px solid var(--ink);
    background: #e3ddcd;
    filter: grayscale(1) contrast(1.1);
  }

  .dateline {
    margin: 0.35rem 0 0;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  @keyframes spin-in {
    from {
      opacity: 0;
      transform: rotate(-540deg) scale(0.1);
    }
  }

  @media (max-width: 480px) {
    .photo {
      width: 4.5rem;
    }
  }
</style>
