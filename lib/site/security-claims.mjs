/**
 * Pure claim-detection rules for the security-attestation selfcheck.
 *
 * Extracted so they can be negative-tested directly. A gate that has only ever
 * been observed to PASS is not evidence of anything — this module exists so
 * every rule can be shown to FAIL on a known-bad string, and to NOT fire on
 * the honest ways of saying the same thing.
 *
 * See lib/site/ai-disclosure.selfcheck.mjs (the runner) and SYSTEM_AUDIT.md §29.
 */

/**
 * A sentence carrying one of these is NOT an affirmative claim.
 *
 * There are two honest ways to write about a control that is not implemented:
 *   • deny it        — "there is no WORM log", "audit logging is not shipped"
 *   • scope it out  — "Target: masked phone / SSN" in a table badged Roadmap
 *
 * Both must pass, or the gate is defeated by its own correction. It was,
 * twice: first by the honest denials, then by the access-matrix cells prefixed
 * "Target:" — and then AGAIN by a subtle regex bug, because `target:` followed
 * by a space has no word boundary after the colon. Prefix/suffix markers
 * therefore sit OUTSIDE the \b-delimited alternation.
 *
 * SYSTEM_AUDIT.md §44 — KNOWN LIMITATION, MEASURED, NOT FIXED.
 *
 * Matching this regex against the whole sentence grants a blanket exemption: ONE
 * denial anywhere licenses EVERY claim in that sentence, including ones the
 * denial had nothing to do with.
 *
 *   "Quiet hours, cease-and-desist and an immutable audit log are built in,
 *    not bolted on."     → "not" negates the BUILD STYLE, not the controls.
 *                          Three false claims, all silently exempted.
 *
 * That is the most natural way in English to write marketing copy, so it is not
 * an exotic string someone had to go looking for — it is the shape a promo
 * paragraph takes. It was found only because §44 fed real proposed copy through
 * this detector instead of trusting it.
 *
 * WHY THIS IS STILL SENTENCE-LEVEL. Three tightenings were built and measured
 * against the 17 honest strings this repository actually ships:
 *
 *   1. Clause-scoped ("`,` and ` and ` and `nor` are boundaries") — breaks SIX
 *      honest denials. "Not shipped: per-role authorization and audit logging"
 *      strands "audit logging"; "Neither SSO nor MFA is implemented" strands
 *      "MFA"; "Target: full, access-logged" strands "access-logged".
 *   2. Positional ("a denial must PRECEDE the term") — breaks FOUR, including
 *      "HIPAA is not applicable to this product" and "Call-frequency and
 *      cease-and-desist handling is not part of this build", where the denial
 *      legitimately trails the term.
 *   3. Distance window (denial within W chars, either side) — swept. At
 *      W<=20 all four false strings are caught but two honest ones break; at
 *      W>=30 every honest string passes but two false ones slip.
 *
 *      The blocking case is an exact tie. "Immutable audit logging — roadmap"
 *      and "Quiet hours are built in, not bolted on." BOTH place the marker
 *      exactly 26 characters after the term. No threshold separates them.
 *
 * The classes are separated by meaning, not by position: "roadmap" scopes the
 * control, "bolted on" scopes the word "built". Telling those apart needs a
 * parser and a model, and a regex that pretends to would be a rule that can be
 * satisfied by rewording — worse than the honest gap, because it would read as
 * coverage.
 *
 * So the gap is left OPEN and stated rather than papered over. The mitigation is
 * that no shipped string uses this shape (every one is in a proposal document,
 * caught by `scripts/probe-proposed-copy.mjs`), and the honest corpus is now
 * pinned by `scripts/scoping-regression.mjs` so a future edit that breaks one of
 * the 17 fails loudly instead of silently.
 */
export const SCOPED_OUT = new RegExp(
  /*
   * SYSTEM_AUDIT.md §65 — the negation guard.
   *
   * Hyphens are word boundaries in JavaScript, so `\bnot\b` matched the "Not" in
   * **"Do-Not-Call"** — the regulator's own name. `findClaims("Do-Not-Call")`
   * returned nothing: the banned term was scoped out by a denial marker inside
   * itself. The same held for `Cache-Control: no-store`, where the `no` in a
   * header value read as a denial.
   *
   * A negation is a standalone word. Requiring a non-hyphen, non-word character
   * on both sides keeps "there is no compliance" scoped while leaving banned
   * compounds intact — and a false NEGATIVE is worse than a false positive,
   * because it is silent.
   */
  "(?<![-\\w])(no|not|never|without|nothing|none|neither|nor|do not|does not|did not|cannot|can't|isn'?t|aren'?t|wasn'?t|" +
    "absent|planned|roadmap|not implemented|not yet|not shipped|we do not claim|not current" +
  ")(?![-\\w])" +
    "|target:|scoped per contract|not yet implemented" +
    /* §75 — "floor pain point". `components/sections/hero-product.tsx` labels its
     * own problem statement "The Floor Pain Point:" and then, in a SIBLING
     * element, describes manual dialling and call-auditing coverage as the
     * customer's problem. Both are true statements about the collections
     * industry and neither is a BITS capability claim — §49 recorded exactly
     * that, and exempted the file.
     *
     * §49's reasoning was sound and its outcome was not: the exemption was
     * granted for ONE sentence and shielded TWENTY-SIX, including a predictive
     * dialer, a WebRTC softphone with an animated waveform, whisper/barge
     * controls and a ₱0 PBX claim. A per-file exemption granted for a
     * per-sentence reason is the same class as §70 — a check scoped to less
     * than the thing it is asked about.
     *
     * `target:` already works this way: a sentence opts itself out of the rule
     * by declaring what kind of sentence it is. `floor pain point:` is the same
     * convention and carries the same risk — a lazy writer could use it to
     * launder a false claim. That risk already exists for `target:`; adding a
     * second self-declaring marker does not create a new failure mode, it makes
     * an existing one visible in one place.
     *
     * The marker is deliberately required INLINE. The copy already carried it in
     * a sibling <span>, where a sentence-scoped detector cannot see it — the
     * same structural blindness that sank the specimen labels in §70 and §73. */
    "|floor pain point:" +
    /* §75 — "competitor tools:". `the-difference.tsx` is a two-column comparison
     * table. Its left column describes what OTHER products do — "Requires
     * third-party PBX licenses", "Data stored in multi-tenant US/EU clouds" —
     * and rendering those under a red bullet does not stop them reading, alone in
     * a string, as statements about BITS.
     *
     * SYSTEM_AUDIT.md recorded both of these as deliberate non-defects back when
     * §49 ran, on exactly the reasoning that "we are better because they are
     * multi-tenant" and "we are multi-tenant" are the same words to a regex.
     * That reasoning still holds and the file still could not be gated, so the
     * same trade applies: prefix the string with what it actually is. The
     * prefix reads naturally in a comparison table and is true.
     *
     * Same accepted risk as `target:` and `floor pain point:` — the marker can
     * be misused, and §75's scope probes are where that is measured. */
    "|competitor tools:" +
    /* §81 — three more self-declaring markers, all of the same kind: the
     * sentence says what KIND of sentence it is, inline, in its own words.
     *
     * `specimen` — §70 and §73 sank the specimen labels twice because they sat
     * in a sibling element a sentence-scoped detector cannot see. The strings
     * that survived ("Metered Telephony (specimen)", "Telephony Console
     * (specimen)", "Specimen: metered telephony line.") carry it inline, so
     * this is the convention working as intended rather than a new exemption.
     *
     * `zero … required` — a denial of presence. "Zero Telephony Required"
     * asserts the opposite of a telephony claim, and reading it as one is the
     * detector failing to read English, not a copy problem.
     *
     * Same accepted risk as `target:` and `floor pain point:`: a marker can be
     * misused. §75's scope probes are where that cost is measured.
     *
     * NOTE FOR THE NEXT EDIT HERE: the alternative below is joined with `+`
     * and the FLAGS are the argument after the final comma. Concatenating the
     * `"i"` onto the pattern instead compiles `\brequired\bi ` and silently
     * drops case-insensitivity, which un-exempts every capitalised denial
     * ("No telephony in this build.") at once. That is exactly what happened
     * on the first attempt, and it is the same failure shape as §78's
     * `/\\s[*]([(&])/` — a regex that compiles cleanly and matches nothing. */
    "|specimen|\\bzero\\b[^.]{0,24}\\brequired\\b|\\bnot available\\b|remain yours|your responsibility|as the data controller",
  "i"
);

