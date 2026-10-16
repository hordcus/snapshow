// LogoSting — a scatter of cards collapses into one brand card that settles
// with a spring, then the wordmark fades in under a widening letter-spacing.
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand } from "../theme";

const SNAP_EASE = Easing.bezier(0.34, 1.56, 0.64, 1);

// Deterministic per-index scatter so every render is identical.
function scatterOffset(i: number): { x: number; y: number; rotate: number } {
  const ring = i % 3;
  const lap = Math.floor(i / 3) % 2;
  const angle = (i * 2.399) % (Math.PI * 2);
  const radius = 260 + lap * 140;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.55,
    rotate: (ring - 1) * (14 + i * 3),
  };
}

export interface LogoStingProps {
  name?: string;
}

const CARD_COUNT = 7;

export function LogoSting({ name = brand.name }: LogoStingProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const settle = spring({
    frame: frame - 26,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const markOpacity = interpolate(frame, [30, 40], [0, 1]);
  const tracking = interpolate(frame, [30, 55], [0.35, 0.02]);
  const underline = interpolate(frame, [40, 58], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: brand.bg,
      }}
    >
      {Array.from({ length: CARD_COUNT }, (_, i) => {
        const offset = scatterOffset(i);
        const start = i * 3;
        const progress = interpolate(frame, [start, start + 22], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: SNAP_EASE,
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 128,
              height: 86,
              borderRadius: 16,
              background:
                i === 0
                  ? `linear-gradient(135deg, ${brand.accent}, ${brand.accent2})`
                  : brand.surface,
              border: `1px solid ${brand.border}`,
              transform: `translate(${offset.x * progress}px, ${
                offset.y * progress
              }px) rotate(${offset.rotate * progress}deg) scale(${
                1 - 0.15 * progress
              })`,
              opacity: interpolate(frame, [start, start + 4], [0, 1]),
            }}
          />
        );
      })}
      <div
        style={{
          position: "relative",
          transform: `scale(${0.8 + 0.2 * settle})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "26px 44px",
            borderRadius: 22,
            background: brand.surface,
            border: `1px solid ${brand.border}`,
            boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${brand.accent}, ${brand.accent2})`,
            }}
          />
          <span
            style={{
              fontFamily: brand.fontSans,
              fontWeight: 700,
              fontSize: 52,
              letterSpacing: `${tracking}em`,
              color: brand.fg,
              opacity: markOpacity,
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </div>
        <div
          style={{
            marginTop: 14,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${brand.accent}, ${brand.accent2})`,
            width: `${underline}%`,
            opacity: markOpacity,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
