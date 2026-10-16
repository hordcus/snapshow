// CountUp — a stat counts from zero on an easing curve, an accent underline
// wipes beneath it, and a delta chip pops in once the number lands.
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand } from "../theme";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export interface CountUpProps {
  target?: number;
  label?: string;
  delta?: string;
}

export function CountUp({
  target = 12480,
  label = "tokens scanned",
  delta = "+24% this week",
}: CountUpProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countDuration = 50;
  const value = Math.round(
    interpolate(frame, [4, 4 + countDuration], [0, target], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    }),
  );

  const labelOpacity = interpolate(frame, [10, 20], [0, 1], clamp);
  const underline = interpolate(frame, [20, 45], [0, 100], clamp);
  const chip = spring({ frame: frame - 52, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: brand.bg,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: brand.fontMono,
            fontVariantNumeric: "tabular-nums",
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: brand.fg,
            lineHeight: 1.05,
          }}
        >
          {value.toLocaleString("en-US")}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: brand.fontSans,
            fontSize: 26,
            color: brand.muted,
            opacity: labelOpacity,
          }}
        >
          {label}
        </div>
        <div
          style={{
            margin: "18px auto 0",
            width: `${underline}%`,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${brand.accent}, ${brand.accent2})`,
          }}
        />
        <div
          style={{
            display: "inline-block",
            marginTop: 22,
            padding: "8px 18px",
            borderRadius: 999,
            border: `1px solid ${brand.border}`,
            background: brand.surface,
            fontFamily: brand.fontMono,
            fontSize: 17,
            color: brand.accent2,
            opacity: chip,
            transform: `scale(${0.85 + 0.15 * chip})`,
          }}
        >
          {delta}
        </div>
      </div>
    </AbsoluteFill>
  );
}
