# Testing

> Corrected 7 October 2026. The previous coverage map claimed E2E coverage for
> "Task complete", "Pipeline move", "Conversation reply", "Form publish", and
> "Template preview" — none of those pages exist. The map below reflects what
> is actually covered.

## Commands

```bash
npm run typecheck      # tsc --noEmit
npm run test:unit      # fast, no browser or server required
npm run build          # production build
npm run test:crm       # E2E — starts its own server on a free port
npm run test:responsive # 11 viewport/zoom profiles — starts its own server
npm run test:keyboard   # 10 routes, skip link + focus order — starts its own server
npm run test:api        # CRM API surface (anonymous) — needs a running server
npm run test:api:authed # CRM API with a demo session (GET only) — needs a server
npm run test:seo        # metadata sweep over every sitemap route — needs a server
```

## Unit selfchecks (`npm run test:unit`)

All **fifty-four** are dependency-free `node` scripts and run without a server.

> **§71 — the previous line claimed "All nineteen … and run in CI without a
> server." Both halves were false and the second is the worse one.**
>
> 1. **Count.** There were 30 before this correction added the §70 and §71 pairs; the
>    table below had fallen behind as suites were added across §60–§71. §78 added the
>    `blog-claims-subject` pair and §79 the link-integrity fragment test, taking it
>    to 33. §95 wired seven checks that already existed but were never run, §96 added
>    `templates.selfcheck.mjs`, §98 added the `external-requests` pair, §99 added
>    the `falsifiability-coverage` pair, and §100 sandboxed and wired
>    `production-write-guard-negative.mjs` — the one check §95 had declared
>    deliberately unwired — §104 added the `duplicate-implementations` pair, §105
>    wired the secret-scan pair, and §106 added the `working-tree-integrity` pair:
>    **54 entries = 37 gates + 17 negative suites**.
> 2. **There is no CI in this repository.** Measured: `.github/workflows`,
>    `.gitlab-ci.yml`, `.circleci`, `azure-pipelines.yml`, `Jenkinsfile` and
>    `.drone.yml` are all absent. The only deployment config is `vercel.json`.
>    These gates run when *you* run `npm run test:unit`; nothing runs them
>    automatically on push.
>
> `scripts/docs-claims-drift.mjs` now fails the build on any of the numbers
> above drifting, and on any document asserting that a CI run exists.
>
> **This is the second time a document has claimed automation this repository
> does not have** (the first was the CRM "support ticket" module). A claim that
> checks run themselves is more costly than a claim that a feature is missing:
> it makes every gate above look like it is guarding the branch, when in fact
> the whole suite is one `npm` command away from being silently skipped.