/*
 * The clause-scoping that was tried and measured — kept as a record so the
 * next person to think of it finds out it does not work. It split each
 * sentence on a regex alternation of comma, semicolon, and the coordinating
 * conjunctions and / or / nor / but / yet / while / whereas, then exempted only
 * the clause a denial sat in. See the SCOPED_OUT note above for the six honest
 * denials that broke. (The literal is not reproduced here: its trailing slash
 * followed by `i` would close this comment.)
 */

/** Strip comments so this file's own CORRECTION notes cannot register as claims. */
/**
 * Surfaces that describe the security posture of the deployment built from
 * THIS repository. The rules apply only here.
 *
 * The site also markets product lines that live outside this repo (ERP/BIR
 * accounting, timekeeping, NFC cards, inventory, floor GPS ops). Their claims
 * cannot be verified from this codebase — absence of evidence here is not
 * evidence of absence in a deployment we cannot see. Those are reported as an
 * inventory at the end of the run, never as a build failure. See §29.
 *
 * `lib/site.ts` is shared by all product copy, so it is filtered down to the
 * named exports that actually feed a security surface.
 *
 * SYSTEM_AUDIT.md §44: this list MOVED here from the selfcheck runner so that
 * `scripts/scoping-regression.mjs` pins the same surfaces without re-declaring
 * them. Two lists of "what counts as a security surface" would drift, and the
 * drifting one would quietly stop being checked.
 */
