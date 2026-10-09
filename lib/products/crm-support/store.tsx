"use client";

/**
 * BITScrm Support Desk — demo store.
 *
 * Supabase-free by design. State lives in memory and is persisted to
 * localStorage under a versioned key so the sandbox survives a refresh.
 * Every record is synthetic sample data.
 */

import * as React from "react";
import {
  Ticket,
  TicketReply,
  TicketPriority,
  TicketStatus,
  SLA_TARGETS,
  slaState,
} from "./types";

const STORAGE_KEY = "bits_support_desk_v1";

const seedTickets: Ticket[] = [
  {
    id: "TKT-1041",
    subject: "Dailed batch fails validation on 3 accounts",
    customer: "Ana Villanueva",
    company: "Northwind Fintech",
    channel: "email",
    priority: "P1",
    status: "open",
    assignee: "Rafael Dizon",
    createdAt: "2026-10-07T08:15:00+08:00",
    slaMinutes: SLA_TARGETS.P1,
    slaElapsed: 78,
    tags: ["dialer", "batch", "production"],
    body: "Our overnight batch import rejects 3 accounts with a validation error. The other 1,197 succeed. Screenshot attached in the email thread.",
  },
  {
    id: "TKT-1042",
    subject: "Request: add BIR-compliant receipt export",
    customer: "Jomar Reyes",
    company: "Sampaguita Retail Group",
    channel: "web",
    priority: "P3",
    status: "open",
    assignee: "Celine Yu",
    createdAt: "2026-10-06T14:40:00+08:00",
    slaMinutes: SLA_TARGETS.P3,
    slaElapsed: 900,
    tags: ["billing", "feature-request"],
    body: "We need receipts in a format our accountant accepts for BIR filing. CSV is fine as long as the TIN and permit numbers are included.",
  },
  {
    id: "TKT-1043",
    subject: "Agent cannot see assigned accounts after role change",
    customer: "Perf Alonzo",
    company: "Cordillera BPO",
    channel: "sms",
    priority: "P2",
    status: "pending",
    assignee: "Rafael Dizon",
    createdAt: "2026-10-06T09:05:00+08:00",
    slaMinutes: SLA_TARGETS.P2,
    slaElapsed: 300,
    tags: ["permissions", "roles"],
    body: "Promoted two agents to Team Lead this morning. They lost visibility of their own accounts and now see an empty queue.",
  },
  {
    id: "TKT-1044",
    subject: "Softphone audio drops on outbound call",
    customer: "Grace Lim",
    company: "Mindanao Lending",
    channel: "phone",
    priority: "P2",
    status: "open",
    assignee: "Miguel Torres",
    createdAt: "2026-10-05T16:20:00+08:00",
    slaMinutes: SLA_TARGETS.P2,
    slaElapsed: 120,
    tags: ["softphone", "webrtc"],
    body: "Calls connect but audio cuts after roughly 90 seconds. Inbound is fine. Using Chrome 141 on Windows 11.",
  },
  {
    id: "TKT-1045",
    subject: "How do I import our existing customer list?",
    customer: "Dina Mercado",
    company: "Cebu Property Holdings",
    channel: "web",
    priority: "P4",
    status: "resolved",
    assignee: "Celine Yu",
    createdAt: "2026-10-04T11:00:00+08:00",
    slaMinutes: SLA_TARGETS.P4,
    slaElapsed: 240,
    csat: 5,
    tags: ["onboarding", "import"],
    body: "We have about 12,000 contacts in our old system. Is there a CSV import?",
  },
  {
    id: "TKT-1046",
    subject: "Payment declined but invoice still marked unpaid",
    customer: "Rogelio Bautista",
    company: "Bicol Agri Co-op",
    channel: "email",
    priority: "P1",
    status: "new",
    assignee: "Unassigned",
    createdAt: "2026-10-07T09:55:00+08:00",
    slaMinutes: SLA_TARGETS.P1,
    slaElapsed: 25,
    tags: ["billing", "gateway", "critical"],
    body: "Card was charged successfully but the dashboard still shows the invoice as overdue. Reconciliation looks wrong.",
  },
  {
    id: "TKT-1047",
    subject: "Viber template not sending to PH numbers",
    customer: "Katrina Santos",
    company: "Metro Manila Clinics",
    channel: "viber",
    priority: "P2",
    status: "open",
    assignee: "Miguel Torres",
    createdAt: "2026-10-05T10:10:00+08:00",
    slaMinutes: SLA_TARGETS.P2,
    slaElapsed: 200,
    tags: ["viber", "templates"],
    body: "Email sends fine but the Viber step silently fails. No error in the activity log.",
  },
  {
    id: "TKT-1048",
    subject: "Request API access for nightly account sync",
    customer: "Paolo Pineda",
    company: "Bangsamoro Logistics",
    channel: "email",
    priority: "P3",
    status: "pending",
    assignee: "Rafael Dizon",
    createdAt: "2026-10-03T13:45:00+08:00",
    slaMinutes: SLA_TARGETS.P3,
    slaElapsed: 1500,
    tags: ["api", "integration"],
    body: "We sync accounts from our TMS every night. What rate limits apply to the API?",
  },
];

