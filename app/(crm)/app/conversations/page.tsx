"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { useCrm } from "@/lib/crm/store";
import { formatRelative } from "@/lib/crm/selectors";
import { cn } from "@/lib/utils";
import { CrmButton } from "@/components/crm/crm-controls";
import { useToast } from "@/components/crm/crm-toast";
import { Send, Mail, MessageSquare, PhoneCall } from "lucide-react";

export default function ConversationsPage() {
  const { state, markConversationRead, replyToConversation } = useCrm();
  const { showToast } = useToast();
  const [activeId, setActiveId] = React.useState(state.conversations[0]?.id ?? "");
  const [draft, setDraft] = React.useState("");
  const [replyError, setReplyError] = React.useState<string | null>(null);
  const [q, setQ] = React.useState("");

  const threads = state.conversations.filter((c) => {
    const hay = `${c.contactName} ${c.subject} ${c.channel}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

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
    if (!draft.trim()) {
      setReplyError("Message cannot be empty.");
      return;
    }
    const result = replyToConversation(active.id, draft.trim());
    if (!result.ok) {
      setReplyError(result.error);
      return;
    }
    showToast(`Reply sent to ${active.contactName}.`);
    setReplyError(null);
    setDraft("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Omnichannel Conversations"
        description="Unified email, SMS, and WhatsApp thread inbox for enterprise clients."
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search conversations by contact, subject, or channel…" />

      <div className="grid min-h-[480px] overflow-hidden rounded-xl border border-border bg-card shadow-sm dark:border-neutral-800 dark:bg-[#141414] lg:grid-cols-[300px_1fr]">
        {/* Thread Sidebar */}
        <ul className="divide-y divide-border border-b border-border dark:divide-neutral-800 dark:border-neutral-800 lg:max-h-[70vh] lg:overflow-y-auto lg:border-r lg:border-b-0">
          {threads.length === 0 ? (
            <li className="px-4 py-8 text-center text-xs text-muted-foreground dark:text-neutral-400">
              No threads match this search query.
            </li>
          ) : (
            threads.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "w-full cursor-pointer px-4 py-3.5 text-left transition-colors hover:bg-muted/40 dark:hover:bg-neutral-800/40",
                    active?.id === c.id
                      ? "bg-electric-600/10 dark:bg-electric-500/15"
                      : "bg-transparent"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-foreground dark:text-neutral-100">
                      {c.contactName}
                    </p>
                    {c.unread ? (
                      <span className="size-2 shrink-0 rounded-full bg-electric-600" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground dark:text-neutral-400">
                    {c.subject}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-[0.68rem] text-muted-foreground dark:text-neutral-500">
                    {c.channel === "email" ? (
                      <Mail className="size-3" />
                    ) : c.channel === "sms" ? (
                      <MessageSquare className="size-3" />
                    ) : (
                      <PhoneCall className="size-3" />
                    )}
                    <span className="uppercase tracking-wider font-semibold">
                      {c.channel}
                    </span>
                    <span>·</span>
                    <span>{formatRelative(c.updatedAt)}</span>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Message Thread Area */}
        <div className="flex min-h-[360px] flex-col">
          {active ? (
            <>
              {/* Thread Header */}
              <div className="border-b border-border px-5 py-3.5 dark:border-neutral-800">
                <p className="text-sm font-semibold text-foreground dark:text-neutral-100">
                  {active.subject}
                </p>
                <p className="text-xs text-muted-foreground dark:text-neutral-400">
                  {active.contactName} · {active.contactEmail}
                </p>
              </div>

              {/* Messages Body */}
              <div className="flex-1 space-y-3.5 overflow-y-auto p-5">
                {active.messages.map((m) => {
                  const isOutbound = m.direction === "outbound";
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs",
                        isOutbound
                          ? "ml-auto bg-electric-600 text-white rounded-br-xs"
                          : "bg-muted text-foreground dark:bg-neutral-800 dark:text-neutral-100 rounded-bl-xs"
                      )}
                    >
                      <p>{m.body}</p>
                      <p
                        className={cn(
                          "mt-1 text-[0.68rem]",
                          isOutbound
                            ? "text-white/70"
                            : "text-muted-foreground dark:text-neutral-400"
                        )}
                      >
                        {formatRelative(m.at)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <form
                className="border-t border-border p-4 dark:border-neutral-800"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                noValidate
              >
                {replyError ? (
                  <p className="mb-2 text-xs font-medium text-rose-500" role="alert">
                    {replyError}
                  </p>
                ) : null}
                <div className="flex gap-2">
                  <label className="sr-only" htmlFor="reply">
                    Type response
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
                    placeholder="Type an omnichannel reply…"
                    className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-electric-600 focus:ring-2 focus:ring-electric-600/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                  />
                  <CrmButton
                    type="submit"
                    variant="primary"
                    className="flex items-center gap-1.5"
                  >
                    <Send className="size-3.5" />
                    Send
                  </CrmButton>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-muted-foreground dark:text-neutral-400">
              {threads.length === 0
                ? "No conversations match this query."
                : "Select a conversation from the sidebar to inspect or reply."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
