import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  new: "bg-sky-50 text-sky-800 border-sky-200",
  working: "bg-amber-50 text-amber-800 border-amber-200",
  qualified: "bg-emerald-50 text-emerald-800 border-emerald-200",
  disqualified: "bg-slate-100 text-slate-600 border-slate-200",
  open: "bg-amber-50 text-amber-800 border-amber-200",
  done: "bg-emerald-50 text-emerald-800 border-emerald-200",
  active: "bg-emerald-50 text-emerald-800 border-emerald-200",
  paused: "bg-amber-50 text-amber-800 border-amber-200",
  draft: "bg-slate-100 text-slate-600 border-slate-200",
  completed: "bg-sky-50 text-sky-800 border-sky-200",
  published: "bg-emerald-50 text-emerald-800 border-emerald-200",
  live: "bg-emerald-50 text-emerald-800 border-emerald-200",
  discovery: "bg-sky-50 text-sky-800 border-sky-200",
  proposal: "bg-violet-50 text-violet-800 border-violet-200",
  negotiation: "bg-amber-50 text-amber-800 border-amber-200",
  closed_won: "bg-emerald-50 text-emerald-800 border-emerald-200",
  closed_lost: "bg-slate-100 text-slate-600 border-slate-200",
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-800 border-amber-200",
  low: "bg-slate-100 text-slate-600 border-slate-200",
  Admin: "bg-navy-700/10 text-navy-800 border-navy-700/20",
  Manager: "bg-electric-600/10 text-electric-700 border-electric-600/20",
  Rep: "bg-sky-50 text-sky-800 border-sky-200",
  Marketing: "bg-violet-50 text-violet-800 border-violet-200",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: string;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[0.72rem] font-semibold tracking-wide uppercase",
        tones[status] ?? "bg-slate-100 text-slate-600 border-slate-200",
        className
      )}
    >
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}
