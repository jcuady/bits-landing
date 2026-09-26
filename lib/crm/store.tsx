"use client";

import * as React from "react";
import { seedCrmState } from "./mock-data";
import { MOCK_NOW } from "./selectors";
import type {
  Automation,
  AutomationStatus,
  Campaign,
  CampaignStatus,
  Company,
  Contact,
  Conversation,
  CrmState,
  FormDef,
  Lead,
  LeadStatus,
  NotificationItem,
  Opportunity,
  OpportunityStage,
  Task,
  TaskStatus,
  TeamMember,
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

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Voltgrid Deal Stalled",
    desc: "Stage: Proposal · Stalled 12 days past expected close",
    time: "2h ago",
    href: "/app/opportunities/op-3",
    urgent: true,
    read: false,
  },
  {
    id: "notif-2",
    title: "RPC Lift Flagged",
    desc: "PTP installment cleared for Carlos Mendoza (₱20,000)",
    time: "3h ago",
    href: "/app/pipelines",
    urgent: false,
    read: false,
  },
  {
    id: "notif-3",
    title: "Predictive Pacing Adjusted",
    desc: "BITSagent AI dialer increased connect frequency by +18%",
    time: "5h ago",
    href: "/app/dashboard",
    urgent: false,
    read: false,
  },
];

type CrmStore = {
  state: CrmState;
  userEmail: string;
  displayName: string;
  setDisplayName: (name: string) => { ok: true } | { ok: false; error: string };

  // Leads CRUD
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "lastActivityAt">) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => boolean;
  deleteLead: (id: string) => boolean;
  updateLeadStatus: (id: string, status: LeadStatus) => boolean;

  // Opportunities CRUD
  addOpportunity: (opp: Omit<Opportunity, "id">) => Opportunity;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => boolean;
  deleteOpportunity: (id: string) => boolean;
  moveOpportunity: (id: string, stage: OpportunityStage) => boolean;

  // Tasks CRUD
  addTask: (task: Omit<Task, "id">) => Task;
  updateTask: (id: string, updates: Partial<Task>) => boolean;
  deleteTask: (id: string) => boolean;
  setTaskStatus: (id: string, status: TaskStatus) => boolean;

  // Companies CRUD
  addCompany: (company: Omit<Company, "id">) => Company;
  updateCompany: (id: string, updates: Partial<Company>) => boolean;
  deleteCompany: (id: string) => boolean;

  // Contacts CRUD
  addContact: (contact: Omit<Contact, "id" | "lastTouchAt">) => Contact;
  updateContact: (id: string, updates: Partial<Contact>) => boolean;
  deleteContact: (id: string) => boolean;

  // Campaigns CRUD
  addCampaign: (campaign: Omit<Campaign, "id" | "sent" | "opens" | "clicks" | "conversions">) => Campaign;
  updateCampaign: (id: string, updates: Partial<Campaign>) => boolean;
  deleteCampaign: (id: string) => boolean;
  setCampaignStatus: (id: string, status: CampaignStatus) => boolean;

  // Automations CRUD
  addAutomation: (automation: Omit<Automation, "id" | "runs30d" | "successRate">) => Automation;
  updateAutomation: (id: string, updates: Partial<Automation>) => boolean;
  deleteAutomation: (id: string) => boolean;
  setAutomationStatus: (id: string, status: AutomationStatus) => boolean;

  // Forms CRUD
  addForm: (form: Omit<FormDef, "id" | "submissions30d" | "conversionRate">) => FormDef;
  updateForm: (id: string, updates: Partial<FormDef>) => boolean;
  deleteForm: (id: string) => boolean;
  setFormStatus: (id: string, status: "published" | "draft") => boolean;

  // Team
  inviteTeamMember: (member: { name: string; email: string; role: CrmRole }) => TeamMember;
  deleteTeamMember: (id: string) => boolean;

  // Conversations
  markConversationRead: (id: string) => void;
  replyToConversation: (id: string, body: string) => { ok: true } | { ok: false; error: string };

  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, "id" | "time" | "read">) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Workspace Data Lifecycle
  clearWorkspaceData: () => void;
  restoreDemoData: () => void;
};

const CrmContext = React.createContext<CrmStore | null>(null);

const STORAGE_KEY = "bits_crm_state_v2";
const NOTIFS_KEY = "bits_crm_notifs_v2";

function cloneSeed(): CrmState {
  return structuredClone(seedCrmState());
}

function mockIso() {
  return new Date().toISOString();
}

