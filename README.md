# scottsummers.github.io

Personal site of [Scott Summers](https://github.com/scottsummers), a Senior Solutions Architect at Cloudera. By day I work on large-scale data platforms. In my spare time I build small tools and browser games, many of them with AI as a pair programmer.

**Live site:** https://scottsummers.github.io/

This repo is a static GitHub Pages site. There is no build step.

## Games

Sixteen games you can play in the browser — no install, no sign-in. Four featured builds sit at the top of the [Games](https://scottsummers.github.io/#games) section; the rest are shorter puzzles and arcade games.

### Featured

- **[Castaway Cove](https://scottsummers.github.io/games/castaway-cove/)** — Shipwrecked pirate voyage across four islands. Chop, mine and haul resources back to camp, build a campfire, workbench, forge and lookout, craft better tools and cutlasses, open up the ruins and the boss's lair, beat the boss, fix the ship and sail on. Each island (Castaway Cove, Fogmire Isle, Ember Isle, Kraken's Reef) is bigger and tougher, with new creatures, a new ore and its own boss. Level and gear carry over; Easy/Normal/Hard and New Voyage+. Autosaves so it can be played a few minutes at a time. (`games/castaway-cove/`)
- **[Lantern Deep](https://scottsummers.github.io/games/lantern-deep/)** — Real-time roguelike dungeon adventure. Every run builds a new dungeon: explore by lantern light, fight, grab loot, pick perks at the campfire, and beat two bosses across ten floors. (`games/lantern-deep/`)
- **[AI-Built Chess](https://scottsummers.github.io/chess/)** — Full chess game in one HTML file, with castling, promotion, undo, and a computer opponent at Easy, Medium, and Hard. (`chess/`)
- **[Word Explorer](https://scottsummers.github.io/word-explorer/)** — Customizable classroom word game, built as a teaching aid. Source lives in a [separate repo](https://github.com/scottsummers/word-explorer).

### Weekly drops

A new game is added every Thursday. Once more than about 20 games are showing on the homepage, the oldest weekly drops are hidden from the homepage until 20 remain. Hidden games are never deleted — their URLs keep working. The four featured games above are never rotated off.

The drop log and rotation rules live in [`games/weekly-drops.md`](games/weekly-drops.md).

**Thursday drops so far**

- **[Pair Up](https://scottsummers.github.io/games/pair-up/)** (2026-10-29) — Memory card matching, solo, 2-player, or vs the computer.
- **[Mancala](https://scottsummers.github.io/games/mancala/)** (2026-11-05) — Kalah-rules stone-sowing, vs the computer or a friend.
- **[Snowman](https://scottsummers.github.io/games/snowman/)** (2026-11-12) — Guess the word before the snowman melts. Kid-friendly word lists, hints, and a 2-player mode.
- **[Brick Breaker](https://scottsummers.github.io/games/brick-breaker/)** (2026-11-19) — Paddle-and-ball Breakout with stages, power-ups, and touch controls.

**Bonus games**

- **[Castaway Cove](https://scottsummers.github.io/games/castaway-cove/)** (2026-11-25) — Also featured above. Shipwrecked pirate gather-and-build adventure; now a four-island voyage.
- **[Campfire Rows](https://scottsummers.github.io/games/campfire-rows/)** (2026-11-25) — Campout logic puzzle: one campfire per row, column and campsite, and no two fires touching. Daily puzzle, hints, 5×5 to 9×9.

**Also on the site**

- [Code Breaker](https://scottsummers.github.io/games/code-breaker/) — Mastermind-style logic
- [Lights Out](https://scottsummers.github.io/games/lights-out/) — Tile-flip puzzle
- [Math Sprint](https://scottsummers.github.io/games/math-sprint/) — 60-second speed math
- [Daily Pixel Puzzle](https://scottsummers.github.io/games/daily-pixel/) — Daily nonogram
- [Sudoku](https://scottsummers.github.io/games/sudoku/) — Classic Sudoku with a daily puzzle
- [Snake](https://scottsummers.github.io/games/snake/) — Arcade Snake
- [Grid War](https://scottsummers.github.io/games/grid-war/) — Dots and boxes, 2-player or vs the computer

### How games are built

Each game in this repo is a single self-contained HTML file (`games/<slug>/index.html`, or `chess/index.html`). Nothing is loaded from outside the site, so they work on locked-down school networks. They're written to play well on a phone as well as a desktop.

## Scouting resources

[scottsummers.github.io/scouting](https://scottsummers.github.io/scouting/) is an unofficial library of briefs, presentations, handouts, and how-tos that scouts can open or download. Free to use, nothing to sign in to. It isn't affiliated with or endorsed by any scouting organization.

Files live in `scouting/files/` and are listed in `scouting/resources.json`. See [`scouting/HOW_TO_ADD.md`](scouting/HOW_TO_ADD.md) for the format. Because the page is public and used by minors, resources stay generic: no troop numbers, names, photos, or places.

## Repo layout

```
index.html             Homepage
assets/                Shared CSS and favicon
chess/                 Featured chess game
games/                 Browser games, one folder per title
  weekly-drops.md      Thursday drop log and rotation rules
scouting/              Scouting resources page
```

The homepage also has a Projects section (Hadoop-era cluster tools, data pipelines, and the games' source) and a short list of the data-platform technologies I work with.

## Run locally

From the repo root:

```bash
python3 -m http.server
```

Then open http://localhost:8000/