| Suite | Covers |
|-------|--------|
| `scripts/derived-counts.mjs` | **A count of products or engines must be derived, not typed.** §88: twelve sites typed the number by hand and did not agree — `hero.tsx`, `product-shell.tsx` and `crm-sales/page.tsx` all linked to `/demo` (19 engines) and said "18 Engines", while `demo-toolbar` said 19 for the same link. Two more, inside the live `solutionPackages` pricing tiers, called the 18-product catalogue "18 Engines". No gate could see any of them: `docs-claims-drift` reads markdown only and `ai-disclosure` asks about security controls. The rule needs no heuristic — a derived count is written `{PRODUCT_COUNT}`, carries no digits, and simply cannot match |
| `scripts/derived-counts-negative.mjs` | Proves the count gate **fires**, by injecting hand-typed counts into real gated files, running the real gate, asserting a non-zero exit, and restoring byte-for-byte. Two directions: a typed count fails; a count *removed* and an unrelated number stay silent. A no-op injection is rejected with "the probe proves nothing" rather than passing silently. 5 assertions |
| `scripts/gated-render-closure.mjs` | **A gated surface must not render copy it never looked at.** §70: `app/(marketing)/bitscrm/page.tsx` had been gated since §50 and reported CLEAN every run while rendering a pricing table selling a SIP softphone and an auto-dialer. A file-level gate reads the literals *inside* a file; imported copy is invisible to it. Derived, not enumerated — the copy-module set is whatever a gated surface imports, so a new content module pulled into a gated page is covered automatically. Prints full accounting and warns instead of ticking when the scan path did not run (`SYSTEM_AUDIT.md` §70) |
| `scripts/gated-render-closure-negative.mjs` | Proves the closure check **fires**, by injecting a real attestation into a real gated export in memory. An earlier draft ungated the three known-bad exports instead and could not work, because §70 had already fixed them: *a negative test whose fixture is the bug it exists to catch is only alive until the bug is fixed.* 13 assertions; no file on disk is written |
| `lib/site/bundle-boundary.selfcheck.mjs` | No heavy client library may be **statically** imported — a top-level `import` hoists into the shared graph, a dynamic `import()` does not. §42 found GSAP (360 KB raw) shipping to `/login` because of one static import in the homepage hero; fixing it removed 43 KB from all 13 non-homepage routes. The rule is stated on the construct, not on a per-library pattern, and the gate also asserts the dynamic import and `ScrollTrigger.create` still exist so **deleting the animation cannot pass it** |
| `lib/site/encoding-integrity.selfcheck.mjs` | **Mojibake, U+FFFD, UTF-8 BOM and invalid UTF-8 bytes across every project text file.** The rule is a round trip, not a character class: a run is mojibake only if encoding it back to cp1252 yields valid UTF-8 naming a different character, so `–§`, `—` and `·` are never flagged. The gate corrupts known-good strings through the same code path real damage takes and asserts each is caught, then asserts it stays quiet on nine kinds of legitimate punctuation. **This suite replaced a detector that reported 8 damaged runs where 4 existed** (`SYSTEM_AUDIT.md` §37) |
| `lib/site/ai-disclosure.selfcheck.mjs` | `llms.txt` / `llms-full.txt` / `index.md` / `bitscrm.md` / `bitsagent.md`: **27 references resolve** to real routes or public files (dynamic `/products/<slug>` and `/blog/<slug>` validated against the catalog and blog data). Plus **34 security surfaces / 4,069 visible strings / 15 banned attestations** — SOC 2, WORM, HIPAA, multi-tenant, RBAC, SSO/MFA, audit logs, immutable/tamper-proof, PII masking, campaign isolation, cryptographic enforcement, contact rules, bare "Enforced" badges, telephony, GraphQL. Rules live in `lib/site/security-claims.mjs` so each can be negative-tested. Extraction strips comments and reads **string literals *and* bare JSX text** (a literal-only scan cannot see `>Enforced<`). Detection is sentence-scoped, and scoped-out markers include `target:` and `scoped per contract`, so honest denials and roadmap labels pass (`SYSTEM_AUDIT.md` §28, §29) |
| `scripts/scoping-regression.mjs` | **Pins the `SCOPED_OUT` exemptions that ai-disclosure depends on.** That rule exempts a whole sentence carrying any denial marker, which §44 proved is broader than sound — three tightenings were built, measured, and all broke honest copy that ships here, so the gap was documented instead of closed. This discovers every honest denial **from the security surfaces at runtime** (not a copied list, so it cannot drift) and fails naming the string and file if a future tightening flags it, with the instruction *"fix the scoping, NOT this string."* Floor is **10**, the measured count — a guessed floor of 15 is what surfaced the real number. `SYSTEM_AUDIT.md` §44 |
| `scripts/stack-version-drift.mjs` | **Versions stated in docs must equal `package.json`.** Version drift happened three times: §41 upgraded `next` 16.3.5 → 16.3.8 and corrected the README, then §43 found `PROJECT_STATUS.md` still saying 16.3.5, then §45 found `SYSTEM_AUDIT.md`'s own **header** and `FULL_SYSTEM_DOCUMENTATION.md` also still at 16.3.5. This compares **14 declared versions across 4 files** against the manifest. It matches **only** the stack-declaration lines, never prose — §44 measured that a looser text rule has no separation between a live claim and a historical one. Per-slot anti-vacuity: renaming one of four rows must fail, because the first attempt checked only "did any row match this file" and `next` silently went unchecked in README. Values are derived from `package.json`; only the locations are declared. `SYSTEM_AUDIT.md` §45 |
| `lib/site/cookie-disclosure.selfcheck.mjs` | `/cookies` disclosure ↔ real client storage, **both directions**; no "encrypted" claim over a base64 encoder; no interactive opt-in for a category that collects nothing; no per-paragraph collection claim with a tracker behind it (`SYSTEM_AUDIT.md` §25) |
| `lib/crm/selectors.selfcheck.mjs` | KPI math **against the real `selectors.ts`**, `formatRelative` both directions, and `roleForEmail` least-privilege resolution (7 non-roster addresses that must NOT be Admin) |
| `lib/crm/api-contract.selfcheck.mjs` | CRM API request schemas (types, email format, length bounds, DB enums, uuid branch), the `no-store` cache contract, malformed-JSON detection, and flat/leak-free field errors (`SYSTEM_AUDIT.md` §22) |
| `lib/crm/inbound-service.selfcheck.mjs` | `mapInboundLeadsToCrm` **idempotence** (ids stable across repeated mapping and input reordering), lead-score bounds, opportunity→company/contact referential integrity, no fabricated phones, `closeDate` anchored to `submittedAt` |
| `lib/email/outcome.selfcheck.mjs` | `resolveEmailPipelineOutcome` — success **only** when both email dispatches succeed; keeps the pre-fix rule inline as an anti-regression assertion |
| `lib/crm/safe-next.selfcheck.mjs` | `safeAppNext()` open-redirect hardening |
| `lib/crm/validation.selfcheck.mjs` | Email/password/name/reply Zod rules |
| `lib/contact.selfcheck.mjs` | Contact-form validation **and the honeypot ordering regression** |
| `lib/security/rate-limit.selfcheck.mjs` | Rate-limit allow/block/expiry + client-key derivation |
| `lib/security/a11y-static.selfcheck.mjs` | Unlabelled form controls + heading-level skips |
| `lib/site/link-integrity.selfcheck.mjs` | Routes, in-page anchors, **cross-page fragments**, `/products/<slug>` vs the catalog, **skip-link resolution (51 links)**, and a bypass-target rule that every route renders `id="content"` (`SYSTEM_AUDIT.md` §21) |
| `lib/site/asset-integrity.selfcheck.mjs` | Every referenced `public/` asset exists |
| `lib/site/sitemap-coverage.selfcheck.mjs` | Sitemap ↔ route tree, both directions |
| `lib/products/registry-integrity.selfcheck.mjs` | 19 engines, `sandboxStatus`, no planned engine is linked as if live |
| `lib/security/contrast-check.mjs` | 20 foreground/background token pairs vs WCAG AA |

