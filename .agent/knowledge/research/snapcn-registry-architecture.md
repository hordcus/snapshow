---
type: research
topic: How snapcn.dev works (reverse-engineered)
date: 2026-10-16
tags: [snapcn, remotion, shadcn, registry, research]
---

## Summary
snapcn.dev is a Next.js (Vercel) marketing/docs site whose entire product is a
shadcn-style registry: static JSON manifests at `https://snapcn.dev/r/<name>.json`
that embed full component source code, consumed by `npx shadcn@latest add @snapcn/<name>`.

## Context
User asked to reverse-engineer https://snapcn.dev and build a similar feature.
Investigation was done via direct HTTP fetches (HTML, llms.txt, registry JSON, docs .md).

## Decision / Finding
- Site is Next.js with `/_next/static/chunks/*` bundles and a `data-dpl-id` deploy tag (Vercel).
- `llms.txt` and `llms-components.txt` exist deliberately so AI agents resolve component
  names; any docs URL serves raw markdown when `.md` is appended.
- Registry item example (`/r/text-reveal.json`) follows
  `$schema: https://ui.shadcn.com/schema/registry-item.json` with:
  `dependencies: ["remotion"]`, `registryDependencies` (shared core), and
  `files[0].content` = the ENTIRE component source as a string, `files[0].target` =
  destination path (`components/snap-cn/text-reveal.tsx`).
- Consumer setup: `@/*` path alias in tsconfig AND remotion.config.ts (Remotion's bundler
  ignores tsconfig paths), plus a hand-written `components.json` (shadcn init doesn't
  recognize Remotion projects).
- Components are frame-deterministic React: `useCurrentFrame()`, `interpolate()`,
  `Easing.bezier()`, `spring()` — renderable to MP4 via `npx remotion render` or playable
  live via `@remotion/player`.
- 50 installable components across 8 categories (text, captions, logos, screens, charts,
  social, scenes, ai-input). Free tier is MIT; Pro components are gated.

## Rationale
No proprietary backend is involved — the "registry" is just static JSON. This is the key
insight that made the mini-clone feasible as a pure static site.

## Consequences
A similar registry could be replicated with plain static files + the shadcn CLI; a
showcase needs no server if animations run through `@remotion/player` in the browser.

## References
- https://snapcn.dev/llms.txt
- https://snapcn.dev/r/text-reveal.json
- https://snapcn.dev/docs/getting-started/installation.md
- Session evidence notes in conversation (2026-10-16)
