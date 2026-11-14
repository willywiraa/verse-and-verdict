# Verse & Verdict: Game Design

Version 0.1 · 14 November 2026 · Requirements: [PRD.md](PRD.md)

## 1. Concept

You are a young god, newly given a small river country called Lowmere. The god before you fell silent, and the dead have been waiting.

Souls arrive one at a time as small lights. For each one you see what the living say about them, open **one** of three Eyes to glimpse the truth, and decide: **Rise, Return or Fall**. The Scribe, a mortal who hears your verdicts in dreams, writes each one down as a Verse. Then you learn what you did not see, and what the living did with your words.

*Judge the dead. The living are taking notes.*

### Pillars
1. **You never see everything.** One Eye per soul. What you did not look at is shown only after you judge.
2. **Your verdicts become their rules.** Every verdict becomes a Verse, and the living act on Verses.
3. **Consequences come back.** Later souls arrive because of something you said, and the game tells you which Verse.
4. **Five minutes, no homework.** Single-click choices, short text, nothing to manage.

The game never scores morality. No verdict is ever marked right or wrong.

The setting is invented. It uses no real religion, scripture, symbol or person.

## 2. Core loop

One soul takes 45 to 60 seconds.

| Step | What the player does | What the game shows |
|---|---|---|
| 1. The Record | Reads | Name, age, cause of death, what the living believe, and the soul's Plea |
| 2. One Eye | Opens Deed, Heart or Ripple | One or two sentences of hidden truth |
| 3. Verdict | Chooses Rise, Return or Fall | The wisp rises, arcs away or sinks |
| 4. Verse | Reads | The line the Scribe wrote from the verdict |
| 5. Unveiling | Reads | The two Eyes left closed |
| 6. The lamp | Watches | Faith moves, with a one-line reaction from the living |

Then the next soul arrives. After the last soul of the Day comes The World Below (§3.7).

## 3. Rules

### 3.1 The soul card
Every soul shows five things: name, age, cause of death, the **Record** and the **Plea**.

The Record is what the living believe. It may be wrong, incomplete or exactly right. The Plea is one line in the soul's own voice.

### 3.2 Eyes
- **Deed:** something they did that the living never saw.
- **Heart:** what they wanted or feared.
- **Ripple:** what their life caused, including things they never knew.

The player opens exactly one. The other two lock until after the verdict. The verdict buttons unlock once an Eye is open.

No Eye is "the right one". Each must change how the soul looks (§5.2).

### 3.3 Verdicts

| Verdict | Where the soul goes | Limit |
|---|---|---|
| **Rise** | The Lantern Fields: rest | None |
| **Return** | The Wheel: a second life below | 2 per Day |
| **Fall** | The Hollow: a reckoning | None |

Each button carries a sentence written for that soul, such as "Send her back to wait on the other side of a counter."

When both Returns are spent, the button is disabled and reads "The Wheel has turned twice today."

### 3.4 Verse and Unveiling
After the verdict, in this order:
1. The Scribe's **Verse** appears and is added to the reign's Book of Verses. The Scribe knows only the Record, so the Verse is what a village would take from the verdict, not what the player meant.
2. **What you did not see:** the two unopened Eyes.
3. The lamp moves (§3.5).
4. A Next button.

### 3.5 The Faith lamp
Faith is how much the living trust your judgment. It runs from 0 to 10 and starts at 5.

Each verdict carries a change from −2 to +2. The writer sets it from the Record alone. Rewarding someone the living admire, or punishing someone they despise, raises Faith. The reverse lowers it.

| Change | Reaction line |
|---|---|
| +2 | Lowmere rejoices. |
| +1 | Lowmere approves. |
| 0 | Lowmere shrugs. |
| −1 | Lowmere is uneasy. |
| −2 | Lowmere is outraged. |

Faith never ends the reign. It is read once, at the ending (§3.8).

Tuning target: a player who always sides with the Record ends at 9 or 10, and one who always defies it ends at 0 to 2.

### 3.6 Echoes
An **Echo** is a soul who arrives because of one of your Verses. A **root** is any soul who is not an Echo.

