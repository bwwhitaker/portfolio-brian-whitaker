# Cloaked: recordings to capture

Slot IDs match the `MediaSlot` entries in `content/case-studies/cloaked.mdx`.

## Setup (once)

- [x] In the cloaked repo, run `npm run dev`.
- [x] Fix the ships: edit `src/dev-ships.json` (for example `[6, 11]`). Vite hot-reloads. The **Ships slider must match** the number of ids, or the list is trimmed and you get a loss.
- [x] Hide the text cursor: add `body { cursor: default; user-select: none; }` at the end of the cloaked stylesheet. Buttons and radios keep their pointer.
- [x] Install KeyCastr for keypress overlay (`brew install --cask keycastr`) and grant Accessibility access. Only needed for CL-03.
- [x] Browser at 100% zoom, bookmarks bar and extensions hidden, about 1280 x 800 window.
- [x] Record with QuickTime or Cmd+Shift+5. No audio. Wait for Dropbox to finish syncing before opening a recording.
- [x] Export as MP4 (H.264). Aim for 10 to 25 seconds per clip.
- [x] **Before committing in the cloaked repo:** `git checkout src/Components/GameSpace.jsx` and remove the CSS rule. `src/dev-ships.json` is already git-ignored.

## Must-have

### CL-01: Gameplay round (recording, 4:3, 15 to 20s)

- [x] Landing page, click Start scanning.
- [x] One clear scan, one adjacent scan (siren).
- [x] Switch to Target, mark the ship cells.
- [x] Fire and let the green "You Win!" banner show.
- Tip: ships `[6, 11]`, slider on 2. Cell 1 is clear, cell 2 is adjacent. Existing `docs/gameplay.gif` can be converted instead if the banner is visible.

### CL-03: Keyboard-only play (recording, 4:3, 20 to 25s)

- [x] KeyCastr on, large font, bottom corner clear of the grid.
- [x] Never touch the mouse. Tab to the mode radio group, arrow between Scan and Target.
- [x] Tab once into the grid. Arrow keys, Home, End. Enter to scan.
- [x] A few scans is enough. No need to finish.

### CL-02: CI pipeline (screenshot)

- [ ] GitHub Actions run with test, build and deploy as three chained jobs.
- [ ] Crop to the job list so the `needs:` chain shows.
- [ ] Optional: a failed run where test is red and build and deploy are skipped.

## Strong additions

### CL-04: Loss reveal (recording, 4:3, about 10s)

- [x] Fire with an empty target. Every cloaked ship appears, including unscanned ones.
- [x] Hold the final board for a second.

### CL-05: State icons (screenshot, 4:3)

- [ ] One board showing: targeted (crosshair, amber), ship nearby (siren), clear (dot), ship (rocket, after a loss).
- [ ] Crop to the grid.
- [ ] Optional second frame with DevTools colour-blindness emulation (Rendering, Emulate vision deficiencies).

### CL-06: "That was lucky!" modal fix (recording, 4:3, 10 to 12s)

- [x] Ships fixed so the first scan hits one (for example scan 6).
- [x] Alert appears. Click Fire!, nothing happens.
- [x] Click outside, return to setup with the streak intact. Keep the streak in frame at start and end.

### CL-07: Test run (recording, 16:9, about 10s)

- [ ] Clean terminal, large font, no scrollback.
- [ ] `npm test`, end on the summary: 142 passed, 5 files. Let it sit for a second.

## Optional

### CL-08: Settings and Reduce motion (recording, 4:3, under 10s)

- [x] Needs a round in progress.
- [x] Toggle Reduce motion on and off to show the animation change.
- [x] Show the New Game confirmation and the Don't-ask-again option.

### CL-09: VoiceOver pass (recording, 4:3, about 20s)

- [ ] Only if you actually run VoiceOver (Cmd+F5). Turn the caption panel on so the text is readable without sound.
- [ ] Capture a cell being read ("row 2, column 3, scanned, ship adjacent") and a live-region announcement after a scan.
- [ ] If you skip this, change the case study to say plainly that it has not been tested with a screen reader.

## After recording

- [ ] Trim and downscale to about 1280 px wide. Raw Retina captures are 2880 px.
- [ ] Put files under `public/` and set `src` (and `alt` for screenshots, `poster` for recordings) on each `MediaSlot`.
- [ ] Remove any slot you did not record, or leave it as a placeholder.
