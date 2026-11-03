import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GlassCard — the brandbook's glass surface, translated to the light
 * background the marketing pages sit on.
 *
 * The brandbook (BRANDING_CLOUDS_INFINITY.md §4.B) specifies a "hardware-feel
 * double-bezel geometry":
 *
 *   <div class="rounded-[2rem] p-2 bg-white/5 border border-white/10
 *            shadow-2xl backdrop-blur-xl">
 *     <div class="rounded-[calc(2rem-0.5rem)] bg-[#06162F]/90 p-6
 *               border border-white/5">
 *
 * That is the dark cockpit treatment. On a light page the same geometry reads
 * as a hairline outer bezel with a translucent inner core, so this uses the
 * same construction: a one-pixel outer pad, a slightly inset inner panel, and
 * the brandbook's own shadow tokens rather than ad-hoc values.
 *
 * The shadows are the brandbook's --shadow-glass-card and --shadow-glass-lift,
 * defined in app/globals.css. Using them means the depth is consistent
 * everywhere and can be retuned in one place.
 */
export function GlassCard({
  children,
  className,
  innerClassName,
  as: Component = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "div" | "article" | "section" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      data-glass-card=""
      className={cn(
        "rounded-[1.75rem] border border-white/60 bg-white/40 p-px shadow-glass-card backdrop-blur-xl",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "h-full rounded-[calc(1.75rem-1px)] border border-white/70 bg-white/55 backdrop-blur-xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
}

/**
 * The hover state for a glass card that is itself a link. The lift is the
 * brandbook's --shadow-glass-lift; the movement is a single pixel, which is
 * enough to read as depth without breaking the calm.
 */
export function glassCardInteractive(className?: string) {
  return cn(
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lift",
    className,
  );
}
