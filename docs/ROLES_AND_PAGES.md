# Roles and pages

## Mock roster roles

| Role | Typical user | Primary jobs |
|------|--------------|--------------|
| **Admin** | Malcolm Cuady (demo login) | Full RevOps + team + settings |
| **Manager** | Rina Velasco | Pipeline coaching, reports, invites |
| **Rep** | Jonas Park | Leads, opps, tasks, conversations |
| **Marketing** | Aya Mendoza | Campaigns, funnels, forms, templates |

Custom email logins (not on roster) default UI role to **Rep**.

## Page matrix (should have)

| Page | Admin | Manager | Rep | Marketing | In app? | Notes |
|------|:-----:|:-------:|:---:|:---------:|:-------:|-------|
| Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ | Shared KPIs |
| Leads | ✓ | ✓ | ✓ | ✓ | ✓ | Marketing cares about sources |
| Contacts | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Companies | ✓ | ✓ | ✓ | read | ✓ | |
| Opportunities | ✓ | ✓ | ✓ | read | ✓ | |
| Pipelines | ✓ | ✓ | ✓ | read | ✓ | Kanban move |
| Tasks | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Conversations | ✓ | ✓ | ✓ | ✓ | ✓ | Reply mock |
| Campaigns | ✓ | ✓ | — | ✓ | ✓ | Soft: all can toggle in mock |
| Automations | ✓ | ✓ | — | ✓ | ✓ | Soft: all can toggle in mock |
| Funnels | ✓ | ✓ | — | ✓ | ✓ | Read + bars |
| Forms | ✓ | ✓ | — | ✓ | ✓ | Publish toggle |
| Templates | ✓ | ✓ | ✓ | ✓ | ✓ | Preview modal |
| Reports | ✓ | ✓ | read | ✓ | ✓ | |
| Team | ✓ | ✓ | read | read | ✓ | Invite soft-gated |
| Settings | ✓ | ✓ | own | own | ✓ | Display name + toggles |

## Enforcement today

**UI soft-gating only** (Invite disabled for Rep/Marketing). Route middleware does **not** enforce role. Acceptable for pre-DB mock; required before production DB.

## Verdict: should these pages exist?

Yes — every `crmprompt.md` route is justified for a RevOps CRM shell. No orphan pages. Detail routes for leads/contacts/companies/opportunities are required for simulation depth.