- Each root names one Echo and the verdicts that summon it, usually two of the three.
- A summoned Echo waits, then arrives on a later Day. Years pass below between your Days, so the Echo has lived a whole life under your Verse.
- Its card opens with "Because of your Verse on [name]:" and quotes the Verse.
- Its Record and Plea have a version for each verdict that can summon it. The person is the same; the angle differs. Its Eyes, verdicts and Faith changes are shared, so they must make sense with every version.
- An Echo never summons another Echo.
- Echoes still waiting when the reign ends are never shown.

One exception teaches the idea: the first soul of Day 1 summons its Echo on any verdict, and that Echo arrives the same Day (§4).

### 3.7 Days
A Day holds up to 6 souls.

| Day | Roots | Places for Echoes |
|---|---|---|
| 1 | 5 | 1 (the teaching Echo) |
| 2 | 4 | up to 2 |
| 3 | 4 | up to 2 |
| 4 | 4 | up to 2 |
| 5 | 3 | up to 3 |

- If fewer Echoes are waiting than there are places, the Day is shorter.
- In a player's first reign, Day 1 runs in a fixed order (§4). Everything else is shuffled by the reign's seed.
- Echoes never open a Day and never arrive back to back.
- The first release has 3 Days: roots 5, 4, 3 and Echo places 1, 2, 3.

**The World Below** ends each Day. It lists that Day's Verses, each with its "And so…" line showing what the living did with it. The Scribe adds one remark. The player can begin the next Day or stop; the game is already saved.

### 3.8 The reign, endings and Temperament
A reign is 5 Days, up to 30 souls. Then the game picks one ending, checking in this order:

| Ending | Condition |
|---|---|
| **The Silent Sky** | Faith is 2 or lower |
| **The Unquestioned** | Faith is 9 or higher |
| **The Gentle Age** | Rise is at least 45% of verdicts and more common than Fall |
| **The Iron Age** | Fall is at least 45% of verdicts and more common than Rise |
| **The Weighed World** | Anything else |

The first release has three: The Silent Sky, The Unquestioned and The Weighed World.

Each ending quotes two of the player's own Verses: the one the living loved most (highest Faith change) and the one they hated most (lowest). Ties go to the earlier Verse. No ending is the good one.

> **The Silent Sky.** The shrine lamps of Lowmere went out one by one. Nobody decided to stop believing. They just stopped asking. They still smile at one Verse: "{loved}". They never forgave another: "{hated}". You judged as you saw fit. Below, they have learned to judge each other.

> **The Unquestioned.** Lowmere has never been surer of anything than it is of you. Your Verses are carved over every door. Children recite "{loved}" before they can read. Even "{hated}" is called wisdom now. They never doubt you. They have stopped doubting anything at all.

> **The Gentle Age.** You opened the gate more often than you closed it. Lowmere grew kind, then comfortable, then careless: if nearly everyone rises, why worry? They sing "{loved}" at weddings and shrug off "{hated}". It is a soft world. Some who were wronged in it are still waiting to be noticed.

> **The Iron Age.** You closed the gate more often than you opened it. Lowmere grew careful, then quiet, then watchful of its neighbours. They whisper "{hated}" to frighten children and hold up "{loved}" as proof you can be pleased. It is an orderly world. Nobody in it sleeps deeply.

> **The Weighed World.** You never settled into one answer, so neither did they. In every tavern someone quotes "{loved}" and someone answers with "{hated}". Nobody can predict you, which means everybody has to think. Some find that freeing. Others would give a great deal just to know where they stand.

The ending also shows a **Temperament**, a title of the form "The [adjective] [noun]".

| Adjective | When |
|---|---|
| Gentle | Rise is at least 45% of verdicts and more common than Fall |
| Stern | Fall is at least 45% of verdicts and more common than Rise |
| Patient | Neither of the above, and at least 80% of the available Returns were used |
| Even | Anything else |

| Noun | When |
|---|---|
| Keeper of Deeds | Deed was opened most often, at least 40% of the time |
| Weigher of Hearts | Heart was opened most often, at least 40% of the time |
| Reader of Ripples | Ripple was opened most often, at least 40% of the time |
| Wanderer of Eyes | No Eye reached 40%, or two tied for most |

That gives 16 titles, such as "The Gentle Weigher of Hearts".

