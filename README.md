# snapshow

A mini [snapcn](https://snapcn.dev)-style showcase: animated video scenes written in React
with [Remotion](https://www.remotion.dev/), played in the browser via `@remotion/player`.
Fully static — no backend — and deploys to GitHub Pages.

Every scene is **frame-deterministic**: what you see is a pure function of the frame
number (`useCurrentFrame` + `interpolate` + `spring`), the same technique snapcn uses.
Change a number, get a different animation. No timeline editor.

## Scenes

| Scene | What it does |
|---|---|
| `TextReveal` | Lead word fades in close, falls back, sentence assembles word-by-word |
| `LogoSting` | Scattered cards collapse into a brand card, wordmark resolves |
| `CountUp` | Stat counts up on an easing curve, underline wipes, delta chip pops |

## Develop

```powershell
cd snapshow
npm install
npm run dev      # local dev server
npm run build    # type-check + static build into dist/
npm run preview  # serve the production build locally
```

## Rebrand

Edit `src/theme.ts` — name, tagline, colors. Everything follows it.

Add a scene: create `src/scenes/<name>.tsx`, then register it in
`src/scenes/compositions.ts` — it appears in the gallery automatically.

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`:

1. Create a GitHub repo and push this folder to `main`.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` builds and deploys automatically.

The build uses relative asset paths (`base: "./"`), so any repo name works.
