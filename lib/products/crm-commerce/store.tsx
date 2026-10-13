"use client";

/**
 * BITScrm Commerce & Billing — demo store.
 *
 * Supabase-free by design: state is in-memory and mirrored to localStorage.
 * All invoices, subscriptions and payment records are synthetic sample data.
 */

import * as React from "react";
import {
  Invoice,
  Subscription,
  InvoiceStatus,
  DunningStage,
  VAT_RATE,
} from "./types";

const STORAGE_KEY = "bits_commerce_billing_v1";

const seedInvoices: Invoice[] = [
  {
    id: "INV-2026-0418",
    customer: "Ana Villanueva",
    company: "Northwind Fintech",
    net: 480_000,
    vat: Math.round(480_000 * VAT_RATE),
    issuedOn: "2026-10-01",
    dueOn: "2026-10-15",
    status: "paid",
    method: "maya",
    dunningStage: 0,
  },
  {
    id: "INV-2026-0419",
    customer: "Jomar Reyes",
    company: "Sampaguita Retail Group",
    net: 125_000,
    vat: Math.round(125_000 * VAT_RATE),
    issuedOn: "2026-10-01",
    dueOn: "2026-10-15",
    status: "open",
    method: "bank_transfer",
    dunningStage: 0,
  },
  {
    id: "INV-2026-0402",
    customer: "Perf Alonzo",
    company: "Cordillera BPO",
    net: 890_000,
    vat: Math.round(890_000 * VAT_RATE),
    issuedOn: "2026-09-01",
    dueOn: "2026-09-15",
    status: "overdue",
    method: "card",
    dunningStage: 2,
  },
  {
    id: "INV-2026-0398",
    customer: "Grace Lim",
    company: "Mindanao Lending",
    net: 312_500,
    vat: Math.round(312_500 * VAT_RATE),
    issuedOn: "2026-09-01",
    dueOn: "2026-09-15",
    status: "paid",
    method: "cheque",
    dunningStage: 1,
  },
  {
    id: "INV-2026-0420",
    customer: "Rogelio Bautista",
    company: "Bicol Agri Co-op",
    net: 67_500,
    vat: Math.round(67_500 * VAT_RATE),
    issuedOn: "2026-10-05",
    dueOn: "2026-10-19",
    status: "draft",
    method: "maya",
    dunningStage: 0,
  },
  {
    id: "INV-2026-0405",
    customer: "Katrina Santos",
    company: "Metro Manila Clinics",
    net: 540_000,
    vat: Math.round(540_000 * VAT_RATE),
    issuedOn: "2026-09-01",
    dueOn: "2026-09-15",
    status: "overdue",
    method: "card",
    dunningStage: 3,
  },
  {
    id: "INV-2026-0411",
    customer: "Paolo Pineda",
    company: "Bangsamoro Logistics",
    net: 226_000,
    vat: Math.round(226_000 * VAT_RATE),
    issuedOn: "2026-10-02",
    dueOn: "2026-10-16",
    status: "open",
    method: "bank_transfer",
    dunningStage: 0,
  },
];

const seedSubscriptions: Subscription[] = [
  {
    id: "SUB-8801",
    company: "Northwind Fintech",
    plan: "Enterprise",
    seats: 180,
    mrr: 480_000,
    status: "active",
    renewsOn: "2026-11-01",
    since: "2023-04-12",
  },
  {
    id: "SUB-8802",
    company: "Cordillera BPO",
    plan: "Enterprise",
    seats: 320,
    mrr: 890_000,
    status: "past_due",
    renewsOn: "2026-10-01",
    since: "2022-09-30",
  },
  {
    id: "SUB-8803",
    company: "Sampaguita Retail Group",
    plan: "Growth",
    seats: 45,
    mrr: 125_000,
    status: "active",
    renewsOn: "2026-11-01",
    since: "2024-06-18",
  },
  {
    id: "SUB-8804",
    company: "Mindanao Lending",
    plan: "Growth",
    seats: 90,
    mrr: 312_500,
    status: "active",
    renewsOn: "2026-11-01",
    since: "2024-01-22",
  },
  {
    id: "SUB-8805",
    company: "Metro Manila Clinics",
    plan: "Growth",
    seats: 120,
    mrr: 540_000,
    status: "past_due",
    renewsOn: "2026-10-01",
    since: "2023-11-07",
  },
  {
    id: "SUB-8806",
    company: "Cebu Property Holdings",
    plan: "Starter",
    seats: 12,
    mrr: 42_000,
    status: "trialing",
    renewsOn: "2026-10-20",
    since: "2026-10-01",
  },
];

