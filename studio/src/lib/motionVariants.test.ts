import {describe, expect, it} from "vitest";
import {motionVariantTiming} from "./motionVariants";

describe("motionVariantTiming", () => {
  it("keeps the final hold long enough for a readable caption", () => {
    expect(motionVariantTiming(30, 30, 1)).toEqual({mark: 30, headline: 54, hold: 180});
  });

  it("scales the reveal windows with tempo", () => {
    expect(motionVariantTiming(30, 30, 2)).toEqual({mark: 15, headline: 27, hold: 180});
  });
});