| `lib/site/orphan-assets.selfcheck.mjs` | The **reverse** of `asset-integrity`: every servable file in `public/` must be referenced somewhere in source (Next.js metadata conventions are exempt). Reporting only — dead assets cost deploy weight, not visitors (`SYSTEM_AUDIT.md` §30) |

| `scripts/production-write-guard-test.mjs` | The scripts that DDL, seed and email against a **live** database: `apply-schema.mjs` derives its project ref from `SUPABASE_URL` (it was hardcoded, so staging pointed at production), is a dry run unless `--apply --confirm-project <ref>` both match, aborts on a failed statement, and never chains the seed. `seed-supabase.mjs` is inert on import — its writing IIFE is inside the guarded branch, with exactly one IIFE and one call to each seeding function. `test-marketing-automation.mjs` is a dry run unless explicitly applied, and its success banner is guarded by a failure counter that `fail()` actually increments. 37 assertions (`SYSTEM_AUDIT.md` §33, §36) |
| `scripts/production-write-guard-negative.mjs` | Restores each of the original defects — re-chained seed import, hardcoded project ref, hoisted IIFE, unconditional VERIFIED banner, swallowed rejection, dead failure counter — and asserts the guard suite goes red for each. 6/6. This found a real gap: a greedy placement regex stayed green with a second unguarded IIFE present, so the assertions now check multiplicity |
| `scripts/encoding-integrity-negative.mjs` | Restores each encoding defect in a real file — em-dash mojibake, 4-byte emoji mojibake, U+FFFD, BOM, invalid UTF-8, and damage two directories deep so the recursive walk is genuinely tested — and asserts the gate goes red. 7/7, both targets restored byte-for-byte (`SYSTEM_AUDIT.md` §37) |
| `scripts/repair-mojibake.mjs` | General UTF-8-as-cp1252 repair: reverse-maps a Windows-1252 decoder, re-encodes each suspect run, decodes as UTF-8. Its suspect class is **derived from the decoder**, never hand-listed. Note the class is correct for repair and wrong for detection — the verifier was replaced with the round-trip detector in `lib/site/encoding.mjs` after it was measured reporting 8 damaged runs where 4 existed (`SYSTEM_AUDIT.md` §37.3) |
| `scripts/history-secret-scan.mjs` | Every unique text blob in **all 119 commits** (1,222 blobs), read through one `git cat-file --batch`. Reports CONFIRMED / NOT A SECRET / CANDIDATE — **never** "critical" for anything it cannot prove, and never prints a value. Uses **no heuristic**: entropy was tried and `entropy-calibration.mjs` measured that a real 16-char key (3.55 bits/char) scores below a placeholder (3.62), so no threshold exists that is not either blind or useless. Needs a network-free git only (`SYSTEM_AUDIT.md` §40) |
| `scripts/entropy-calibration.mjs` | The measurement behind that decision. Reports the separation margin between real-token and placeholder entropy, and **exits 1 when there is none** — a guard against re-introducing the heuristic on the grounds that it "looks principled" |
| `scripts/anon-access-probe.mjs` | Live RLS check using the **public** anon key against the live project. Counts each table twice — anon, and service-role as ground truth — because "anon saw 0 rows" cannot be distinguished from "the table is empty". Read-only, counts only, never prints row contents. Its count parser self-tests 7 assertions first, including the 206-status bug that made the first version report 10 real rows as an empty table (`SYSTEM_AUDIT.md` §40) |
| `scripts/neutralise-doc-placeholders.mjs` | Rewrites credential-shaped placeholders in docs to a form that cannot match a scanner (`re_<your-resend-api-key>`). Dry-run by default |

