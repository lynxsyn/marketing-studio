import React from 'react';

/**
 * The Synthacon "S": a single round-capped stroke with a patch-cable terminal
 * at each end (violet top-right, periwinkle bottom-left), traced from the
 * product's own apps/web/public/synthacon.svg with the background plate
 * dropped. The stroke and outer terminal rings follow `color`; the inner
 * terminal dots keep their identity colors, exactly as the app icon does.
 */
export const SynthaconMark: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg viewBox="0 0 400 400" width={size} height={size} fill="none" style={{color}}>
    <path
      d="M 300,95 L 168,95 Q 112,95 112,152 Q 112,208 168,208 L 246,208 Q 302,208 302,265 Q 302,322 246,322 L 114,322"
      stroke="currentColor"
      strokeWidth="52"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="300" cy="95" r="37" fill="currentColor" />
    <circle cx="300" cy="95" r="20" fill="#7755CC" />
    <circle cx="114" cy="322" r="37" fill="currentColor" />
    <circle cx="114" cy="322" r="20" fill="#7B8AE0" />
  </svg>
);
