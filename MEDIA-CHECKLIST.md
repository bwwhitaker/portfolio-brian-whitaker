# Media checklist

Every `<MediaSlot>` in the case studies renders a visible hatched placeholder
until you give it a `src`. That means the site is presentable right now, and
your remaining shot list is visible just by scrolling it.

To fill one, drop the file in `public/media/<project>/` and add `src` (plus
`alt` for stills):

```jsx
<MediaSlot
  id="SS-02"
  kind="recording"
  what="…"
  src="/media/show-scout/watchlist-search.mp4"
  poster="/media/show-scout/watchlist-search.jpg"
/>
```

## Priority order

If you only shoot three things, shoot **PD-02, SS-02, IH-02**. Those three are
the ones that turn claims into evidence.

| ID | Project | Type | What |
|---|---|---|---|
| SS-01 | Show Scout | Screenshot | Watchlist page, populated with real titles |
| SS-02 | Show Scout | Recording | Fuzzy search finding a misspelled title |
| SS-03 | Show Scout | Screenshot | Admin review queue with a rejected row visible |
| SS-04 | Show Scout | Screenshot | Expo app in a simulator (skip if not presentable) |
| PD-01 | Paper Doc | Screenshot | Admin dashboard on load |
| PD-02 | Paper Doc | Recording | Buying a five-pack: page → Stripe → balance updates |
| PD-03 | Paper Doc | Recording | Word doc import populating a full test |
| PD-04 | Paper Doc | Recording | Sitting a table-stimulus question, lock in, reveal |
| PD-05 | Paper Doc | Screenshot | Same test view narrow, nav collapsed |
| IH-01 | Iyonic | Screenshot | Calculator with a realistic deal loaded |
| IH-02 | Iyonic | Recording | One input dragged, both parties' returns moving |
| CL-01 | Cloaked | Recording | A short winning round |
| CL-02 | Cloaked | Screenshot | Green Actions run with the deploy job gated behind it |
| — | Site | Asset | `public/og.png`, 1200×630 social card |
| — | Site | Asset | `public/brian-whitaker-resume.pdf` |

## How to shoot them

**Recordings.** Keep them 10–30 seconds, silent, and looping. Use MP4 (H.264)
under about 4 MB each — `ffmpeg -i in.mov -vcodec h264 -crf 28 -an out.mp4`
usually gets there. Hide bookmarks bar and notifications. Record at 2× and let
the browser scale down; a retina capture that is downscaled looks sharp, an
upscaled one does not.

**Screenshots.** Crop to the content, not the whole browser window. Chrome is
noise. Use realistic data — a portfolio screenshot full of "Test Test 1" reads
as a project that has never had a user.

**Redaction.** Real student names, real emails, real venue contacts all need to
go. Replace rather than blur where you can; blur boxes look like something is
being hidden, replaced names look like a working product.

**Dark mode.** Pick one theme and shoot everything in it. Mixed-theme media on
one page looks accidental.
