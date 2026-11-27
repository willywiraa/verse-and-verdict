<script lang="ts">
  import type { Case, Option } from '@shared/court/types';
  import Character from '../rig/Character.svelte';
  import ScenePreview from '../ScenePreview.svelte';

  /** A simple stand-in for scenes that are not drawn yet: the defendant beside the card's loop, large. */
  let { file, option }: { file: Case; option: Option; skip?: boolean } = $props();
</script>

<div class="scene">
  <div class="backdrop"></div>
  <div class="actor person"><Character look={file.person.look} mood="worried" /></div>
  <div class="loop"><ScenePreview scene={option.scene} level="active" /></div>
</div>

<style>
  .backdrop {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #f6edd6, #eadcbf);
  }

  .person {
    bottom: 4cqh;
    height: 70cqh;
    transform: translateX(calc(22cqw - 50%));
  }

  .loop {
    position: absolute;
    right: 8cqw;
    top: 50%;
    width: 46cqw;
    padding: 1cqw;
    border: var(--line);
    border-radius: 14px;
    background: #fffdf7;
    box-shadow: var(--shadow);
    transform: translateY(-50%);
    animation: pop 0.4s cubic-bezier(0.3, 1.6, 0.5, 1) both;
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: translateY(-50%) scale(0.4);
    }
  }
</style>
