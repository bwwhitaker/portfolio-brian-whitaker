# Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind v4 · MDX.

```bash
npm install
npm run dev
```

## Where things live

| I want to change… | Edit |
|---|---|
| My name, email, links, resume path | `content/projects.ts` → `site` |
| The project list, stack chips, credits rail, outcomes | `content/projects.ts` → `projects` |
| Case study prose | `content/case-studies/<slug>.mdx` |
| A diagram's boxes, arrows and explanations | `content/diagrams.ts` |
| Employment history on /about | `content/projects.ts` → `roles` |
| Colours, type scale, prose styling | `app/globals.css` |

Adding a project = a new entry in `projects`, a new `.mdx` file, and one line in
the `BODIES` map in `app/work/[slug]/page.tsx`.

## Components available inside MDX

No imports needed — they are registered in `mdx-components.tsx`.

- `<FlowDiagram id="show-scout-pipeline" />` — interactive system diagram.
  Hover, tab or click a box for its explanation. Dashed edges mean scheduled.
  Falls back to a readable list on narrow screens.
- `<MediaSlot id="SS-01" kind="screenshot" what="…" framing="…" purpose="…" />`
  — placeholder until you add `src`. See `MEDIA-CHECKLIST.md`.
- `<CodeSample file="…" language="sql" why="…" code={`…`} />` — a snippet with
  the reason it earns its place. If you can't write `why`, cut the snippet.
- `<Decisions rows={[{ decision, instead, because }]} />` — the chose/over/because
  table. This is the highest-signal thing on a product-engineer portfolio.
- `<Callout label="…">…</Callout>` — short aside. Two or three per case study.
- `<Revise>…</Revise>` — visible marker for content still needing your pass.

## Before you publish

Grep for what is still stubbed:

```bash
grep -rn "TODO\|REVISE" content/ app/
```

The `<Revise>` blocks render as highlighted text on the live page, so anything
you miss is loud rather than silent.

## Live repo activity

`RepoActivity` fetches each project's last-commit date from the GitHub API in a
server component, revalidated hourly. It fails silently if GitHub is
unreachable or the repo is private. To raise the rate limit, add a token:

```
# .env.local
GITHUB_TOKEN=ghp_…
```

## Deploying

Vercel, connect the repo, no configuration needed. Case study pages are
statically generated; only the GitHub call revalidates.

## Design notes

Direction is "working drawings" — the visual language of technical
documentation, since the differentiator here is that you show systems rather
than describe them. Oat paper, slate ink, pencil rules, brass for emphasis,
viridian for anything that runs on a schedule. Rules and grid work appear only
where they carry meaning: diagrams, credit rails, section breaks.

Three faces, three jobs: Bricolage Grotesque sets headings and interface,
Newsreader sets long-form prose (case studies are genuinely long, and a serif
at 1.72 line-height is easier to read for that length), IBM Plex Mono is
reserved for code and schema labels — never for decoration.

Dark mode is a class on `<html>` set before paint, so there is no flash.
