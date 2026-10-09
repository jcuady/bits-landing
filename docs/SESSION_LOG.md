# Session / prompt progress log

> **SYSTEM_AUDIT.md §64 — historical record, read with these corrections.**
>
> This log describes the **mock** CRM as it stood on 2026-09-12/13 (commit `76576d8`).
> The mock has since been replaced by the real, Supabase-backed application, and
> three of the things recorded here no longer exist:
>
> - the **mock store** (data is now persisted — `lib/crm/store.tsx` fetches
>   `/api/crm/leads` from the live `inbound_leads` table);
> - the **e2e harness** (there is no `e2e/` directory; `package.json` ships
>   `test:crm`, `test:responsive`, `test:keyboard`, `test:api` and `test:seo` node
>   scripts instead);
> - the **pages** listed at lines 16, 17, 19 and 31 — conversations, forms,
>   templates, campaigns, automations and team. The application now has six routes:
>   `dashboard`, `leads`, `contacts`, `companies`, `opportunities`, `settings`.
>
> Entries are left as written rather than rewritten. A session log that is edited to
> match the present stops being evidence of what happened.

## 2026-09-12 — CRM mock implementation

- Built route groups, middleware auth, full `/app/*` page map, mock store, e2e smoke.
- Pushed `76576d8` to `origin/main`.

## 2026-09-13 — Principal QA + docs + pre-DB hardening (this prompt)

**Goal:** Deep audit every role/page, document workflows, fix bugs, premium/consistent UI controls, verify before database.

### Findings fixed

1. Open redirect: `next` values like `/application` accepted → `safeAppNext`.
2. Production cookie missing `secure` → added.
3. Dead conversation reply → Send composer + store action.
4. Forms/templates had no actions → Publish toggle + Preview modal.
5. Settings name hardcoded, not linked to top bar → `displayName` in store.
6. No status filters on leads/opps/tasks → StatusFilter.
7. Team invite was missing → soft role-gated Invite. **§64: this created a durable
   impression that the CRM has roles. It does not.** `requireCrmUser()`
   (`lib/crm/api-auth.ts`) authenticates and never authorizes; Rep/Manager/Admin is a
   client-side display concept, and any authenticated user can read every record.
8. Activity used lead id not name → fixed.
9. Touch/cursor consistency → `CrmButton` + larger switches.

### Docs created

`docs/*` + root `PROJECT_STATUS.md`.

## 2026-09-13 — UI consistency (buttons / filters / spacing)

- Unified `CrmButton` (44px min, pressed state) + `FilterBar` spacing
  — **§64: `CrmButton` is now `min-h-10` (40px), verified in
  `components/crm/crm-controls.tsx`. 40px still clears WCAG 2.2 SC 2.5.8 (24×24);
  the 44px figure was Apple HIG guidance, not a requirement.**
- Filters on campaigns, automations, forms, templates, team, conversations
- Sidebar/mobile nav cursor + min heights; settings switches enlarged
- `docs/UI_STANDARDS.md`

## 2026-09-13 — Ship harden + push prep

- Auth alerts: fixed `error` codes only (no reflected `message`)
- Conversations: no auto-read on search; draft resets on thread change
- Store: mutators return false on missing id; timestamps use `MOCK_NOW`
- Skip link + e2e logout gate restored
- Docs: FIND_BUGS, UI_STANDARDS, PROJECT_STATUS

