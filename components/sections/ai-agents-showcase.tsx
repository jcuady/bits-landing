import { aiAgents } from "@/lib/site";
import { aiAgentConversations } from "@/lib/marketing-specimens";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function AiAgentsShowcase() {
  return (
    <Section id="ai-agents" className="overflow-x-hidden bg-white">
      <Container>
        <Reveal>
          <p className="text-overline text-electric-600">Configured agents</p>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance text-ink">
            Agents that work from campaign rules, not a dark demo console.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
            Dialing, follow-up, and negotiation stay inside the account record and the
            controls your supervisors set.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {aiAgents.map((agent, index) => (
            <li key={agent.name} className="border-t border-linelight py-6">
              <Reveal delay={0.04 * index} y={10}>
                <p className="font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <h3 className="text-[1.1rem] font-semibold text-ink">{agent.name}</h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.08em] uppercase",
                      agent.status === "Active" ? "bg-skywash text-electric-600" : "bg-cloud text-slateblue"
                    )}
                  >
                    {agent.status}
                  </span>
                </div>
                <p className="mt-2 max-w-[46ch] text-[0.92rem] leading-relaxed text-slateblue">{agent.description}</p>
                <p className="mt-3 text-[0.82rem] font-medium text-ink">{agent.metric}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12} className="mt-12">
          <div className="overflow-hidden rounded-[1.75rem] border border-linelight bg-white">
            <div className="flex items-center justify-between border-b border-linelight px-5 py-3">
              <p className="text-[0.82rem] font-semibold text-ink">Activity log</p>
              <p className="text-[0.68rem] font-semibold text-electric-600">Synthetic</p>
            </div>
            <div className="space-y-3 p-5">
              {aiAgentConversations[0].entries.map((entry, index) => (
                <div key={`${entry.type}-${index}`} className="flex gap-4 text-[0.85rem]">
                  <span className="w-16 shrink-0 font-semibold tracking-wider text-electric-600 uppercase">
                    {entry.type}
                  </span>
                  <span className="text-slateblue">{entry.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[0.75rem] text-slateblue">
            Synthetic agent activity. Operations stay inside configured compliance rules.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
