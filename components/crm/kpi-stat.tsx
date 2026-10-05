import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react";

export function KpiStat({
  label,
  value,
  delta,
  deltaTone,
  context,
  target,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down" | "flat";
  context: string;
  target?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-linelight/60 bg-cloud/70 backdrop-blur-3xl p-4 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] transition-all hover:shadow-md hover:border-linelight dark:border-white/10 dark:bg-black/40">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.72rem] font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.68rem] font-bold",
            deltaTone === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            deltaTone === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
            deltaTone === "flat" && "bg-muted text-muted-foreground"
          )}
        >
          {deltaTone === "up" && <ArrowUpRight className="size-3" />}
          {deltaTone === "down" && <ArrowDownRight className="size-3" />}
          {deltaTone === "flat" && <Minus className="size-3" />}
          {delta}
        </span>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-foreground font-mono tabular-nums sm:text-3xl">
          {value}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20 dark:border-white/10 text-xs">
        <span className="text-[0.72rem] text-muted-foreground truncate">{context}</span>
        {target && (
          <span className="text-[0.68rem] font-mono text-muted-foreground shrink-0">
            {target}
          </span>
        )}
      </div>

      {/* Subtle BITS glow accent at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#1975f2]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
