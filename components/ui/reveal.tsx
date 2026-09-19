"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Standard entrance: subtle rise + fade, once, ease-out-expo.
 * `initial` stays the same on server and client so reduced-motion
 * does not cause a hydration mismatch.
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -20px 0px" }}
      transition={{
        duration: reduce === true ? 0 : 0.45,
        delay: reduce === true ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