A new reign uses a new seed and shuffles every root, including those of Day 1.

## 4. Day 1 script

Day 1 of a first reign is fixed, because it teaches the game without a tutorial.

| # | Soul | Its job |
|---|---|---|
| 1 | Hettie Marrow (root, §6.1) | Teaches Eyes and verdicts. Wry, with gentle stakes. Summons Orrin on any verdict. |
| 2 | Dace Weller (root, §6.3) | The first real gap between Record and truth. The lamp moves hard. |
| 3 | A light soul (root) | Breathing room. The Record is roughly true, and it is funny. |
| 4 | A young soul who went wrong (root) | Makes Return tempting and shows the Wheel's limit. |
| 5 | Orrin Vale (Echo of 1, §6.2) | "Because of your Verse…" The loop closes about 5 minutes in. |
| 6 | A quiet closer (root) | An ordinary life with one small kindness or cruelty. Ends the Day softly. |

The Scribe gives every instruction, one line at a time:

| When | The Scribe says |
|---|---|
| Soul 1 arrives | "This is what the living say of her. Open one Eye before you judge. Only one." |
| After the first verdict | "I have written it down. By morning they will be reading it." |
| Soul 2 arrives | "They know only the Record. Watch the lamp." |
| Soul 4 arrives | "The Wheel turns twice a day, no more." |
| Soul 5 arrives | "This one comes because of something you said." |
| The World Below | "Six Verses. They are already arguing about the second." |

## 5. Writing souls

### 5.1 Template and word limits

| Field | Limit in words | Notes |
|---|---|---|
| Death | 8 | Never suicide |
| Record | 28 | What the living believe |
| Plea | 12 | The soul's own voice |
| Each Eye | 26 | Three per soul |
| Each verdict sentence | 12 | Three per soul |
| Each Verse | 12 | Three per soul |
| Each "And so…" line | 22 | Three per soul |

Before the verdict the player reads the death, the Record, the Plea, one Eye and three sentences: at most 110 words. For an Echo, the "Because of your Verse…" header and the quoted Verse count too, so its Record is kept shorter. A whole soul is at most about 260 words. An Echo's extra versions add up to about 80 more.

Each soul also has an emblem icon, a hue for its wisp, and a Faith change for each verdict.

### 5.2 Rules for writers
1. **Three defensible verdicts.** If you cannot argue for all three, rewrite the soul.
2. **Each Eye stands alone and changes the picture.** No Eye repeats the Record. None needs another to make sense. None is always the most useful.
3. **Verdict sentences describe the fate, not the reason.** They must read correctly whichever Eye was opened.
4. **Verses come from the Record only.** The Scribe generalises. A good Verse sounds like a rule a village could misuse.
5. **"And so…" lines cut both ways.** Show a good thing with a cost, or a bad thing with a grace.
6. **Faith follows the Record alone**, never the hidden truth.
7. **An Echo is someone who acted on the Verse.** They used it as an excuse, obeyed it to their cost, or were hurt by people who did.
8. **Be specific.** A thumb on a scale beats "she cheated".
9. **Keep to the limits.** The validator enforces them.

### 5.3 Mix
Across the 20 roots of version 1.0:

| How the truth compares with the Record | Roots |
|---|---|
| Roughly the same | 8 |
| Kinder than the Record | 6 |
| Worse than the Record | 4 |
| Both | 2 |

About half the souls are everyday or wry, a third are serious, and the rest are heavy. Heavy souls carry the `heavy` flag.

### 5.4 Content standard
- Implied, never shown. No graphic description.
- Harms, not identities. Nobody is judged for who they are or what they believe.
- No real religions, symbols or people.
- No soul died by suicide.
- No sexual violence.
- Children may be affected by a story, but never played for laughs.

## 6. Sample souls

These three are written to the template and can ship as they are.

### 6.1 Hettie Marrow (root; Day 1, soul 1)
- **Name, age:** Hettie Marrow, 81
- **Death:** In her sleep, flour still on her hands.
- **Emblem, hue:** loaf, 38
- **Record:** Baker of Lowmere for forty years. Fed the poor every feast day. The whole town followed her coffin.
- **Plea:** "I only ever wanted everyone fed."
- **Deed:** Every loaf she sold was a thumb light. Forty years of thumbs. Nobody ever checked her scale.
- **Heart:** At six she watched a baker turn her mother away. She swore no hungry child would ever look at her like that.
- **Ripple:** Her orphans' table never ran short. One orphan became Lowmere's first doctor. Three poor families ate a little less each winter, and never knew why.

