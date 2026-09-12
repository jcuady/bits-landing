import { formatRelative } from "@/lib/crm/selectors";
import type { Activity } from "@/lib/crm/types";

export function ActivityTimeline({ items }: { items: Activity[] }) {
  return (
    <ul className="space-y-0">
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
          {i < items.length - 1 ? (
            <span className="absolute top-3 left-[7px] h-[calc(100%-4px)] w-px bg-linelight" aria-hidden />
          ) : null}
          <span className="relative mt-1.5 size-[15px] shrink-0 rounded-full border-2 border-electric-600 bg-white" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-[0.88rem] leading-snug text-ink">{item.summary}</p>
            <p className="mt-0.5 text-[0.75rem] text-slateblue">
              {item.actor} · {formatRelative(item.at)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
