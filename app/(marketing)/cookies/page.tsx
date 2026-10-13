import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { ShieldCheck, Cookie, Lock, Eye, BarChart3, ChevronRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy & Sovereign Data Governance",
  description:
    "Official Cookie Policy and Sovereign Tracking Disclosure for Boundless IT Solutions (BITS). Compliant with National Privacy Commission (NPC) RA 10173 and GDPR.",
  alternates: { canonical: `${site.url}/cookies` },
  openGraph: {
    title: "Cookie Policy & Data Governance | BITS",
    description:
      "Official Cookie Policy and Sovereign Tracking Disclosure for Boundless IT Solutions (BITS). Compliant with National Privacy Commission (NPC) RA 10173 and GDPR.",
    url: `${site.url}/cookies`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Cookie Policy & Data Governance" }],
  },
};

const cookieSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/cookies#webpage`,
      name: `Cookie Policy | ${site.legalName}`,
      url: `${site.url}/cookies`,
      description: "Official Cookie Policy and tracking technology disclosure for Boundless IT Solutions (BITS).",
      inLanguage: "en-PH",
      publisher: {
        "@type": "Organization",
        name: site.legalName,
        url: site.url,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Cookie Policy", item: `${site.url}/cookies` },
      ],
    },
  ],
};

/**
 * Client-storage disclosure table.
 *
 * **Every entry below was verified against the code on 8 Oct 2026.** Three
 * entries that were previously disclosed do not exist and were removed, and
 * nine real keys that were never disclosed were added. See
 * `lib/site/cookie-disclosure.selfcheck.mjs`, which fails if this table and the
 * code ever drift apart again.
 *
 * Previously disclosed but REMOVED because nothing sets or reads them:
 *   - `bits_crm_session` — the only definition was `lib/crm/auth.ts`, which had
 *     zero importers and was deleted. It was also described as "encrypted"
 *     while implementing plain base64url, so the claim was false twice over.
 *   - `bits_hardware_scale` — zero references anywhere in the repository.
 *   - `bits_telemetry_perf` — zero references anywhere in the repository.
 *
 * Corrected entry:
 *   - `bits_demo_role` — real, but it is a demo-persona hint that NO code reads.
 *     It is never consulted for access control. The old entry claimed it
 *     "maintains the selected interactive demo perspective", which it does not.
 */
const cookieAuditList = [
  {
    name: "sb-*-auth-token",
    category: "Strictly Necessary",
    provider: "Supabase (first-party auth)",
    expiry: "14 Days",
    purpose:
      "Supabase session token. This is the only credential that grants CRM access — every /app/* route and API route verifies it server-side.",
  },
  {
    name: "bits_demo_role",
    category: "Strictly Necessary",
    provider: "Boundless IT Solutions (First-party)",
    expiry: "24 Hours",
    purpose:
      "Records which demo persona you signed in as. It is httpOnly and is never used to grant or deny access — authentication always comes from the Supabase session above.",
  },
  {
    name: "bits_cookie_consent_v1",
    category: "Strictly Necessary",
    provider: "LocalStorage",
    expiry: "1 Year",
    purpose:
      "Stores your consent choices and preference selections. This is the only record we keep of what you chose, and it never leaves your browser.",
  },
  {
    name: "bits_theme",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose:
      "Remembers your light/dark theme choice so it is applied before first paint. A legacy key, bionis-theme, is read once and migrated into this key.",
  },
  {
    name: "bionis-theme",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Deleted on first visit after upgrade",
    purpose:
      "Legacy theme key from an earlier brand. It is read once, copied into bits_theme, and then deleted. Nothing is written to it now.",
  },
  {
    name: "bits_demo_settings_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your interactive settings on the /demo engine showcase. Synthetic demo data only.",
  },
  {
    name: "bits_crm_state_v2",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose:
      "Stores CRM records in your browser so the workspace survives a refresh. This is local to your device and is never uploaded.",
  },
  {
    name: "bits_crm_notifs_v2",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Stores CRM notification read/unread state on your device.",
  },
  {
    name: "bits_crm_sales_deals_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your edits to the /crm-sales demo pipeline board. Synthetic demo data only.",
  },
  {
    name: "bits_crm_sales_leads_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your edits to the /crm-sales demo inbound-lead list. Synthetic demo data only.",
  },
  {
    name: "bits_support_desk_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your edits to the /crm-support demo ticket desk. Synthetic demo data only.",
  },
  {
    name: "bits_marketing_journeys_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your edits to the /crm-marketing demo journeys. Synthetic demo data only.",
  },
  {
    name: "bits_commerce_billing_v1",
    category: "Functional",
    provider: "LocalStorage",
    expiry: "Persistent until cleared",
    purpose: "Persists your edits to the /crm-commerce demo billing and subscription views. Synthetic demo data only.",
  },
];

