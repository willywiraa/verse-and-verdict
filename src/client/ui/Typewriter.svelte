<script lang="ts">
  /** Types a short line in, at most about 0.9 seconds. Screen readers get the whole line at once. */
  let { text, instant = false }: { text: string; instant?: boolean } = $props();

  let shown = $state(0);

  $effect(() => {
    if (instant) {
      shown = text.length;
      return;
    }
    shown = 0;
    const step = Math.max(12, Math.min(32, 900 / Math.max(1, text.length)));
    const id = setInterval(() => {
      shown += 1;
      if (shown >= text.length) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  });
</script>

<span class="sr-only">{text}</span><span aria-hidden="true">{text.slice(0, shown)}<span class="ghost"
    >{text.slice(shown)}</span
  ></span>

<style>
  .ghost {
    visibility: hidden;
  }
</style>