export const SECURITY_SURFACES = [
  /* §101 — the 19-engine matrix page, found by RUNNING it rather than reading it.
   *
   * `/demo` rendered "Live Interactive MVPs", "WebRTC softphone dialers",
   * "Universal SSO + 1-Click" and "Zero-Egress Multi-Tenant" — every one of them
   * a control §71 established this build does not ship. It was invisible to all
   * 34 gates because it was not a surface: no gate scans a file it does not know
   * about, and 96 phases of static analysis never rendered it.
   *
   * The demo modules this page links to (`/crm-*`) all carry the "Synthetic
   * sample data · browser storage only · no server connection" label and assert
   * nothing. The index that presents them as a product matrix asserted the most.
   */
  { file: "app/demo/page.tsx" },
  { file: "lib/security-data.ts" },
  { file: "components/sections/security.tsx" },
  { file: "components/sections/trust-strip.tsx" },
  { file: "components/sections/contact.tsx" },
  { file: "components/sections/crm-variants-explorer.tsx" },
  /* SYSTEM_AUDIT.md §48. Added because the Enterprise & Sovereign pricing tier
   * was selling "Six-tier role-based permission matrix (RBAC) & immutable WORM
   * audit logs" and "strict client & campaign portfolio tenant data isolation"
   * — all three verified absent — and the gate could not see it, because a
   * price a customer pays is a security claim like any other. Fixed in §48 and
   * added here so it cannot come back. */
  { file: "components/sections/pricing.tsx" },
  /* SYSTEM_AUDIT.md §49. The homepage industries section was publishing
   * "RBAC Matrix / Cryptographic immutable log / Immutable", "Tenant Isolation
   * … Enforced", "Quiet Hours … Compliant" and a supervisor HUD with
   * listen/whisper/barge — on the highest-traffic surface in the product, and
   * invisible to the gate. Corrected and added here.
   *
   * components/sections/hero-product.tsx is deliberately NOT added: its one
   * remaining hit is a FALSE POSITIVE. The sentence sits under the heading "The
   * Floor Pain Point" and reads "…calling in quiet hours can lose your bank
   * contract" — a true statement about the customer's problem, not a BITS
   * capability. Teaching the gate that difference is the same semantic problem
   * §44 measured and found unsolvable, so the file stays a known blind spot
   * with the reason recorded rather than being gated and failing on a true
   * sentence. */
  { file: "components/sections/industries.tsx" },
  /* SYSTEM_AUDIT.md §50. Six more files that were publishing attestations for
   * controls this codebase does not have, each corrected and then gated:
   *   • deployment-models.tsx    — "Centralized SSO & RBAC" behind a green tick
   *   • product-families.tsx     — "Multi-Tenant Sovereign" badge
   *   • settings/page.tsx        — "SOC2 Type II & DPA 2012 Compliant" (CRM)
   *   • dashboard/page.tsx       — "BSP 454 Quiet Hour Enforcement" (CRM)
   *   • bits-agent-page-content  — "Quiet hours, DNC, consent, audit"
   *   • bits-agent-call.tsx      — "confirmation logged to audit trail"
   * Two of these were BEHIND THE LOGIN — the product reporting false state
   * about itself to paying customers, which is worse than a marketing claim. */
  { file: "components/sections/deployment-models.tsx" },
  { file: "components/sections/product-families.tsx" },
  { file: "components/sections/bits-agent-page-content.tsx" },
  { file: "components/sections/bits-agent-call.tsx" },
  { file: "app/(crm)/app/settings/page.tsx" },
  { file: "app/(crm)/app/dashboard/page.tsx" },
  /* SYSTEM_AUDIT.md §52. The five machine-readable AI surfaces. Until now they
   * were checked for REFERENCE INTEGRITY ONLY — every link resolved — while the
   * banned attestations were never run against them. public/llms.txt was
   * therefore advertising a WebRTC softphone, PBX integration, call recording
   * and real-time transcription, none of which exist, in the single file most
   * likely to be read by a language model and repeated to a prospect.
   *
   * A machine-readable surface is the highest-leverage place to publish a false
   * claim and the worst place to leave one unchecked: there is no surrounding
   * context, no visual tone, and no reader who knows to be sceptical.
   *
   * SYSTEM_AUDIT.md §60 — this list SHRANK from five entries to two. The other
   * three (`llms.txt`, `llms-full.txt`, `index.md`) describe the ENTIRE 18-product
   * catalogue, so they mix in-repo product copy with out-of-repo lines
   * (accounting/BIR CAS) that this repository cannot adjudicate. That is exactly
   * §50's situation — gating it fails the build on copy that may be accurate and
   * pressures deleting descriptions of software the owner may genuinely ship.
   *
   * They are NOT dropped. `scripts/claim-coverage.mjs` scans them with the same
   * detector and reports them per-line, which is more than "clean" ever was: for
   * seven phases these three files were counted as verified while the extractor
   * was reading 20, 35 and 1 strings respectively and finding none.
   *
   * `bitscrm.md` and `bitsagent.md` describe ONE in-repo product each, so both stay
   * hard-gated. They now actually work: before §60 the extractor saw 3 strings in
   * one and ZERO in the other.
   */
  { file: "public/bitscrm.md" },
  { file: "public/bitsagent.md" },
  { file: "app/(auth)/login/page.tsx" },
  { file: "app/(marketing)/security/page.tsx" },
  { file: "app/(marketing)/legal/page.tsx" },
  { file: "app/(marketing)/bitscrm/page.tsx" },
  {
    file: "lib/site.ts",
    exports: [
      "securityArchitecture",
      "securityPrinciples",
      "deploymentModels",
      "pricingComparisonMatrix",
      /* §67 — `crmModules` is the Flagship CRM deep-dive and describes ONLY the
       * in-repo product, so it is gateable outright with no owner decision. It
       * carried 5 findings while ungated. */
      "crmModules",
      /* §68 — same reasoning, applied per-export instead of per-file. Both are
       * claims about THIS platform, rendered on public pages:
       * `navigationSections` is the site nav (every page); `targetIndustrySectors`
       * is the homepage industry section. Neither describes an out-of-repo line. */
      "navigationSections",
      "targetIndustrySectors",
      /* §69 — §68 deferred these two as needing a product decision. Checking
       * whether they RENDER resolved it: `hardwareScopingTiers` and
       * `scopingProcessSteps` are both consumed by
       * `components/sections/deployment-models.tsx`, a public page. A table that
       * prescribes "Local SIP Trunk or 1x E1/PRI Gateway" and "test call audio
       * clarity (< 20ms LAN jitter)" for a deployment with no telephony is an
       * in-repo false claim whether or not an on-prem offering exists. */
      "hardwareScopingTiers",
      "scopingProcessSteps",
      /* §70 — the RENDER-CLOSURE finding. Every entry above was gated because
       * some file on disk was corrected. This block is gated because a GATED
       * SURFACE RENDERS it, which is a different and stronger reason.
       *
       * `app/(marketing)/bitscrm/page.tsx` has been a gated surface since §50 and
       * has always reported CLEAN — while line 388 renders `pricingTiers.features`,
       * which was selling "Built-in Browser SIP Softphone", "Predictive &
       * Progressive Auto-Dialer" and "Dedicated SIP Trunking & Telco Routing" on a
       * public page. A file-level gate reads the literals IN a file. When the copy
       * is imported, the gate reads nothing and reports the absence of a defect
       * that is on screen. That is worse than an ungated file: a gated surface
       * asserting PASS is a stronger false statement than an ungated one.
       *
       * `scripts/gated-render-closure.mjs` is the check that closes it, so the
       * next imported export cannot be missed the same way.
       *
       * `site` is the sharpest case: its `description` is published by
       * `app/layout.tsx` into the Organization and SoftwareApplication JSON-LD and
       * by `app/manifest.ts` into the PWA manifest — on every page — and read
       * "predictive dialing". `solutionPackages` renders on /pricing.
       * The three `bitsAgent*` exports were already clean; gating them closes the
       * closure gap rather than a finding, which is the point — see §70. */
      "pricingTiers",
      "solutionPackages",
      "site",
      "bitsAgentCapabilities",
      "bitsAgentPricingTiers",
      "bitsAgentUseCases",
      /* §72 — the remaining ungated marketing exports in this file.
       *
       * Two of these RENDER on public pages and were selling telephony:
       * `faqItems` is consumed by `components/sections/faq.tsx` (homepage FAQ
       * and the FAQPage schema — machine-readable, the highest-leverage place
       * to publish a false claim per §52), and `agents` by `app/layout.tsx:212`,
       * which renders it into site-wide ItemList JSON-LD.
       *
       * Seven have **ZERO importers**: `solutions`, `aiAgents`, `industries`,
       * `ecosystemPillars`, `methodologySteps`, `suiteBundlePresets`,
       * `suiteBundleFeatures`. §61 found phantom *components* — a design doc
       * listing files that never existed. These are the mirror image: content
       * arrays that exist, carry the same false claims, and are wired to
       * nothing. They are gated anyway. A dead export carrying a false claim is
       * a loaded gun: it is invisible to every gate today and ships the moment
       * somebody imports it. Gating costs nothing and makes the copy honest
       * before that happens.
       *
       * They are NOT deleted. Whether the owner intends to wire these up is a
       * product decision, and removing marketing content the owner wrote is the
       * same class of call as the out-of-repo product lines (§29) — the record
       * states the reason rather than making the decision quietly. */
      "faqItems",
      "agents",
      "solutions",
      "aiAgents",
      "industries",
      "ecosystemPillars",
      "methodologySteps",
      "suiteBundlePresets",
      "suiteBundleFeatures",
      /* §80 — FIVE MORE dead exports §72 missed. §72 gated seven zero-importer
       * exports; measuring all 37 `lib/site.ts` exports for importers found
       * `heroStats`, `theDifference`, `featureGridItems`, `processSteps` and
       * `footerColumns` with zero references anywhere in app/ components/ lib/.
       *
       * `featureGridItems` still sells "SIP softphone" and "Listen, whisper,
       * barge"; `heroStats` still reads "99.9% — High-Availability Telephony
       * SLA". Neither renders, so neither is a live lie — but dead copy is
       * copy one import away from being live, and these two are the reason the
       * bare-"telephony" gap in §80.3 went unnoticed for the whole audit.
       *
       * Gated, not deleted: removal is the owner's call, and §61 established
       * that orphaned exports are cheap to keep and expensive to re-wire. */
      "heroStats",
      "theDifference",
      "featureGridItems",
      "processSteps",
      "footerColumns",
    ],
  },
  /* §73 — the HOMEPAGE floor showcase. It was never gated, and §73's internal-docs
   * sweep found it still advertising "Predictive Dialer & Softphone", supervisor
   * "Listen / Whisper / Barge", "~0.4s Screen-Pop Latency", "+38% Connect Rate
   * Lift", "Inbound Caller ID Match … call recording", "BITS Training Softphone"
   * and "100% Audited Calls" — on the highest-traffic page in the product.
   *
   * §49's comment explicitly excluded `hero-product.tsx` from gating because one
   * of its sentences is a true statement about the CUSTOMER's problem. This file
   * is the other case: every remaining hit was a BITS capability claim, and all
   * were corrected rather than exempted. */
  { file: "components/sections/hero-product.tsx" },
  /* §75 — the-difference.tsx is the two-column "generic CRM vs BITS" comparison
   * table. Its left column describes what OTHER products do, which §49 recorded
   * as a deliberate non-defect: "we are better because they are multi-tenant" and
   * "we are multi-tenant" are the same words to a regex. That reasoning held and
   * the file still could not be gated, so the left-column strings now carry an
   * inline `Competitor tools:` prefix and the false BITS-column claim (a native
   * WebRTC softphone with ~0.4s screen-pop) is corrected.
   *
   * `products/crm/page.tsx` is the public CRM product page: it was selling a
   * WebRTC SIP softphone, an auto-dialer and a supervisor barge-in HUD, and
   * answering "is it aligned with BSP Circulars 454/857?" with "yes". */
  { file: "components/sections/the-difference.tsx" },
  /* §77 — the last four in-repo public/authenticated surfaces from the 137
   * blind-spot triage.
   *
   * `app/(crm)/app/leads/page.tsx` is the one that mattered most. Behind the
   * login, clicking a phone-icon button fired a toast reading "Dialing {name}
   * via WebRTC softphone." The handler set a status field and nothing dialled.
   * §50 already recorded that "the product reporting false state about itself to
   * paying customers is worse than a marketing claim" — this is that, with a
   * live UI element behind it.
   *
   * `bitsagent/page.tsx` carried an FAQPage JSON-LD *answer* of "Yes, BITSagent
   * supports sovereign on-premises deployment, connecting directly via SIP
   * trunking to Asterisk, FreePBX…". §52 called machine-readable surfaces the
   * highest-leverage place to publish a false claim and the worst place to leave
   * one: a language model reads "Yes" as structured data with no surrounding
   * context to make it sceptically. */
  { file: "app/(crm)/app/leads/page.tsx" },
  { file: "app/(marketing)/cookies/page.tsx" },
  { file: "app/(marketing)/bitsagent/page.tsx" },
  /* §77 — `app/(marketing)/blog/page.tsx` was gated here and then UNGATED, for
   * the same reason as `products/crm/page.tsx` in §75: it imports a mixed
   * catalogue it does not own.
   *
   * The page's OWN copy was fixed and stays fixed — a "<350ms · Dialer Latency"
   * headline metric, a "Sub-350ms predictive dialer" product subtitle, and
   * architects analysing "telco trunk layouts". What cannot be gated is the
   * imported `blogPosts`, 967 lines of which interleave two classes that a
   * regex cannot separate:
   *
   *   BITS SELF-DESCRIPTION (in-repo false claims):
   *     "Operations 360 integrates an ultra-low-latency sub-350ms predictive
   *      dialer… supervisor live whisper/barge-in monitoring, and 100% sovereign
   *      data residency compliant with BSP Circular 857 and RA 10173"
   *     "Integrated Telephony & Predictive Dialing" · "Sub-350ms predictive
   *      dialing and instant screen-pop" · "Built-in supervisor HUD: live
   *      listen, whisper coaching, live call barge-in"
   *
   *   COMPETITOR / INDUSTRY DESCRIPTION (true, and must not be edited):
   *     "Multi-Tenant US / Hyperforce Cloud" · "Cloud WebRTC / Twilio only" ·
   *     "$75 - $155+ USD per user per month plus voice usage and outbound SIP
   *      surcharges" · "Lacks native sub-second predictive dialer…"
   *
   * 44 findings, roughly half each. Adjudicating them is a unit of work in its
   * own right, not a side effect of adding a gate entry, and the honest thing is
   * to record the split rather than silently gate or silently delete. */
  /* §75 — `app/(marketing)/products/crm/page.tsx` was gated here and then
   * UNGATED, and the reason is the collision §50 recorded for llms.txt.
   *
   * It renders `bitsProducts` — the 18-product marketing catalogue — so gating
   * the page means gating ERP, HRMS, Payroll, Inventory and Logistics copy that
   * lives outside this repository. `gated-render-closure` proved it on the first
   * run: after the page's own false claims were corrected it still failed on
   * "Turnkey enterprise financial accounting and ERP suite … Immutable …".
   *
   * The page's real defects WERE fixed and stay fixed — a WebRTC SIP softphone,
   * an auto-dialer, a supervisor barge-in HUD, "Granular RBAC Permissions",
   * "Statutory Contact Hours Enforced", "PCI-DSS Level 1 Ready", and an FAQ
   * answering "aligned with BSP Circulars 454/857?" with "yes". The gate entry
   * is what is deferred, because the alternative is deciding §8 for the owner.
   * The file returns to the reported blind spot, where it is visible. */
  /* §75 — §49 exempted this file from gating, and the exemption was sound on the
   * facts while shielding far more than it was granted for. §49 saw ONE true
   * sentence ("Agents waste 45 minutes of every hour dialing numbers manually…",
   * a statement about the CUSTOMER's staff) and excluded the WHOLE file. The
   * file had 26 finding lines; the other 25 were BITS capability claims, and the
   * telephony tab shipped a WebRTC softphone with an animated waveform,
   * whisper/barge controls, "₱0 PBX Hardware · 100% In-Browser WebRTC" and a
   * predictive dialer.
   *
   * It renders inside `hero.tsx` — the homepage hero.
   *
   * A per-file exemption granted for a per-sentence reason is the same class as
   * §70: a check scoped to less than the thing it is asked about. The file is
   * now gated, and the two genuine pain-point sentences carry an inline
   * `Floor pain point:` marker so the detector can tell them apart. */
  { file: "components/sections/floor-showcase.tsx" },
  /* §74 — the public marketing surface itself, triaged from the 194-finding
   * blind spot. Every hit in these six files was an in-repo BITS capability
   * claim, not an out-of-repo product line, so unlike §72's dead exports and
   * §29's product catalogue there was nothing to defer.
   *
   * `app/layout.tsx` is the sharpest: its strings publish into the
   * Organization / SoftwareApplication JSON-LD and the site-wide meta keywords,
   * which is how "predictive dialer CRM" and "Predictive Dialer Telephony" were
   * being served to search engines as things BITS *knows about*.
   *
   * Three separate live-looking indicators were also corrected here — a pulsing
   * "0.4s Screen-Pop" pill, a pinging "Multi-Trunk Carrier Telemetry" widget
   * showing "Primary SIP ● 11ms", and an animated green dot on a dialer queue
   * row. Each asserted real-time state for infrastructure that does not exist.
   * That is §56's pattern, and a static panel with a pulse on it is the same
   * lie as a static panel without one. */
  { file: "components/sections/stats-strip.tsx" },
  { file: "components/sections/features-hero.tsx" },
  { file: "components/sections/hero.tsx" },
  { file: "components/layout/footer.tsx" },
  { file: "app/layout.tsx" },
  { file: "app/(marketing)/page.tsx" },
  /* §70 — /pricing is where `solutionPackages` is rendered. It was never a gated
   * surface, so nothing checked the package table a customer reads while choosing
   * what to buy. */
  { file: "app/(marketing)/pricing/page.tsx" },
];

