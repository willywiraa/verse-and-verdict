<script lang="ts">
  /**
   * Development only: every character, mood and pose on one page, for checking
   * the rig by eye. Open the dev server with ?gallery. Not part of the game build.
   */
  import { COURT } from '../cases';
  import { MOODS, type Look } from '../court/types';
  import Character from '../ui/rig/Character.svelte';
  import { CAST } from '../ui/rig/cast';
  import { POSES, type Pose } from '../ui/rig/parts';

  const harjo = COURT.cases[0].person.look;
  const people: [string, Look][] = [['Harjo', harjo], ...Object.entries(CAST)];
  const poses = Object.keys(POSES) as Pose[];
</script>

<main class="gallery">
  <h1>Rig gallery</h1>

  <h2>Moods (bust)</h2>
  <div class="row">
    {#each MOODS as mood (mood)}
      <figure class="bust"><Character look={harjo} {mood} framing="bust" /><figcaption>{mood}</figcaption></figure>
    {/each}
  </div>

  <h2>People</h2>
  <div class="row">
    {#each people as [name, look] (name)}
      <figure><Character {look} mood="happy" /><figcaption>{name}</figcaption></figure>
    {/each}
  </div>

  <h2>Poses</h2>
  <div class="row">
    {#each poses as pose (pose)}
      <figure>
        <Character
          look={harjo}
          {pose}
          mood="neutral"
          holding={pose === 'mop' ? 'mop' : pose === 'carry' ? 'box' : pose === 'clipboard' ? 'clipboard' : 'none'}
          outfit={pose === 'mop' ? 'overalls' : undefined}
        />
        <figcaption>{pose}</figcaption>
      </figure>
    {/each}
  </div>

  <h2>Outfits and movement</h2>
  <div class="row">
    <figure><Character look={harjo} outfit="prison" pose="bars" mood="sad" /><figcaption>prison, bars</figcaption></figure>
    <figure><Character look={harjo} outfit="singlet" pose="reach" gait="run" facing="right" mood="shocked" /><figcaption>singlet, run</figcaption></figure>
    <figure><Character look={harjo} outfit="overalls" pose="mop" holding="mop" scrub gait="walk" mood="grumpy" /><figcaption>mopping</figcaption></figure>
    <figure><Character look={harjo} pose="carry" holding="box" gait="walk" facing="left" mood="sad" /><figcaption>walk left, box</figcaption></figure>
    <figure><Character look={harjo} pose="carry" holding="cashbag" mood="nervous" /><figcaption>cash bag</figcaption></figure>
    <figure><Character look={CAST.patient} pose="point" facing="left" mood="grumpy" /><figcaption>point left</figcaption></figure>
  </div>
</main>

<style>
  .gallery {
    padding: 1rem;
    background: var(--wall);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  figure {
    width: 9rem;
    margin: 0;
    padding: 0.4rem;
    border: 2px solid var(--ink);
    border-radius: 8px;
    background: var(--paper);
    text-align: center;
  }

  figure.bust {
    width: 7.5rem;
  }

  figcaption {
    font-size: 0.8rem;
    font-weight: 700;
  }
</style>
