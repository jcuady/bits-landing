import { cn } from "@/lib/utils";

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
    <div className="rounded-xl border border-linelight bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(6_22_47/0.04)]">
      <p className="text-[0.72rem] font-semibold tracking-[0.06em] text-slateblue uppercase">{label}</p>
      <p className="mt-1.5 text-[1.45rem] font-bold tracking-[-0.03em] text-ink tabular-nums">{value}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem]">
        <span
          className={cn(
            "font-semibold tabular-nums",
            deltaTone === "up" && "text-emerald-700",
            deltaTone === "down" && "text-red-600",
            deltaTone === "flat" && "text-slateblue"
          )}
        >
          {delta}
        </span>
        <span className="text-slateblue">{context}</span>
      </div>
      {target ? <p className="mt-1.5 text-[0.72rem] text-slateblue/90">{target}</p> : null}
    </div>
  );
}
