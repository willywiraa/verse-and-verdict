<svg class="prop" viewBox="0 0 160 120" aria-hidden="true">
  <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
    <path d="M10 52 H150 V118 H10 Z" fill="#f6ead0" />
    <path d="M4 54 L80 12 L156 54 Z" fill="#b5523b" />
    <circle cx="80" cy="38" r="8" fill="#bfe6ea" />
    <path d="M30 60 H130 V66 H30 Z" fill="#fffdf7" />
    {#each [36, 58, 102, 124] as x (x)}
      <path d="M{x - 4} 66 H{x + 4} V114 H{x - 4} Z" fill="#fffdf7" />
    {/each}
    <path d="M68 82 H92 V118 H68 Z" fill="#7a5530" />
    <circle cx="86" cy="100" r="2" fill="var(--gold)" stroke="none" />
    {#each [[16, 72], [128, 72], [16, 94], [128, 94]] as [x, y] (x * 1000 + y)}
      <path d="M{x} {y} H{x + 16} V{y + 14} H{x} Z" fill="#bfe6ea" />
    {/each}
    <path d="M2 118 H158" fill="none" />
  </g>
</svg>

<style>
  .prop {
    display: block;
    width: 100%;
    overflow: visible;
  }
</style>
