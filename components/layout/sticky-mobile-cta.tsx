"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export function StickyMobileCta() {
  const [visible, setVisible] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    /* Show after scrolling past the hero (~600px) */
    setVisible(y > 600);
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 pb-safe lg:hidden",
        "pointer-events-none"
      )}
      initial={false}
      animate={{
        y: visible ? 0 : 80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="pointer-events-auto mx-auto w-full max-w-md px-4 pb-3">
        <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl shadow-blue-950/10 backdrop-blur-xl">
          <a
            href="#contact"
            className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 font-bold text-white shadow-md shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Book a Free Consultation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <span className="text-[0.68rem] font-medium text-slate-500">
            Fast reply from our solutions team · No obligation
          </span>
        </div>
      </div>
    </motion.div>
  );
}
