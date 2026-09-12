import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-linelight bg-white px-6 py-14 text-center", className)}>
      <Inbox className="mb-3 size-8 text-slateblue/50" aria-hidden />
      <p className="text-[0.95rem] font-semibold text-ink">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-[0.85rem] text-slateblue">{description}</p> : null}
    </div>
  );
}
