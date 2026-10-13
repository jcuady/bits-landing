import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";
import { ShieldCheck, Cookie, Lock, Scale, CheckCircle2, ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance, Privacy & Terms",
  description:
    "Official Privacy Notice, Data Privacy Act (RA 10173) handling, information security controls, and Terms of Use for Boundless IT Solutions (BITS).",
  alternates: { canonical: `${site.url}/legal` },
  openGraph: {
    title: "Compliance, Privacy & Terms | BITS",
    description:
      "Official Privacy Notice, Data Privacy Act (RA 10173) handling, information security controls, and Terms of Use for Boundless IT Solutions (BITS).",
    url: `${site.url}/legal`,
    siteName: site.legalName,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "BITS Compliance, Privacy & Terms" }],
  },
};

const legalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/legal#webpage`,
      name: `Compliance, Privacy & Terms | ${site.legalName}`,
      url: `${site.url}/legal`,
      description: "Official Privacy notice, Data Privacy Act statement, and terms of use for Boundless IT Solutions (BITS).",
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
        { "@type": "ListItem", position: 2, name: "Compliance & Legal", item: `${site.url}/legal` },
      ],
    },
  ],
};

export default function LegalPage() {
  return (
    <main id="content" className="relative min-h-screen bg-gradient-to-b from-[#0a275e] via-[#0e377e] to-[#071d44] pb-28 pt-32 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalSchema) }}
      />

      {/* Atmospheric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-sky-200">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="size-3 text-sky-400/60" />
          <span className="text-white font-medium">Compliance &amp; Legal Governance</span>
        </nav>

        {/* Hero Eyebrow & Title */}
        <div className="space-y-3 pb-8 border-b border-white/15">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-blue-500/20 px-3.5 py-1 text-xs font-bold text-sky-200 backdrop-blur-md">
            <Scale className="size-3.5 text-sky-300" />
            <span>ENTERPRISE GOVERNANCE · SOVEREIGN COMPLIANCE</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Compliance, Privacy &amp; Terms of Service
          </h1>
          <p className="text-base text-sky-100/90 leading-relaxed max-w-3xl">
            Boundless IT Solutions (&ldquo;BITS&rdquo;) engineers sovereign enterprise operational software, debt recovery OMS, and autonomous voice AI for banks, financial institutions, and enterprise BPOs. This portal outlines our legal frameworks, data subject protections, and regulatory compliance standards.
          </p>
          <p className="text-xs text-sky-300/80">
            Current Version: October 2026 Edition · Governed by the Laws of the Republic of the Philippines
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href="#privacy"
            className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md hover:bg-white/15 transition-all group"
          >
            <ShieldCheck className="size-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">1. Privacy Notice</h2>
            <p className="mt-1 text-xs text-sky-200">DPA RA 10173 &amp; Data Rights</p>
          </a>
          <Link
            href="/cookies"
            className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md hover:bg-white/15 transition-all group"
          >
            <Cookie className="size-5 text-sky-300 mb-2 group-hover:scale-110 transition-transform" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">2. Cookie Policy</h2>
            <p className="mt-1 text-xs text-sky-200">Tracking &amp; Storage Audit &rarr;</p>
          </Link>
          <a
            href="#security"
            className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md hover:bg-white/15 transition-all group"
          >
            <Lock className="size-5 text-cyan-300 mb-2 group-hover:scale-110 transition-transform" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">3. Security Standards</h2>
            <p className="mt-1 text-xs text-sky-200">BSP 808 &amp; SEC MC 18</p>
          </a>
        </div>

        {/* Section 1: Privacy Notice & Republic Act No. 10173 */}
        <section id="privacy" className="mt-14 scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              1. Privacy Notice &amp; Philippine Data Privacy Act (RA 10173)
            </h2>
          </div>
          <div className="space-y-4 text-sm text-sky-100/90 leading-relaxed">
            <p>
              When you interact with BITS through our website or request enterprise architecture consultations, we collect only the personal information you directly submit: your full name, institutional email address, company affiliation, telephone number, and operational requirements.
            </p>
            <p>
              We adhere strictly to the foundational principles of <strong>Transparency, Legitimate Purpose, and Proportionality</strong> established under Republic Act No. 10173 (Data Privacy Act of 2012) and its Implementing Rules and Regulations.
            </p>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200">
                Your Sovereign Rights as a Data Subject
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs text-sky-100/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to be Informed:</strong> Know how your data is collected and processed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to Access:</strong> Inspect any records containing your personal data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to Object:</strong> Withhold consent from secondary operational uses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to Erasure or Blocking:</strong> Request deletion of outdated or unauthorized data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to Rectification:</strong> Dispute and correct inaccurate data records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Right to File a Complaint:</strong> Seek redress with the National Privacy Commission.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Cookie Governance Banner & Link */}
        <section id="cookies" className="mt-14 scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              2. Cookie &amp; Storage Technology Governance
            </h2>
          </div>
          <p className="text-sm text-sky-100/90 leading-relaxed">
            BITS does not engage in behavioral ad retargeting, cross-site identity graphs, or commercial data syndication. We employ first-party session cookies and local storage tokens strictly necessary for secure authentication, tenant segregation, and anonymous telemetry.
          </p>
          <div className="flex items-center gap-4 rounded-2xl border border-sky-400/30 bg-blue-600/15 p-4 backdrop-blur-md">
            <Cookie className="size-6 text-sky-300 shrink-0" />
            <div className="flex-1 text-xs">
              <strong className="text-white">Looking for the full cookie audit table?</strong>
              <p className="text-sky-200 mt-0.5">
                Review technical lifespans, exact storage keys, and revoke consent directly on our dedicated policy page.
              </p>
            </div>
            <Link
              href="/cookies"
              className="inline-flex items-center gap-1 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-blue-950 hover:bg-sky-50 transition-colors whitespace-nowrap"
            >
              View Cookie Policy &rarr;
            </Link>
          </div>
        </section>

        {/* Section 3: Bank-Grade Information Security & Regulatory Alignment */}
        <section id="security" className="mt-14 scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              3. Information Security &amp; Financial Regulatory Alignment
            </h2>
          </div>
          <div className="space-y-4 text-sm text-sky-100/90 leading-relaxed">
            <p>
              BITS software architectures are engineered for high-consequence banking and collections operations. Our deployment blueprints align with rigorous regulatory frameworks:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  BSP Circular No. 808 &amp; 982
                </h3>
                {/*
                  Corrected 8 Oct 2026. This previously read "Information
                  Technology Risk Management (ITRM) framework adherence,
                  ensuring air-gapped encryption, immutable audit trails, and
                  data residency within Philippine territory."

                  "Adherence" asserts a regulatory position that has never been
                  audited, and immutable audit trails do not exist — there is no
                  audit subsystem in this codebase (SYSTEM_AUDIT.md §28, §29).
                  Reframed as what is actually built, with the deployment
                  options described as options rather than guarantees.
                */}
                <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                  Our deployment blueprints are <em>designed with</em> BSP
                  Information Technology Risk Management in mind, and we support
                  air-gapped or on-premises installation for data-residency
                  requirements. To be explicit: no BSP certification or audit has
                  been performed, and this build does not yet produce immutable
                  audit trails.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-200 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-sky-300" />
                  SEC MC No. 18 Series of 2019
                </h3>
                <p className="mt-2 text-xs text-sky-100/80 leading-relaxed">
                  This regulation requires supervised calling, recorded call
                  timestamps and auditable promise-to-pay verification. It is
                  quoted here as the regulatory requirement it is. Contact-window
                  and call-frequency enforcement is an engagement-scoped
                  deliverable in a BITS deployment, not a control this build
                  ships on its own.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Terms of Use */}
        <section id="terms" className="mt-14 scroll-mt-28 space-y-4 border-t border-white/15 pt-12">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-sky-300" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              4. Enterprise Terms of Use &amp; Intellectual Property
            </h2>
          </div>
          <div className="space-y-4 text-sm text-sky-100/90 leading-relaxed">
            <p>
              All materials, architectural concepts, UI showcases, documentation, source codes, and trademarks displayed on this site and within the BITS suite are the exclusive intellectual property of Boundless IT Solutions OPC.
            </p>
            <p>
              Demo accounts, test logins, and simulated CRM environments are provided solely for evaluation purposes. Unauthorized extraction, reverse engineering, unauthorized API scraping, or commercial exploitation is strictly prohibited and subject to legal prosecution under Philippine Cybercrime laws (RA 10175).
            </p>
          </div>
        </section>

        {/* Section 5: Form Submission Policy */}
        <section id="form-terms" className="mt-14 scroll-mt-28 space-y-4 border-t border-white/15 pt-12">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-purple-300" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              5. Form Submission &amp; Consultation Policy
            </h2>
          </div>
          <div className="space-y-4 text-sm text-sky-100/90 leading-relaxed">
            <p>
              When you submit a consultation, blueprint request, or quotation request through any form on this site, we collect only the details you type into that form. Submission constitutes consent to the processing of those details for the sole purpose of responding to your enquiry and preparing any resulting scoping or quotation.
            </p>
            <p>
              <strong className="text-white">Confidentiality.</strong> Operational metrics, seating capacity, and technology stack details disclosed during a consultation are treated as confidential. We do not publish client-submitted material or use it as a case study without prior written permission.
            </p>
            <p>
              <strong className="text-white">No third-party resale.</strong> We do not rent, sell, trade, or broker your submitted contact information to external marketers, lead brokers, or data syndicates.
            </p>
            <p>
              <strong className="text-white">Quotation validity.</strong> Where a quotation is issued in response to a submission, the scoping and pricing it contains are held for thirty (30) calendar days from the date of issue.
            </p>
            <p>
              <strong className="text-white">Automated protections.</strong> Submissions are rate-limited and screened by automated controls intended to reject bot traffic. A rejected submission does not create an enquiry record.
            </p>
            <p>
              <strong className="text-white">Your rights.</strong> Under RA 10173 you may request inspection, correction, or erasure of the data you submitted at any time by contacting the compliance desk below. Requests are actioned within the period prescribed by law.
            </p>
          </div>
        </section>

        {/* Section 6: Official Contact & Governance Inquiries */}
        <section className="mt-14 rounded-3xl border border-sky-400/30 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-sky-900/40 p-6 backdrop-blur-2xl">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="size-5 text-sky-300" />
            6. Legal Governance &amp; DPO Inquiries
          </h2>
          <p className="mt-2 text-xs text-sky-100/85 leading-relaxed">
            To submit formal legal inquiries, request data erasure under RA 10173, or execute vendor compliance audits:
          </p>
          <div className="mt-4 space-y-1 text-xs text-sky-200">
            <p><strong className="text-white">Entity:</strong> Boundless IT Solutions OPC</p>
            <p><strong className="text-white">Compliance Desk:</strong> <a href={`mailto:${site.inquiryEmail}`} className="text-white underline hover:text-sky-300">{site.inquiryEmail}</a></p>
            <p><strong className="text-white">Jurisdiction:</strong> Republic of the Philippines</p>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-sky-200">
          <Link href="/cookies" className="hover:text-white underline transition-colors">
            &larr; View Sovereign Cookie Policy
          </Link>
          <Link href="/" className="hover:text-white underline transition-colors">
            Return to Homepage &rarr;
          </Link>
        </div>
      </Container>
    </main>
  );
}
