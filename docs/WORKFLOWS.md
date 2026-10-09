# Workflows (mock simulation)

> **SYSTEM_AUDIT.md §63 — largely describes routes that no longer exist.**
>
> This document records the mock CRM as it stood at commit `76576d8`. The mock has
> since been replaced by the real, Supabase-backed application, and **six of the
> routes it walks through were never carried across**:
>
> | Walked here | Reality |
> |---|---|
> | `/app/pipelines` | no such route |
> | `/app/tasks` | no such route |
> | `/app/conversations` | no such route |
> | `/app/campaigns` | no such route |
> | `/app/automations` | no such route |
> | `/app/forms`, `/app/templates`, `/app/team` | no such routes |
>
> **What exists** is six list/detail routes, matching `lib/crm/nav.ts` exactly:
> `dashboard`, `leads`, `contacts`, `companies`, `opportunities`, `settings`
> (verified against `app/(crm)/app/**/page.tsx`, 8 Oct 2026).
>
> One claim below is not merely stale but **false of this build**: *"Admin/Manager
> can click Invite member"*. There is no role model. `requireCrmUser()`
> (`lib/crm/api-auth.ts`) authenticates and **never authorizes** — the Rep/Manager/Admin
> distinction is a client-side display concept only.
>
> The Auth section below is still accurate except for line 10, which is correct as
> written: the forgot-password flow is a **simulated** screen and sends no mail.

## Auth

1. Open `/login` (or marketing **CRM Sign in**).
2. Sign in with email + password ≥ 6, or **Enter demo**.
3. Cookie set → `/app/dashboard` (or safe `/app/*` `next`).
4. Logged-out `/app/*` → redirect `/login?next=…`.
5. **Log out** clears cookie → `/login`.
6. Forgot password: email → simulated “sent” screen (no mail).

## Lead qualification

1. `/app/leads` → search + status filter.
2. Open lead → set status buttons (`new` / `working` / `qualified` / `disqualified`).
3. Activity feed on dashboard reflects status change (session).

## Opportunity / pipeline

1. `/app/opportunities` → search + stage filter → detail.
2. Move stage via detail buttons or `/app/pipelines` Move/Back.
3. Closed won/lost adjusts probability.

## Tasks

1. `/app/tasks` → filter open/done.
2. **Complete** / **Reopen**.

## Conversations

1. Select thread (marks read).
2. Type reply → **Send** appends outbound message in session.

## Campaigns & automations

1. **Pause** / **Enable** (active ↔ paused). Completed/draft campaigns disabled.

## Forms & templates

1. Forms: **Publish** / **Unpublish**.
2. Templates: **Preview** modal → **Close** / backdrop.

## Settings & team

1. Settings: edit display name (updates top bar); toggle notifications.
2. Team: Admin/Manager can click **Invite member** (alert mock); others disabled.

## Persistence ceiling

All mutations live in React state until refresh. Documented intentional mock limit until database.
