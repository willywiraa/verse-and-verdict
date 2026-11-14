# Verse & Verdict

*Judge the dead. The living are taking notes.*

A small, free browser game. You are a young god watching over a river country called Lowmere. The dead arrive one at a time as small lights. For each soul you:

1. read what the living believe about them, and their plea;
2. open **one** of three Eyes to glimpse the truth: **Deed**, **Heart** or **Ripple**;
3. choose **Rise**, **Return** or **Fall**.

The Scribe writes your verdict down as a one-line Verse. Then you see what you didn't, and what the living did with your words. Some of them come back to you later, *because of your Verse*.

A Day takes about five minutes. A reign of five Days takes about half an hour and ends in one of five endings, with a title such as "The Gentle Weigher of Hearts". There are 40 handcrafted souls, and each reign shows up to 30 of them, so a second reign meets people you missed.

## Controls

| Action | Mouse or touch | Keyboard |
|---|---|---|
| Open an Eye | Tap it | 1, 2, 3 |
| Rise, Return, Fall | Tap the button | ↑, →, ↓ |
| Next | Tap Next | Enter or Space |
| Menu | Menu button | Esc |

Progress is saved in your browser after every action. Nothing is sent anywhere.

## Run it

Requires Node.js 20 or newer.

```sh
npm install
npm run dev        # local server with hot reload
npm test           # logic, content and interface tests
npm run check      # type-check Svelte and TypeScript
npm run validate   # check every soul against the writing rules
npm run build      # validate, then build the static site into dist/
npm run preview    # serve the built site
```

`dist/` is a static site with relative paths. You can upload it to GitHub Pages or itch.io (as an HTML5 game), or open it from any web server.

## Writing a soul

Each soul is one file in `src/content/souls/`, listed in `src/content/index.ts`. The template, word limits and writing rules are in [GDD §5](docs/GDD.md#5-writing-souls). `npm run validate` checks every soul against them. It also plays 1,000 random reigns to make sure Days stay full.

## Project layout

```
src/content/   souls, endings, the Scribe's lines, the content validator
src/game/      the rules, in plain TypeScript with no DOM
src/lib/       saving to localStorage
src/ui/        Svelte screens, the game store, synthesized sound
tests/         Vitest tests, including the real app mounted in happy-dom
docs/          product requirements and game design
```

## Documents

- [Product requirements](docs/PRD.md): goals, scope, requirements, milestones and status.
- [Game design](docs/GDD.md): rules, writing guide, sample souls, screens and technical design.

## Credits

Icons by [Lucide](https://lucide.dev) (ISC licence). Typeface: Cormorant Garamond (SIL Open Font License). All other art is CSS and SVG, and all sound is synthesized in the browser.