| Verdict | Sentence | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Let her rest where no one goes hungry. | Who feeds the hungry shall be fed forever. | Merchants across Lowmere begin giving loudly on feast days. What they do on other days, nobody asks. | +1 |
| Return | Send her back to wait on the other side of a counter. | Even the kind are sent back to learn. | Lowmere decides nobody is ever finished. Bakers start weighing their loaves twice, just in case. | −1 |
| Fall | Let her go hungry until every loaf is accounted for. | The god cast down the baker. Bread alone saves no one. | The orphans' table closes within the year. No one dares to be seen giving bread. | −2 |

- **Echo:** Orrin Vale, on Rise, Return and Fall. He arrives the same Day; this is the teaching Echo.

### 6.2 Orrin Vale (Echo of Hettie Marrow; Day 1, soul 5)
- **Name, age:** Orrin Vale, 58
- **Death:** A fever, in the richest bed in Lowmere.
- **Emblem, hue:** padlock, 28
- **Header:** "Because of your Verse on Hettie Marrow:" followed by that Verse.

His Record and Plea depend on the verdict that summoned him:

| Summoned by | Record | Plea |
|---|---|---|
| Rise | Grain merchant. Gave a cartload of bread to the poor every feast day, with a crier to announce it. | "I fed the hungry. Your own Verse says what I am owed." |
| Return | Grain merchant. Told everyone a second life was coming, so this one need not be perfect. | "Send me back. I will be good next time." |
| Fall | Grain merchant. Never gave a crumb to anyone, and said so proudly. Lowmere called him honest. | "Bread saves no one. You said it. So I kept mine." |

His Eyes are the same in every version:

- **Deed:** In the hard winter he locked his granary until the price tripled. Then he opened it.
- **Heart:** He never thought of them as hungry. He thought of them as customers who would pay more tomorrow.
- **Ripple:** His grain, when it came, kept the delta alive until spring. Nine families sold their boats to afford it.

| Verdict | Sentence | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Open the gate. A full life deserves a full rest. | The rich man rose. Plenty is its own blessing. | Granaries grow taller across the delta. So do the locks on their doors. | 0 |
| Return | Send him back with empty hands and an empty stomach. | The rich man returns with empty hands. | A fisherman's son is born with soft hands and a head for prices. Lowmere watches him closely. | 0 |
| Fall | Let him wait outside a locked door, as others did. | No full granary follows a man upward. | Merchants open their granaries early that winter. Nobody asks whether it is kindness or fear. | −1 |

### 6.3 Dace Weller (root; Day 1, soul 2)
- **Name, age:** Dace Weller, 34
- **Death:** Hanged at the ferry landing.
- **Emblem, hue:** rope, 205
- **Record:** Ferryman. In the spring flood he cut the tow rope and let eleven passengers drown to save himself. Nobody spoke for him.
- **Plea:** "I would cut it again. Ask me why."
- **Deed:** He was towing two boats in the flood and could hold only one. He cut loose eleven passengers and kept thirty children.
- **Heart:** His daughter was in the children's boat. He has never been sure whether he counted, or only looked for her face.
- **Ripple:** Thirty children grew up in Lowmere. Among the eleven was the delta's only midwife. The next two winters were hard on newborns.

| Verdict | Sentence | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Lift him up, rope-burned hands and all. | The god raised the rope-cutter. Save yourself, and be saved. | Captains on the delta stop going down with their boats. Passengers start learning to swim. | −2 |
| Return | Send him back as a passenger on another man's ferry. | Who abandons the helpless shall return helpless. | Ferrymen begin taking an oath at the landing: the boat before the boatman. They call it Weller's Oath. | 0 |
| Fall | Let the river have him, as it had the eleven. | Eleven went under. The god sent their ferryman after them. | Lowmere sleeps well. Thirty children grow up being told he was a coward, and one of them knows better. | +1 |

