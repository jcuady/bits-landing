import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * BITS brand lockups. Never recolored, stretched or recreated with type.
 * horizontal: light surfaces. reverse: dark surfaces. tile: compact contexts.
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
        priority={priority}
        unoptimized
        className={cn("h-9 w-auto rounded-[10px] object-contain", className)}
      />
    );
  }

  if (variant === "mark") {
    return (
      <Image
        src="/brand/mark.png"
        alt="BITS - Boundless IT Solutions Cloud Mark"
        width={512}
        height={512}
        priority={priority}
        unoptimized
        className={cn("h-8 w-auto object-contain", className)}
      />
    );
  }

  if (variant === "stacked" || variant === "stacked-reverse") {
    return (
      <Image
        src={variant === "stacked-reverse" ? "/brand/logo-stacked-reverse.png" : "/brand/logo-stacked.png"}
        alt="BITS - Boundless IT Solutions"
        width={800}
        height={907}
        priority={priority}
        unoptimized
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
          width={1400}
          height={482}
          priority={priority}
          unoptimized
          className={cn("h-8 w-auto object-contain dark:hidden", className)}
        />
        <Image
          src="/brand/logo-reverse.png"
          alt="BITS - Boundless IT Solutions"
          width={1400}
          height={482}
          priority={priority}
          unoptimized
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
      width={1400}
      height={482}
      priority={priority}
      unoptimized
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}
