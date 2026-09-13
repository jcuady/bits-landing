# Security — mock CRM

## Implemented

| Control | Status |
|---------|--------|
| Middleware gate on `/app/*` | VERIFIED |
| httpOnly cookie | VERIFIED |
| `sameSite: lax` | VERIFIED |
| `secure` in production | VERIFIED |
| Post-login `next` allowlist (`/^\/app(\/|$)/`) | VERIFIED |
| Auth UI alerts use fixed `error` codes only (no free-text `message`) | VERIFIED |
| Forgot password does not leak account existence beyond UI copy | Simulated |

## Known limitations (pre-DB)

| Issue | Severity | Mitigation plan |
|-------|----------|-----------------|
| Session cookie is unsigned base64 JSON — forgeable | High (prod) | Sign/encrypt with server secret or use real auth |
| Any email+password≥6 succeeds | High (prod) | Identity provider / hashed credentials |
| No CSRF token beyond SameSite | Medium | Keep SameSite; add origin checks for mutations when server-side |
| No rate limit on login | Medium | Edge rate limit when auth is real |
| Soft RBAC only | Medium | Enforce on server with roles table |
| XSS | Low | React escapes text; avoid `dangerouslySetInnerHTML` in CRM |

## Checklist (find-bugs pass)

- Injection: N/A DB; path `next` hardened
- XSS: React default escaping used; auth banners are allowlisted codes only
- Auth: middleware + layout cookie check
- Authorization/IDOR: mock — all data client-side; no real IDOR surface yet
- CSRF: cookie SameSite lax; server actions same-origin
- Session: httpOnly; not secure in local dev
- Crypto: none (intentional mock)
- DoS: seed data bounded; input length caps
- Business logic: stage/probability updates coherent; mutators false on missing id