- **Echo:** Nell Weller, his daughter, on Rise and Fall (not yet written).
  - After Rise she arrives as a ferry captain who swam for shore and left her passengers, quoting your Verse.
  - After Fall she arrives as a woman who never went near the river again, and watched a flood take her neighbours from the bank.

## 7. Screens and controls

### 7.1 Screens
1. **Title.** Begin or Continue, a menu (text size, sound, Reset), and one content note: "A game about death and judgment. Nothing graphic. Some stories are sad."
2. **Soul.** The whole loop happens here (§7.2).
3. **The World Below.** The Day's summary.
4. **Ending.** The ending text, the Temperament, counts of each verdict and Eye, a button to read the Book of Verses, and Begin a new reign.

### 7.2 Layout
One column, at most 720 px wide, usable down to 360 px.

```
+------------------------------------------------------------+
| Day 1 · Soul 2 of 6         Faith ●●●●●○○○○○   Returns ◉◉  |
+------------------------------------------------------------+
|                          ( wisp )                          |
|                      DACE WELLER, 34                       |
|                Hanged at the ferry landing.                |
|                                                            |
|  THE RECORD                                                |
|  Ferryman. In the spring flood he cut the tow rope and     |
|  let eleven passengers drown to save himself. Nobody       |
|  spoke for him.                                            |
|                                                            |
|  "I would cut it again. Ask me why."                       |
|                                                            |
|        [ Deed ]        [ Heart ]        [ Ripple ]         |
|  (the opened Eye's text appears here)                      |
+------------------------------------------------------------+
|  [ RISE ]            [ RETURN ]            [ FALL ]        |
|  Lift him up,        Send him back as      Let the river   |
|  rope-burned hands   a passenger on        have him, as it |
|  and all.            another man's ferry.  had the eleven. |
+------------------------------------------------------------+
```

After the verdict, the lower part of the card becomes:

```
|  THE VERSE                                                 |
|  "Eleven went under. The god sent their ferryman after     |
|   them."                                                   |
|                                                            |
|  WHAT YOU DID NOT SEE                                      |
|  Deed: He was towing two boats in the flood and could...   |
|  Ripple: Thirty children grew up in Lowmere. Among...      |
|                                                            |
|  Lowmere approves.                               [ Next ]  |
```

The World Below:

```
+------------------------------------------------------------+
|                THE WORLD BELOW · after Day 1               |
|                                                            |
|  "Who feeds the hungry shall be fed forever."              |
|     on Hettie Marrow                                       |
|     And so: Merchants across Lowmere begin giving loudly   |
|     on feast days. What they do on other days, nobody asks.|
|                                                            |
|  (one entry for each verdict given today)                  |
|                                                            |
|  The Scribe: "Six Verses. They are already arguing about   |
|  the second."                                              |
|                                                            |
|            [ Begin Day 2 ]        [ Rest here ]            |
+------------------------------------------------------------+
```

### 7.3 Controls

| Action | Mouse or touch | Keyboard |
|---|---|---|
| Open an Eye | Click or tap it | 1, 2, 3 |
| Rise, Return, Fall | Click or tap the button | ↑, →, ↓ |
| Continue | Click or tap Next | Enter or Space |
| Menu | Click or tap the menu icon | Esc |

## 8. Look and sound

### 8.1 Palette

| Use | Colour |
|---|---|
| Night sky | `#1B1F3B` |
| Dawn sky | `#4A3F6B` |
| Dusk sky | `#D98C5F` |
| Card (parchment) | `#F5ECD7` |
| Text (ink) | `#2A2433` |
| Rise and accents (lantern gold) | `#E0B15A` |
| Return (river teal) | `#2F6F6D` |
| Fall (ember) | `#A63D2A` |

Every text and background pair must be checked for AA contrast before release.

