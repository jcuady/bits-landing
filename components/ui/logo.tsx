import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BITS brand lockups. Never recolored, stretched or recreated with type.
 * horizontal: light surfaces. reverse: dark surfaces. tile: compact contexts.
 *
 * ── Sizing (SYSTEM_AUDIT.md §34) ────────────────────────────────────────────
 *
 * These lockups render at 32-64px tall but ship as 2067x713 (383 KB) and
 * 1081x1227 (414 KB) PNGs — roughly 100x the pixels actually displayed. Two
 * instances of the same file were being fetched per logo on the page, because
 * `variant="auto"` renders the light and dark lockups together.
 *
 * Measured on the production build before this change: /brand/logo-reverse.png
 * was the single largest resource on the homepage at 371 KB decoded, larger
 * than any JavaScript chunk.
 *
 * `unoptimized` disabled Next's image optimizer, so the raw export was served
 * verbatim. Removing it lets the optimizer serve a candidate matched to `sizes`,
 * in the AVIF/WebP formats already configured in next.config.ts. The intrinsic
 * width/height stay for aspect-ratio reservation, so there is no layout shift.
 *
 * This requires `sharp`, which Next's optimizer uses at runtime. It was
 * previously resolving only as a transitive dependency, so it is now declared
 * explicitly in package.json rather than inherited by accident.
 */
export function Logo({
  variant = "horizontal",
  className,
  priority = false,
}: {
  variant?: "horizontal" | "reverse" | "tile" | "stacked" | "stacked-reverse" | "mark" | "auto";
  className?: string;
  priority?: boolean;
}) {
  if (variant === "tile") {
    return (
      <Image
        src="/brand/mark-tile.png"
        alt="BITS - Boundless IT Solutions"
        width={512}
        height={512}
        sizes="96px"
        priority={priority}
        className={cn("h-9 w-auto rounded-[10px] object-contain", className)}
      />
    );
  }

  if (variant === "mark") {
    return (
      <Image
        src="/brand/mark.png"
        alt="BITS - Boundless IT Solutions Cloud Ribbon Mark"
        width={1070}
        height={950}
        sizes="96px"
        priority={priority}
        className={cn("h-8 w-auto object-contain", className)}
      />
    );
  }

  if (variant === "stacked" || variant === "stacked-reverse") {
    return (
      <Image
        src={variant === "stacked-reverse" ? "/brand/logo-stacked-reverse.png" : "/brand/logo-stacked.png"}
        alt="BITS - Boundless IT Solutions"
        width={1081}
        height={1227}
        sizes="128px"
        priority={priority}
        className={cn("h-16 w-auto object-contain", className)}
      />
    );
  }

  if (variant === "auto") {
    return (
      <span className="inline-flex items-center">
        <Image
          src="/brand/logo-horizontal.png"
          alt="BITS - Boundless IT Solutions"
          width={2067}
          height={713}
          sizes="128px"
          priority={priority}
          className={cn("h-8 w-auto object-contain dark:hidden", className)}
        />
        <Image
          src="/brand/logo-reverse.png"
          alt="BITS - Boundless IT Solutions"
          width={2067}
          height={713}
          sizes="128px"
          priority={priority}
          className={cn("hidden h-8 w-auto object-contain dark:block", className)}
        />
      </span>
    );
  }

  const isReverse = variant === "reverse";
  return (
    <Image
      src={isReverse ? "/brand/logo-reverse.png" : "/brand/logo-horizontal.png"}
      alt="BITS - Boundless IT Solutions"
      width={2067}
      height={713}
      sizes="128px"
      priority={priority}
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}