export interface CommerceState {
  invoices: Invoice[];
  subscriptions: Subscription[];
}

type CommerceAction =
  | { type: "setInvoiceStatus"; id: string; status: InvoiceStatus }
  | { type: "advanceDunning"; id: string }
  | { type: "recordPayment"; id: string }
  | { type: "cancelSubscription"; id: string }
  | { type: "hydrate"; state: CommerceState }
  | { type: "reset" };

function reducer(state: CommerceState, action: CommerceAction): CommerceState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setInvoiceStatus":
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === action.id
            ? {
                ...i,
                status: action.status,
                dunningStage: action.status === "paid" ? 0 : i.dunningStage,
              }
            : i
        ),
      };
    case "advanceDunning":
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === action.id && i.status !== "paid"
            ? {
                ...i,
                dunningStage: Math.min(3, i.dunningStage + 1) as DunningStage,
                status: i.dunningStage + 1 >= 1 ? "overdue" : i.status,
              }
            : i
        ),
      };
    case "recordPayment":
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === action.id ? { ...i, status: "paid", dunningStage: 0 } : i
        ),
        // Paying an overdue invoice clears the related past_due subscription.
        subscriptions: state.subscriptions.map((s) =>
          state.invoices.some((i) => i.id === action.id && i.company === s.company && s.status === "past_due")
            ? { ...s, status: "active" }
            : s
        ),
      };
    case "cancelSubscription":
      return {
        ...state,
        subscriptions: state.subscriptions.map((s) =>
          s.id === action.id ? { ...s, status: "cancelled" } : s
        ),
      };
    case "reset":
      return cloneSeed();
    default:
      return state;
  }
}

function cloneSeed(): CommerceState {
  return {
    invoices: seedInvoices.map((i) => ({ ...i })),
    subscriptions: seedSubscriptions.map((s) => ({ ...s })),
  };
}

interface CommerceContextValue extends CommerceState {
  setInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  advanceDunning: (id: string) => void;
  recordPayment: (id: string) => void;
  cancelSubscription: (id: string) => void;
  resetDemoData: () => void;
  invoiceById: (id: string) => Invoice | undefined;
}

const CommerceContext = React.createContext<CommerceContextValue | null>(null);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  // Hydration safety: render the seed on the server AND the first client
  // render, then swap in persisted state in an effect. Reading localStorage
  // during render causes React hydration mismatch (#418).
  const [state, dispatch] = React.useReducer(reducer, undefined, cloneSeed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CommerceState;
        if (parsed?.invoices?.length) dispatch({ type: "hydrate", state: parsed });
      }
    } catch {
      // Corrupt or unavailable storage — keep the seed.
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable — demo continues in memory.
    }
  }, [state, hydrated]);

  const value = React.useMemo<CommerceContextValue>(
    () => ({
      ...state,
      setInvoiceStatus: (id, status) => dispatch({ type: "setInvoiceStatus", id, status }),
      advanceDunning: (id) => dispatch({ type: "advanceDunning", id }),
      recordPayment: (id) => dispatch({ type: "recordPayment", id }),
      cancelSubscription: (id) => dispatch({ type: "cancelSubscription", id }),
      resetDemoData: () => dispatch({ type: "reset" }),
      invoiceById: (id) => state.invoices.find((i) => i.id === id),
    }),
    [state]
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce(): CommerceContextValue {
  const ctx = React.useContext(CommerceContext);
  if (!ctx) throw new Error("useCommerce must be used within CommerceProvider");
  return ctx;
}

export function commerceTotals(state: CommerceState) {
  const paid = state.invoices.filter((i) => i.status === "paid");
  const overdue = state.invoices.filter((i) => i.status === "overdue");
  const open = state.invoices.filter((i) => i.status === "open");

  const billed = state.invoices.reduce((s, i) => s + i.net + i.vat, 0);
  const collected = paid.reduce((s, i) => s + i.net + i.vat, 0);
  const outstanding = overdue
    .concat(open)
    .reduce((s, i) => s + i.net + i.vat, 0);

  const mrr = state.subscriptions
    .filter((s) => s.status === "active" || s.status === "past_due")
    .reduce((s, x) => s + x.mrr, 0);
  const seats = state.subscriptions
    .filter((s) => s.status !== "cancelled")
    .reduce((s, x) => s + x.seats, 0);

  return {
    billed,
    collected,
    outstanding,
    mrr,
    seats,
    overdueCount: overdue.length,
    collectionRatePct: billed === 0 ? 0 : (collected / billed) * 100,
    vatCollected: paid.reduce((s, i) => s + i.vat, 0),
  };
}