function activityId() {
  return `ac-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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
  const [state, setState] = React.useState<CrmState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return cloneSeed();
  });

  const [notifications, setNotifications] = React.useState<NotificationItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(NOTIFS_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [displayName, setDisplayNameState] = React.useState(initialName);

  // Sync state to localStorage on changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // quota or privacy mode
      }
    }
  }, [state]);

  // Sync notifications to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifications));
      } catch {
        // quota
      }
    }
  }, [notifications]);

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

  const addNotification = React.useCallback(
    (notif: Omit<NotificationItem, "id" | "time" | "read">) => {
      const newItem: NotificationItem = {
        ...notif,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        time: "Just now",
        read: false,
      };
      setNotifications((prev) => [newItem, ...prev]);
    },
    []
  );

  const markNotificationRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const dismissNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllNotificationsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const setDisplayName = React.useCallback((name: string) => {
    const parsed = displayNameSchema.safeParse(name);
    if (!parsed.success) {
      return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid name." };
    }
    setDisplayNameState(parsed.data);
    return { ok: true as const };
  }, []);

  // --- LEADS CRUD ---
  const addLead = React.useCallback(
    (data: Omit<Lead, "id" | "createdAt" | "lastActivityAt">): Lead => {
      const at = mockIso();
      const newLead: Lead = {
        ...data,
        id: `ld-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        createdAt: at,
        lastActivityAt: at,
      };
      setState((s) => ({
        ...s,
        leads: [newLead, ...s.leads],
        activities: [
          {
            id: activityId(),
            type: "note",
            summary: `New Lead created: ${newLead.name} (${newLead.company})`,
            actor: "You",
            at,
          },
          ...s.activities,
        ],
      }));
      addNotification({
        title: "New Lead Created",
        desc: `${newLead.name} (${newLead.company}) registered in CRM.`,
        href: `/app/leads`,
        urgent: false,
      });
      return newLead;
    },
    [addNotification]
  );

  const updateLead = React.useCallback((id: string, updates: Partial<Lead>) => {
    let updated = false;
    setState((s) => {
      if (!s.leads.some((l) => l.id === id)) return s;
      updated = true;
      return {
        ...s,
        leads: s.leads.map((l) =>
          l.id === id ? { ...l, ...updates, lastActivityAt: mockIso() } : l
        ),
      };
    });
    return updated;
  }, []);

  const deleteLead = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.leads.some((l) => l.id === id)) return s;
      deleted = true;
      return { ...s, leads: s.leads.filter((l) => l.id !== id) };
    });
    return deleted;
  }, []);

  const updateLeadStatus = React.useCallback(
    (id: string, status: LeadStatus) => {
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
    },
    []
  );

  // --- OPPORTUNITIES CRUD ---
  const addOpportunity = React.useCallback(
    (data: Omit<Opportunity, "id">): Opportunity => {
      const newOpp: Opportunity = {
        ...data,
        id: `op-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      };
      setState((s) => ({
        ...s,
        opportunities: [newOpp, ...s.opportunities],
        activities: [
          {
            id: activityId(),
            type: "stage",
            summary: `New Deal registered: ${newOpp.name}`,
            actor: "You",
            at: mockIso(),
          },
          ...s.activities,
        ],
      }));
      addNotification({
        title: "New Opportunity Registered",
        desc: `${newOpp.name} added to pipeline.`,
        href: `/app/opportunities`,
      });
      return newOpp;
    },
    [addNotification]
  );

  const updateOpportunity = React.useCallback((id: string, updates: Partial<Opportunity>) => {
    let updated = false;
    setState((s) => {
      if (!s.opportunities.some((o) => o.id === id)) return s;
      updated = true;
      return {
        ...s,
        opportunities: s.opportunities.map((o) => (o.id === id ? { ...o, ...updates } : o)),
      };
    });
    return updated;
  }, []);

  const deleteOpportunity = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.opportunities.some((o) => o.id === id)) return s;
      deleted = true;
      return { ...s, opportunities: s.opportunities.filter((o) => o.id !== id) };
    });
    return deleted;
  }, []);

  const moveOpportunity = React.useCallback(
    (id: string, stage: OpportunityStage) => {
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
      if (stage === "closed_won") {
        addNotification({
          title: "🎉 Deal Closed Won!",
          desc: `Deal moved to Closed Won successfully.`,
          href: "/app/pipelines",
          urgent: true,
        });
      }
      return applied;
    },
    [addNotification]
  );

  // --- TASKS CRUD ---
  const addTask = React.useCallback(
    (data: Omit<Task, "id">): Task => {
      const newTask: Task = {
        ...data,
        id: `tk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      };
      setState((s) => ({
        ...s,
        tasks: [newTask, ...s.tasks],
        activities: [
          {
            id: activityId(),
            type: "task",
            summary: `Task created: ${newTask.title}`,
            actor: "You",
            at: mockIso(),
          },
          ...s.activities,
        ],
      }));
      addNotification({
        title: "Task Created",
        desc: newTask.title,
        href: "/app/tasks",
      });
      return newTask;
    },
    [addNotification]
  );

  const updateTask = React.useCallback((id: string, updates: Partial<Task>) => {
    let updated = false;
    setState((s) => {
      if (!s.tasks.some((t) => t.id === id)) return s;
      updated = true;
      return {
        ...s,
        tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      };
    });
    return updated;
  }, []);

  const deleteTask = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.tasks.some((t) => t.id === id)) return s;
      deleted = true;
      return { ...s, tasks: s.tasks.filter((t) => t.id !== id) };
    });
    return deleted;
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

  // --- COMPANIES CRUD ---
  const addCompany = React.useCallback((data: Omit<Company, "id">): Company => {
    const newCompany: Company = {
      ...data,
      id: `co-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    setState((s) => ({
      ...s,
      companies: [newCompany, ...s.companies],
    }));
    return newCompany;
  }, []);

  const updateCompany = React.useCallback((id: string, updates: Partial<Company>) => {
    let updated = false;
    setState((s) => {
      if (!s.companies.some((c) => c.id === id)) return s;
      updated = true;
      return {
        ...s,
        companies: s.companies.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      };
    });
    return updated;
  }, []);

  const deleteCompany = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.companies.some((c) => c.id === id)) return s;
      deleted = true;
      return { ...s, companies: s.companies.filter((c) => c.id !== id) };
    });
    return deleted;
  }, []);

  // --- CONTACTS CRUD ---
  const addContact = React.useCallback((data: Omit<Contact, "id" | "lastTouchAt">): Contact => {
    const newContact: Contact = {
      ...data,
      id: `ct-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      lastTouchAt: mockIso(),
    };
    setState((s) => ({
      ...s,
      contacts: [newContact, ...s.contacts],
    }));
    return newContact;
  }, []);

  const updateContact = React.useCallback((id: string, updates: Partial<Contact>) => {
    let updated = false;
    setState((s) => {
      if (!s.contacts.some((c) => c.id === id)) return s;
      updated = true;
      return {
        ...s,
        contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      };
    });
    return updated;
  }, []);

  const deleteContact = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.contacts.some((c) => c.id === id)) return s;
      deleted = true;
      return { ...s, contacts: s.contacts.filter((c) => c.id !== id) };
    });
    return deleted;
  }, []);

  // --- CAMPAIGNS CRUD ---
  const addCampaign = React.useCallback(
    (data: Omit<Campaign, "id" | "sent" | "opens" | "clicks" | "conversions">): Campaign => {
      const newCamp: Campaign = {
        ...data,
        id: `cp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sent: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
      };
      setState((s) => ({
        ...s,
        campaigns: [newCamp, ...s.campaigns],
      }));
      return newCamp;
    },
    []
  );

  const updateCampaign = React.useCallback((id: string, updates: Partial<Campaign>) => {
    let updated = false;
    setState((s) => {
      if (!s.campaigns.some((c) => c.id === id)) return s;
      updated = true;
      return {
        ...s,
        campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      };
    });
    return updated;
  }, []);

  const deleteCampaign = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.campaigns.some((c) => c.id === id)) return s;
      deleted = true;
      return { ...s, campaigns: s.campaigns.filter((c) => c.id !== id) };
    });
    return deleted;
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

  // --- AUTOMATIONS CRUD ---
  const addAutomation = React.useCallback(
    (data: Omit<Automation, "id" | "runs30d" | "successRate">): Automation => {
      const newAuto: Automation = {
        ...data,
        id: `au-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        runs30d: 0,
        successRate: 1,
      };
      setState((s) => ({
        ...s,
        automations: [newAuto, ...s.automations],
      }));
      return newAuto;
    },
    []
  );

  const updateAutomation = React.useCallback((id: string, updates: Partial<Automation>) => {
    let updated = false;
    setState((s) => {
      if (!s.automations.some((a) => a.id === id)) return s;
      updated = true;
      return {
        ...s,
        automations: s.automations.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      };
    });
    return updated;
  }, []);

  const deleteAutomation = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.automations.some((a) => a.id === id)) return s;
      deleted = true;
      return { ...s, automations: s.automations.filter((a) => a.id !== id) };
    });
    return deleted;
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

  // --- FORMS CRUD ---
  const addForm = React.useCallback(
    (data: Omit<FormDef, "id" | "submissions30d" | "conversionRate">): FormDef => {
      const newForm: FormDef = {
        ...data,
        id: `fm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        submissions30d: 0,
        conversionRate: 0,
      };
      setState((s) => ({
        ...s,
        forms: [newForm, ...s.forms],
      }));
      return newForm;
    },
    []
  );

  const updateForm = React.useCallback((id: string, updates: Partial<FormDef>) => {
    let updated = false;
    setState((s) => {
      if (!s.forms.some((f) => f.id === id)) return s;
      updated = true;
      return {
        ...s,
        forms: s.forms.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      };
    });
    return updated;
  }, []);

  const deleteForm = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.forms.some((f) => f.id === id)) return s;
      deleted = true;
      return { ...s, forms: s.forms.filter((f) => f.id !== id) };
    });
    return deleted;
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

  // --- TEAM MEMBER CRUD ---
  const inviteTeamMember = React.useCallback(
    (member: { name: string; email: string; role: CrmRole }): TeamMember => {
      const newMember: TeamMember = {
        id: `tm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: member.name,
        email: member.email,
        role: member.role,
        openDeals: 0,
        closedWon30d: 0,
      };
      setState((s) => ({
        ...s,
        team: [...s.team, newMember],
      }));
      addNotification({
        title: "Team Member Added",
        desc: `${member.name} (${member.role}) invited to workspace.`,
        href: "/app/team",
      });
      return newMember;
    },
    [addNotification]
  );

  const deleteTeamMember = React.useCallback((id: string) => {
    let deleted = false;
    setState((s) => {
      if (!s.team.some((t) => t.id === id)) return s;
      deleted = true;
      return { ...s, team: s.team.filter((t) => t.id !== id) };
    });
    return deleted;
  }, []);

  // --- CONVERSATIONS ---
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
                    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
            summary: `Reply sent on conversation`,
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

  // --- WORKSPACE DATA LIFECYCLE ---
  const clearWorkspaceData = React.useCallback(() => {
    setState((curr) => ({
      ...curr,
      leads: [],
      contacts: [],
      companies: [],
      opportunities: [],
      tasks: [],
      activities: [
        {
          id: activityId(),
          type: "note",
          summary: "Workspace reset: Sample records purged for production use.",
          actor: "You",
          at: mockIso(),
        },
      ],
    }));

    // Re-fetch any live inbound submissions from Supabase so real customer data is kept
    fetch("/api/crm/leads")
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.mapped) {
          setState((curr) => ({
            ...curr,
            leads: res.mapped.leads ?? [],
            companies: res.mapped.companies ?? [],
            opportunities: res.mapped.opportunities ?? [],
          }));
        }
      })
      .catch(() => {});
  }, []);

  const restoreDemoData = React.useCallback(() => {
    setState(cloneSeed());
  }, []);

  const value = React.useMemo(
    () => ({
      state,
      userEmail,
      displayName,
      setDisplayName,
      addLead,
      updateLead,
      deleteLead,
      updateLeadStatus,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      moveOpportunity,
      addTask,
      updateTask,
      deleteTask,
      setTaskStatus,
      addCompany,
      updateCompany,
      deleteCompany,
      addContact,
      updateContact,
      deleteContact,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      setCampaignStatus,
      addAutomation,
      updateAutomation,
      deleteAutomation,
      setAutomationStatus,
      addForm,
      updateForm,
      deleteForm,
      setFormStatus,
      inviteTeamMember,
      deleteTeamMember,
      markConversationRead,
      replyToConversation,
      notifications,
      addNotification,
      markNotificationRead,
      dismissNotification,
      markAllNotificationsRead,
      clearWorkspaceData,
      restoreDemoData,
    }),
    [
      state,
      userEmail,
      displayName,
      setDisplayName,
      addLead,
      updateLead,
      deleteLead,
      updateLeadStatus,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      moveOpportunity,
      addTask,
      updateTask,
      deleteTask,
      setTaskStatus,
      addCompany,
      updateCompany,
      deleteCompany,
      addContact,
      updateContact,
      deleteContact,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      setCampaignStatus,
      addAutomation,
      updateAutomation,
      deleteAutomation,
      setAutomationStatus,
      addForm,
      updateForm,
      deleteForm,
      setFormStatus,
      inviteTeamMember,
      deleteTeamMember,
      markConversationRead,
      replyToConversation,
      notifications,
      addNotification,
      markNotificationRead,
      dismissNotification,
      markAllNotificationsRead,
      clearWorkspaceData,
      restoreDemoData,
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
  if (norm.startsWith("malcolm@") || norm.startsWith("demo@") || norm.includes("admin")) return "Admin";
  return "Admin";
}
