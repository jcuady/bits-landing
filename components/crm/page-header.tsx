import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <h1 className="text-[1.35rem] font-bold tracking-tight text-foreground dark:text-neutral-100 sm:text-[1.5rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-[0.85rem] text-muted-foreground leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