| `lib/site/image-sizes.selfcheck.mjs` | Every `quality={N}` on a `<Image>` must appear in `next.config.ts` `images.qualities` — **read from the config, not restated**. An unlisted quality is clamped during SSR: no build error, no runtime error, no visual change, and no effect at all (`SYSTEM_AUDIT.md` §34) |
| `scripts/image-sizes-negative.mjs` | Reinstates `quality={95}` — the exact defect §34 found — and asserts the gate goes red |
| `scripts/brand-asset-report.mjs` | Intrinsic dimensions and SHA-256 grouping for `public/brand`: found 8,345 KB across 27 files of which **3,625 KB is byte-identical duplication** in four groups |
| `scripts/image-variant-report.mjs` | Every `<Image>` use of one source, with the `quality`/`sizes` pairs that split the optimizer cache key |

`npm run test:crm` (`scripts/crm-e2e.mjs`) is a Playwright suite against a production
build. It had been failing at its first assertion for as long as it existed, and nothing
recorded that. It asserted 16 CRM routes, **10 of which were never built**, plus a lead
id, two people's names and a homepage link that do not exist in the repository. Every
route is now derived from `lib/crm/nav.ts` and cross-checked against the filesystem, so the
test cannot drift from the UI. **29 assertions, all passing.** See `SYSTEM_AUDIT.md` §35.

`link-integrity.selfcheck` is the guard that stops the dead-link class of bug from
returning; it understands route groups, dynamic segments, the `/brandbook` rewrite, and
resolves `/page#fragment` links against the target page's real module graph.

`a11y-static.selfcheck` is a **floor, not a ceiling** — it reads JSX literals, so it cannot
see labels supplied at runtime. Passing it does not mean a page is accessible.

`inbound-service.selfcheck` is a **regression gate for a live bug**, not generic coverage.
Before its fix, `mapInboundLeadsToCrm` derived company/contact/opportunity ids from the array
index, so one new inbound lead shifted every existing entity onto a new id and the store
duplicated the whole CRM. The gate was verified to **fail** against the pre-fix code and pass
after — see `SYSTEM_AUDIT.md` §18.

`ai-disclosure.selfcheck` carries its own negative test, because a rule set that has only
ever been seen to pass is not evidence of anything. Each of the **15** rules has a must-fail and
a must-pass string — `scripts/rule-vocabulary-coverage.mjs` holds that at **48/48** — and 5 extraction shapes are asserted separately (bare JSX text must be
found; a false claim quoted inside a comment must **not** be). That test found two real
defects on its first run: `nor` was missing from the scoped-out markers, so *"Neither SSO
nor MFA is implemented"* was reported as a claim; and no rule caught a bare `>Enforced<`.

> **§71 — two more vocabulary defects of the same kind were found in §70**, both
> silent and both live: `multi-?tenant` does not match *"multi-tenancy"* (English
> drops the `-t`: *tenan*-cy), and the telephony rule knew only exact phrases so it
> missed *"Live Supervisor Listen, Whisper & Barge"*. The lesson is that a rule
> whose vocabulary is narrower than its category reports green on most of what it
> exists to catch, and **48/48 was passing throughout** — coverage was measured
> against phrasings already in the rule, which is the check agreeing with itself.

```bash
node scripts/ai-disclosure-injection-test.mjs
```

proves the **whole pipeline** rather than the rules alone, by appending a real claim to a
scoped file, asserting a non-zero exit, and restoring the file byte-for-byte. It covers a
string literal, a bare JSX badge, and a negative control that must stay silent.

When the gate fails, the remaining output is a **NOT VERIFIED inventory** — the content
files that assert controls belonging to product lines built outside this repository. It is
printed, not enforced: those claims cannot be checked from here, and failing the build on
them would be asserting something I have no evidence for. See `SYSTEM_AUDIT.md` §29.8.

The inventory lists at most 4 findings per file and elides the rest, so its header states
the **total finding count and file count** itself (§85.6). It previously reported only the
file count, which meant every total quoted in the audit was a hand-sum of a truncated list
— and the first such total written after §85 was wrong by one.

