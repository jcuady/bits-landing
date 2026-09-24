"use client";

import * as React from "react";
import { seedCrmState } from "./mock-data";
import { MOCK_NOW } from "./selectors";
import type {
  AutomationStatus,
  CampaignStatus,
  CrmState,
  LeadStatus,
  OpportunityStage,
  TaskStatus,
} from "./types";
import {
  automationStatusSchema,
  campaignStatusSchema,
  displayNameSchema,
  formStatusSchema,
  leadStatusSchema,
  opportunityStageSchema,
  replyBodySchema,
  taskStatusSchema,
} from "./validation";

export type CrmRole = "Admin" | "Manager" | "Rep" | "Marketing";

type CrmStore = {
  state: CrmState;
  userEmail: string;
  displayName: string;
  setDisplayName: (name: string) => { ok: true } | { ok: false; error: string };
  updateLeadStatus: (id: string, status: LeadStatus) => boolean;
  moveOpportunity: (id: string, stage: OpportunityStage) => boolean;
  setTaskStatus: (id: string, status: TaskStatus) => boolean;
  setCampaignStatus: (id: string, status: CampaignStatus) => boolean;
  setAutomationStatus: (id: string, status: AutomationStatus) => boolean;
  setFormStatus: (id: string, status: "published" | "draft") => boolean;
  markConversationRead: (id: string) => void;
  replyToConversation: (id: string, body: string) => { ok: true } | { ok: false; error: string };
};

const CrmContext = React.createContext<CrmStore | null>(null);

function cloneSeed(): CrmState {
  return structuredClone(seedCrmState());
}

function mockIso() {
  return MOCK_NOW.toISOString();
}