const seedReplies: TicketReply[] = [
  {
    id: "R-1",
    ticketId: "TKT-1041",
    author: "Rafael Dizon",
    from: "agent",
    body: "Thanks Ana — I can reproduce this. It is the accounts with compound tags in the payload. Escalating to engineering as P1.",
    at: "2026-10-07T08:42:00+08:00",
  },
  {
    id: "R-2",
    ticketId: "TKT-1041",
    author: "Ana Villanueva",
    from: "customer",
    body: "Confirmed, all 3 failing accounts have a tag with an ampersand. That must be the trigger.",
    at: "2026-10-07T09:05:00+08:00",
  },
  {
    id: "R-3",
    ticketId: "TKT-1045",
    author: "Celine Yu",
    from: "agent",
    body: "Yes — Settings → Data Import accepts CSV with name, email, phone. I can also send a template file if helpful.",
    at: "2026-10-04T11:40:00+08:00",
  },
  {
    id: "R-4",
    ticketId: "TKT-1045",
    author: "Dina Mercado",
    from: "customer",
    body: "Perfect, that worked. Thank you!",
    at: "2026-10-04T13:15:00+08:00",
  },
];

export interface SupportState {
  tickets: Ticket[];
  replies: TicketReply[];
}

type SupportAction =
  | { type: "setStatus"; id: string; status: TicketStatus }
  | { type: "setPriority"; id: string; priority: TicketPriority }
  | { type: "assign"; id: string; assignee: string }
  | { type: "addReply"; reply: TicketReply }
  | { type: "advanceSla"; minutes: number }
  | { type: "hydrate"; state: SupportState }
  | { type: "reset" };

function reducer(state: SupportState, action: SupportAction): SupportState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setStatus":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.id
            ? {
                ...t,
                status: action.status,
                csat: action.status === "resolved" ? (t.csat ?? 5) : t.csat,
              }
            : t
        ),
      };
    case "setPriority": {
      const tickets = state.tickets.map((t) =>
        t.id === action.id
          ? { ...t, priority: action.priority, slaMinutes: SLA_TARGETS[action.priority] }
          : t
      );
      return { ...state, tickets };
    }
    case "assign":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.id ? { ...t, assignee: action.assignee } : t
        ),
      };
    case "addReply":
      return { ...state, replies: [...state.replies, action.reply] };
    case "advanceSla":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.status === "resolved"
            ? t
            : { ...t, slaElapsed: t.slaElapsed + action.minutes }
        ),
      };
    case "reset":
      return { tickets: seedTickets, replies: seedReplies };
    default:
      return state;
  }
}

