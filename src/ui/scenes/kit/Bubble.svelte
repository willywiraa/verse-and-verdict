<script lang="ts">
  /**
   * A speech bubble that pops up over someone: "!", "?", a sigh. Positions are
   * in stage units (cqw across, cqh down). It shows from `at` until `until` (seconds); without
   * `until` it stays, and is part of the scene's last frame.
   */
  let {
    text,
    x,
    y,
    at,
    until,
    tail = 'left',
  }: { text: string; x: number; y: number; at: number; until?: number; tail?: 'left' | 'right' } = $props();
</script>

<div
  class="bubble tl tail-{tail}"
  class:stays={until === undefined}
  aria-hidden="true"
  style:left="{x}cqw"
  style:top="{y}cqh"
  style:--at="{at}s"
  style:--for="{(until ?? at + 1) - at}s"
>
  {text}
</div>

<style>
  .bubble {
    position: absolute;
    padding: 0.2em 0.55em;
    border: 0.3cqw solid var(--ink);
    border-radius: 1.4cqw;
    background: #fffdf7;
    font-size: max(0.75rem, 2.4cqw);
    font-weight: 900;
    line-height: 1.1;
    white-space: nowrap;
    box-shadow: 0.35cqw 0.35cqw 0 var(--ink);
    transform: translate(-50%, -100%);
    pointer-events: none;
    opacity: 0;
    animation: show-hide var(--for) linear var(--at) both;
  }

  .bubble.stays {
    opacity: 1;
    animation: pop 0.3s cubic-bezier(0.3, 1.8, 0.5, 1) var(--at) both;
  }

  .bubble::after {
    content: '';
    position: absolute;
    bottom: -1.1cqw;
    width: 1.4cqw;
    height: 1.4cqw;
    border-right: 0.3cqw solid var(--ink);
    border-bottom: 0.3cqw solid var(--ink);
    background: #fffdf7;
    transform: rotate(45deg);
  }

  .tail-left::after {
    left: 22%;
  }

  .tail-right::after {
    right: 22%;
  }

  @keyframes show-hide {
    0% {
      opacity: 0;
      transform: translate(-50%, -100%) scale(0.3);
    }
    12%,
    85% {
      opacity: 1;
      transform: translate(-50%, -100%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -100%) scale(0.9);
    }
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: translate(-50%, -100%) scale(0.3);
    }
  }
</style>
