/**
 * BITScrm Support Desk — demo domain types.
 * Supabase-free: all state is client-side and seeded with synthetic records.
 */

export type TicketPriority = "P1" | "P2" | "P3" | "P4";
export type TicketStatus = "new" | "open" | "pending" | "resolved";
export type TicketChannel = "email" | "sms" | "viber" | "web" | "phone";

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  company: string;
  channel: TicketChannel;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  createdAt: string;
  /** SLA target in minutes from creation. */
  slaMinutes: number;
  /** Minutes already consumed against the SLA target. */
  slaElapsed: number;
  csat?: number;
  tags: string[];
  body: string;
}

export interface TicketReply {
  id: string;
  ticketId: string;
  author: string;
  from: "agent" | "customer";
  body: string;
  at: string;
}

export const SLA_TARGETS: Record<TicketPriority, number> = {
  P1: 60,
  P2: 240,
  P3: 1440,
  P4: 4320,
};

export function slaRemaining(ticket: Ticket): number {
  return ticket.slaMinutes - ticket.slaElapsed;
}

export function slaState(ticket: Ticket): "breached" | "at-risk" | "ok" {
  const left = slaRemaining(ticket);
  if (left <= 0) return "breached";
  if (left <= ticket.slaMinutes * 0.25) return "at-risk";
  return "ok";
}

export const PRIORITY_TONE: Record<TicketPriority, "danger" | "warning" | "info" | "neutral"> = {
  P1: "danger",
  P2: "warning",
  P3: "info",
  P4: "neutral",
};

export const STATUS_TONE: Record<TicketStatus, "info" | "sky" | "warning" | "success"> = {
  new: "info",
  open: "sky",
  pending: "warning",
  resolved: "success",
};

export function formatMinutes(m: number): string {
  if (m <= 0) return `${Math.abs(m)}m over`;
  if (m < 60) return `${m}m left`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem === 0 ? `${h}h left` : `${h}h ${rem}m left`;
}