import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {getBrand} from "../lib/brand";
import {getReveal} from "../brands/reveals";
import {revealFragment, revealUnit} from "../lib/textReveal";
import {motionVariantTiming} from "../lib/motionVariants";

export type MotionVariantProps = {brandId: string; direction: "A" | "B" | "C"; headline: string; caption: string; light?: boolean; formatWidth?: number; formatHeight?: number};

export const MotionVariant: React.FC<MotionVariantProps> = ({brandId, direction, headline, caption, light}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = getBrand(brandId);
  const timing = motionVariantTiming(fps, fps, brand.motion.tempo);
  const reveal = getReveal(brandId);
  const scale = Math.min(width / 1080, height / 1920);
  const words = revealUnit(brand.motion.textReveal, headline) === "char" ? [...headline] : headline.split(" ");
  const bg = light ? "#f8f7f6" : brand.colors.bg;
  const ink = light ? "#181818" : brand.colors.ink;
  const Reveal = reveal;
  return <AbsoluteFill style={{background: bg, color: ink, padding: 72 * scale, fontFamily: brand.fonts.body}}>
    <div style={{position: "absolute", top: 72 * scale, left: 72 * scale, color: light ? "#3d17a0" : brand.colors.brand, fontFamily: brand.fonts.mono, fontSize: 22 * scale}}>SYNTHACON / {direction}</div>
    <div style={{position: "absolute", top: 210 * scale, left: 72 * scale, opacity: interpolate(frame, [0, timing.mark], [0, 1], {extrapolateRight: "clamp"})}}>{Reveal && <Reveal size={220 * scale} brand={brand} />}</div>
    <div style={{position: "absolute", left: 72 * scale, right: 72 * scale, bottom: 260 * scale, fontSize: 78 * scale, lineHeight: 1.02, fontWeight: 700}}>{words.map((word, index) => <span key={`${word}-${index}`} style={{display: "inline-block", marginRight: 18 * scale, ...revealFragment(brand.motion.textReveal, {frame: frame - timing.mark, fps, motion: brand.motion, index, total: words.length, scale})}}>{word}</span>)}</div>
    <div style={{position: "absolute", left: 72 * scale, right: 72 * scale, bottom: 100 * scale, fontSize: 28 * scale, opacity: interpolate(frame, [timing.mark + timing.headline, timing.mark + timing.headline + 18], [0, 1], {extrapolateRight: "clamp"})}}>{caption}</div>
  </AbsoluteFill>;
};
