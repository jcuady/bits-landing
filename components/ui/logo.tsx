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
  variant?: "horizontal" | "reverse" | "tile";
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
        className={cn("h-9 w-auto rounded-[10px]", className)}
      />
    );
  }

  const isReverse = variant === "reverse";
  return (
    <Image
      src={isReverse ? "/brand/logo-reverse.png" : "/brand/logo-horizontal.png"}
      alt="BITS - Boundless IT Solutions"
      width={1400}
      height={isReverse ? 408 : 404}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}
