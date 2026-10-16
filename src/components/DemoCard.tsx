// DemoCard — wraps a scene in a Remotion Player with a title, description and
// a pseudo-CLI install line, matching the registry-showcase pattern.
import { Player } from "@remotion/player";
import type { SceneMeta } from "../scenes/compositions";
import { brand } from "../theme";

export function DemoCard({ scene }: { scene: SceneMeta }) {
  return (
    <article
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: brand.surface,
        border: `1px solid ${brand.border}`,
      }}
    >
      <div style={{ aspectRatio: "16 / 9", background: brand.bg }}>
        <Player
          component={scene.component}
          durationInFrames={scene.durationInFrames}
          compositionWidth={scene.width}
          compositionHeight={scene.height}
          fps={scene.fps}
          controls
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: brand.fontSans,
              fontSize: 20,
              fontWeight: 600,
              color: brand.fg,
            }}
          >
            {scene.title}
          </h3>
          <code
            style={{
              fontFamily: brand.fontMono,
              fontSize: 13,
              color: brand.accent2,
              background: "rgba(124,92,255,0.10)",
              border: `1px solid ${brand.border}`,
              borderRadius: 8,
              padding: "5px 10px",
              whiteSpace: "nowrap",
            }}
          >
            {scene.install}
          </code>
        </div>
        <p
          style={{
            margin: "12px 0 0",
            fontFamily: brand.fontSans,
            fontSize: 15,
            lineHeight: 1.55,
            color: brand.muted,
          }}
        >
          {scene.description}
        </p>
      </div>
    </article>
  );
}