**Visible strings excludes Tailwind class literals** (§87). `visibleStrings` used to return
every string literal, so `className="flex size-8 items-center"` was scanned as if it were a
sentence and counted in the headline. That was 2,532 of 6,479 units — **39.1%** — so the
number named "visible strings" overstated real copy by more than a third. Class literals are
now tagged `kind: "class"` and skipped by `ai-disclosure` and `docs-claims-drift`, which is
why both report 4,062. Measured before the change: **zero** banned-term matches live inside
a class literal, so no verdict changed. The gate's own probes assert both directions — a
banned term in a `className` is not copy, and a banned term in an `aria-label` or `title`
**is** still scanned.

## Every gate has been observed to fail (§94)

**`npm run test:unit` proves the suite passes. It does not prove any gate could
ever have failed.** A gate that reads nothing, matches nothing and exits 0 looks
identical from the outside to a gate that ran and passed — `gated-render-closure.mjs`
was exactly that for four phases (§75).

`node scripts/gate-falsifiability-probe.mjs` closes that gap. It copies the tree
to `%TEMP%`, mutates **one file in the copy** per case, runs the real gate against
the copy, and asserts a non-zero exit. **The working tree is never written** — a
human-readable assertion, re-checked on every run.

```
§96 falsifiability: 32 proven able to fail, 0 not proven, 0 inconclusive (of 32 attempts across 32 gates).
coverage, computed from package.json "test:unit" (43 entries = 32 gates + 11 negative suites):
  proven able to fail   32/32  (every gate in the suite has been observed to fail)
```

The denominator is **derived from `package.json`**, not typed: `test:unit` has 43
entries, of which 11 are `*-negative.mjs` suites — the machinery that deliberately
makes a gate fail, which must not be counted as a gate. §92.3 said "4 of 35" and
listed seven; both numbers were wrong. §95 then found seven checks that existed
and were never wired, and §95's rewiring broke `docs-claims-drift`, whose
number-word table `twelve … forty` was correct on every count up to forty and
wrong above it — a hand-typed vocabulary with a silent ceiling, now composed
rather than listed.

**The negative suites have their own falsifiability.** §94 proved the gates can
fail; §96 proves the eleven suites that witness that can tell the difference.
`scripts/negative-suite-falsifiability.mjs` runs each suite twice in a sandbox —
once clean, once with **its own gate blinded** — and requires the clean run to
pass and the blinded run to fail. Disabling the *suite* would only prove it has an
assertion; disabling the *gate* asks the real question: if this gate stopped
catching anything tonight, would this suite say so? 11/11.

**What this does and does not establish.** It establishes that no gate in the
suite is a no-op, a silent skip, or blind to the defect it was written for, and
that every wired negative suite detects its gate stopping working. It does **not**
establish that any gate's coverage is complete — each gate was observed to fail
for one mutation chosen by this repository. It also cannot see a check that was
never wired in: `scripts/unwired-checks.mjs` is that missing half, and it
currently reports **1** remaining unwired check
(`production-write-guard-negative.mjs`, which mutates production scripts in place
and is deliberately not wired), plus **21 of 31 gates with no dedicated negative
suite**.

`scripts/gate-probe-selfproof.mjs` falsifies the prober itself: it copies the
probe, **neuters cases in the copy**, and asserts the copy reports them, exits
non-zero, and stops claiming coverage. Without it, "32/32" is a number nobody
should believe — and an earlier revision of the probe printed `28/28` and
`UNKNOWN: 0` in a run where one case had failed and two had never executed (§93.3).

The probe, the self-proof and the negative-suite probe are **not** in `test:unit`:
they mutate files and take several minutes. Run them when the gate set changes.
`test:unit` itself takes ~64 s, up from ~11 s before §95 — `gate-execution-audit`
re-runs every gate, so each newly wired negative runs twice per invocation.

## Manual / runtime verification performed 7 Oct 2026

Against `next build` + `next start` on port 3899:

| Check | Result |
|---|---|
| `test:seo` | **RUN AND PASSING** — 38 routes (all 36 sitemap URLs + `/login`, `/forgot-password`), discovered from the live sitemap. Asserts 200, exactly one `h1`, sane `title` length with no duplicated brand suffix, meta description, absolute canonical, `og:image`, and zero console errors. Fixed 18 real defects: five `| BITS | BITS` duplications, six `| BITS Intelligence Labs | BITS` blog titles, and seven over-length titles. Refuses to report a partial sweep as a pass, and aborts on server loss rather than counting it as page defects (`SYSTEM_AUDIT.md` §27) |
| `test:api` / `test:api:authed` | **RUN AND PASSING** — anonymous: 4 GETs → 401 with `no-store`, 3 POSTs → 401 *before* validation (a 400 would mean parsing ran pre-auth), malformed JSON → 401, no anonymous `PUT`/`DELETE`/`PATCH` → 200. Authenticated: all 4 routes → 200 with `no-store` **and `Vary: Cookie`**; also re-confirms the Phase 15 fixes live (`phone === ""`, `closeDate` anchored to `submittedAt`, 30 entity ids stable across two fetches) |
| Security / cache response headers | **VERIFIED ON THE WIRE (8 Oct)** — `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, HSTS, `Permissions-Policy` on every response; `X-Robots-Tag: noindex` on `/app/*` and `/api/*`. Every `source:` pattern in `next.config.ts` was exercised and none is dead: `/og.png`, `/favicon.ico`, `/brand/*` → `immutable`; `/llms*.txt` → `text/markdown`; `/.well-known/*` → JSON; `/sitemap.xml`, `/robots.txt` → correct content types (`SYSTEM_AUDIT.md` §26) |
| Anonymous `GET`/`POST` to the 4 CRM API routes | **401** for all 7 request shapes (original pass, 7 Oct) |
| `/app/dashboard`, `/app/leads`, `/app/settings` anonymous | **307 → `/login?next=…`** |
| Same routes with a forged `bits_demo_role` cookie | **307 → `/login?next=…`** |
| Public marketing routes (`/`, `/pricing`, `/products`, `/solutions`, `/security`, `/bitscrm`, `/bitsagent`, `/demo`, `/crm-sales`) | **200** |
| Auth routes (`/login`, `/forgot-password`) | **200** |

## Manual / runtime verification performed 8 Oct 2026

Driven through a real browser against a production build (port 3921). Full detail in
`docs/SYSTEM_AUDIT.md` §12.

| Check | Result |
|---|---|
| 18 routes: console errors, `h1` count, title/description/canonical/OG | **0 console errors, exactly 1 `h1` each**, metadata present (fixed: `/legal` + `/cookies` were missing `og:image`) |
| Contact form: empty submit | Blocked by native constraint validation |
| Contact form: malformed email | Blocked ("Please include an '@'…") |
| Contact form: honeypot tripped | Neutral success shown; **returns before `recordInboundLead`** — no row written |
| Contact form: rate limit | Blocked on the **5th** submission with the published brand address |
| Cookie consent | Appears once, persists, does not re-prompt; dialog focus-trapped, Escape closes, toggles named |
| Dark mode | Toggle persists to `bits_theme`; `.dark` applied pre-paint (no FOUC); **0 low-contrast text nodes** in dark mode |
| `/crm-sales` interactivity | Stage switcher mutates state, persists, survives reload |
| Responsive: 5 viewports × 8 marketing routes | **40 combinations, 0 horizontal overflow** |
| Error boundary (deliberately throwing route) | **500**, branded recovery UI, opaque digest only, no raw message leaked, "Try again" clickable |
| 404 page | Correct status, 1 `h1`, **all 10 links resolve** |
| Product + blog surface (20 routes) | **20/20 clean** — 0 console errors, 1 `h1` each, title/description/canonical/og:image/JSON-LD present, 0 heading skips, 0 unnamed controls |
| Keyboard: first 30 tab stops (homepage) | **30/30 have a visible focus indicator**, none scrolled off-screen |
| Skip link | First Tab stop on 5 marketing routes; after activation Tab goes to content, bypassing all 7 header stops |
| Rate limiter scope | **Measured, not assumed** — 3 separate Node processes each allowed exactly 5 for the same key, then blocked |
| `prefers-color-scheme: dark` | `.dark` tracks the emulated preference on 10 routes; rendered output identical in both — **no regression** from the pre-paint script |
| `prefers-reduced-motion: reduce` | GSAP scroll-scrub **suppressed** (`--tab-progress` stays 25% vs 100% when active); 0 elements left at `opacity: 0` after a full scroll in either mode |
| First-visit weight (gzipped, over the wire) | `/` **499 KB**, `/products` 365 KB, `/pricing` 361 KB, `/crm-sales` 310 KB, `/demo` 309 KB. Compression confirmed working (412,832 → 68,854 for the homepage document) |
| robots.txt | 11 crawler groups, consistent allow/disallow, `Host` + `Sitemap` declared, AI content routes not blocked |
| Sitemap gate vs production | Reconciled — both now report **36** URLs (see `SYSTEM_AUDIT.md` §14.4) |
| **Authenticated `/app/*` (7 routes)** | **7/7 clean** — 200, 1 `h1`, 0 heading skips, 0 console errors, 0 overflow, **181 controls all with accessible names**. Verified by signing in through the login page's demo persona |
| Login rate limiting | **Throttles on attempt 9** (8 per account / 20 per client per 10 min); the throttle response is indistinguishable from a normal failure |
| Forgot-password rate limiting | 5 per client per 10 min; response unchanged when throttled |
| Demo role input | Constrained to a registry-derived allowlist; arbitrary values fall back to `sales_director` |
| **Email pipeline outcome** | **Defect found via live production data.** `email_logs` holds 26 rows: 13 `inbound_lead_alert` all `sent`, but **7 `client_wish_list_confirmation` failures** that the action reported to the visitor as success. Fixed by checking both dispatches; covered by `lib/email/outcome.selfcheck.mjs`. See `SYSTEM_AUDIT.md` §20 |

## Not automated / not verified

| Area | Status |
|------|--------|
| `test:responsive` | **RUN AND PASSING** — 11 viewport/zoom profiles, 0 overflow, 0 clipping, exactly 1 `h1` each, 0 small targets. Corrected a prior false claim that this suite could not run; see `SYSTEM_AUDIT.md` §19. Now starts its own server (§38) |
| `test:keyboard` | **RUN AND PASSING** — 10 routes: skip link is the first tab stop and moves focus past the header on all 9 that have one; `/login` has 0 tab stops before main (nothing to bypass); all 16 footer pills on `/pricing` resolve. Found and fixed a missing skip link on `/demo` and 5 dead footer pills (`SYSTEM_AUDIT.md` §21). Now starts its own server (§38) |
| Visual regression | Not automated. Manual sweep done at 375/390/768/1280/1920 for overflow only; no pixel-diff baseline exists |
| Full keyboard-only audit | **Substantially done** — focus indicators on 30 stops, skip links on every shell, and `npm run test:keyboard` verifies the bypass mechanism on 10 real routes (`SYSTEM_AUDIT.md` §21). A raw pixel-level tab-order snapshot of every page has not been captured |
| Lighthouse / Core Web Vitals | **Not run** — requires a deployed build. CLS 0.0101 and overflow were measured directly in-browser instead. Real transfer weight **is** measured, per route, on the production build (`scripts/page-weight.mjs`), with no Lighthouse dependency added |
| Page weight | **Measured, 14 routes.** After §42, `/login` 471 KB, `/pricing` 514 KB, homepage 727 KB. The shared baseline is React + Next + Motion + Radix; further reduction is recorded as the next target, **not** claimed as done |
| Bundle contents | **Measured from the DOWNLOADED set, not the emitted one.** §42's first version reported a 392 KB client chunk containing Zod — a server-side validator that no browser requests. Measuring what the network actually fetched showed it loaded on 0 of 3 pages (`SYSTEM_AUDIT.md` §42.3) |
| Server-action browser path (contact form end-to-end) | **Verified in a browser** (8 Oct). Note: the *honeypot* path was driven end-to-end; a genuine success path was **not** submitted, to avoid writing fabricated rows into the live `inbound_leads` table |
| Per-role / per-action authorization | **Not implemented.** `roleForEmail` now resolves **only** from the team roster (a substring `"admin"` email match that granted Admin UI was removed — `SYSTEM_AUDIT.md` §17), but the roster is localStorage, so the Admin UI is still self-assignable. Server enforcement needs the RBAC source-of-truth decision |
| Icon-only button names | **Not gate-able statically.** A regex check produced a 96% false-positive rate and was removed on purpose; see `SYSTEM_AUDIT.md` §15.5. Caught via rendered-DOM inspection instead |
| AI-disclosure files (`llms*.txt`, `index.md`, `bitscrm.md`) | **Corrected 8 Oct.** Twelve false **security** claims removed: RBAC/ABAC/SSO/MFA (role is UI-only — any authenticated user can read all CRM records), multi-tenancy, WORM audit logs (no audit subsystem exists), SOC 2 Type II and HIPAA (never attested). "AES-256 at rest / TLS 1.3" retained but **re-attributed to the hosting layer**. Replaced with a verified inventory. Marketing claims ("3.2x RPC rates", "68% TCO", "#1 rated", competitor pricing) are **deliberately not gated** — substantiation is an owner decision (`SYSTEM_AUDIT.md` §28) |
| `bits_demo_role` cookie | Written and deleted, and **still read by nothing** — now disclosed accurately as a persona hint that is never consulted for access. Removing it entirely, or giving a component a real use for it, remains an owner decision (`SYSTEM_AUDIT.md` §15.6, §25.3) |
| Cookie/telemetry policy accuracy | **Corrected 8 Oct.** `/cookies` disclosed 3 clients that do not exist (including `bits_crm_session`, described as "encrypted" but backed by a dead module whose encoder was plain base64url) and omitted 11 real localStorage keys. Two dead opt-in toggles for telemetry and attribution were replaced with "Not active"/"Not tracked". Now enforced by `cookie-disclosure.selfcheck` in both directions (`SYSTEM_AUDIT.md` §25) |
| Live `inbound_leads` rows | **10 rows, all fabricated**, surface as real prospects in `/app/leads`. Provenance verified read-only (sources: 4 `Website Contact Form`, 2 `White-Label Partner Consultation`, 2 `Website Contact & Operational Wish List Form`, 1 `BITScrm Landing Specimen`, 1 `Automated E2E Verification Suite`). Not deleted — needs owner approval (`SYSTEM_AUDIT.md` §16, §18.4) |
| Scripts that write to the live DB | **`seed-supabase.mjs`** upserts synthetic rows and **`test-marketing-automation.mjs`** inserts a live lead *and sends real email* via Resend. `crm-e2e.mjs` does **not** touch Supabase (an earlier claim to the contrary was wrong). Point these at a separate demo Supabase project before re-running |
| `contact.selfcheck.mjs` schema fidelity | **Tests a copy, not the source.** `lib/contact.ts` imports `@/lib/site` via a path alias Node can't resolve, so the gate reimplements `contactSchema` inline. Behaviourally identical today, but it cannot detect drift. Recorded, not fixed (`SYSTEM_AUDIT.md` §20.6) |
| Root error boundary (`global-error.tsx`) | **NOW EXERCISED (8 Oct)** — a header-gated canary throw in the root layout was served from a real production build: HTTP **500**, `h1` "Application error", "Reload" button **83×44 px**, branded background intact, **no** canary message / file path / stack frame visible, and `reset()` re-renders without client errors. Required a browser — `curl` saw only the RSC payload and would have false-passed (`SYSTEM_AUDIT.md` §23) |
| CRM demo data | **`seedCrmState()` ships empty** — all entity arrays are 0; only 1 pipeline and 1 team member. See `SYSTEM_AUDIT.md` §13.4 |
| Lint | **Not configured** — the project has no ESLint dependency, so no lint gate exists |
| Dependency vulnerabilities | **Clean as of 10 Oct.** `npm audit` reports 0. `next` was upgraded 16.3.5 → 16.3.8 for 7 advisories (1 critical); four were unreachable — no `next/og`, no `use cache`, no ISR, no `remotePatterns` — and `dynamicParams` was checked against the running server (unknown slugs 404). `source-map-js` is pinned to 1.2.2 via `overrides`. See `SYSTEM_AUDIT.md` §41 |
| Unused dependencies | **None.** `scripts/unused-deps.mjs` reports 24 used / 0 unreferenced. It reads `package-lock.json` as the source of truth for **peer** requirements, because `@supabase/supabase-js` has no import site yet is required by `@supabase/ssr` — a version of this script that missed that would have broken every authenticated page (`SYSTEM_AUDIT.md` §41.3). Report-only, not gated |
| RLS on the live database | **Verified empirically, not read from a file.** `scripts/anon-access-probe.mjs` counts all four tables with the public anon key and with the service role: `inbound_leads` 10, `email_logs` 26, `marketing_automations` 4, `marketing_campaigns` 3 — anon sees **0** on every one. No policy grants `anon` (`SYSTEM_AUDIT.md` §40). Re-run after any schema change |
| Dark-mode contrast outside `/demo` | **Not measured per-page** — the automated gate checks 20 token pairs, not every rendered page in both themes |
| Browser contrast probe | **Known blind spot** — resolves backgrounds from `background-color` only, so it cannot judge text over gradients or background images. It reported false 1.0x ratios on 4 marketing pages. Do not gate on it; use `contrast-check.mjs` plus visual inspection |

> Anything listed here is **not** claimed as passing.
>
> `test:responsive`, `test:keyboard` and `test:crm` are all **verified passing** and can
> be re-run freely — each starts its own `next start` on a free port via
> `scripts/lib/serve.mjs`. Set `RESPONSIVE_BASE_URL` to point either of the first two
> at an instance you are managing yourself. Run `npm run build` first: `next start`
> serves build output, not source.
>
> CORRECTION (10 Oct): this file previously said `test:crm` *"cannot pass — permanently
> broken"* and *"do not treat its red state as a regression"*. That was true when written
> and is now false. `SYSTEM_AUDIT.md` §35 rewrote the suite to derive its routes from
> `lib/crm/nav.ts`; it now reports **29 passed, 0 skipped**.
>
> Note when re-running: each suite picks its own free port, so they will not collide with
> each other or with a dev server. Do not run two against the same `.next` concurrently.