/* §103 — this was a regex, and it silently deleted copy.
 *
 * The old one-liner was `src.replace(REGEX, "$1 ")`, where REGEX is the
 * character class `(^|[^:"'`\\])` followed by an escaped `//` and `[^\n]`.
 *
 * (Written out in prose on purpose: the literal form contains a `*` immediately
 * before the closing slash, so pasting it into this comment would end the
 * comment early. That is not hypothetical — the first version of this note did
 * exactly that and the module failed to parse.)
 *
 * The guard exists so that the `//` in `http://` is not read as
 * a comment. It skips the FIRST `//` after a colon. It does not skip the SECOND.
 *
 * In `'https://cdn.example/a//b'; const s = "SOC 2 Type II";` the first `//` is
 * preceded by `:` and survives; the second is preceded by `a`, which matches the
 * guard, so everything from there to end-of-line is deleted — including a banned
 * attestation sitting on the SAME line. Measured on two of three fixtures, one of
 * which returned NO string literals at all:
 *
 *   <a href="https://x.dev/a//b">Immutable audit log</a>   ->  []
 *
 * This ran BEFORE extraction, so the gate did not under-report: it stopped being
 * able to see. No gated surface triggers it today — both implementations were run
 * over all 34 and produced identical output — so it was latent, not an active
 * false negative. Latent is not the same as harmless in the function that decides
 * what copy is checked.
 *
 * Replaced with the character-wise scanner `a11y-static.selfcheck.mjs` already
 * used, which tracks string state and therefore cannot mistake a `//` inside a
 * literal for a comment. The two were measured equivalent on every gated surface
 * before the swap, so this is a correctness fix, not a behaviour change.
 */
