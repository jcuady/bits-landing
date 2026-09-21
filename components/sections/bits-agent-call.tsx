import { cn } from "@/lib/utils";

const TRANSCRIPT = [
  { speaker: "agent", text: "Good morning, may I speak with Maria Santos regarding her auto loan account ending in 4821?" },
  { speaker: "customer", text: "Yes, this is Maria. I received the notice. I can commit to paying ₱5,000 by this Friday the 15th." },
  {
    speaker: "agent",
    text: "Thank you for confirming, Ms. Santos. I have recorded your Promise-to-Pay for ₱5,000 on March 15. We'll send an instant SMS confirmation with payment channel details.",
  },
] as const;

const WAVEFORM = [24, 42, 18, 48, 22, 38, 52, 30, 44, 26, 48, 20, 36, 42, 54, 28, 38, 22, 18, 34] as const;

export function BitsAgentCallSpecimen({ className }: { className?: string }) {
  return (
    <figure className={cn("mx-auto w-full max-w-lg", className)}>
      <div className="rounded-[2rem] border border-slate-200/90 bg-white p-2 shadow-2xl shadow-blue-950/10">
        <div className="overflow-hidden rounded-[calc(2rem-8px)] border border-slate-100 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-violet-600"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">BITSagent Voice HUD</p>
                <p className="text-[0.68rem] text-slate-500">Live Outbound Call · ACC-10482</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-50 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-violet-700 border border-violet-200/60">
                &lt; 280ms latency
              </span>
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="flex h-12 items-center justify-between border-b border-slate-100 bg-slate-900 px-5 text-white" aria-hidden>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[0.65rem] font-semibold text-slate-300 uppercase tracking-wider">
                Audio Stream Active
              </span>
            </div>

            <div className="flex items-center gap-[3px]">
              {WAVEFORM.map((height, index) => (
                <span
                  key={index}
                  className="w-[3px] rounded-full bg-violet-400/80 transition-all duration-300"
                  style={{ height: `${height * 0.4}px` }}
                />
              ))}
            </div>

            <span className="font-mono text-[0.65rem] font-medium text-slate-400">02:18</span>
          </div>

          {/* Transcript Content */}
          <div className="space-y-3.5 p-5 min-h-[15rem]">
            {TRANSCRIPT.map((line) => (
              <div
                key={line.text}
                className={cn("flex gap-3", line.speaker === "agent" ? "flex-row" : "flex-row-reverse")}
              >
                <span
                  className={cn(
                    "mt-1 shrink-0 self-start rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold tracking-wider uppercase",
                    line.speaker === "agent"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {line.speaker === "agent" ? "AI Agent" : "Debtor"}
                </span>
                <p
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                    line.speaker === "agent"
                      ? "rounded-tl-none bg-violet-50/70 text-slate-800 border border-violet-100"
                      : "rounded-tr-none bg-slate-100 text-slate-900 font-medium"
                  )}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          {/* Action Trigger Row */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-3 text-[0.7rem]">
            <span className="flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              PTP Scheduled: ₱5,000 · March 15
            </span>
            <span className="font-mono font-semibold text-violet-600">
              SMS Gateway Queued ✓
            </span>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Realistic BITSagent voice conversation preview with automated promise-to-pay recording.
      </figcaption>
    </figure>
  );
}
