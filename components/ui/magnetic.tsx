"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Pointer-only pull toward the cursor. Disabled for touch and reduced motion.
 * Uses spring MotionValues — not React state — so hover does not re-render.
 */
export function Magnetic({
  children,
  className,
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.35 });
  const transform = useTransform([sx, sy], ([xv, yv]) => `translate3d(${xv}px, ${yv}px, 0)`);

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{ transform }}
      onMouseMove={(e) => {
        if (reduce === true) return;
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
