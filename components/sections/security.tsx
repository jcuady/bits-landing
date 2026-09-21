import Link from "next/link";
import { securityArchitecture } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { BspLogo, NpcLogo, SecLogo, Iso27001Logo } from "@/components/ui/security-logos";

const accessMatrix = [
  { role: "Collection Agent", queue: "Assigned accounts only", pii: "Masked phone/SSN", supervisorHUD: "No" },
  { role: "Team Supervisor", queue: "Campaign team accounts", pii: "Operational view", supervisorHUD: "Listen / Whisper" },
  { role: "QA Auditor", queue: "Audit evaluation worklist", pii: "Full with audit log", supervisorHUD: "Recorded sessions" },
  { role: "Operations Manager", queue: "All agency campaigns", pii: "Scoped export", supervisorHUD: "Full Barge HUD" },
  { role: "System Administrator", queue: "Infrastructure & configuration", pii: "Restricted", supervisorHUD: "Access Audit Log" },
] as const;

export function Security() {
  return (
    <Section id="security" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Enterprise Security & Governance
                </span>
              </div>
              <h2 className="text-h2 text-balance font-bold leading-[1.08] text-slate-900">
                Built for Sensitive Business Operations.
              </h2>
              <p className="text-lede mt-5 max-w-[48ch] text-pretty text-slate-600">
                Financial and BPO operations handle strictly regulated debtor records and confidential transactions.
                BITS is engineered with defense-in-depth isolation, granular permissions, and statutory audit logging.
              </p>

              {/* Regulatory Alignment Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-2xs">
                  <BspLogo size={20} />
                  <span className="text-xs font-bold text-slate-800">BSP Circular 454 & 857 Principles</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-2xs">
                  <NpcLogo size={20} />
                  <span className="text-xs font-bold text-slate-800">NPC RA 10173 DPA Principles</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-2xs">
                  <SecLogo size={20} />
                  <span className="text-xs font-bold text-slate-800">SEC MC 18 Fair Practice</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 shadow-2xs">
                  <Iso27001Logo size={20} />
                  <span className="text-xs font-bold text-slate-800">ISO/IEC 27001 Aligned</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Request a Security Architecture Briefing</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RBAC Visual Matrix */}
          <Reveal delay={0.1}>
            <figure>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">RBAC Governance Matrix</p>
                      <p className="text-[0.68rem] text-slate-500">Cryptographically Enforced Role Boundaries</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600 shadow-2xs">
                    Enforced
                  </span>
                </div>

                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full min-w-[24rem] text-left text-xs">
                    <caption className="sr-only">Role-based access control matrix</caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                        <th scope="col" className="px-4 py-3">Role</th>
                        <th scope="col" className="px-4 py-3">Queue Boundary</th>
                        <th scope="col" className="px-4 py-3">PII Exposure</th>
                        <th scope="col" className="px-4 py-3">Supervisor Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {accessMatrix.map((row) => (
                        <tr key={row.role} className="transition-colors hover:bg-slate-50/60">
                          <th scope="row" className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">
                            {row.role}
                          </th>
                          <td className="px-4 py-3 text-slate-600">{row.queue}</td>
                          <td className="px-4 py-3 text-slate-600">{row.pii}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-blue-600">
                            {row.supervisorHUD}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption className="mt-3 text-center text-[0.75rem] text-slate-400">
                Sample role-based scoping table. Concrete permissions are customized during deployment.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {securityArchitecture.map((item, idx) => (
            <Reveal key={item.title} delay={0.04 * idx}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md">
                <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                  0{idx + 1}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.description}</p>
                <p className="mt-3 border-t border-slate-100 pt-3 font-mono text-[0.72rem] text-slate-500">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
