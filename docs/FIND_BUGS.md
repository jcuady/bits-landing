# Find-bugs report — CRM mock (2026-09-13)

Scope: QA/UI/security hardening on `main` vs `origin/main` (`76576d8`). Reviewed auth, middleware, CRM store, interactive pages, validation helpers, and UI controls.

**Note:** base branch is `main` (no `master`).

## Files reviewed (complete)

Auth: `app/actions/auth.ts`, `lib/crm/auth.ts`, `middleware.ts`, login/forgot pages  
Store: `lib/crm/store.tsx`, `lib/crm/validation.ts`, `lib/crm/safe-next.ts`, selectors  
CRM UI: all `(crm)/app/**/page.tsx`, `crm-controls`, `filter-bar`, `pipeline-board`, shell/sidebar/topbar/mobile-nav, `components/ui/button.tsx`  
Tests/scripts: `scripts/crm-e2e.mjs`

## Attack surface

| Surface | Location |
|---------|----------|
| Form body | login, forgot-password |
| Query `next`, `error`, `sent`, `email` | auth pages |
| Cookie `bits_crm_session` | middleware, layout |
| Client store mutations | `lib/crm/store.tsx` |
| Filter/search inputs | list pages (client-only) |

## Checklist

| Item | Result |
|------|--------|
| Injection | Clean (no DB); path `next` allowlisted |
| XSS | React escape; auth alerts use fixed error codes only (no free-text `message`) |
| Authentication | Middleware + layout cookie decode |
| Authorization/IDOR | Soft UI only — intentional pre-DB |
| CSRF | SameSite lax + server actions |
| Race | Low risk mock store |
| Session | httpOnly; secure in prod; unsigned cookie **known** |
| Cryptography | N/A mock |
| Info disclosure | Generic forgot copy; no reflected phishing banner |
| DoS | Length caps on email/password/reply/name/cookie |
| Business logic | Pipeline won/lost not linear; mutators return false on missing id |

## Fixed this ship (find-bugs)

1. **Medium** — Auth pages reflected `?message=` → allowlisted `error` codes only  
2. **Medium** — Conversation search no longer auto-selects/marks unread as read  
3. **Medium** — Reply draft resets when switching threads  
4. **Medium** — Store mutators return `false` when id missing  
5. **Medium** — Session writes use `MOCK_NOW` (aligned with relative time)  
6. **Low** — E2E restores post-logout `/app` gate assertion  
7. **UX** — Skip link, 44px controls, conversation empty-search copy

## Remaining accepted risks (pre-DB)

1. **High (prod)**: Unsigned forgeable session — needs signed/opaque tokens with IdP  
2. **High (prod)**: Any email+password≥6 succeeds — demo auth  
3. **Medium**: Soft RBAC only  
4. **Medium**: Create/convert entity forms deferred (documented)  
5. **Low**: E2E free-port TOCTOU (retry acceptable for smoke)

## Could not fully verify

- Visual spacing on every breakpoint (no visual regression suite)  
- Full keyboard-only audit of every control beyond skip link + focus rings  
