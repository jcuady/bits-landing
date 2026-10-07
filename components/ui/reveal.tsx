"use client";

import { motion, MotionConfig } from "motion/react";

/**
 * Standard entrance: subtle rise + fade, once, ease-out-expo.
 *
 * Hydration-safe: `initial` is always a static value so server-rendered
 * HTML and the first client paint match exactly. `MotionConfig reducedMotion="user"`
 * overrides the animation at runtime if the OS preference is set — no
 * runtime branching on `initial` required.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
  amount = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount, margin: "0px 0px -20px 0px" }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
