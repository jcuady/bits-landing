import { cn } from "@/lib/utils";

/**
 * THESIS: A fixed-height collections call record, not a live dark terminal.
 * OWN-WORLD: Light double-bezel, ink type, electric labels, no perpetual motion.
 * STORY: Visitor sees a synthetic PTP conversation that already exists; nothing grows.
 * FIRST VIEWPORT: Chrome, static waveform, complete transcript, status row.
 * FORM: Product specimen matching hero/product bezels. Height is reserved.
 */
const TRANSCRIPT = [
  { speaker: "agent", text: "Good morning, may I speak with Maria Santos regarding her account ending in 4821?" },
  { speaker: "customer", text: "Yes, this is Maria. I can pay ₱5,000 by the 15th." },
  {
    speaker: "agent",
    text: "I'll schedule that Promise-to-Pay and send SMS confirmation. Remaining balance stays on a follow-up.",
  },
] as const;

const WAVEFORM = [28, 40, 22, 48, 18, 44, 32, 26, 38, 20, 46, 24, 36, 30, 42, 16, 34, 28, 22, 40] as const;

export function BitsAgentCallSpecimen({ className }: { className?: string }) {
  return (
    <figure className={cn("mx-auto w-full", className)}>
      <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
        <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
          <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-[0.82rem] font-semibold text-ink">BITSagent</p>
              <p className="truncate text-[0.72rem] text-slateblue">Live call · Northshore Recoveries</p>
            </div>
            <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
              Synthetic
            </span>
          </div>

          <div className="flex h-14 items-center justify-center gap-[3px] border-b border-linelight bg-cloud px-6" aria-hidden>
            {WAVEFORM.map((height, index) => (
              <span
                key={index}
                className="w-[3px] rounded-full bg-electric-500/70"
                style={{ height: `${height * 0.45}px` }}
              />
            ))}
            <span className="ml-4 font-mono text-[0.65rem] text-slateblue">04:12</span>
          </div>

          <div className="min-h-[14.5rem] space-y-3 p-4 sm:min-h-[15.5rem] sm:p-5">
            {TRANSCRIPT.map((line) => (
              <div
                key={line.text}
                className={cn("flex gap-3", line.speaker === "agent" ? "flex-row" : "flex-row-reverse")}
              >
                <span
                  className={cn(
                    "mt-1 shrink-0 self-start rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] uppercase",
                    line.speaker === "agent"
                      ? "bg-skywash text-electric-600"
                      : "bg-cloud text-slateblue"
                  )}
                >
                  {line.speaker === "agent" ? "Agent" : "Customer"}
                </span>
                <p
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-[0.82rem] leading-relaxed text-ink",
                    line.speaker === "agent"
                      ? "rounded-tl-none bg-skywash"
                      : "rounded-tr-none bg-cloud"
                  )}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-linelight bg-cloud/80 px-5 py-3 text-[0.65rem] font-medium text-slateblue">
            <span>PTP scheduled · ₱5,000 · 15th</span>
            <span className="text-electric-600">SMS confirmation queued</span>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Synthetic BITSagent collections conversation with a promise-to-pay. Decorative specimen.
      </figcaption>
    </figure>
  );
}
