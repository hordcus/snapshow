// Single-page showcase: hero player, scene gallery, footer.
import { Player } from "@remotion/player";
import { DemoCard } from "./components/DemoCard";
import { scenes } from "./scenes/compositions";
import { brand } from "./theme";

export function App() {
  const hero = scenes[0];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: brand.bg,
        color: brand.fg,
        fontFamily: brand.fontSans,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: `1px solid ${brand.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${brand.accent}, ${brand.accent2})`,
            }}
          />
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
            {brand.name}
          </span>
          <span style={{ color: brand.muted, fontSize: 14 }}>— {brand.tagline}</span>
        </div>
        <a
          href="https://www.remotion.dev/"
          target="_blank"
          rel="noreferrer"
          style={{ color: brand.muted, fontSize: 14, textDecoration: "none" }}
        >
          Built with Remotion
        </a>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 96px" }}>
        <section style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: brand.fontMono,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: brand.accent2,
              border: `1px solid ${brand.border}`,
              borderRadius: 999,
              padding: "8px 16px",
              background: brand.surface,
            }}
          >
            Frame-deterministic · In React
          </div>
          <h1
            style={{
              margin: "28px 0 14px",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Animated video scenes,
            <br />
            <span
              style={{
                background: `linear-gradient(90deg, ${brand.accent}, ${brand.accent2})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              written in code
            </span>
          </h1>
          <p
            style={{
              margin: "0 auto 44px",
              maxWidth: 620,
              fontSize: 18,
              lineHeight: 1.6,
              color: brand.muted,
            }}
          >
            Every frame is a pure function of the frame number — deterministic,
            editable, yours. Press play, change a number, own the file.
          </p>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${brand.border}`,
              boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ aspectRatio: "16 / 9", background: brand.bg }}>
              <Player
                component={hero.component}
                durationInFrames={hero.durationInFrames}
                compositionWidth={hero.width}
                compositionHeight={hero.height}
                fps={hero.fps}
                controls
                loop
                autoPlay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </section>

        <section style={{ marginTop: 84 }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            The scenes
          </h2>
          <p style={{ margin: "0 0 28px", color: brand.muted, fontSize: 16 }}>
            Each one is a single React component. Timeline-free: motion is
            written straight onto the frame clock.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {scenes.map((scene) => (
              <DemoCard key={scene.id} scene={scene} />
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: `1px solid ${brand.border}`,
          padding: "28px 32px",
          textAlign: "center",
          color: brand.muted,
          fontSize: 14,
        }}
      >
        {brand.name} — frame by frame, in code.
      </footer>
    </div>
  );
}
