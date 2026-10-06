import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1324]/60 px-6 py-14 text-center", className)}>
      <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-blue-400 mb-3">
        <Inbox className="size-6" aria-hidden />
      </div>
      <p className="text-[0.95rem] font-bold text-slate-900 dark:text-white">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
