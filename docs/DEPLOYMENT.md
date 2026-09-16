# Deployment

## Local

```bash
npm install
npm run build
npm run start
```

Dev: `npm run dev` → http://localhost:3847 (BITS-dedicated port; avoids 3000 conflicts).
Prod local: `npm run build && npm start` → same port 3847.

## Environment

- No CRM DB env vars yet.
- Marketing contact form may use `.env.local` Resend keys if configured — unrelated to CRM mock.
- Production cookie sets `secure: true` when `NODE_ENV=production`.

## Hosting

Previously deployed marketing site on Vercel (`bits-landing`). Pushing `main` triggers redeploy if project is linked. CRM routes ship with the same deployment.
