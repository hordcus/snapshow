// TextReveal — cinematic zoom-out title reveal in four beats: the lead word
// fades in large, drifts closer, falls back to size, then the trailing words
// push in from the right one by one.
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { brand } from "../theme";

const PUSH_EASE = Easing.bezier(0.25, 1, 0.5, 1);
const ZOOM_EASE = Easing.bezier(0.5, 0, 0.05, 1);
const WORD_EASE = Easing.bezier(0.22, 0.8, 0.36, 1);

export interface TextRevealProps {
  text?: string;
  fontSize?: number;
}

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export function TextReveal({
  text = brand.tagline,
  fontSize = 96,
}: TextRevealProps) {
  const frame = useCurrentFrame();

  const introDuration = 6;
  const holdDuration = 14;
  const recedeDuration = 16;
  const wordDelay = 8;
  const wordStagger = 4;
  const wordDuration = 14;
  const wordFade = 2;
  const wordPush = 0.5;
  const initialScale = 2.2;
  const pushScale = 1.06;

  const words = text.split(" ").filter(Boolean);

  // The two scale curves never overlap: the first clamps at the peak once the
  // recede starts, the second is 0 until then, so they sum into one
  // continuous scale running initialScale -> peak -> 1.
  const scale =
    interpolate(frame, [0, holdDuration], [initialScale, initialScale * pushScale], {
      ...clamp,
      easing: PUSH_EASE,
    }) +
    interpolate(
      frame,
      [holdDuration, holdDuration + recedeDuration],
      [0, 1 - initialScale * pushScale],
      { ...clamp, easing: ZOOM_EASE },
    );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: brand.bg,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.28em",
          fontSize,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: brand.fg,
          fontFamily: brand.fontSans,
          whiteSpace: "nowrap",
          transform: `scale(${scale})`,
          transformOrigin: "50% 78%",
        }}
      >
        {words.map((word, i) => {
          const isLead = i === 0;
          const pushStart = holdDuration + wordDelay + (i - 1) * wordStagger;
          const opacity = isLead
            ? interpolate(frame, [0, introDuration], [0, 1], clamp)
            : interpolate(frame, [pushStart, pushStart + wordFade], [0, 1], clamp);
          const push = interpolate(
            frame,
            [pushStart, pushStart + wordDuration],
            [wordPush * fontSize, 0],
            { ...clamp, easing: WORD_EASE },
          );
          const isLast = i === words.length - 1;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity,
                translate: isLead ? undefined : `${push}px`,
                color: isLast ? brand.accent : brand.fg,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
