"use client";

/**
 * BITScrm Marketing Journeys — demo store.
 *
 * Supabase-free by design: state is in-memory and mirrored to localStorage.
 * All audiences and journeys are synthetic sample data.
 */

import * as React from "react";
import {
  Journey,
  Audience,
  JourneyStatus,
  JourneyStep,
  StepKind,
} from "./types";

const STORAGE_KEY = "bits_marketing_journeys_v1";

const seedJourneys: Journey[] = [
  {
    id: "JR-201",
    name: "New Lead Nurture — Fintech",
    status: "live",
    audience: "Webinar Registrants (Q4)",
    audienceSize: 4820,
    owner: "Aya Mendoza",
    enrolled: 3120,
    completed: 2760,
    converted: 412,
    revenue: 8_240_000,
    steps: [
      { id: "s1", kind: "trigger", subject: "Registrant joins webinar" },
      { id: "s2", kind: "message", delayMinutes: 0, channel: "email", subject: "Thanks for registering", body: "Your seat is confirmed. Add to calendar." },
      { id: "s3", kind: "wait", delayMinutes: 1440 },
      { id: "s4", kind: "branch", condition: "Opened the email?" },
      { id: "s5", kind: "message", delayMinutes: 0, channel: "viber", subject: "Reminder", body: "Your webinar starts in 24 hours." },
      { id: "s6", kind: "wait", delayMinutes: 4320 },
      { id: "s7", kind: "message", delayMinutes: 0, channel: "email", subject: "Recording + pricing", body: "Here is the replay and the full pricing sheet." },
    ],
  },
  {
    id: "JR-202",
    name: "Cart Abandonment — 3-Touch",
    status: "live",
    audience: "Checkout Abandoners (30d)",
    audienceSize: 1240,
    owner: "Marco Villanueva",
    enrolled: 1180,
    completed: 1042,
    converted: 386,
    revenue: 3_900_000,
    steps: [
      { id: "s1", kind: "trigger", subject: "Checkout abandoned" },
      { id: "s2", kind: "message", delayMinutes: 30, channel: "email", subject: "You left something behind", body: "Your cart is saved for 72 hours." },
      { id: "s3", kind: "wait", delayMinutes: 720 },
      { id: "s4", kind: "message", delayMinutes: 0, channel: "sms", subject: "Still interested?", body: "Reply YES for a 5% courtesy discount." },
      { id: "s5", kind: "wait", delayMinutes: 1440 },
      { id: "s6", kind: "message", delayMinutes: 0, channel: "viber", subject: "Last chance", body: "Your reserved stock expires tonight." },
    ],
  },
  {
    id: "JR-203",
    name: "Win-Back — Dormant 90 Days",
    status: "paused",
    audience: "Dormant High-Value (90d)",
    audienceSize: 860,
    owner: "Aya Mendoza",
    enrolled: 412,
    completed: 210,
    converted: 48,
    revenue: 1_180_000,
    steps: [
      { id: "s1", kind: "trigger", subject: "No activity for 90 days" },
      { id: "s2", kind: "message", delayMinutes: 0, channel: "email", subject: "We miss you", body: "Here is what changed since you last logged in." },
      { id: "s3", kind: "wait", delayMinutes: 2880 },
      { id: "s4", kind: "message", delayMinutes: 0, channel: "email", subject: "A personal offer", body: "Two months at 40% off." },
    ],
  },
  {
    id: "JR-204",
    name: "BIR Compliance Reminder",
    status: "draft",
    audience: "Accountant Contacts",
    audienceSize: 640,
    owner: "Marco Villanueva",
    enrolled: 0,
    completed: 0,
    converted: 0,
    revenue: 0,
    steps: [
      { id: "s1", kind: "trigger", subject: "Quarter end approaching" },
      { id: "s2", kind: "message", delayMinutes: 0, channel: "email", subject: "Filing checklist", body: "Your Q4 BIR filing checklist." },
    ],
  },
];

const seedAudiences: Audience[] = [
  { id: "AUD-1", name: "Webinar Registrants (Q4)", size: 4820, rule: "Registered for any Q4 webinar and not yet converted", growthThisWeek: 312 },
  { id: "AUD-2", name: "Checkout Abandoners (30d)", size: 1240, rule: "Started checkout, did not complete, within 30 days", growthThisWeek: -48 },
  { id: "AUD-3", name: "Dormant High-Value (90d)", size: 860, rule: "ARR > ₱250K AND last login > 90 days", growthThisWeek: -12 },
  { id: "AUD-4", name: "Accountant Contacts", size: 640, rule: "Role contains 'accounting' or 'finance'", growthThisWeek: 24 },
  { id: "AUD-5", name: "BPO Operators — Metro Manila", size: 2310, rule: "Company industry = BPO AND city = Metro Manila", growthThisWeek: 96 },
];

export interface MarketingState {
  journeys: Journey[];
  audiences: Audience[];
}

