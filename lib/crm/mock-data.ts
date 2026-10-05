import type { CrmState } from "./types";

export const seedCrmState = (): CrmState => ({
  companies: [],
  contacts: [],
  leads: [],
  opportunities: [],
  pipelines: [
    {
      id: "pl-1",
      name: "Enterprise Sales",
      stages: [
        { id: "discovery", label: "Discovery", order: 0 },
        { id: "proposal", label: "Proposal", order: 1 },
        { id: "negotiation", label: "Negotiation", order: 2 },
        { id: "closed_won", label: "Closed Won", order: 3 },
        { id: "closed_lost", label: "Closed Lost", order: 4 },
      ],
    },
  ],
  tasks: [],
  activities: [],
  conversations: [],
  campaigns: [],
  automations: [],
  forms: [],
  funnels: [],
  templates: [],
  team: [
    {
      id: "usr-1",
      name: "Malcolm Cuady",
      role: "Admin",
      email: "demo@boundlessitsolutions.com",
      openDeals: 0,
      closedWon30d: 0,
    }
  ],
});
