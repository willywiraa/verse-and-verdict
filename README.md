# Fit the Crime

*Pick the punishment. Watch what happens. See how Reddit ruled.*

A daily courtroom game for Reddit, built with Devvit Web. Every day a new post opens **a docket of three cases** in the cartoon city of Kota Damai: a mother who stole five loaves, an official who stole Rp500 billion meant for hospitals, a teenager who robbed a phone shop with a toy gun.

For each case you:

1. read the case file: who, what, how much (shown as things people understand, like "= 5 hospitals"), and who got hurt;
2. flip the evidence if you want, where one fact often changes the picture;
3. pick one of three or four illustrated punishments: prison, take their wealth, repay the victims, community service, a ban, or a second chance;
4. watch a short animated scene of what your verdict does: the bars slam, the mansion becomes hospitals, the river turns blue again;
5. see **how Reddit ruled**: the share of judges who chose each punishment, and whether you sided with them.

After three cases, the result card gives you a judge title (Iron, Fixer, Kind or Balanced Judge), shows where you agreed with the community, compares how you treated the smallest and the biggest crime of the day, and keeps your daily streak. You can post your verdicts as a comment, so every docket post becomes a discussion, or wear your title as user flair. The game never says a verdict is right or wrong.

## On Reddit

| Reddit feature | How the game uses it |
|---|---|
| Interactive post, inline | The feed card shows today's three defendants, the docket number, how many judges have ruled, and your streak. One tap opens court. |
| Interactive post, expanded | The full game, laid out to fit the view on phone and desktop. |
| Scheduler | A new docket post every day at 00:00 UTC (`devvit.json` → `scheduler`). Moderators can also post one from the subreddit menu. |
| Redis | Every verdict is counted per case and per day, which powers "How Reddit ruled". Streaks and progress live on the server, so they follow you across devices. |
| Comments | "Share in comments" posts your verdicts and agreement rate as your own comment. |
| User flair | "Wear as flair" sets your judge title as flair in the community. |
| Login prompt | Logged-out players can play; their votes are not counted, and saving asks them to log in. |

Each post keeps its own docket, so older posts stay playable as an archive. Only today's docket counts toward the streak.

## Run it

Requires Node.js 22 or newer.

```sh
npm install
npm run dev:local   # play in a normal browser against a stand-in server
npm test            # logic, case, storage and interface tests
npm run check       # type-check the client (Svelte) and the server
npm run build       # validate the cases, then build dist/client and dist/server
```

`npm run dev:local` serves `/splash.html` (the feed card) and `/game.html` (the game). Add `?day=N` to play docket N, `?gallery` to see every character, mood and pose, and `?icon` to draw the app icon. The stand-in server keeps one player in `localStorage` and invents a believable crowd, so every screen can be tried offline. It is not part of the Reddit build.

### On Reddit

```sh
npm run login                      # log in to Devvit with your Reddit account
npx devvit playtest <subreddit>    # install on your test subreddit and live-reload while you work
npm run deploy                     # check, test, build and upload a new version
```

Create a small subreddit you moderate for testing first, and set `dev.subreddit` in `devvit.json` (or the `DEVVIT_SUBREDDIT` environment variable) to skip typing it. Installing the app posts today's docket; after that the scheduler posts one every day.

## Writing a case

Each case is one file in `src/shared/cases/`, listed in `src/shared/cases/index.ts`. A case is data: the person (their look is built from the character rig's parts), the crime, the amount, the harm, three pieces of evidence and three or four punishments. The six punishment scenes draw everything. `npm run validate` checks every case: word limits (about 20 words to read before a verdict), plain English, at least one punishment the crowd likes and one it doesn't, no punishment that is best on every count, and a surprise in at least one outcome.

## Project layout

```
devvit.json        Devvit app config: post entrypoints, server, permissions, menu, scheduler
src/shared/        rules shared by client and server: cases, court logic, daily docket, streaks
src/server/        the Devvit server (Hono): /api for the game, /internal for menu, install and schedule
src/client/        the web view: splash.html (feed card) and game.html (the game), in Svelte
  ui/rig/          the character rig: one SVG puppet with moods, poses, walking and outfits
  ui/scenes/       the six punishment scenes and the small kit they share
tests/             Vitest tests, including the real game mounted in happy-dom
```

## Credits

Icons by [Lucide](https://lucide.dev) (ISC licence). Typeface: Cormorant Garamond (SIL Open Font License). Every character, scene and sound effect is drawn or synthesized in code: there are no image or audio files besides the app icon, which is rendered from the game's own character rig.
