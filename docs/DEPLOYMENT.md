# Deployment

> **Corrected 8 October 2026.** This file previously said *"No CRM DB env vars
> yet"* and described the contact form as *"unrelated to CRM mock"*. Both were
> wrong when written and had not been updated: the CRM has been backed by
> Supabase since §16, and the contact form **is** the CRM's lead source — every
> submission it accepts is the thing that populates `inbound_leads`. A deployer
> following the old version would have concluded no configuration was needed.

## Local

```bash
npm install
npm run build
npm run start        # next start -p 3847
```

Dev: `npm run dev` → http://localhost:3847 (BITS-dedicated port; avoids 3000 conflicts).
Prod local: `npm run build && npm start` → same port 3847.

## Environment variables

`.env.example` is the canonical, commented source. This table is the summary.

| Variable | Default if unset | If unset, what happens |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | **falls back to the production project** | App silently targets production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **falls back to the committed production anon key** | App silently targets production |
| `SUPABASE_SERVICE_ROLE_KEY` | **none** | `createServiceClient()` **throws** — fails closed |
| `RESEND_API_KEY` | **none** | No email is sent; the failure is written to `email_logs` |
| `CONTACT_INBOX` | `boundlessitsolutions@gmail.com` | Enquiries go to the personal inbox |
| `CONTACT_FROM` | `BITS Inquiries <inquiries@boundlessits.com>` | Falls back to the production sender |
| `NEXT_PUBLIC_SITE_URL` | `https://www.boundlessits.com` | Correct for production — **usually leave unset** |
| `NEXT_PUBLIC_*_VERIFICATION` | Google has a source fallback; others empty | Meta tag omitted |

### The one that matters: silent fallback to production

Four files carry the production Supabase URL and anon key as a **hardcoded
fallback**:

```
proxy.ts
lib/supabase/server.ts
lib/supabase/middleware.ts
lib/supabase/client.ts
```

Consequence: **a deploy that forgets the Supabase variables still works, and it
works against the live project.** Nothing errors. Authentication, the CRM, and
the contact form all talk to production.

That is usually the desired outcome for this site and dangerous only for the one
case that matters — deploying a preview or a fork and intending it to be
isolated. To make a deployment explicit, set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` to that environment's own project. Setting them
is free; leaving them unset is a silent decision to use production.

Note the asymmetry, which is deliberate:

- **Service-role key: fails closed.** Throws rather than degrading to the anon
  key. That failure mode was found in §16 and it is the dangerous one — a
  degraded service client turns "you may not read this" into "you may read what
  RLS allows the anon role to read".
- **URL and anon key: fail open**, because the anon key is public by design and
  RLS is what protects the data. Verified empirically in §40: all four tables
  contain rows and the anon key sees **zero** of them.

### Email

`RESEND_API_KEY` has no fallback. Without it, `submitContact` still succeeds for
the visitor — the lead is persisted — but **no email is sent**, and the failure
is recorded in `email_logs`. That is the §20 behaviour: the visitor is never told
their enquiry did not reach anyone, and the failure is observable rather than
silent.

`CONTACT_FROM` must be a verified Resend sender. The code default is
`inquiries@boundlessits.com`; `.env.example` still carries an older
`onboarding@resend.dev` example and mentions `bits.ph` as the verification
domain, neither of which matches the domain the code actually uses. Treat
`.env.example`'s email block as illustrative and set `CONTACT_FROM` to the
verified sender for the domain you are deploying.

#### Three addresses, and which is which

The code references three different mailboxes. They are not interchangeable, and
the mismatch looks like a bug when you first read it:

| Address | Role | Where it comes from |
|---|---|---|
| `bits_inquiries@boundlessits.com` | **Published to visitors.** Reply-to on every sales email, and the address shown in the footer | `site.inquiryEmail` (`lib/site.ts:6`) |
| `boundlessitsolutions@gmail.com` | **Internal alert inbox.** Where lead-notification automations are delivered | `CONTACT_INBOX` default (`lib/contact.ts:31`, `lib/email/service.ts:147`) |
| `inquiries@boundlessits.com` | **Envelope sender.** The `From:` header Resend sends with | `CONTACT_FROM` default (`lib/email/service.ts:45`) |

Only the third one has to be a domain you control in Resend. The split between
the first and second is deliberate and commented at `lib/contact.ts:21-30`: a
visitor who hits a submission error must be pointed at the same address the rest
of the site advertises, or the lead is lost.

It also reaches `/legal`, `/cookies` and `/security` without those pages
declaring it: they sit in `app/(marketing)/`, whose layout renders the shared
`<Footer />`. Grepping `app/(marketing)/legal/page.tsx` for the address finds
nothing, and that is correct rather than a missing reference. The same value is
published for machine readers in `public/llms.txt`, `public/llms-full.txt`,
`public/index.md` and `public/.well-known/ai-catalog.json`.

## Hosting

The marketing site and the CRM ship as **one** deployment — the CRM routes are
part of the same Next.js app, not a separate service.

Production is `https://www.boundlessits.com`. Pushing to the deployed branch
triggers a redeploy if the Vercel project is still linked.

> **Corrected 8 October 2026.** This file previously said *"Previously deployed
> marketing site on Vercel (`bits-landing`)"*. That project name is not the one
> serving the canonical domain, and `NEXT_PUBLIC_SITE_URL`'s default was changed
> away from a `bits-landing.vercel.app` host in §30 because it was a trap for the
> next deploy — every canonical would have pointed at a domain that is not
> canonical.

### Production is not on the audited build

As of this writing `https://www.boundlessits.com/` still serves a **pre-audit
build**. It carries the false security claims and the fabricated
`aggregateRating` markup that were removed from the working tree in §29 and §30.
Merging the audit branch and deploying is what actually retires them. See §30
and §32.

## Before you deploy

1. `npm run build` — must complete. Verify against the manifests rather than a remembered number: `.next/app-path-routes-manifest.json` and `.next/routes-manifest.json` (currently **53 generated paths = 45 route definitions + 8 dynamic**). A previous `71 pages` figure here did not reproduce and was removed.
2. `npm run test:unit` — must pass all 21 suites
3. `npm run test:crm` — must report 29 assertions, 0 skipped
4. `npm audit` — must report 0 vulnerabilities
5. `node scripts/anon-access-probe.mjs` — RLS must be PROVEN on the target
   project, not assumed from `supabase-schema.sql`
6. Confirm `SUPABASE_SERVICE_ROLE_KEY` is set in the **target** environment and
   is not a placeholder value
7. `node scripts/history-secret-scan.mjs` — the demo credential will be present
   while `demo@boundlessitsolutions.com` still exists (§32, §40). Disabling that
   account is an owner action and has not been done.