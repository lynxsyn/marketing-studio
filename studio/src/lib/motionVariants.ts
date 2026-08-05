export type MotionVariantTiming = {mark: number; headline: number; hold: number};

export const motionVariantTiming = (fps: number, _fps: number, tempo: number): MotionVariantTiming => {
  const safeTempo = Math.max(0.25, tempo);
  return {mark: Math.round((fps / safeTempo)), headline: Math.round((fps * 1.8) / safeTempo), hold: 180};
};