export default function CookiesPage() {
  return (
    <main id="content" className="relative min-h-screen bg-gradient-to-b from-[#0a275e] via-[#0e377e] to-[#071d44] pb-28 pt-32 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookieSchema) }}
      />

      {/* Atmospheric Glow & Subtle Cloud Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-sky-200">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="size-3 text-sky-400/60" />
          <Link href="/legal" className="hover:text-white transition-colors">Compliance &amp; Governance</Link>
          <ChevronRight className="size-3 text-sky-400/60" />
          <span className="text-white font-medium">Cookie Policy</span>
        </nav>

        {/* Hero Eyebrow & Title */}
        <div className="space-y-3 pb-8 border-b border-white/15">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-sky-200 backdrop-blur-md">
            <Cookie className="size-3.5 text-sky-300" />
            <span>SOVEREIGN DATA GOVERNANCE · NPC RA 10173 ALIGNED</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Cookie Policy &amp; Tracking Disclosure
          </h1>
          <p className="text-base text-sky-100/90 leading-relaxed max-w-3xl">
            Boundless IT Solutions (&ldquo;BITS&rdquo;) is committed to transparent data sovereignty. This Cookie Policy explains how and why we utilize cookies, local storage, and similar technologies when you visit our website, platforms, and client portals.
          </p>
          <p className="text-xs text-sky-300/80">
            Last Updated &amp; Effective Date: October 1, 2026 · Reviewed by BITS Data Protection Office
          </p>
        </div>

        {/* Core Commitments Box */}
        <div className="mt-8 rounded-3xl border border-sky-400/30 bg-white/10 p-6 backdrop-blur-2xl shadow-xl">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-sky-200 flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-400" />
            Our Sovereign Privacy Guarantees
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Zero Ad Trackers
              </div>
              <p className="mt-1.5 text-xs text-sky-100/80 leading-relaxed">
                We never embed Google Ads, Meta Pixel, or third-party behavioral ad brokers on our platform.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <CheckCircle2 className="size-4 text-emerald-400" />
                No Data Brokering
              </div>
              <p className="mt-1.5 text-xs text-sky-100/80 leading-relaxed">
                We do not sell, rent, trade, or monetize your company identity, telemetry, or contact data.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Full DPA 2012 Rights
              </div>
              <p className="mt-1.5 text-xs text-sky-100/80 leading-relaxed">
                You retain full sovereign rights to access, inspect, modify, or erase your stored credentials anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: What Are Cookies */}
        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-400" />
            1. What Are Cookies and Local Storage?
          </h2>
          <div className="space-y-3 text-sm text-sky-100/90 leading-relaxed">
            <p>
              Cookies are compact text files placed on your computer, smartphone, or tablet when you load a web page. Local storage allows web applications to store data directly in your browser with no expiration date until explicitly cleared by the user.
            </p>
            <p>
              BITS uses these technologies to authenticate active operations personnel, maintain enterprise security controls, remember configuration states across complex multi-screen workflows, and measure platform latency without compromising end-user privacy.
            </p>
          </div>
        </section>

        {/* Section 2: Categories of Cookies We Use */}
        <section className="mt-12 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-400" />
            2. Categories of Cookies Employed by BITS
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Category 1 */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/25 border border-sky-400/30 text-sky-300 mb-3">
                <Lock className="size-4.5" />
              </div>
              <h3 className="text-sm font-bold text-white">Strictly Necessary</h3>
              <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                Mandatory for web application security, CSRF protection, and authenticated CRM session tokens. This deployment is single-tenant — there is no tenant isolation for a cookie to provide — so this category exists to hold the session, nothing more. Cannot be turned off.
              </p>
            </div>

            {/* Category 2 */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/25 border border-sky-400/30 text-sky-300 mb-3">
                <BarChart3 className="size-4.5" />
              </div>
              <h3 className="text-sm font-bold text-white">Performance &amp; Telemetry</h3>
              <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                <strong className="text-white">Nothing is collected today.</strong> There is
                no analytics script, no telemetry beacon and no third-party tracker running on
                this site — no Google Analytics, PostHog, Plausible, Clarity or Hotjar, and no
                <code className="mx-1 text-sky-200">sendBeacon</code> call anywhere in the
                application. No dialing, dialing-queue or websocket-stability metric is collected,
                because no such measurement exists in this codebase; the earlier claim naming one
                has been removed. If telemetry is ever introduced it will be disclosed
                here, with its provider and retention, before it ships.
              </p>
              {/* §97 — the ONE third party this site does talk to. Measured, not assumed:
                  every route loads five font stylesheets from cdn.jsdelivr.net via
                  `app/globals.css`, and it was the only external host observed on any page.
                  A font CDN is not a tracker, so the statements above stay true — but the
                  request still discloses the visitor's IP address and User-Agent to a third
                  party on every page load, and the consent checkbox on the contact form
                  cites Philippine RA 10173. An omission is not a false claim, so no gate
                  caught it: `cookie-disclosure` reads cookies and localStorage,
                  `asset-integrity` reads `public/`, and nothing inspected outbound hosts.
                  The correct fix is to self-host the fonts; that is blocked on access to
                  fetch them, so it is recorded for the owner rather than half-done here. */}
              <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                <strong className="text-white">One third-party request exists, and it is not
                a tracker.</strong> This site loads its typeface (Geist, Geist Mono and
                Instrument Serif) from <code className="mx-1 text-sky-200">cdn.jsdelivr.net</code>,
                so that provider sees your IP address and browser details on each page load. No
                form data, analytics identifier or advertising identifier is sent with it, and
                nothing is stored on your device by it. We are moving the fonts to our own
                server; until then this is disclosed here rather than left implicit.
              </p>
            </div>

            {/* Category 3 */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/25 border border-sky-400/30 text-sky-300 mb-3">
                <Eye className="size-4.5" />
              </div>
              <h3 className="text-sm font-bold text-white">Functional &amp; Preferences</h3>
              <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                Remembers your selections — dark/light theme, interactive demo configuration,
                and edits you make to the synthetic demo workspaces. All of this stays in your
                own browser under <code className="text-sky-200">localStorage</code> and is
                never uploaded. (A previously listed "hardware sizing preference" key was
                removed: it had no implementation.)
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Comprehensive Cookie Audit Table */}
        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-400" />
            3. Detailed Cookie &amp; Storage Audit
          </h2>
          <p className="text-sm text-sky-100/85">
            The following table details all active first-party storage identifiers utilized on our public marketing domain and enterprise web app:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
            <table className="w-full text-left text-xs text-white">
              <thead className="border-b border-white/20 bg-white/10 font-bold uppercase tracking-wider text-sky-200">
                <tr>
                  <th className="p-3.5">Identifier</th>
                  <th className="p-3.5">Classification</th>
                  <th className="p-3.5">Lifespan</th>
                  <th className="p-3.5">Technical Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {cookieAuditList.map((item) => (
                  <tr key={item.name} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono text-sky-300 font-semibold">{item.name}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="inline-block rounded-md bg-white/15 px-2 py-0.5 font-medium text-white">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-sky-100/90">{item.expiry}</td>
                    <td className="p-3.5 text-sky-100/80 leading-relaxed">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Managing Preferences */}
        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-400" />
            4. Managing &amp; Revoking Your Consent
          </h2>
          <div className="space-y-3 text-sm text-sky-100/90 leading-relaxed">
            <p>
              You maintain total sovereign authority over your device. You can update or revoke your preferences at any time by clicking the persistent floating <strong className="text-white">&ldquo;Cookie Preferences&rdquo;</strong> button located at the bottom-left of every page.
            </p>
            <p>
              Additionally, all mainstream browsers permit users to inspect, block, or delete cookies globally. Please visit the respective official guides for your browser:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-sky-200">
              <li>Google Chrome: Settings &gt; Privacy and security &gt; Third-party cookies</li>
              <li>Apple Safari: Preferences &gt; Privacy &gt; Prevent cross-site tracking</li>
              <li>Mozilla Firefox: Options &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</li>
              <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Data Protection Officer Contact */}
        <section className="mt-12 rounded-3xl border border-sky-400/30 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-sky-900/40 p-6 backdrop-blur-2xl">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="size-5 text-emerald-400" />
            5. Inquiries &amp; Data Protection Officer Contact
          </h2>
          <p className="mt-2 text-xs text-sky-100/85 leading-relaxed">
            If you have questions regarding this Cookie Policy, your privacy rights under Republic Act No. 10173 (Data Privacy Act of 2012), or wish to execute a subject access request, please contact our Data Protection Office:
          </p>
          <div className="mt-4 space-y-1 text-xs text-sky-200">
            <p><strong className="text-white">Organization:</strong> Boundless IT Solutions OPC (BITS)</p>
            <p><strong className="text-white">Attention:</strong> Data Protection Officer / Compliance Group</p>
            <p><strong className="text-white">Official Inquiry Email:</strong> <a href={`mailto:${site.inquiryEmail}`} className="text-white underline hover:text-sky-300">{site.inquiryEmail}</a></p>
            <p><strong className="text-white">Supervisory Authority:</strong> National Privacy Commission (NPC), Republic of the Philippines (privacy.gov.ph)</p>
          </div>
        </section>

        {/* Back Link */}
        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-sky-200">
          <Link href="/legal" className="hover:text-white underline transition-colors">
            &larr; Back to Compliance, Privacy &amp; Terms
          </Link>
          <Link href="/" className="hover:text-white underline transition-colors">
            Return to Homepage &rarr;
          </Link>
        </div>
      </Container>
    </main>
  );
}
