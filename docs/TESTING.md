# Testing

## Commands

```bash
npm run build
node lib/crm/selectors.selfcheck.mjs
node lib/crm/safe-next.selfcheck.mjs
npm run test:crm
```

`test:crm` starts production server on port 3110 and drives Edge (Playwright `channel=msedge`) through auth, nav, filters, mutations, modals, mobile nav, logout.

## Coverage map

| Area | Covered by |
|------|------------|
| Auth gate + logout | e2e |
| Open-redirect harden | e2e (`next=/application` → dashboard) |
| All CRM nav routes | e2e |
| Lead filter + status | e2e |
| Task complete | e2e |
| Pipeline move | e2e |
| Conversation reply | e2e |
| Form publish | e2e |
| Template preview modal | e2e |
| Settings toggle + display name | e2e |
| Mobile nav | e2e |
| KPI math sanity | selectors.selfcheck |
| safeAppNext | safe-next.selfcheck |

## Not automated

Visual regression, full keyboard-only audit, Lighthouse. Manual spot-check at 375 / 768 / 1280 recommended.
