import { ArrowRight } from "lucide-react";
import { agents } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const steps = [
  "Customers reach the floor on voice, chat, email, or social",
  "AI agents resolve Level 1 work and draft context for the rest",
  "Your team takes nuance and exceptions with that context in hand",
  "Supervisors review anything sensitive. Escalation is designed in",
] as const;

const queue = [
  { item: "Where is my shipment?", route: "L1", state: "Resolved" },
  { item: "Harborline call 14:22", route: "QA", state: "Human review" },
  { item: "KYC document list", route: "Knowledge", state: "Sourced" },
  { item: "Invoice exception", route: "Workflow", state: "Ticket 4182" },
] as const;

const ctaClass =
  "group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

export function AiEcosystem() {
  return (
    <Section id="automation" className="overflow-x-hidden bg-cloud">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">AI · Human oversight</p>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
                AI agents for the routine. People on every exception.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                Contact-center AI that drafts, routes, and resolves Level 1 work
                inside BITS CRM. Judgment, approvals, and sensitive cases stay
                with your team.
              </p>
            </Reveal>

            <ol className="mt-8 max-w-[46ch]">
              {steps.map((text, i) => (
                <li key={text}>
                  <Reveal delay={0.08 + i * 0.04} y={10}>
                    <div className="flex gap-4 border-t border-linelight/90 py-3.5 first:border-t-0">
                      <span className="w-6 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.92rem] font-medium leading-snug text-ink/90">
                        {text}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.28} y={8}>
              <a href="#contact" className={ctaClass}>
                Book an AI consultation
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
            <figure>
              <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Exceptions</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        AI + human oversight · Harborline
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                      Live
                    </span>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
                    <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                      <caption className="sr-only">
                        AI exceptions routed to people on the Harborline desk
                      </caption>
                      <thead>
                        <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Item
                          </th>
                          <th scope="col" className="hidden py-2 pr-3 font-semibold sm:table-cell">
                            Route
                          </th>
                          <th scope="col" className="py-2 font-semibold">
                            State
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {queue.map((row) => (
                          <tr key={row.item} className="border-b border-linelight/80 last:border-0">
                            <td className="max-w-[12rem] truncate py-2.5 pr-3 font-medium text-ink sm:max-w-none">
                              {row.item}
                            </td>
                            <td className="hidden py-2.5 pr-3 text-slateblue sm:table-cell">{row.route}</td>
                            <td className="py-2.5 whitespace-nowrap text-slateblue">{row.state}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="border-t border-linelight px-4 py-3 sm:px-5">
                    {agents.map((a) => (
                      <li
                        key={a.name}
                        className="border-b border-linelight/80 py-2.5 last:border-0"
                      >
                        <p className="text-[0.82rem] font-semibold text-ink">{a.name}</p>
                        <p className="mt-0.5 text-[0.75rem] leading-snug text-slateblue">{a.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption className="sr-only">
                BITS AI agents resolve routine Harborline work and send exceptions to people.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
