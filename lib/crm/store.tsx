"use client";

import * as React from "react";
import { seedCrmState } from "./mock-data";
import type {
  AutomationStatus,
  CampaignStatus,
  CrmState,
  LeadStatus,
  OpportunityStage,
  TaskStatus,
} from "./types";

type CrmStore = {
  state: CrmState;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  moveOpportunity: (id: string, stage: OpportunityStage) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  setCampaignStatus: (id: string, status: CampaignStatus) => void;
  setAutomationStatus: (id: string, status: AutomationStatus) => void;
  markConversationRead: (id: string) => void;
};

const CrmContext = React.createContext<CrmStore | null>(null);

function cloneSeed(): CrmState {
  return structuredClone(seedCrmState());
}

export function CrmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CrmState>(cloneSeed);

  const updateLeadStatus = React.useCallback((id: string, status: LeadStatus) => {
    setState((s) => ({
      ...s,
      leads: s.leads.map((l) => (l.id === id ? { ...l, status, lastActivityAt: new Date().toISOString() } : l)),
      activities: [
        {
          id: `ac-${Date.now()}`,
          type: "stage",
          summary: `Lead ${id} status → ${status}`,
          actor: "You",
          at: new Date().toISOString(),
        },
        ...s.activities,
      ],
    }));
  }, []);

  const moveOpportunity = React.useCallback((id: string, stage: OpportunityStage) => {
    setState((s) => ({
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
          id: `ac-${Date.now()}`,
          type: "stage",
          summary: `Opportunity moved to ${stage.replace("_", " ")}`,
          actor: "You",
          at: new Date().toISOString(),
        },
        ...s.activities,
      ],
    }));
  }, []);

  const setTaskStatus = React.useCallback((id: string, status: TaskStatus) => {
    setState((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  }, []);

  const setCampaignStatus = React.useCallback((id: string, status: CampaignStatus) => {
    setState((s) => ({
      ...s,
      campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, status } : c)),
    }));
  }, []);

  const setAutomationStatus = React.useCallback((id: string, status: AutomationStatus) => {
    setState((s) => ({
      ...s,
      automations: s.automations.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  }, []);

  const markConversationRead = React.useCallback((id: string) => {
    setState((s) => ({
      ...s,
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, unread: false } : c)),
    }));
  }, []);

  const value = React.useMemo(
    () => ({
      state,
      updateLeadStatus,
      moveOpportunity,
      setTaskStatus,
      setCampaignStatus,
      setAutomationStatus,
      markConversationRead,
    }),
    [
      state,
      updateLeadStatus,
      moveOpportunity,
      setTaskStatus,
      setCampaignStatus,
      setAutomationStatus,
      markConversationRead,
    ]
  );

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const ctx = React.useContext(CrmContext);
  if (!ctx) throw new Error("useCrm must be used within CrmProvider");
  return ctx;
}
