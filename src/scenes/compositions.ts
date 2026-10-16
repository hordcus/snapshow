// Catalog of the showcased scenes — add a scene here and it appears in the gallery.
import type { ComponentType } from "react";
import { TextReveal } from "./TextReveal";
import { LogoSting } from "./LogoSting";
import { CountUp } from "./CountUp";

export interface SceneMeta {
  id: string;
  title: string;
  description: string;
  install: string;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  component: ComponentType;
}

export const scenes: SceneMeta[] = [
  {
    id: "text-reveal",
    title: "TextReveal",
    description:
      "The lead word fades in close to the viewer, falls back to size, then the sentence pushes in word by word.",
    install: "add text-reveal",
    durationInFrames: 90,
    fps: 30,
    width: 1280,
    height: 720,
    component: TextReveal,
  },
  {
    id: "logo-sting",
    title: "LogoSting",
    description:
      "A scatter of cards collapses into one brand card that settles with a spring before the wordmark resolves.",
    install: "add logo-sting",
    durationInFrames: 100,
    fps: 30,
    width: 1280,
    height: 720,
    component: LogoSting,
  },
  {
    id: "count-up",
    title: "CountUp",
    description:
      "A stat counts from zero on an easing curve, an underline wipes in, and a delta chip pops once it lands.",
    install: "add count-up",
    durationInFrames: 80,
    fps: 30,
    width: 1280,
    height: 720,
    component: CountUp,
  },
];