export function stripComments(src) {
  let out = "";
  let i = 0;
  while (i < src.length) {
    const two = src.slice(i, i + 2);
    if (two === "/*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      out += " ";
      continue;
    }
    if (two === "//") {
      const end = src.indexOf("\n", i);
      i = end === -1 ? src.length : end;
      out += " ";
      continue;
    }
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") {
          j += 2;
          continue;
        }
        if (src[j] === quote) {
          j++;
          break;
        }
        // A `//` inside a URL string must not start a comment. An unterminated
        // single/double-quoted literal ends at the newline, matching JS.
        if (quote !== "`" && src[j] === "\n") break;
        j++;
      }
      out += src.slice(i, j);
      i = j;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

/**
 * Reduce source to the words a visitor can actually read: string literals and
 * bare JSX text.
 *
 * Two passes, because neither alone is sufficient:
 *   1. string literals — "Immutable WORM / On-Prem"
 *   2. bare JSX text   — `>Enforced<`, the single worst string of the Phase-29
 *      audit, sitting between two tags in components/sections/security.tsx.
 *      No string-literal scan can see it, which is why it survived the first
 *      version of this gate.
 *
 * Everything else — identifiers, class names, punctuation, code — is discarded
 * BEFORE any sentence splitting, so the splitter cannot attribute a term to an
 * unrelated span of TypeScript that happens to follow a ". ".
 *
 * §78 — each entry also carries `index`, its offset in the COMMENT-STRIPPED
 * text. Callers that need to know WHERE a string sits (to resolve which object
 * literal contains it) must use this and not `src.indexOf(value)`: these files
 * contain duplicate strings — the same cons entry appears under two vendors —
 * and `indexOf` always returns the FIRST one, which silently attributes a
 * competitor's cell to the row above it. §78 measured a false positive produced
 * by exactly that before the offset was available.
 */
/**
 * SYSTEM_AUDIT.md §87 — where a string literal ends up being a Tailwind class.
 *
 * WHY THIS EXISTS
 * ---------------
 * `visibleStrings` returns EVERY string literal, tagged `kind: "string"` for a
 * quoted value and `kind: "jsx"` for bare JSX text. A `className="flex size-8
 * items-center bg-blue-50"` value is therefore indistinguishable from the
 * sentence `"No telephony ships in this build"` — same extractor, same kind,
 * both handed to every rule.
 *
 * That is not a cosmetic problem. Measured across all 33 gated surfaces:
 *
 *     scanned units          6,479
 *     class literals         2,532   (39.1%)
 *     copy literals          3,947
 *
 * So the headline "6,479 visible strings" that `ai-disclosure`,
 * `docs-claims-drift`, `docs/TESTING.md` and `SYSTEM_AUDIT.md` all quote
 * overstated the real copy by 39%. A quantity named "visible strings" that is
 * 39% Tailwind utility classes is not that quantity.
 *
 * HOW IT DECIDES
 * --------------
 * By LEXICAL SCOPE, not by shape. §81 already established that a literal must
 * be judged by where it sits; this is the same principle applied one level up,
 * from a single token to a whole attribute value.
 *
 * Two bugs in a hand-rolled version of this produced confidently wrong numbers,
 * and both are recorded here because they are easy to repeat:
 *
 *   1. `(?=["'`{])` is a ZERO-WIDTH lookahead. `m[0]` ends at the `=`, so the
 *      opening quote/brace is the NEXT character. `m.index + m[0].length - 1`
 *      points at `=`; the opener reads as "=" and every range is garbage.
 *   2. `let depth = 0` with the loop starting at `start + 1` never counts the
 *      OPENING brace, so a `{…}` value closes on an EXTRA `}`. One `className`
 *      swallowed 333 lines and misclassified real copy — including the §70/§73
 *      specimen labels — as class values.
 *
 * KNOWN COST, DECLARED: braces inside string literals are not tracked, so a
 * class expression containing an unbalanced `{` in a literal can still extend a
 * range. Measured to cause zero misclassifications today, and the negative
 * tests in `ai-disclosure.selfcheck.mjs` assert the property rather than
 * assuming it.
 */
export function classLiteralRanges(src) {
  const ranges = [];
  const re = /\b(?:class|className|cx)\s*=\s*(?=["'`{])/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index + m[0].length; // the lookahead is zero-width
    const opener = src[start];
    let i = start + 1;
    if (opener === "{") {
      let depth = 1; // the opening brace IS at `start`
      for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
          depth--;
          if (depth === 0) break;
        }
      }
    } else {
      while (i < src.length && src[i] !== opener) {
        if (src[i] === "\\") i++;
        i++;
      }
    }
    ranges.push([start, i]);
    re.lastIndex = i;
  }
  return ranges;
}

export function visibleStrings(src) {
  const text = stripComments(src);
  const classRanges = classLiteralRanges(text);
  const isClass = (index) => classRanges.some(([a, b]) => index >= a && index <= b);
  const out = [];

  const literal = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
  for (const m of text.matchAll(literal)) {
    const value = m[0].slice(1, -1).trim();
    if (value.length > 1) {
      out.push({ kind: isClass(m.index) ? "class" : "string", value, index: m.index });
    }
  }

  for (const m of text.matchAll(/>([^<>{}]+)</g)) {
    const value = m[1].trim();
    if (value.length > 1 && /[A-Za-z]/.test(value)) out.push({ kind: "jsx", value, index: m.index });
  }

  return out;
}

/**
 * SYSTEM_AUDIT.md §59 — markdown prose, reduced to what a reader of a PUBLISHED
 * document would read.
 *
 * The sibling of `visibleStrings`, and deliberately in the same module: it reuses
 * `findClaims`, so the ATTESTATIONS stay one list in one file and cannot drift
 * from the JavaScript surface. §45's lesson was that two declarations of "what
 * counts as a security surface" quietly stop being checked; this is the opposite
 * arrangement — one detector, two extractors.
 *
 * What is removed before any sentence splitting, for the same reason §44 stripped
 * identifiers and punctuation: formatting is not a claim, and letting it through
 * attributes a term to an unrelated span. Fenced blocks, inline code spans and
 * struck-through text (`~~…~~`, this project's own correction convention) go; what
 * survives is heading, list, table and paragraph text.
 *
 * `quoted` marks a blockquote, which in this project is the CORRECTION BANNER
 * convention. It is reported, never suppressed — suppression would remove the
 * evidence that the detector still fires.
 */