type MarketingAction =
  | { type: "setStatus"; id: string; status: JourneyStatus }
  | { type: "toggleJourney"; id: string }
  | { type: "addStep"; journeyId: string; step: JourneyStep }
  | { type: "removeStep"; journeyId: string; stepId: string }
  | { type: "updateStep"; journeyId: string; stepId: string; patch: Partial<JourneyStep> }
  | { type: "enroll"; journeyId: string }
  | { type: "hydrate"; state: MarketingState }
  | { type: "reset" };

function reducer(state: MarketingState, action: MarketingAction): MarketingState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setStatus":
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === action.id ? { ...j, status: action.status } : j
        ),
      };
    case "toggleJourney":
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== action.id) return j;
          const next = j.status === "live" ? "paused" : "live";
          const enrolled = next === "live" ? Math.min(j.audienceSize, j.enrolled + 150) : j.enrolled;
          return { ...j, status: next, enrolled };
        }),
      };
    case "addStep":
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === action.journeyId ? { ...j, steps: [...j.steps, action.step] } : j
        ),
      };
    case "removeStep":
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === action.journeyId
            ? { ...j, steps: j.steps.filter((s) => s.id !== action.stepId) }
            : j
        ),
      };
    case "updateStep":
      return {
        ...state,
        journeys: state.journeys.map((j) =>
          j.id === action.journeyId
            ? {
                ...j,
                steps: j.steps.map((s) => (s.id === action.stepId ? { ...s, ...action.patch } : s)),
              }
            : j
        ),
      };
    case "enroll":
      return {
        ...state,
        journeys: state.journeys.map((j) => {
          if (j.id !== action.journeyId || j.status !== "live") return j;
          const enrolled = Math.min(j.audienceSize, j.enrolled + 150);
          const completed = Math.min(enrolled, j.completed + 110);
          const converted = Math.min(completed, j.converted + 14);
          return { ...j, enrolled, completed, converted };
        }),
      };
    case "reset":
      return cloneSeed();
    default:
      return state;
  }
}

function cloneSeed(): MarketingState {
  return {
    journeys: seedJourneys.map((j) => ({ ...j, steps: j.steps.map((s) => ({ ...s })) })),
    audiences: seedAudiences.map((a) => ({ ...a })),
  };
}

interface MarketingContextValue extends MarketingState {
  setJourneyStatus: (id: string, status: JourneyStatus) => void;
  toggleJourney: (id: string) => void;
  addStep: (journeyId: string, kind: StepKind) => void;
  removeStep: (journeyId: string, stepId: string) => void;
  updateStep: (journeyId: string, stepId: string, patch: Partial<JourneyStep>) => void;
  enrollBatch: (journeyId: string) => void;
  resetDemoData: () => void;
  journeyById: (id: string) => Journey | undefined;
}

const MarketingContext = React.createContext<MarketingContextValue | null>(null);

export function MarketingProvider({ children }: { children: React.ReactNode }) {
  // Hydration safety: render the seed on the server AND the first client
  // render, then swap in persisted state in an effect. Reading localStorage
  // during render causes React hydration mismatch (#418).
  const [state, dispatch] = React.useReducer(reducer, undefined, cloneSeed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as MarketingState;
        if (parsed?.journeys?.length) dispatch({ type: "hydrate", state: parsed });
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

  const value = React.useMemo<MarketingContextValue>(
    () => ({
      ...state,
      setJourneyStatus: (id, status) => dispatch({ type: "setStatus", id, status }),
      toggleJourney: (id) => dispatch({ type: "toggleJourney", id }),
      addStep: (journeyId, kind) =>
        dispatch({
          type: "addStep",
          journeyId,
          step: {
            id: `s-${Date.now()}`,
            kind,
            ...(kind === "message" ? { channel: "email" as const, subject: "New message", body: "" } : {}),
            ...(kind === "wait" ? { delayMinutes: 1440 } : {}),
            ...(kind === "branch" ? { condition: "Opened the message?" } : {}),
            ...(kind === "trigger" ? { subject: "New trigger" } : {}),
          },
        }),
      removeStep: (journeyId, stepId) => dispatch({ type: "removeStep", journeyId, stepId }),
      updateStep: (journeyId, stepId, patch) =>
        dispatch({ type: "updateStep", journeyId, stepId, patch }),
      enrollBatch: (journeyId) => dispatch({ type: "enroll", journeyId }),
      resetDemoData: () => dispatch({ type: "reset" }),
      journeyById: (id) => state.journeys.find((j) => j.id === id),
    }),
    [state]
  );

  return <MarketingContext.Provider value={value}>{children}</MarketingContext.Provider>;
}

export function useMarketing(): MarketingContextValue {
  const ctx = React.useContext(MarketingContext);
  if (!ctx) throw new Error("useMarketing must be used within MarketingProvider");
  return ctx;
}

export function marketingTotals(state: MarketingState) {
  const live = state.journeys.filter((j) => j.status === "live");
  const enrolled = live.reduce((s, j) => s + j.enrolled, 0);
  const converted = live.reduce((s, j) => s + j.converted, 0);
  const revenue = state.journeys.reduce((s, j) => s + j.revenue, 0);
  return {
    liveCount: live.length,
    enrolled,
    converted,
    revenue,
    conversionPct: enrolled === 0 ? 0 : (converted / enrolled) * 100,
  };
}