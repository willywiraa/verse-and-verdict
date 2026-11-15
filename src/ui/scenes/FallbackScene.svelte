<script lang="ts">
  import type { Case, Option } from '../../court/types';
  import Character from '../rig/Character.svelte';
  import ScenePreview from '../ScenePreview.svelte';

  /** A simple stand-in for scenes that are not drawn yet: the card's loop, large, beside the defendant. */
  let { file, option }: { file: Case; option: Option } = $props();
</script>

<div class="scene">
  <div class="backdrop"></div>
  <div class="person"><Character look={file.person.look} mood="sad" framing="bust" /></div>
  <div class="loop"><ScenePreview scene={option.scene} level="active" /></div>
</div>

<style>
  .scene {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #f6edd6, #eadcbf);
  }

  .person {
    position: absolute;
    left: 10%;
    bottom: 4%;
    width: 26%;
  }

  .loop {
    position: absolute;
    right: 8%;
    top: 50%;
    width: 46%;
    padding: 2%;
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
