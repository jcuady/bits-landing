# Page audit — controls inventory

| Route | Primary controls | Working? | Notes |
|-------|------------------|----------|-------|
| `/login` | Sign in, Enter demo, Forgot link | VERIFIED | `next` hardened |
| `/forgot-password` | Send reset, return link | VERIFIED | Simulated |
| `/app` | redirect | VERIFIED | → dashboard |
| `/app/dashboard` | KPI cards, bars, exceptions links | VERIFIED | |
| `/app/leads` | Search, status filter, row links | VERIFIED | |
| `/app/leads/[id]` | Status buttons, back | VERIFIED | |
| `/app/contacts` | Search, row links | VERIFIED | |
| `/app/contacts/[id]` | Company link, back | VERIFIED | |
| `/app/companies` | Search, row links | VERIFIED | |
| `/app/companies/[id]` | Contact/opp links | VERIFIED | |
| `/app/opportunities` | Search, stage filter | VERIFIED | |
| `/app/opportunities/[id]` | Stage move buttons | VERIFIED | |
| `/app/pipelines` | Move/Back per card | VERIFIED | |
| `/app/tasks` | Search, status filter, Complete/Reopen | VERIFIED | |
| `/app/conversations` | Search, thread select, Send reply | VERIFIED | Draft resets; no auto-read on filter |
| `/app/campaigns` | Search, status, Pause/Enable | VERIFIED | |
| `/app/automations` | Search, status, Pause/Enable | VERIFIED | |
| `/app/funnels` | Step bars (read) | VERIFIED | Read-only OK |
| `/app/forms` | Search, Publish/Unpublish | VERIFIED | |
| `/app/templates` | Search, Preview modal | VERIFIED | |
| `/app/reports` | Charts (read) | VERIFIED | |
| `/app/team` | Search, role filter, Invite | VERIFIED | |
| `/app/settings` | Name, switches | VERIFIED | |
| Shell | Skip link, nav, alerts, logout | VERIFIED | |

## Dead / deferred (intentional pre-DB)

- Create/edit entity forms (new lead, new deal)
- Drag-and-drop kanban (Move buttons instead)
- Real invite email, real password reset
- Hard RBAC route blocks
- Server-persisted settings
