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
    <div className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-white/80 backdrop-blur-xl p-4 shadow-[0_4px_20px_-8px_rgba(0,102,255,0.05)] transition-all hover:shadow-md hover:border-blue-200 dark:border-white/10 dark:bg-[#0b1324]/85 dark:shadow-none">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.72rem] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.68rem] font-bold",
            deltaTone === "up" && "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40",
            deltaTone === "down" && "bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/40",
            deltaTone === "flat" && "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-white/10 dark:text-slate-400 dark:border-white/10"
          )}
        >
          {deltaTone === "up" && <ArrowUpRight className="size-3" />}
          {deltaTone === "down" && <ArrowDownRight className="size-3" />}
          {deltaTone === "flat" && <Minus className="size-3" />}
          {delta}
        </span>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums sm:text-3xl">
          {value}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
        <span className="text-[0.72rem] text-slate-500 dark:text-slate-400 truncate">{context}</span>
        {target && (
          <span className="text-[0.68rem] font-mono text-slate-500 dark:text-slate-400 shrink-0">
            {target}
          </span>
        )}
      </div>

      {/* Subtle BITS glow accent at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#0063db]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