### 8.2 Shapes and type
- **Wisp.** One SVG flame shape, tinted by the soul's hue, with the soul's emblem icon inside and a slow bob.
- **Emblems.** Icons from an open-licensed set. game-icons.net has the widest range of fitting icons and needs a credit line (CC BY 3.0). Phosphor and Lucide need none. Only the icons used are bundled, as inline SVG.
- **Sky.** A CSS gradient that shifts with each soul, from pre-dawn indigo at soul 1 to dusk gold at soul 6. The World Below is night.
- **Lamp.** A small lantern whose glow grows with Faith. Ten pips beneath it give the exact value, and screen readers hear "Faith 5 of 10".
- **Type.** One self-hosted serif under the SIL Open Font License, such as Cormorant Garamond or EB Garamond, for names and Verses. The system font for everything else. Body text is at least 18 px, and the player can step it up twice.

### 8.3 Motion
All motion is CSS. With the reduced-motion setting on, each becomes a 0.15-second fade.

| Moment | Motion | Length |
|---|---|---|
| An Eye opens | A blink, then the text fades in | 0.3 s |
| Rise | The wisp floats up and brightens | 0.8 s |
| Return | The wisp arcs away in a circle | 0.8 s |
| Fall | The wisp sinks and dims to an ember | 0.8 s |
| Verse | A quill underline draws beneath the line | 0.6 s |
| Lamp | The glow swells or shrinks | 0.4 s |

### 8.4 Sound (optional)
A bell at each verdict, a soft cue for rising and falling, and a page sound for the Verse. All from CC0 sources, under 300 KB in total, loaded after the first click. The mute toggle is remembered.

## 9. Technical design

### 9.1 Stack
- **Vite, TypeScript and Svelte 5** for the app. **Vitest** for tests.
- A static site with no backend and no network requests after load.
- Why: DOM text is sharp, accessible and easy to lay out. Svelte compiles to a small bundle. TypeScript catches content mistakes at build time.

### 9.2 Project layout

```
src/
  content/
    souls/          one file per soul (typed data)
    endings.ts      the five ending texts
    scribe.ts       Day 1 hints, reaction lines, Day-end remarks
  game/             plain TypeScript, no DOM
    rng.ts          small seeded integer PRNG (mulberry32)
    deck.ts         builds each Day
    reign.ts        open an Eye, give a verdict, end the Day, pick the ending
    temperament.ts
  ui/               Svelte components
    Title, Soul, Eyes, VerdictBar, Aftermath, WorldBelow, Ending, Lamp, Wisp
  lib/
    storage.ts      versioned localStorage
scripts/
  validate-content.ts
```

### 9.3 Soul data

```ts
type Eye = 'deed' | 'heart' | 'ripple';
type Verdict = 'rise' | 'return' | 'fall';
type FaithChange = -2 | -1 | 0 | 1 | 2;

interface Outcome {
  sentence: string;   // on the verdict button
  verse: string;      // what the Scribe writes
  andSo: string;      // The World Below line
  faith: FaithChange;
}

interface Soul {
  id: string;
  name: string;
  age: number;
  death: string;
  emblem: string;     // icon id
  hue: number;        // 0–359, tints the wisp
  record: string;
  plea: string;
  eyes: Record<Eye, string>;
  verdicts: Record<Verdict, Outcome>;
  heavy?: boolean;    // left out by the gentler-content toggle

  // Roots only: the Echo this soul can summon.
  echo?: { soul: string; on: Verdict[]; sameDay?: boolean };

  // Echoes only: the root, and a Record and Plea per summoning verdict.
  origin?: string;
  versions?: Partial<Record<Verdict, { record: string; plea: string }>>;
}
```

### 9.4 State and saving

```ts
interface Save {
  version: 1;
  seed: number;
  day: number;                 // 1–5
  docket: string[];            // today's soul ids, in order
  index: number;               // next soul in the docket
  faith: number;               // 0–10
  returnsLeft: number;         // 0–2
  history: { soul: string; day: number; eye: Eye; verdict: Verdict }[];
  waiting: { soul: string; summonedBy: Verdict; readyDay: number }[];
}
```

- Two `localStorage` keys: `vv.save.v1` for the current reign, and `vv.book.v1` for souls met and endings seen across reigns.
- The save is written after every verdict and at the end of each Day.
- If the stored version does not match, the game starts fresh. At this size there are no migrations.
- Reset clears both keys after a confirmation.

### 9.5 Building a Day

