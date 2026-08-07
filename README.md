# Palabra — Spanish Vocab Learning App

A single-page Spanish–English vocabulary trainer that runs entirely from GitHub Pages — no backend, no build step, no account. Your word list lives in the repo as Excel files; the app fetches it, quizzes you across several different game modes, and tracks your progress locally in the browser.

## What's here

**Games**, all reachable from a home-screen hub:

- **Quiz** — classic recall. Choose direction (Mixed / ES→EN / EN→ES), round length (10 / 20 / 50 / All), and answer style (type it, or multiple choice).
- **Time Attack** — 60 seconds, answer as many as you can. Tracks your best score.
- **Memory Match** — a face-down grid of Spanish/English tiles; find the pairs. 6, 8, or 12 pairs, tracked by fewest moves.
- **Categories** — 15 themed word lists (see below) played through the same settings as Quiz, minus the 50-word option.
- **Achievements** — 15 badges spanning streaks, lifetime totals, and mode-specific milestones.

**Under the hood:**

- **Real spaced repetition** — every word sits in one of six "boxes." Get it right and it won't come up again for a while (1 → 3 → 7 → 16 → 35 days); get it wrong and it's due again immediately. Word selection is weighted toward whatever's actually due.
- **Typo tolerance** — typed answers allow for small mistakes (a dropped letter, a missing accent) using edit-distance matching, so close-but-not-exact answers still count.
- **Multiple accepted answers** — a word list cell can contain more than one valid translation, separated by `/` or `,`.
- **Shared progress** — Quiz, Time Attack, and Categories all read from and write to the same word history and streak. Memory Match still nudges words through the same repetition schedule, but keeps its own separate score (a memory slip isn't the same as not knowing a word).

## File layout

```
your-repo/
├── index.html              ← the app itself (rename as you like)
├── words.xlsx               ← main word list
├── categories-animals.xlsx
├── categories-bodyparts.xlsx
├── categories-clothing.xlsx
├── categories-colours.xlsx
├── categories-dailyverbs.xlsx
├── categories-daysandmonths.xlsx
├── categories-emotions.xlsx
├── categories-family.xlsx
├── categories-foodanddrink.xlsx
├── categories-greetings.xlsx
├── categories-house.xlsx
├── categories-numbers.xlsx
├── categories-questionwords.xlsx
├── categories-transport.xlsx
├── categories-weather.xlsx
├── manifest.json             ← for installing as an app
├── service-worker.js         ← for offline support
├── icon-192.png
├── icon-512.png
└── icon-512-maskable.png
```

Everything needs to be **served** (GitHub Pages, or any local server) rather than opened directly as a file — the app fetches `words.xlsx` and the category files over HTTP, which browsers block for local files. If a fetch fails, the main word list falls back to a manual upload button; category files show an inline error on that category's screen instead.

## Word list format

| Column A (Spanish) | Column B (English) |
|---|---|
| perro | dog |
| grande | big / large |

- Spanish in column A, English in column B, on the first sheet.
- A header row is optional — there's a toggle in the "⋯" menu to skip it.
- Multiple valid translations go in one cell, separated by `/`, `,`, or `;`.
- Category files follow the exact same format, one file per topic.

**Renaming files:** if you rename `words.xlsx`, update the `WORDS_FILE` constant near the top of the `<script>` block in the HTML (and the matching line in `service-worker.js`). Category files must be named `categories-{id}.xlsx` where `{id}` is the lowercase, no-spaces version of the name shown on its tile (e.g. `categories-foodanddrink.xlsx` → "Food and Drink"). Adding a 16th category means adding both the spreadsheet and an entry in the `CATEGORIES` list in the script.

## Progress & data

Everything — word history, streaks, best scores, achievements, and settings — is stored in the browser's `localStorage`, tied to that browser and device. Nothing is sent anywhere.

- **Download progress** / **Upload progress** (in the "⋯" menu) export/import that data as a JSON file, so you can move it to another browser or back it up.
- **Reload word list** re-fetches `words.xlsx` from the repo, for after you've updated it.

## Installing as an app

The manifest, service worker, and icons let you install the page to a phone's home screen for a full-screen, app-like experience that still works offline once loaded. Visiting the page in Chrome on Android should prompt an "Install" option automatically.

This isn't a native `.apk` — turning it into one (for something like the Play Store) would go through a tool like [PWABuilder](https://www.pwabuilder.com), which reads the manifest already in place here and can generate an installable Android package from it.

## Design

Visual identity is "Vidrio" — glass panels over an ambient gradient glow, with the glow's color shifting by mode (coral for Quiz, teal for Time Attack, magenta for Memory Match, gold for Achievements) so the color itself signals where you are in the app. One deliberate nod to Spain: a small medallion badge on the home screen, banded red–gold–red.
