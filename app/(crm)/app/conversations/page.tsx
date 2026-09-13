"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { useCrm } from "@/lib/crm/store";
import { formatRelative } from "@/lib/crm/selectors";
import { cn } from "@/lib/utils";
import { CrmButton } from "@/components/crm/crm-controls";

export default function ConversationsPage() {
  const { state, markConversationRead, replyToConversation } = useCrm();
  const [activeId, setActiveId] = React.useState(state.conversations[0]?.id ?? "");
  const [draft, setDraft] = React.useState("");
  const [replyError, setReplyError] = React.useState<string | null>(null);
  const [q, setQ] = React.useState("");
  const threads = state.conversations.filter((c) => {
    const hay = `${c.contactName} ${c.subject} ${c.channel}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });
  // Only the explicitly selected thread — never auto-fallback (avoids marking unread as read on search).
  const active = threads.find((c) => c.id === activeId);

  React.useEffect(() => {
    if (active?.unread) markConversationRead(active.id);
  }, [active?.id, active?.unread, markConversationRead]);

  React.useEffect(() => {
    setDraft("");
    setReplyError(null);
  }, [activeId]);

  function send() {
    if (!active) return;
    const result = replyToConversation(active.id, draft);
    if (!result.ok) {
      setReplyError(result.error);
      return;
    }
    setReplyError(null);
    setDraft("");
  }

  return (
    <div>
      <PageHeader title="Conversations" description="Mock email and SMS threads — reply persists in session." />
      <FilterBar value={q} onChange={setQ} placeholder="Search conversations…" />
      <div className="grid min-h-[420px] overflow-hidden rounded-xl border border-linelight bg-white lg:grid-cols-[280px_1fr]">
        <ul className="border-b border-linelight lg:max-h-[70vh] lg:overflow-y-auto lg:border-r lg:border-b-0">
          {threads.length === 0 ? (
            <li className="px-3.5 py-8 text-center text-[0.85rem] text-slateblue">
              No threads match. Clear search or try a contact name.
            </li>
          ) : (
            threads.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "min-h-14 w-full cursor-pointer border-b border-linelight px-3.5 py-3 text-left transition hover:bg-cloud focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-electric-600/15",
                    active?.id === c.id && "bg-electric-600/8"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[0.84rem] font-semibold text-ink">{c.contactName}</p>
                    {c.unread ? <span className="size-2 shrink-0 rounded-full bg-electric-600" /> : null}
                  </div>
                  <p className="mt-0.5 truncate text-[0.78rem] text-slateblue">{c.subject}</p>
                  <p className="mt-1 text-[0.7rem] text-slateblue">
                    {c.channel.toUpperCase()} · {formatRelative(c.updatedAt)}
                  </p>
                </button>
              </li>
            ))
          )}
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
                      m.direction === "outbound" ? "ml-auto bg-electric-600 text-white" : "bg-cloud text-ink"
                    )}
                  >
                    <p>{m.body}</p>
                    <p
                      className={cn(
                        "mt-1 text-[0.68rem]",
                        m.direction === "outbound" ? "text-white/70" : "text-slateblue"
                      )}
                    >
                      {formatRelative(m.at)}
                    </p>
                  </div>
                ))}
              </div>
              <form
                className="border-t border-linelight p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                noValidate
              >
                {replyError ? (
                  <p className="mb-2 text-[0.8rem] font-medium text-red-600" role="alert">
                    {replyError}
                  </p>
                ) : null}
                <div className="flex gap-2">
                  <label className="sr-only" htmlFor="reply">
                    Reply
                  </label>
                  <input
                    id="reply"
                    value={draft}
                    maxLength={2000}
                    aria-invalid={Boolean(replyError) || undefined}
                    aria-describedby={replyError ? "reply-error" : undefined}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      if (replyError) setReplyError(null);
                    }}
                    placeholder="Type a reply…"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-linelight px-3 text-[0.88rem] outline-none focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12 aria-[invalid=true]:border-red-400"
                  />
                  <CrmButton
                    type="submit"
                    className="border-electric-600/30 bg-electric-600 text-white hover:bg-electric-500"
                  >
                    Send
                  </CrmButton>
                </div>
                {replyError ? (
                  <span id="reply-error" className="sr-only">
                    {replyError}
                  </span>
                ) : null}
              </form>
            </>
          ) : (
            <p className="p-6 text-[0.88rem] text-slateblue">
              {threads.length === 0
                ? "No conversations match this search."
                : "Select a conversation from the list."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
