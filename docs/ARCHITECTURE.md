# Architecture — BITS CRM (Mock)

## Stack

- Next.js App Router + React 19 + TypeScript
- Tailwind v4 (BITS tokens in `app/globals.css`)
- Lucide icons, no chart library (CSS/SVG)
- Simulated auth via httpOnly cookie `bits_crm_session`
- In-memory client store (`lib/crm/store.tsx`) — **no database yet**

## Route groups

```text
app/(marketing)/     Public site Header/Footer
app/(auth)/          /login, /forgot-password
app/(crm)/app/       Authenticated CRM shell
middleware.ts        Gates /app/* ; redirects authed users away from login
```

## Data flow

```text
Login/demo → cookie → middleware → CrmProvider(seed) → pages mutate session state
Refresh browser → seed resets (expected until DB)
```

## Key modules

| Path | Role |
|------|------|
| `lib/crm/types.ts` | Domain types |
| `lib/crm/mock-data.ts` | Seed records |
| `lib/crm/store.tsx` | Client mutations |
| `lib/crm/selectors.ts` | Dashboard KPIs |
| `lib/crm/auth.ts` | Cookie encode/decode |
| `lib/crm/safe-next.ts` | Post-login path allowlist |
| `components/crm/*` | Shell + table/KPI/board primitives |

## Out of scope (pre-DB)

Real identity provider, RLS, persistence, email/SMS providers, file uploads, enforced RBAC beyond soft UI.
