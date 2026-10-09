"use client";

import * as React from "react";
import Link from "next/link";
import { useSupport } from "@/lib/products/crm-support/store";
import {
  slaState,
  slaRemaining,
  formatMinutes,
  SLA_TARGETS,
  PRIORITY_TONE,
  STATUS_TONE,
  type Ticket,
  type TicketReply,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/products/crm-support/types";
import { ArrowLeft, Send, UserCog, Tag, Clock } from "lucide-react";
import {
  PageHeader,
  Panel,
  PanelHeader,
  DemoButton,
  DemoField,
  DemoDataBanner,
  StatusPill,
  Meter,
  inputClass,
} from "@/components/products/demo-ui";

const AGENTS = ["Rafael Dizon", "Celine Yu", "Miguel Torres", "Unassigned"];
const STATUSES: TicketStatus[] = ["new", "open", "pending", "resolved"];
const PRIORITIES: TicketPriority[] = ["P1", "P2", "P3", "P4"];

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { ticketById, repliesFor, setTicketStatus, setTicketPriority, assignTicket, addReply } =
    useSupport();
  const [draft, setDraft] = React.useState("");

  return (
    <TicketDetailBody
      params={params}
      ticketById={ticketById}
      repliesFor={repliesFor}
      setTicketStatus={setTicketStatus}
      setTicketPriority={setTicketPriority}
      assignTicket={assignTicket}
      addReply={addReply}
      draft={draft}
      setDraft={setDraft}
    />
  );
}

type TicketDetailBodyProps = {
  params: Promise<{ id: string }>;
  ticketById: (id: string) => Ticket | undefined;
  repliesFor: (ticketId: string) => TicketReply[];
  setTicketStatus: (id: string, status: TicketStatus) => void;
  setTicketPriority: (id: string, priority: TicketPriority) => void;
  assignTicket: (id: string, assignee: string) => void;
  addReply: (ticketId: string, author: string, body: string) => void;
  draft: string;
  setDraft: (v: string) => void;
};

function TicketDetailBody({
  params,
  ticketById,
  repliesFor,
  setTicketStatus,
  setTicketPriority,
  assignTicket,
  addReply,
  draft,
  setDraft,
}: TicketDetailBodyProps) {
  const { id: ticketId } = React.use(params);
  const ticket = ticketById(ticketId);

  if (!ticket) {
    return (
      <div className="space-y-6">
        <PageHeader title="Ticket not found" description="This ticket does not exist in the demo dataset." />
        <Link href="/crm-support/tickets" className="text-sm text-sky-300 hover:text-white">
          ← Back to queue
        </Link>
      </div>
    );
  }

  const sla = slaState(ticket);
  const replies = repliesFor(ticket.id);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    addReply(ticket.id, ticket.assignee, body);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/crm-support/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Ticket queue
        </Link>
      </div>

      <PageHeader
        title={ticket.subject}
        description={`${ticket.id} · ${ticket.customer} at ${ticket.company}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone={PRIORITY_TONE[ticket.priority]}>{ticket.priority}</StatusPill>
            <StatusPill tone={STATUS_TONE[ticket.status]}>{ticket.status}</StatusPill>
            <StatusPill tone={sla === "breached" ? "danger" : sla === "at-risk" ? "warning" : "success"}>
              {formatMinutes(slaRemaining(ticket))}
            </StatusPill>
          </div>
        }
      />

      <DemoDataBanner note="synthetic ticket content for evaluation. Not a real customer conversation." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversation */}
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader title="Conversation" subtitle={`${replies.length} messages`} />
            <div className="space-y-4 p-5">
              <div className="rounded-xl border border-sky-400/15 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white">
                  {ticket.customer}{" "}
                  <span className="ml-1 font-normal text-sky-200/70">
                    via {ticket.channel} · {ticket.createdAt.slice(0, 16).replace("T", " ")}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sky-100">{ticket.body}</p>
              </div>

              {replies.map((r: any) => (
                <div
                  key={r.id}
                  className={`rounded-xl border p-4 ${
                    r.from === "agent"
                      ? "border-blue-400/25 bg-blue-500/10"
                      : "border-sky-400/15 bg-white/5"
                  }`}
                >
                  <p className="text-xs font-semibold text-white">
                    {r.author}
                    <span className="ml-1 font-normal text-sky-200/70">
                      {r.at.slice(0, 16).replace("T", " ")}
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sky-100">{r.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-sky-400/15 p-5">
              <DemoField label="Reply to customer">
                <textarea
                  aria-label="Reply to customer"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Write a response…"
                  className={`${inputClass} resize-y py-2.5`}
                />
              </DemoField>
              <DemoButton variant="primary" onClick={send} disabled={!draft.trim()}>
                <Send className="size-3.5" aria-hidden />
                Send reply
              </DemoButton>
            </div>
          </Panel>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="SLA Timer" icon={Clock} />
            <div className="space-y-4 p-5">
              <Meter
                label={`${ticket.priority} target · ${SLA_TARGETS[ticket.priority]}m`}
                value={ticket.slaElapsed}
                max={ticket.slaMinutes}
                tone={sla === "breached" ? "rose" : sla === "at-risk" ? "amber" : "emerald"}
              />
              <p className="text-xs text-sky-200/70">
                {formatMinutes(slaRemaining(ticket))} against a{" "}
                {ticket.slaMinutes / 60 < 24
                  ? `${ticket.slaMinutes / 60} hour`
                  : `${Math.round(ticket.slaMinutes / 1440)} day`}{" "}
                target.
              </p>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Manage" icon={UserCog} />
            <div className="space-y-5 p-5">
              <DemoField label="Status">
                <select
                  aria-label="Ticket status"
                  value={ticket.status}
                  onChange={(e) => setTicketStatus(ticket.id, e.target.value as TicketStatus)}
                  className={inputClass}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </DemoField>

              <DemoField label="Priority" hint="Changing priority recalculates the SLA target.">
                <select
                  aria-label="Ticket priority"
                  value={ticket.priority}
                  onChange={(e) => setTicketPriority(ticket.id, e.target.value as TicketPriority)}
                  className={inputClass}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p} · {SLA_TARGETS[p]}m target
                    </option>
                  ))}
                </select>
              </DemoField>

              <DemoField label="Assigned agent">
                <select
                  aria-label="Assigned agent"
                  value={ticket.assignee}
                  onChange={(e) => assignTicket(ticket.id, e.target.value)}
                  className={inputClass}
                >
                  {AGENTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </DemoField>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Tags" icon={Tag} />
            <div className="flex flex-wrap gap-1.5 p-5">
              {ticket.tags.map((t) => (
                <StatusPill key={t} tone="info">
                  {t}
                </StatusPill>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}