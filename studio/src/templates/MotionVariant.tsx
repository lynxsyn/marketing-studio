import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {getBrand} from "../lib/brand";
import {revealFragment, revealUnit} from "../lib/textReveal";
import {motionVariantTiming} from "../lib/motionVariants";

export type MotionVariantProps = {brandId: string; direction: "A" | "B" | "C"; headline: string; caption: string; light?: boolean; formatWidth?: number; formatHeight?: number};

export const MotionVariant: React.FC<MotionVariantProps> = ({brandId, direction, headline, caption, light}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const brand = getBrand(brandId);
  const timing = motionVariantTiming(fps, fps, brand.motion.tempo);
  const scale = width / 1080;
  const words = revealUnit(brand.motion.textReveal, headline) === "char" ? [...headline] : headline.split(" ");
  const bg = light ? brand.light.bg : brand.colors.bg;
  const ink = light ? brand.light.ink : brand.colors.ink;
  const accent = light ? brand.light.brand : brand.colors.brand;
  const directionLabel = direction === "A" ? "SIGNAL PLATE" : direction === "B" ? "MATTE GALLERY" : "WAVEFORM";
  const points = Array.from({length: 8}, (_, index) => `${index * 160},${220 + Math.sin(index * 1.3) * 50}`).join(" ");
  return <AbsoluteFill style={{background: bg, color: ink, padding: 72 * scale, fontFamily: brand.fonts.body}}>
    <div style={{position: "absolute", inset: 48 * scale, border: `1px solid ${brand.colors.line}`, opacity: .7}} />
    <div style={{position: "absolute", top: 72 * scale, left: 72 * scale, color: accent, fontFamily: brand.fonts.mono, fontSize: 22 * scale}}>SYNTHACON / {direction} / {directionLabel}</div>
    <svg style={{position: "absolute", top: 160 * scale, left: 72 * scale, width: 800 * scale, height: 340 * scale, opacity: interpolate(frame, [0, timing.mark], [0, 1], {extrapolateRight: "clamp"})}} viewBox="0 0 1120 440"><polyline points={points} fill="none" stroke={accent} strokeWidth="8" pathLength="100" strokeDasharray="100" strokeDashoffset={interpolate(frame, [0, timing.mark], [100, 0], {extrapolateRight: "clamp"})} /></svg>
    <div style={{position: "absolute", left: 72 * scale, right: 72 * scale, bottom: height > width ? 340 * scale : 220 * scale, fontFamily: brand.fonts.display, fontSize: (height > width ? 78 : 64) * scale, lineHeight: 1.02, fontWeight: 700}}>{words.map((word, index) => <span key={`${word}-${index}`} style={{display: "inline-block", marginRight: 18 * scale, ...revealFragment(brand.motion.textReveal, {frame: frame - timing.mark, fps, motion: brand.motion, index, total: words.length, scale})}}>{word}</span>)}</div>
    <div style={{position: "absolute", left: 72 * scale, right: 72 * scale, bottom: 100 * scale, fontSize: 28 * scale, opacity: interpolate(frame, [timing.mark + timing.headline, timing.mark + timing.headline + 18], [0, 1], {extrapolateRight: "clamp"})}}>{caption} · JOIN THE BETA</div>
  </AbsoluteFill>;
};
