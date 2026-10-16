---
type: gotcha
topic: Remotion Easing has no `quart`
date: 2026-10-16
tags: [remotion, easing, typescript]
---

## Summary
Remotion's `Easing` object follows the React Native easing set — there is no
`Easing.quart`. `Easing.out(Easing.quart)` fails TypeScript with
`Property 'quart' does not exist on type 'typeof Easing'`.

## Context
First build of snapshow's CountUp scene used `Easing.out(Easing.quart)`; tsc failed.

## Decision / Finding
Use `Easing.out(Easing.cubic)` (or `expo`, `quad`, `poly(n)`). Available members:
linear, quad, cubic, poly, sine, circle, expo, back, bounce, elastic, bezier, in, out, inOut.

## Consequences
When porting easing names from CSS/After Effects or other libraries, map them to
Remotion's set instead of copying names.

## References
- snapshow/src/scenes/CountUp.tsx (fix applied 2026-10-16)
