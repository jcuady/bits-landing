import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  new: "bg-sky-500/10 text-sky-700 border-sky-500/20 backdrop-blur-md dark:text-sky-300",
  working: "bg-amber-500/10 text-amber-700 border-amber-500/20 backdrop-blur-md dark:text-amber-400",
  qualified: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  disqualified: "bg-slate-500/10 text-slate-700 border-slate-500/20 backdrop-blur-md dark:text-slate-300",
  open: "bg-amber-500/10 text-amber-700 border-amber-500/20 backdrop-blur-md dark:text-amber-400",
  done: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  paused: "bg-amber-500/10 text-amber-700 border-amber-500/20 backdrop-blur-md dark:text-amber-400",
  draft: "bg-slate-500/10 text-slate-700 border-slate-500/20 backdrop-blur-md dark:text-slate-300",
  completed: "bg-sky-500/10 text-sky-700 border-sky-500/20 backdrop-blur-md dark:text-sky-300",
  published: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  live: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  discovery: "bg-sky-500/10 text-sky-700 border-sky-500/20 backdrop-blur-md dark:text-sky-300",
  proposal: "bg-violet-500/10 text-violet-700 border-violet-500/20 backdrop-blur-md dark:text-violet-300",
  negotiation: "bg-amber-500/10 text-amber-700 border-amber-500/20 backdrop-blur-md dark:text-amber-400",
  closed_won: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 backdrop-blur-md dark:text-emerald-400",
  closed_lost: "bg-slate-500/10 text-slate-700 border-slate-500/20 backdrop-blur-md dark:text-slate-300",
  high: "bg-rose-500/10 text-rose-700 border-rose-500/20 backdrop-blur-md dark:text-rose-400",
  medium: "bg-amber-500/10 text-amber-700 border-amber-500/20 backdrop-blur-md dark:text-amber-400",
  low: "bg-slate-500/10 text-slate-700 border-slate-500/20 backdrop-blur-md dark:text-slate-300",
  Admin: "bg-blue-500/10 text-blue-700 border-blue-500/20 backdrop-blur-md dark:text-blue-300",
  Manager: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20 backdrop-blur-md dark:text-indigo-300",
  Rep: "bg-sky-500/10 text-sky-700 border-sky-500/20 backdrop-blur-md dark:text-sky-300",
  Marketing: "bg-purple-500/10 text-purple-700 border-purple-500/20 backdrop-blur-md dark:text-purple-300",
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
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[0.72rem] font-semibold tracking-wide uppercase shadow-2xs",
        tones[status] ?? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
        className
      )}
    >
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}