export function markdownProse(src) {
  const out = [];
  let inFence = false;

  src.split("\n").forEach((raw, i) => {
    /* `i + 1`, not `raw + 1`. The latter is string concatenation in JavaScript —
     * `"> foo" + 1` is `"> foo1"`, not 4 — which printed a line's own text where
     * its number belonged. A report with no locators cannot be acted on. */
    const line = i + 1; // 1-based, for reporting
    if (/^\s*```/.test(raw)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    const cleaned = raw
      .replace(/`[^`]*`/g, " ")
      .replace(/~~[^~]*~~/g, " ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^[>\s]*(?:[-*+]|\d+\.)\s+/, "")
      .replace(/^[>\s]*#+\s+/, "")
      .replace(/[*_>|#]/g, " ")
      .trim();

    if (cleaned.length > 3 && /[A-Za-z]/.test(cleaned)) {
      out.push({ line, value: cleaned, quoted: /^\s*>/.test(raw) });
    }
  });

  return out;
}

/**
 * SYSTEM_AUDIT.md §60 — pick the extractor by FILE TYPE.
 *
 * The gate ran `visibleStrings()` over five `public/` AI surfaces that are plain
 * markdown and text. `visibleStrings` looks for JS string literals and bare JSX
 * text, and plain prose is neither, so those files yielded almost nothing:
 *
 *     public/llms.txt        20 strings,  0 claims   (a reader sees 56 lines, 2)
 *     public/llms-full.txt   35 strings,  0 claims   (a reader sees 63 lines, 4)
 *     public/index.md         1 string,   0 claims   (a reader sees 36 lines, 3)
 *     public/bitscrm.md       3 strings,  0 claims   (a reader sees 33 lines, 7)
 *     public/bitsagent.md     0 strings,  0 claims   (a reader sees 25 lines, 2)
 *
 * They have been counted as CLEAN in the 23-surface total since §52. They were
 * never checked. `bitsagent.md` cannot fail under any edit whatsoever, because
 * the extractor sees none of it.
 *
 * A gate that reports PASS on a file it never reads is worse than no gate: it
 * converts an unknown into a confident answer. Dispatching on extension is the
 * whole fix, and it is why the format-specific extractors are siblings in this
 * file rather than ad-hoc helpers in whichever script needed them.
 */
export function stringsFor(file, src) {
  return /\.(md|markdown|txt)$/i.test(file) ? markdownProse(src) : visibleStrings(src);
}

/**
 * §81 — IS THIS STRING LITERAL COPY, OR AN IDENTIFIER?
 *
 * WHY THIS EXISTS
 * ---------------
 * Adding the bare word `telephony` to the telephony rule (§80) surfaced 27 hits
 * inside gated surfaces. Six of them were not claims at all:
 *
 *   type ActiveTab = "cockpit" | "telephony" | "field" | "qa";   ← TS union member
 *   type ShowcaseTab = "telephony" | "field" | …;                ← TS union member
 *   key="tab-telephony"                                          ← React key
 *   id: "telephony-sla",                                         ← DOM id
 *   imageSrc: "/images/features/telephony-console-specimen.webp" ← asset path
 *
 * A tab called `telephony` and an asset called `telephony-console.webp` are
 * not claims about the product. They are names. Renaming them to satisfy a
 * detector would be the wrong fix twice over: it churns internal identifiers,
 * and `telephony-console-specimen.webp` is referenced from documentation.
 *
 * HOW IT DECIDES
 * --------------
 * By POSITION, not by shape. `value.length > 1` cannot separate these from real
 * copy — "Enforced" and "telephony" are both single tokens, and the
 * enforcement-badge rule exists precisely to catch single-token badges. The only
 * honest discriminator is where the literal sits in its source.
 *
 * `src` MUST be the comment-stripped text, because `visibleStrings` reports
 * offsets into that text; passing raw source would read context that has been
 * removed.
 *
 * KNOWN COST, DECLARED: a real claim placed in an `id:`/`key:` field is exempt.
 * That is accepted — an anchor target is not rendered copy — and it is stated
 * here rather than discovered later.
 */
export function isNonCopyLiteral(strippedSrc, index, value) {
  const v = String(value ?? "").trim();
  if (!v) return true;

  // An asset or module path. Has both a directory-ish opener and a file
  // extension, so prose like "Billing / operations" cannot match.
  if (/^(?:\.{0,2}\/|\/)/.test(v) && /\.(?:png|jpe?g|webp|avif|svg|gif|ico|css|m?js|tsx?|json|md|html|txt|pdf|woff2?)$/i.test(v)) return true;

  /* §81 — a code fragment caught by the `>…<` JSX pass.
   *
   * `visibleStrings` reads bare JSX text between tags, and in
   * `hero-product.tsx` a ternary spanning lines matched it:
   *
   *   ) : activeTab === "telephony" ? (
   *
   * That is JavaScript, not prose, and it should never have been extracted.
   * Strict comparison, arrow, and the logical operators cannot appear in
   * visitor-facing copy, so they are an honest signal — unlike a bare `?`,
   * which this file's own copy uses in real questions. */
  if (/===|!==|=>|\|\||&&|\bnew\s+[A-Z]/.test(v)) return true;

  /* §81 — an all-lowercase, single-token literal is a NAME.
   *
   * The positional rules below only cover the shapes §80 happened to find
   * (`type X = "a" | "b"`, `id: "…"`, `key="…"`). The same value also appears as
   * `nextTab = "telephony"` and as a bare array element in a tab table, which
   * are identifier positions no single regex about position will catch.
   *
   * Shape is the right test HERE and only here, because case separates the two
   * classes where length does not: "telephony" (a tab id) and "Telephony" (a
   * category label rendered to a visitor) are the same length, and only one is
   * copy. Mixed-case single tokens are therefore still scanned, and the
   * positional rules handle those.
   *
   * KNOWN COST, DECLARED: a lowercase single-token DATA value that reads as a
   * bare claim — e.g. `badge: "enforced"` — is exempt. Rendered copy in this
   * codebase is JSX (`>Enforced<`) or a sentence, and JSX text is not filtered
   * by this branch, so the enforcement-badge rule is unaffected. */
  if (/^[a-z0-9][a-z0-9_-]*$/.test(v)) return true;

  if (index == null || index < 0 || !strippedSrc) return false;
  const before = strippedSrc.slice(Math.max(0, index - 140), index);

  // DOM/React identity attributes.
  if (/(?:\bid|\bkey|aria-[\w-]+|data-[\w-]+)\s*[:=]\s*"?$/.test(before)) return true;
  // TypeScript literal-union member: `type X = "a" | "b" | …`
  if (/\btype\s+[A-Za-z0-9_]+\s*=\s*(?:"[^"]*"\s*\|\s*)*"?$/.test(before)) return true;

  return false;
}

/**
 * Reduce a shared content module to the named exports that feed a security
 * surface. `lib/site.ts` holds every product's copy, so scanning it whole would
 * either fail on out-of-repo product lines or be uselessly broad.
 *
 * These module-level arrays terminate with `] as const;` or `];` at column 0,
 * so the region runs to the next such terminator.
 */
export function exportRegion(src, name) {
  const start = src.search(new RegExp(`^export const ${name}\\b`, "m"));
  if (start === -1) return null;
  const rest = src.slice(start);
  const end = rest.search(/^\]( as const)?;\s*$/m);
  return end === -1 ? rest : rest.slice(0, end + 1);
}

/**
 * Sentence split — and §82's second silent-miss class.
 *
 * The original was `text.split(/(?<=[.;])\s+/)`, which treats every `;` before
 * a space as a sentence boundary. In JSX that includes the end of an HTML
 * entity, so:
 *
 *   "BSP 857 &amp; NPC RA 10173 Aligned"
 *     →  ["BSP 857 &amp;", "NPC RA 10173 Aligned"]
 *
 * The `contact-rules` term needs the circular number AND an alignment word
 * within 40 characters; splitting between them puts neither half over the
 * threshold, and the claim disappears. Four gated surfaces shipped this exact
 * string and the gate has been reporting clean on all of them.
 *
 * This is §76's failure with a new disguise: the detector ran, printed a
 * confident pass, and matched nothing — because it was not shown the sentence.
 *
 * The lookbehind refuses to split at a `;` that terminates an entity. A real
 * sentence semicolon ("Step one; then two") still splits, because there is no
 * `&` in front of it. */
const SENTENCE_SPLIT = /(?<!&[#\w]{1,10})[.;]\s+/;

export function sentences(text) {
  return text.split(SENTENCE_SPLIT);
}

/**
 * SYSTEM_AUDIT.md §44 — why this is POSITIONAL and not clause-scoped.
 *
 * The obvious fix is to split the sentence into clauses and exempt only the
 * clause a denial sits in. That was implemented, run against the real corpus,
 * and it broke six honest denials that ship in this repository:
 *
 *   "Not shipped: per-role authorization and audit logging."
 *      → " and " split stranded "audit logging" next to no denial.
 *   "Target: full, access-logged"
 *      → a comma split stranded "access-logged" behind "Target:".
 *   "Neither SSO nor MFA is implemented"
 *      → splitting on "nor" stranded "MFA".
 *   …plus three denial sentences in /security and /legal that scope a comma or
 *   "and" list.
 *
 * Those denials are the CORRECTIONS. A gate that cannot pass them is not a gate
 * worth having, and "fixing" one by deleting the denial is precisely how the
 * correction gets lost. The sentence as a whole must stay the unit.
 *
 * What actually separates the two classes is WHERE the denial sits. Every
 * honest denial in this codebase puts the marker BEFORE what it denies
 * ("Not shipped: … audit logging", "There is no audit-log table", "this build
 * does not yet produce immutable audit trails"). The false claim puts it after,
 * because English puts the contrast last: "…, not bolted on" — that "not"
 * negates the build style, not the controls named earlier in the line.
 *
 * Known limitation, accepted deliberately: a sentence that denies something
 * early and then affirms the SAME term later — "There is no audit-log table,
 * but we do export audit logs" — exempts both. It is contrived, no shipped
 * string does it, and closing it needs semantics no regex has. Recorded rather
 * than papered over.
 */
export function affirmativeClaims(text, term) {
  const hits = [];
  for (const s of sentences(text)) {
    const flat = s.replace(/\s+/g, " ").trim();
    if (flat.length <= 1) continue;
    /* §81 — a QUESTION asserts nothing.
     *
     * Adding the bare word `telephony` surfaced two FAQ headings:
     *   "Does BITSagent include telephony?"
     *   "Can BITS integrate with our existing legacy systems and telephony?"
     *
     * Both were reported as claims. They are not claims in either direction —
     * they are questions, and their ANSWERS are separately scanned as copy. A
     * detector that flags the interrogative is not auditing the product, it is
     * auditing punctuation.
     *
     * This is scoped to the trailing `?` only. §76 removed a bare `?` heuristic
     * on other grounds, and it would still be wrong here: a visitor-facing
     * heading may legitimately end in one. */
    if (flat.endsWith("?")) continue;
    if (term.test(flat) && !SCOPED_OUT.test(flat)) hits.push(flat);
  }
  return hits;
}

/**
 * The banned attestations. Each `why` must state the verified reason the claim
 * is false, because it is printed verbatim when the gate fails — the failure
 * message is the explanation.
 */
export const CHECKS = [
  {
    id: "soc2",
    /* §71 — the term was the SOC 2 acronym alone. ISO 27001 is the other
     * certification a Philippine/B2B security page reaches for, and naming it
     * without "aligned", "aligned with", or "certified" was invisible: a
     * sentence listing ISO 27001 among the standards the platform "proactively
     * integrates" reads as an attestation to a compliance officer. The
     * repository holds no ISO 27001 certification, alignment statement or
     * audit of any kind. */
    term: /\bSOC\s*2\b|\bISO[\s/]?27001\b|\bISO[\s-]?9001\b|\bPCI[\s-]?DSS\b|\bNIST\s*(?:CSF|800-53)\b/i,
    why:
      "SOC 2 Type II, ISO 27001 and PCI DSS are third-party audit attestations; " +
      "no such audit has been performed",
  },
  {
    id: "worm",
    /* §65 — the term was the acronym only. "WORM" appears in the rule author's
     * vocabulary; marketing copy says "write-once read-many" or "append-only". */
    term: /\bWORM\b|write[\s-]?once|read[\s-]?many|append[\s-]?only|immutably retained/i,
    why: "immutable/WORM audit logging is not implemented — there is no append-only audit store",
  },
  {
    id: "hipaa",
    term: /\bHIPAA\b/i,
    why: "HIPAA alignment implies a protected-health-information pipeline; none exists",
  },
  {
    id: "multitenant",
    /* §65 — "multi-tenant" alone missed "tenant isolation" and "each tenant's data
     * is siloed", which say the same thing in the words copywriters use.
     *
     * §70 — and `multi-?tenant` does NOT match "multi-tenancy". English drops
     * the -t: tenancy is tenan-cy, not tenant-cy. MEASURED, not assumed —
     * /multi-?tenant/.test("multi-tenancy") === false, while
     * /multi-?tenant/.test("multi-tenant") === true. The single most ordinary
     * way a pricing page says multi-tenant was therefore invisible, and it was
     * shipping: `pricingTiers` published "Unlimited agent seats & multi-tenancy"
     * on /bitscrm and /products/[slug] against a single-tenant app. */
    term: /multi-?tenan(?:t|cy|ce)|tenant[\s-]?(isolation|isolated|separation|boundary|silo|scoping)|per-tenant|tenant-level|tenant\b[^.]{0,24}\bsilo/i,
    why: "the application is single-tenant; there is no tenant isolation to claim",
  },
  {
    id: "rbac",
    /* §65 — this term missed the exact phrase §63 found sitting in
     * `deployment-models.tsx`: "role-based permissions". It also missed the prose
     * form ("only Managers and Admins can…") that a UI never spells RBAC. */
    term: /Role-Based Access Control|\bRBAC\b|role-based\s+(permissions?|access|controls?)|permission\s+matrix|role-gated|(?:only|admins?|managers?|operators?)\s+(?:and|or)\s+(?:admins?|managers?|operators?|supervisors?)\s+can/i,
    why:
      "role-based access control is UI-only — requireCrmUser() authenticates a session " +
      "but never checks a role, so any signed-in user can read every CRM record",
  },
  {
    id: "sso-mfa",
    /* §65 — SSO/MFA/GraphQL are all acronyms. Copy says "SAML SSO" or
     * "two-factor authentication". `multi-factor` alone is NOT enough: the CRM demo
     * renders "Multi-factor confirmation recorded for this session", which is a
     * count of OTP steps, not an MFA control. Require the authentication noun. */
    term: /\bSSO\b|\bMFA\b|\bSAML\b|(?:multi|two)-?factor[\s-]?auth|\b2FA\b/i,
    why: "SSO and MFA enforcement are not implemented",
  },
  {
    id: "auditlog",
    term: /audit[\s-]?(trail|trails|log|logs)|activity[\s-]?logs?|access[\s-]?logged/i,
    why: "there is no audit-log table and no append-only store in this codebase",
  },
  {
    id: "immutable",
    term: /immutable|tamper[\s-]?(proof|evident|resistant|secure)/i,
    why:
      "no immutable or tamper-evident store exists; immutability is a property of the " +
      "storage layer, not of this application",
  },
  {
    id: "masking",
    term: /PII masking|masked (phone|SSN)|masking/i,
    why: "no masking routine exists — grep for mask|redact matches no CRM code",
  },
  {
    id: "isolation",
    /* §65 — the term said "campaign", so "Customer data isolation" — one of the
     * most ordinary sentences on a B2B security page — was not a hit at all. */
    term: /campaign[\s-]?(level\s+)?data isolation|campaign isolation|multi-campaign scoping|(?:customer|client|tenant|data|record)[\s-]?(data\s+)?isolation|isolated per (?:client|customer|tenant)|per-?(?:client|customer) isolation/i,
    why: "the deployment is single-tenant with no campaign scoping or record isolation",
  },
  {
    id: "crypto-enforced",
    term: /cryptographically (enforced|verified)/i,
    why: "no cryptographic role enforcement exists; authentication is a session check",
  },
  {
    id: "contact-rules",
    /* §65 — the term listed enforcement mechanisms but not the regulation. Half the
     * corpus says "BSP 454/857" and "contact window" without ever writing
     * "quiet hours".
     *
     * The window terms REQUIRE an enforcement verb near them. Adding the bare noun
     * made `scoping-regression.mjs` fail on real shipped copy — "Contact-window …
     * handling is an enterprise configuration" — which is honest, because the
     * denial that matters ("These rules are not enforced by this build") sits in
     * the PREVIOUS sentence. That is §44's sentence-splitting failure reproduced in
     * the vocabulary, and the regression suite caught it rather than me.
     */
    term: new RegExp(
      "quiet[\\s-]?hour|frequency cap|Do-Not-Call|\\bDNC\\b|cease-and-desist|" +
        "BSP[\\s-]?(?:Circulars?[\\s-]?)?(?:454|857)[^.]{0,40}(?:enforc|complian|aligned|strict|full|adher|guarantee|100%)|" +
        "(?:enforc|complian|aligned|strict|full|adher|guarantee)[^.]{0,40}BSP[\\s-]?(?:Circulars?[\\s-]?)?(?:454|857)|" +
        "\\bMPSC\\b|" +
        /* window nouns only count next to an enforcement verb — see note above */
        "(?=[^.]{0,40}(?:enforc|gating|suppress|block|autom|complian))[^.]{0,40}contact[\\s-]?(?:hour|window)|" +
        "(?:enforc|autom\\w*|complian)[^.]{0,40}contact[\\s-]?(?:hour|window)|" +
        "(?:enforc|autom\\w*|complian)[^.]{0,40}call[\\s-]?window",
      "i"
    ),
    why: "contact-rule enforcement is not implemented in this build",
  },
  {
    /*
     * A BARE enforcement badge.
     *
     * The single worst string of the Phase-29 audit was `<span>Enforced</span>`
     * in components/sections/security.tsx — an emerald "Enforced" chip sitting
     * above a table of role boundaries that nothing enforced. No other rule
     * caught it, because the word on its own is not a claim; it became a false
     * claim only in the company it kept.
     *
     * Deliberately narrow: the ENTIRE visible string must be the word. Real
     * prose like "enforced in code" must not trip this.
     */
    id: "enforcement-badge",
    /* §65 — `^(enforced|compliant|secured)$` matched a bare word and nothing else,
     * so the badge's most common real form, "100% Compliant", sailed past. The
     * anchor stays for the standalone label; a qualified badge is matched in
     * front of it rather than by dropping the anchor entirely. */
    term: /(?:^|\b)100\s?%\s+(?:compliant|enforced|active|secure)\b|fully\s+active|^(enforced|compliant|secured)$/i,
    why:
      "a bare 'Enforced' badge asserts a shipped control; nothing on this " +
      "deployment enforces per-role access or record isolation",
  },
  {
    /*
     * SYSTEM_AUDIT.md §52/§53 — the first rules that describe CAPABILITIES.
     *
     * The thirteen above all describe SECURITY properties, so an entire category
     * of false claim passed them: there is no telephony in this codebase, and
     * public/llms.txt advertised "Browser-native WebRTC SIP softphone, Asterisk /
     * FreePBX PBX integration, automated call recording, real-time transcription".
     *
     * Verified absence, not absence of checking — RTCPeerConnection,
     * getUserMedia and SDP handling return ZERO matches across 122 source
     * files; Asterisk, FreePBX and GraphQL return zero matches anywhere.
     *
     * §52 built this rule, measured it at 20 findings across 9 surfaces, and
     * declined to ship it, reasoning that switching it on needed an owner
     * decision. That reasoning was wrong and §53 corrects it. Those findings
     * split three ways, and all three are decidable HERE:
     *
     *   1. marketing claims about the in-repo flagship having telephony — the
     *      same verified-false class as RBAC and WORM. Corrected.
     *   2. synthetic demo UI — the standing constraint is that demo modules are
     *      client-side, localStorage, SYNTHETIC AND LABELLED. An unlabelled
     *      softphone simulation is the exact failure that constraint exists to
     *      prevent. Labelled, not deleted.
     *   3. specimen/demo UI whose purpose is to illustrate a configuration —
     *      labelled as a specimen.
     *
     * Asking permission for work the audit was already chartered to do is its
     * own kind of stall.
     */
    id: "telephony",
    /* SYSTEM_AUDIT.md §62 — the term was narrower than the category.
     *
     * §52 shipped this rule against six spellings: WebRTC, SIP, Asterisk, FreePBX,
     * "call recording", "real-time transcription", "softphone". Every one of those
     * is a *technology* word. The way telephony is actually SOLD in this repository
     * is almost never with a technology word — it is "sub-350ms predictive dialing",
     * "supervisor HUD (live listen, whisper coaching, call barge-in)", "predictive
     * dialer", "screen-pop". Those passed the gate for a decade of documents
     * because none of them contains the literal string "WebRTC".
     *
     * A rule whose vocabulary is narrower than its category is a rule that reports
     * green on most of the thing it is supposed to catch. Widened to the vocabulary
     * actually in use; measured, not assumed — see §62.
     *
     * §70 — the supervision cluster had the same problem again, one gap over.
     * The rule knew "live listen", "whisper coaching" and "barge-in" as exact
     * phrases, so it missed the way the same three words actually appear together
     * in a features list: "Live Supervisor Listen, Whisper & Barge" — shipping on
     * the public /bitscrm pricing table. Bare supervision verbs are added because
     * whisper and barge-in have no meaning in this product outside telephony.
     *
     * §80 MEASURED A FIFTH GAP AND DID NOT SHIP IT. Bare "telephony" is STILL
     * missing from this list, and the consequence is enumerated in SYSTEM_AUDIT
     * §80.3: 27 hits inside gated surfaces, of which 15 are real claims that
     * have been invisible to this rule for the whole audit — including a
     * "99.9% Telephony SLA" for a service this build does not have.
     *
     * The term is deliberately NOT added yet. Adding it takes the gate from
     * green to 39 failing assertions across 8 files, and shipping that is worse
     * than shipping the gap: 6 of the 27 are identifier or asset-path matches
     * that need rule refinement first, and the remaining 6 are labelled
     * specimens and denials that need SCOPED_OUT markers. §80.4 carries the
     * full enumeration so §81 can execute it deterministically instead of
     * re-deriving it.
     *
     * Honest denials ("No telephony ships in this build") are unaffected either
     * way: SCOPED_OUT exempts them, and scoping-regression.mjs pins the set of
     * real denials so a regression fails loudly. */
    term:
      /\bWebRTC\b|\bSIP\b|\bPBX\b|Asterisk|FreePBX|call recording|real-?time transcription|softphone|\bdial-?er\b|\bdialling\b|\bdialing\b|auto-?dial|power dial|preview dial|whisper coaching|live listen|call barge-?in|\bbarge-?in\b|screen-?pop|\btrunk(?:ing)?\b|\bwhisper(?:ing)?\b|\bbarge\b|\blive[^.]{0,32}\blisten\b|\bvoice synthesis\b|\btelephony\b/i,
    why:
      "there is no telephony in this build — no RTCPeerConnection, no " +
      "getUserMedia, no SDP handling, no PBX integration and no audio pipeline",
  },
  {
    id: "graphql",
    term: /\bGraphQL\b/i,
    why: "no GraphQL endpoint exists; the data layer is REST via Supabase plus server actions",
  },
];

/** Run every rule against one visible string. Returns { id, why, sentence }[]. */
export function findClaims(value) {
  const found = [];
  for (const { id, term, why } of CHECKS) {
    for (const sentence of affirmativeClaims(value, term)) {
      found.push({ id, why, sentence });
    }
  }
  return found;
}