import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * Section heading. Eyebrow is intentionally optional and rationed:
 * at most one eyebrow per three sections across the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-overline mb-5",
            tone === "light" ? "text-electric-600" : "text-signal-300"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-h2 text-balance",
          tone === "light" ? "text-ink" : "text-white"
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "text-lede mt-6 max-w-[62ch] text-pretty",
            align === "center" && "mx-auto",
            tone === "light" ? "text-slateblue" : "text-mist"
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
