"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { useCrm } from "@/lib/crm/store";
import { formatRelative } from "@/lib/crm/selectors";
import { cn } from "@/lib/utils";

export default function ConversationsPage() {
  const { state, markConversationRead } = useCrm();
  const [activeId, setActiveId] = React.useState(state.conversations[0]?.id ?? "");
  const active = state.conversations.find((c) => c.id === activeId) ?? state.conversations[0];

  React.useEffect(() => {
    if (active?.unread) markConversationRead(active.id);
  }, [active?.id, active?.unread, markConversationRead]);

  return (
    <div>
      <PageHeader title="Conversations" description="Mock email and SMS threads." />
      <div className="grid min-h-[420px] overflow-hidden rounded-xl border border-linelight bg-white lg:grid-cols-[280px_1fr]">
        <ul className="border-b border-linelight lg:border-r lg:border-b-0">
          {state.conversations.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "w-full border-b border-linelight px-3.5 py-3 text-left transition hover:bg-cloud",
                  active?.id === c.id && "bg-electric-600/8"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[0.84rem] font-semibold text-ink">{c.contactName}</p>
                  {c.unread ? <span className="size-2 shrink-0 rounded-full bg-electric-600" /> : null}
                </div>
                <p className="mt-0.5 truncate text-[0.78rem] text-slateblue">{c.subject}</p>
                <p className="mt-1 text-[0.7rem] text-slateblue">{c.channel.toUpperCase()} · {formatRelative(c.updatedAt)}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex min-h-[320px] flex-col">
          {active ? (
            <>
              <div className="border-b border-linelight px-4 py-3">
                <p className="text-[0.95rem] font-semibold text-ink">{active.subject}</p>
                <p className="text-[0.78rem] text-slateblue">
                  {active.contactName} · {active.contactEmail}
                </p>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {active.messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "max-w-[85%] rounded-xl px-3.5 py-2.5 text-[0.86rem] leading-relaxed",
                      m.direction === "outbound"
                        ? "ml-auto bg-electric-600 text-white"
                        : "bg-cloud text-ink"
                    )}
                  >
                    <p>{m.body}</p>
                    <p className={cn("mt-1 text-[0.68rem]", m.direction === "outbound" ? "text-white/70" : "text-slateblue")}>
                      {formatRelative(m.at)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="p-6 text-slateblue">No conversations.</p>
          )}
        </div>
      </div>
    </div>
  );
}
