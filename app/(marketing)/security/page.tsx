import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cloud, Lock, Server, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ConsultationButton } from "@/components/ui/consultation-button";
import {
  accessMatrix,
  complianceFrameworks,
  dataHandling,
} from "@/lib/security-data";
import { deploymentModels, securityArchitecture, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security, Compliance & Deployment",
  description:
    "Session-authenticated access to every CRM route, no-store responses for personal data, rate-limited public write paths, and cloud or on-premises deployment. Role-based record isolation is roadmap, not shipped.",
  alternates: { canonical: `${site.url}/security` },
  openGraph: {
    title: "BITS Security, Compliance & Deployment",
    description:
      "Session-checked access on every CRM route, no-store personal-data responses, rate-limited public write paths, and cloud or on-premises deployment. Per-role record isolation is roadmap, not shipped.",
    url: `${site.url}/security`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Security & Deployment" }],
  },
};

const deploymentIcons: Record<string, typeof Server> = {
  cloud: Cloud,
  "on-prem": Server,
};

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/security#webpage`,
        url: `${site.url}/security`,
        name: "BITS Security, Compliance & Deployment",
        description:
          "Access control, data residency, consent handling, and cloud or on-premises deployment options.",
        publisher: { "@type": "Organization", name: site.legalName, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Security", item: `${site.url}/security` },
        ],
      },
    ],
  };

  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-cloud via-white to-white pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,99,219,0.08),transparent)]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-5 inline-flex items-center gap-1.5 rounded-full border border-linelight bg-white px-3.5 py-1 shadow-2xs">
                <ShieldCheck className="size-3 text-electric-600" />
                <span className="text-overline text-electric-600">Security &amp; Deployment</span>
              </div>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="text-display text-ink text-balance">
                Your Data Stays Under{" "}
                <span className="text-gradient-brand">Your Control.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-lede mx-auto mt-6 max-w-[58ch] text-slateblue text-pretty">
                Every CRM page and API endpoint checks a verified session on the server
                before any privileged database client is touched, personal-data responses
                are served no-store, and public write paths are rate limited and schema
                validated. Run it on our managed cloud or on your own servers — the
                session and data-handling controls are the same in both.
              </p>
              {/*
                SYSTEM_AUDIT.md §29. This hero previously read: "Customer records,
                financial transactions, and call audio are protected by strict role
                permissions, campaign-level data isolation, and tamper-evident activity
                logs." None of the three exist: every RLS policy is `using (true)` for
                authenticated, the application is single-tenant, and there is no
                audit-log table. This contradicted section 3 of the same page, which
                had already been corrected.
              */}
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Security Architecture & Regulatory Briefing"
                  label="Request a Security Briefing"
                />
                <a
                  href="#deployment"
                  className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-linelight bg-white px-7 text-sm font-bold text-ink shadow-xs transition-all duration-200 hover:border-electric-400 hover:bg-skywash"
                >
                  Compare deployment options
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 2. SIX SECURITY PILLARS ── */}
      <Section className="relative border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">How it is protected</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">Six Controls That Do the Work</h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                These are not policy documents. Each one is enforced in code, and each one can be
                shown to you. They are also the whole list — this build does not yet
                enforce per-role authorization or record an audit trail, and the next
                section says so plainly.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityArchitecture.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={0.04 + idx * 0.03}>
                <div className="flex h-full flex-col rounded-3xl border border-linelight bg-white p-7 shadow-sm transition-all hover:border-electric-400/60 hover:shadow-lg">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-skywash font-mono text-xs font-bold text-electric-600">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-ink mt-4 leading-snug">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>
                  <p className="mt-4 border-t border-linelight pt-3 font-mono text-[0.72rem] leading-relaxed text-slate-500">
                    {pillar.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 3. RBAC MATRIX ── */}
      <Section className="relative border-t border-linelight bg-cloud py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <Reveal>
                <p className="text-overline text-electric-600">Access control</p>
                <h2 className="text-h2 mt-4 text-ink text-balance">
                  Authentication Is Enforced on the Server
                </h2>
                {/*
                  This section previously read: "Permissions are enforced on the
                  server, not hidden in the interface. A user who is not authorised
                  for an account receives a refusal — they never receive the
                  record."

                  That was false, and it was the most consequential claim in the
                  repository. `requireCrmUser()` (lib/crm/api-auth.ts) resolves a
                  Supabase session and checks that a user EXISTS — it never reads
                  a role. Any authenticated user can read every lead, contact,
                  company and email log. The Rep/Manager/Admin role is a
                  client-side display concept only; see SYSTEM_AUDIT.md §17.2
                  and §22.

                  Corrected 8 Oct 2026 to state the real boundary. Role-based
                  authorization is a roadmap item, not a shipped control.
                */}
                <p className="text-lede mt-5 text-slateblue text-pretty">
                  Every CRM page and API endpoint requires a verified Supabase
                  session, and the check runs server-side before any privileged
                  database client is touched. An anonymous or forged request is
                  refused before it can reach customer data.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  <strong className="font-semibold text-ink">
                    What we do not claim:
                  </strong>{" "}
                  authentication is not authorization. Roles in this build are a
                  display concept, not a server-enforced boundary — a signed-in
                  user can currently read every CRM record. Per-role,
                  per-action authorization is on the roadmap. If your compliance
                  requirements depend on record-level isolation, treat that as
                  unimplemented until we confirm it in writing.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <figure>
                <div className="overflow-hidden rounded-3xl border border-linelight bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-linelight bg-white px-5 py-4">
                    <div>
                      <p className="text-sm font-bold text-ink">Role boundary matrix</p>
                      <p className="text-xs text-slate-500">
                        Illustrative target scoping — not enforced by this build
                      </p>
                    </div>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-amber-700">
                      Roadmap
                    </span>
                  </div>

                  <div className="overflow-x-auto overscroll-x-contain p-2">
                    <table className="w-full min-w-[26rem] text-left text-xs">
                      <caption className="sr-only">Target role model for a configured deployment</caption>
                      <thead>
                        <tr className="border-b border-linelight bg-slate-50/80 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                          <th scope="col" className="px-4 py-3">Role</th>
                          <th scope="col" className="px-4 py-3">Queue boundary</th>
                          <th scope="col" className="px-4 py-3">PII exposure</th>
                          <th scope="col" className="px-4 py-3">Supervisor action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-linelight">
                        {accessMatrix.map((row) => (
                          <tr key={row.role} className="transition-colors hover:bg-slate-50/60">
                            <th
                              scope="row"
                              className="whitespace-nowrap px-4 py-3 font-bold text-ink"
                            >
                              {row.role}
                            </th>
                            <td className="px-4 py-3 text-slate-600">{row.queue}</td>
                            <td className="px-4 py-3 text-slate-600">{row.pii}</td>
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-electric-600">
                              {row.supervisorHUD}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-xs text-slate-500">
                  Target model only. This build does not enforce per-role access — any authenticated operator can read every CRM record today.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 4. DATA HANDLING ── */}
      <Section className="relative border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">Data handling</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">What Happens to Your Data</h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                A plain statement of what is stored, who can reach it, and what is sent to a
                browser cache.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-linelight bg-white shadow-sm">
            <ul className="divide-y divide-linelight">
              {dataHandling.map((row, idx) => (
                <Reveal key={row.data} delay={0.03 + idx * 0.02}>
                  <li className="grid gap-2 p-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8 sm:p-7">
                    <span className="text-sm font-bold text-ink">{row.data}</span>
                    <span className="text-sm leading-relaxed text-slate-600">{row.control}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── 5. COMPLIANCE ALIGNMENT ── */}
      <Section className="relative border-t border-linelight bg-cloud py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">Regulatory alignment</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">
                Built Against Philippine Rules, Not Around Them
              </h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                We engineer to the principles below. Where a formal certification is required for
                your industry, that is a separate process we scope with you — this page does not
                claim accreditation we have not earned.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {complianceFrameworks.map((fw, idx) => (
              <Reveal key={fw.id} delay={0.04 + idx * 0.04}>
                <div className="flex h-full flex-col rounded-3xl border border-linelight bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <Lock className="size-4 shrink-0 text-electric-600" />
                    <h3 className="text-base font-bold text-ink">{fw.name}</h3>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {fw.scope}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{fw.control}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 6. DEPLOYMENT ── */}
      <Section id="deployment" className="relative scroll-mt-28 border-t border-linelight bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-overline text-electric-600">Deployment</p>
              <h2 className="text-h2 mt-4 text-ink text-balance">Two Ways to Run It</h2>
              <p className="text-lede mt-5 text-slateblue text-pretty">
                Choose based on your data residency requirements and how much infrastructure you
                want to own. The session, consent and data-handling controls described above are
                identical in both.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {deploymentModels.map((model, idx) => {
              const Icon = deploymentIcons[model.id as keyof typeof deploymentIcons] ?? Server;
              return (
                <Reveal key={model.id} delay={0.05 + idx * 0.05}>
                  <div className="flex h-full flex-col rounded-3xl border border-linelight bg-white p-7 shadow-sm sm:p-9">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-skywash text-electric-600">
                          <Icon className="size-5" />
                        </span>
                        <h3 className="text-xl font-bold text-ink">{model.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full border border-linelight bg-slate-50 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-slate-600">
                        {model.badge}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {model.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-electric-600">
                      Best for: {model.idealFor}
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-linelight pt-5">
                      {model.specs.map((spec) => (
                        <div key={spec.label}>
                          <dt className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-400">
                            {spec.label}
                          </dt>
                          <dd className="mt-0.5 text-xs font-semibold text-slate-700">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-6 space-y-2.5 border-t border-linelight pt-5">
                      {model.advantages.slice(0, 4).map((adv) => (
                        <li key={adv} className="flex items-start gap-2.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-electric-500" />
                          <span className="text-xs leading-relaxed text-slate-600">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-linelight bg-cloud px-7 py-9 text-center">
              <h3 className="text-xl font-bold text-ink">
                Not sure which deployment your regulator requires?
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                Send us your data residency requirement and we will tell you plainly which option
                fits — including when the honest answer is that you do not need on-premises yet.
              </p>
              <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
                <ConsultationButton
                  interest="Deployment & Data Residency Advisory"
                  label="Ask About Deployment"
                  size="md"
                />
                <Link
                  href="/pricing"
                  className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-full border border-linelight bg-white px-5 text-xs font-bold text-ink transition-colors hover:border-electric-400 hover:text-electric-600"
                >
                  See editions
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}