```
startReign(seed, firstReign):
  roots = firstReign ? day1Fixed + shuffle(otherRoots, seed)
                     : shuffle(allRoots, seed)
  rootsPerDay = [5, 4, 4, 4, 3]

startDay(d):
  todays  = the next rootsPerDay[d] roots
  places  = 6 - todays.length
  echoes  = the first `places` waiting Echoes whose readyDay <= d
  docket  = todays with echoes slotted in from position 2,
            never two Echoes in a row
  returnsLeft = 2

giveVerdict(soul, verdict):
  faith = clamp(faith + soul.verdicts[verdict].faith, 0, 10)
  if verdict is 'return': returnsLeft -= 1
  if soul.echo and verdict is in soul.echo.on:
    if soul.echo.sameDay and today's docket has a free place:
      insert the Echo 2 places later, or last if the Day is nearly over
    else: add it to waiting with readyDay = day + 1
```

In a first reign, Day 1 follows §4 exactly, with the teaching Echo fifth. The same seed always gives the same order, on every browser, because the shuffle uses integer maths only.

### 9.6 Validator
`scripts/validate-content.ts` runs before every build and stops it on any error:
- Every soul has all fields, three Eyes and three verdicts.
- Every field is within its word limit, and the words before the verdict total at most 110, counting an Echo's header and quoted Verse.
- Ids are unique.
- Every `echo.soul` exists, points back with `origin`, and has a version for each summoning verdict.
- No Echo has an `echo` of its own.
- The Day 1 souls exist, and the first one summons its Echo on all three verdicts with `sameDay`.
- The root count matches the tier: 12 or 20.
- With heavy souls left out, every Day can still be filled.

It also plays 1,000 random reigns and warns if more than 1 Day in 10 has fewer than 5 souls.

### 9.7 Tests
Vitest covers the logic in `game/`:
- the Return limit;
- Faith clamping;
- Echoes summoned, not summoned, and arriving on the right Day;
- Day sizes and the no-back-to-back rule;
- each ending's condition;
- all 16 Temperament titles;
- a save round trip;
- the same seed giving the same order.

### 9.8 Hosting
`vite build` produces static files for GitHub Pages or an itch.io HTML5 upload. itch.io serves many games from one domain, so the storage keys keep their `vv.` prefix.

## 10. Optional features

### 10.1 If time allows in version 1.0
- **Book of Souls.** A page listing souls met, with all three Eyes shown, and endings seen. It persists across reigns.
- **Share card.** Copy the Temperament and one Verse as text, or save them as an image drawn in the browser.
- **Gentler-content toggle.** Leaves out souls flagged `heavy`.
- **Sound** (§8.4).

### 10.2 Later, only if the game earns it
- A second Eye once per Day.
- A "Reveal the truth" miracle: the living learn what you saw, so Faith does not fall.
- Linked pairs: two souls from the same event, one after the other.
- A date-seeded Soul of the Day.
- More soul packs, or a second country.
- Localization.
- Offline install.
- Anonymous "how others judged" percentages. This is the only item that needs a backend.

## 11. Glossary

| Term | Meaning |
|---|---|
| **Soul** | One person to judge. Shown as a wisp. |
| **Root** | A soul who arrives regardless of the player's verdicts. |
| **Echo** | A soul who arrives because of one of the player's Verses. |
| **Record** | What the living believe about a soul. |
| **Plea** | One line in the soul's own voice. |
| **Eye** | A glimpse of hidden truth: Deed, Heart or Ripple. One per soul. |
| **Verdict** | Rise, Return or Fall. |
| **Verse** | The one-line rule the Scribe writes from a verdict. |
| **Unveiling** | Showing the two unopened Eyes after the verdict. |
| **Faith** | How much the living trust the god's judgment, 0 to 10. Shown as a lamp. |
| **Day** | Up to 6 souls, about 5 minutes. |
| **The World Below** | The end-of-Day list of Verses and what the living did with them. |
| **Reign** | 5 Days, then an ending. |
| **Temperament** | The two-part title shown at the ending. |
| **Book of Verses** | Every Verse written in the current reign. |
| **Book of Souls** | Optional page of souls met and endings seen across reigns. |
| **The Scribe** | The mortal who writes the Verses, and the game's only guiding voice. |
| **Lowmere** | The river country the god watches over. |
