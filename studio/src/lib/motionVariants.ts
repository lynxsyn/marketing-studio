export type MotionVariantTiming = {mark: number; headline: number; hold: number};

export type MotionVariantScene = {
  layout: "spec-plate" | "matte-gallery" | "type-only";
  gearAsset: string | null;
  wavePath: string;
  label: string;
  light: boolean;
};

const scenes: Record<"A" | "B" | "C", MotionVariantScene> = {
  A: {
    layout: "spec-plate",
    gearAsset: "synthacon/launch/synth-poly-dark.png",
    wavePath: "M8 90 Q 68 10 128 90 T 248 90 T 368 90 T 488 90 T 608 90 T 728 90 T 848 90 T 952 90",
    label: "SIGNAL / AVAILABLE NOW",
    light: false,
  },
  B: {
    layout: "matte-gallery",
    gearAsset: "synthacon/launch/synth-moog-white.png",
    wavePath: "M8 148 L128 30 L128 148 L248 30 L248 148 L368 30 L368 148 L488 30 L488 148 L608 30 L608 148 L728 30 L728 148 L848 30 L848 148 L952 30",
    label: "CATALOGUE / PEOPLE WHO PLAY",
    light: true,
  },
  C: {
    layout: "type-only",
    gearAsset: null,
    wavePath: "M8 148 H128 V30 H248 V148 H368 V30 H488 V148 H608 V30 H728 V148 H848 V30 H952",
    label: "BUY / SELL / RENT",
    light: false,
  },
};

export const motionVariantScene = (direction: "A" | "B" | "C"): MotionVariantScene => scenes[direction];

export const motionVariantTiming = (fps: number, _fps: number, tempo: number): MotionVariantTiming => {
  const safeTempo = Math.max(0.25, tempo);
  return {mark: Math.round((fps / safeTempo)), headline: Math.round((fps * 1.8) / safeTempo), hold: 180};
};
