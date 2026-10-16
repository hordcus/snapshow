---
type: decision
topic: snapshow is a static Vite + @remotion/player site for GitHub Pages
date: 2026-10-16
tags: [snapshow, vite, remotion, github-pages, architecture]
---

## Summary
snapshow was built as a Vite + React + TypeScript single-page showcase using
`@remotion/player` (browser playback) instead of Remotion's render pipeline, so the
entire output is static and deployable to GitHub Pages with no backend.

## Context
User wanted a snapcn-like feature, deployable to GitHub Pages, which only hosts static
files. Server-side video rendering (`npx remotion render`) can't run on Pages.

## Decision / Finding
- Vite with `base: "./"` (relative assets) so any repo-name subpath works.
- Scenes in `src/scenes/*.tsx`, registered in `src/scenes/compositions.ts` — the catalog
  is data-driven; adding an entry adds it to the gallery automatically.
- Branding lives solely in `src/theme.ts` ("Hordcus", tagline "A registry, for video").
- Deploy via `.github/workflows/deploy.yml` (actions/upload-pages-artifact + deploy-pages).
- React pinned to 18.3.x for maximum Remotion compatibility.

## Rationale
Alternatives rejected: plain static HTML with CDN Remotion (fragile ESM imports), adding
rendering to existing bots (sol-memebot/rhfomo) (needs Node CLI + artifacts, not Pages-
hostable as the primary deliverable), building a real shadcn registry (larger scope than
a showcase).

## Consequences
Scene animation must stay frame-deterministic (pure `useCurrentFrame` math) — no
`useEffect`-driven animation inside scenes, or playback/determinism breaks.

## References
- C:\Users\Admin\snapshow (project root)
- .agent/knowledge/research/snapcn-registry-architecture.md