function activityId() {
  return `ac-${MOCK_NOW.getTime()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function CrmProvider({
  children,
  initialName,
  userEmail,
}: {
  children: React.ReactNode;
  initialName: string;
  userEmail: string;
}) {
  const [state, setState] = React.useState<CrmState>(cloneSeed);
  const [displayName, setDisplayNameState] = React.useState(initialName);

  // Sync latest inbound website form submissions from server
  React.useEffect(() => {
    fetch("/api/crm/leads")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.mapped) {
          setState((curr) => {
            const currentLeadIds = new Set(curr.leads.map((l) => l.id));
            const newLeads = res.mapped.leads.filter((l: any) => !currentLeadIds.has(l.id));
            if (!newLeads || newLeads.length === 0) return curr;

            const currentCompanyIds = new Set(curr.companies.map((c) => c.id));
            const newCompanies = res.mapped.companies.filter((c: any) => !currentCompanyIds.has(c.id));

            const currentOppIds = new Set(curr.opportunities.map((o) => o.id));
            const newOpps = res.mapped.opportunities.filter((o: any) => !currentOppIds.has(o.id));

            return {
              ...curr,
              leads: [...newLeads, ...curr.leads],
              companies: [...newCompanies, ...curr.companies],
              opportunities: [...newOpps, ...curr.opportunities],
            };
          });
        }
      })
      .catch(() => {});
  }, []);

  const setDisplayName = React.useCallback((name: string) => {
    const parsed = displayNameSchema.safeParse(name);
    if (!parsed.success) {
      return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid name." };
    }
    setDisplayNameState(parsed.data);
    return { ok: true as const };
  }, []);

  const updateLeadStatus = React.useCallback((id: string, status: LeadStatus) => {
    if (!leadStatusSchema.safeParse(status).success) return false;
    let applied = false;
    const at = mockIso();
    setState((s) => {
      const lead = s.leads.find((l) => l.id === id);
      if (!lead) return s;
      applied = true;
      return {
        ...s,
        leads: s.leads.map((l) => (l.id === id ? { ...l, status, lastActivityAt: at } : l)),
        activities: [
          {
            id: activityId(),
            type: "stage" as const,
            summary: `${lead.name} status → ${status}`,
            actor: "You",
            at,
          },
          ...s.activities,
        ],
      };
    });
    return applied;
  }, []);

  const moveOpportunity = React.useCallback((id: string, stage: OpportunityStage) => {
    if (!opportunityStageSchema.safeParse(stage).success) return false;
    let applied = false;
    const at = mockIso();
    setState((s) => {
      const opp = s.opportunities.find((o) => o.id === id);
      if (!opp) return s;
      applied = true;
      return {
        ...s,
        opportunities: s.opportunities.map((o) =>
          o.id === id
            ? {
                ...o,
                stage,
                probability:
                  stage === "closed_won" ? 100 : stage === "closed_lost" ? 0 : o.probability,
                stalledDays: undefined,
              }
            : o
        ),
        activities: [
          {
            id: activityId(),
            type: "stage" as const,
            summary: `${opp.name} → ${stage.replaceAll("_", " ")}`,
            actor: "You",
            at,
          },
          ...s.activities,
        ],
      };
    });
    return applied;
  }, []);

  const setTaskStatus = React.useCallback((id: string, status: TaskStatus) => {
    if (!taskStatusSchema.safeParse(status).success) return false;
    let applied = false;
    setState((s) => {
      if (!s.tasks.some((t) => t.id === id)) return s;
      applied = true;
      return { ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) };
    });
    return applied;
  }, []);

  const setCampaignStatus = React.useCallback((id: string, status: CampaignStatus) => {
    if (!campaignStatusSchema.safeParse(status).success) return false;
    let applied = false;
    setState((s) => {
      if (!s.campaigns.some((c) => c.id === id)) return s;
      applied = true;
      return { ...s, campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, status } : c)) };
    });
    return applied;
  }, []);

  const setAutomationStatus = React.useCallback((id: string, status: AutomationStatus) => {
    if (!automationStatusSchema.safeParse(status).success) return false;
    let applied = false;
    setState((s) => {
      if (!s.automations.some((a) => a.id === id)) return s;
      applied = true;
      return { ...s, automations: s.automations.map((a) => (a.id === id ? { ...a, status } : a)) };
    });
    return applied;
  }, []);

  const setFormStatus = React.useCallback((id: string, status: "published" | "draft") => {
    if (!formStatusSchema.safeParse(status).success) return false;
    let applied = false;
    setState((s) => {
      if (!s.forms.some((f) => f.id === id)) return s;
      applied = true;
      return { ...s, forms: s.forms.map((f) => (f.id === id ? { ...f, status } : f)) };
    });
    return applied;
  }, []);

  const markConversationRead = React.useCallback((id: string) => {
    setState((s) => ({
      ...s,
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, unread: false } : c)),
    }));
  }, []);

  const replyToConversation = React.useCallback((id: string, body: string) => {
    const parsed = replyBodySchema.safeParse(body);
    if (!parsed.success) {
      return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid message." };
    }
    const at = mockIso();
    let applied = false;
    setState((s) => {
      if (!s.conversations.some((c) => c.id === id)) return s;
      applied = true;
      return {
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === id
            ? {
                ...c,
                unread: false,
                updatedAt: at,
                messages: [
                  ...c.messages,
                  {
                    id: `m-${MOCK_NOW.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
                    channel: c.channel,
                    direction: "outbound" as const,
                    body: parsed.data,
                    at,
                  },
                ],
              }
            : c
        ),
        activities: [
          {
            id: activityId(),
            type: "email" as const,
            summary: `Reply sent on conversation ${id}`,
            actor: "You",
            at,
          },
          ...s.activities,
        ],
      };
    });
    if (!applied) return { ok: false as const, error: "Conversation not found." };
    return { ok: true as const };
  }, []);

  const value = React.useMemo(
    () => ({
      state,
      userEmail,
      displayName,
      setDisplayName,
      updateLeadStatus,
      moveOpportunity,
      setTaskStatus,
      setCampaignStatus,
      setAutomationStatus,
      setFormStatus,
      markConversationRead,
      replyToConversation,
    }),
    [
      state,
      userEmail,
      displayName,
      setDisplayName,
      updateLeadStatus,
      moveOpportunity,
      setTaskStatus,
      setCampaignStatus,
      setAutomationStatus,
      setFormStatus,
      markConversationRead,
      replyToConversation,
    ]
  );

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const ctx = React.useContext(CrmContext);
  if (!ctx) throw new Error("useCrm must be used within CrmProvider");
  return ctx;
}

export function roleForEmail(email: string, state: CrmState): CrmRole {
  const norm = email.toLowerCase().trim();
  const member = state.team.find((t) => t.email.toLowerCase() === norm);
  if (member) return member.role;
  if (norm.startsWith("malcolm@")) return "Admin";
  return "Rep";
}