function cloneSeed(): SupportState {
  return { tickets: seedTickets.map((t) => ({ ...t })), replies: seedReplies.map((r) => ({ ...r })) };
}

/**
 * Read persisted state after hydration and dispatch it into the reducer.
 * Safe to call only from an effect — never during render.
 */
function setStateFromStorage(dispatch: React.Dispatch<SupportAction>) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as SupportState;
    if (!parsed?.tickets?.length) return;
    dispatch({ type: "hydrate", state: parsed });
  } catch {
    // Corrupt or unavailable storage — keep the seed.
  }
}

interface SupportContextValue extends SupportState {
  setTicketStatus: (id: string, status: TicketStatus) => void;
  setTicketPriority: (id: string, priority: TicketPriority) => void;
  assignTicket: (id: string, assignee: string) => void;
  addReply: (ticketId: string, author: string, body: string) => void;
  advanceSla: (minutes: number) => void;
  resetDemoData: () => void;
  ticketById: (id: string) => Ticket | undefined;
  repliesFor: (ticketId: string) => TicketReply[];
}

const SupportContext = React.createContext<SupportContextValue | null>(null);

export function SupportProvider({ children }: { children: React.ReactNode }) {
  /**
   * Hydration safety.
   *
   * The server has no localStorage, so it always renders the seed data while
   * the client may hold persisted state. Reading storage during the first
   * render therefore produces different markup on server vs client and React
   * throws a hydration mismatch (error #418).
   *
   * Fix: always render the seed on the first client render, then swap in the
   * persisted state inside an effect once the tree has hydrated.
   */
  const [state, dispatch] = React.useReducer(reducer, undefined, cloneSeed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setStateFromStorage(dispatch);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    // Only persist after hydration, otherwise the seed would immediately
    // overwrite whatever the returning visitor had saved.
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode / quota) — demo still works in memory.
    }
  }, [state, hydrated]);

  const value = React.useMemo<SupportContextValue>(
    () => ({
      ...state,
      setTicketStatus: (id, status) => dispatch({ type: "setStatus", id, status }),
      setTicketPriority: (id, priority) => dispatch({ type: "setPriority", id, priority }),
      assignTicket: (id, assignee) => dispatch({ type: "assign", id, assignee }),
      addReply: (ticketId, author, body) =>
        dispatch({
          type: "addReply",
          reply: {
            id: `R-${Date.now()}`,
            ticketId,
            author,
            from: "agent",
            body,
            at: new Date().toISOString(),
          },
        }),
      advanceSla: (minutes) => dispatch({ type: "advanceSla", minutes }),
      resetDemoData: () => dispatch({ type: "reset" }),
      ticketById: (id) => state.tickets.find((t) => t.id === id),
      repliesFor: (ticketId) =>
        state.replies.filter((r) => r.ticketId === ticketId).sort((a, b) => a.at.localeCompare(b.at)),
    }),
    [state]
  );

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
}

export function useSupport(): SupportContextValue {
  const ctx = React.useContext(SupportContext);
  if (!ctx) throw new Error("useSupport must be used within SupportProvider");
  return ctx;
}

/** Derived SLA/CSAT metrics used by the dashboard. */
export function supportMetrics(state: SupportState) {
  const open = state.tickets.filter((t) => t.status !== "resolved");
  const breached = state.tickets.filter((t) => slaState(t) === "breached");
  const atRisk = state.tickets.filter((t) => slaState(t) === "at-risk");
  const rated = state.tickets.filter((t) => typeof t.csat === "number");
  const csat = rated.length
    ? rated.reduce((sum, t) => sum + (t.csat ?? 0), 0) / rated.length
    : 0;

  return {
    openCount: open.length,
    breachedCount: breached.length,
    atRiskCount: atRisk.length,
    csat,
    resolvedCount: state.tickets.length - open.length,
    compliancePct:
      state.tickets.length === 0
        ? 100
        : ((state.tickets.length - breached.length) / state.tickets.length) * 100,
  };
}