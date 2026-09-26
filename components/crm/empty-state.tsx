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
    <div className={cn("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 dark:border-neutral-800 dark:bg-neutral-900/40 px-6 py-14 text-center", className)}>
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted dark:bg-neutral-800 mb-3">
        <Inbox className="size-6 text-muted-foreground" aria-hidden />
      </div>
      <p className="text-[0.95rem] font-bold text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
