# Palabra — Spanish Vocab Quiz

A single-page vocab quiz. It loads a Spanish–English word list straight from this repo, quizzes you on 20 words at a time (mixed randomly between Spanish→English and English→Spanish), and scores you out of 20 at the end.

## Files

- `spanish-quiz-repo.html` — the quiz page
- `words.xlsx` — your word list (add this yourself — see format below)

## Setup

1. Add both files to the same folder in this repo (root is simplest).
2. In **Settings → Pages**, set the source to deploy from the branch/folder these files live in.
3. Visit the Pages URL GitHub gives you.

If you'd rather the quiz be the site's homepage, rename `spanish-quiz-repo.html` to `index.html`.

## Word list format

| Column A (Spanish) | Column B (English) |
|---|---|
| perro | dog |
| grande | big / large |

- Column A: Spanish, Column B: English.
- A header row is optional — there's a toggle on the page to skip it.
- Put more than one accepted answer in a cell separated by `/`, `,`, or `;` — any of them will be marked correct.
- Accents are optional when typing an answer (`como` counts for `cómo`).

## Updating the list

Edit `words.xlsx`, commit, and push. Reload the page or hit **New list** to pull the latest version.

## A couple of things to know

- The page fetches `words.xlsx` on load, so it needs to be **served** (GitHub Pages, or any local server) — opening the HTML file directly on your computer won't work, since browsers block that kind of file access. If it can't load the file, the page falls back to a manual upload button automatically.
- If you rename `words.xlsx` to something else, update the `WORDS_FILE` constant near the top of the `<script>` in the HTML file to match.

## Installing as an app (and getting an APK)

Three extra files make the page installable rather than just a bookmark:

- `manifest.json` — name, icon, and theme color for when it's installed
- `service-worker.js` — caches the app so it still opens (and quizzes you from whatever was last loaded) without a connection
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — the app icons, built from the same flag medallion used in the app itself

**Setup:**
1. Add all of these to the same folder as the game and push.
2. If your main HTML file isn't named `index.html`, update the `start_url` in `manifest.json` and the `APP_HTML` constant at the top of `service-worker.js` to match. Same for `words.xlsx` if you've renamed that too.
3. Visit the page on an Android phone in Chrome — you'll get an "Install" / "Add to Home screen" prompt, and from then on it opens full-screen with its own icon, like any other app.

**On a real `.apk` file:** that's not something I can compile directly — it needs the Android build toolchain (SDK, signing, etc.), which isn't available here. The straightforward path once the files above are in place: go to **[pwabuilder.com](https://www.pwabuilder.com)**, enter your GitHub Pages URL, and it'll read the manifest and generate a signed, installable Android package for you — free, no coding, no Android Studio required. If you'd already built an APK a different way (Capacitor, Bubblewrap, or similar) before this redesign, that one will still be showing the old look until it's rebuilt from the updated files above — let me know which route you used and I can be more specific about what to update.
