"use client";

import * as React from "react";
import Link from "next/link";
import { useMarketing } from "@/lib/products/crm-marketing/store";
import {
  CHANNEL_ICON_LABEL,
  JOURNEY_STATUS_TONE,
  conversionRate,
  type StepKind,
  type Channel,
} from "@/lib/products/crm-marketing/types";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Workflow,
  Zap,
  Clock,
  GitBranch,
  Mail,
  Save,
} from "lucide-react";
import {
  PageHeader,
  Panel,
  PanelHeader,
  DemoButton,
  DemoField,
  DemoDataBanner,
  StatusPill,
  EmptyState,
  Meter,
  inputClass,
  peso,
} from "@/components/products/demo-ui";

const STEP_KINDS: { kind: StepKind; label: string; icon: typeof Zap }[] = [
  { kind: "message", label: "Message", icon: Mail },
  { kind: "wait", label: "Wait", icon: Clock },
  { kind: "branch", label: "Branch", icon: GitBranch },
  { kind: "trigger", label: "Trigger", icon: Zap },
];

const STEP_TONE: Record<StepKind, "info" | "warning" | "violet" | "success"> = {
  trigger: "success",
  wait: "warning",
  branch: "violet",
  message: "info",
};

export default function JourneyBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { journeyById, addStep, removeStep, updateStep, enrollBatch, toggleJourney } = useMarketing();
  const { id } = React.use(params);
  const journey = journeyById(id);

  if (!journey) {
    return (
      <div className="space-y-6">
        <PageHeader title="Journey not found" description="This journey does not exist in the demo dataset." />
        <Link href="/crm-marketing" className="text-sm text-sky-300 hover:text-white">
          ← Back to journeys
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/crm-marketing"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Journey command center
        </Link>
      </div>

      <PageHeader
        title={journey.name}
        description={`${journey.id} · ${journey.audience} · owned by ${journey.owner}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone={JOURNEY_STATUS_TONE[journey.status]}>{journey.status}</StatusPill>
            <DemoButton onClick={() => toggleJourney(journey.id)}>
              {journey.status === "live" ? "Pause journey" : "Start journey"}
            </DemoButton>
            <DemoButton variant="primary" onClick={() => enrollBatch(journey.id)}>
              Simulate enroll batch
            </DemoButton>
          </div>
        }
      />

      <DemoDataBanner note="synthetic journey sequences and attributed revenue for evaluation." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Step builder */}
          <Panel>
            <PanelHeader
              title="Sequence Builder"
              subtitle="Edit any step inline. Changes persist in this browser only."
              icon={Workflow}
              action={
                <div className="flex flex-wrap gap-1.5">
                  {STEP_KINDS.map((k) => (
                    <DemoButton key={k.kind} onClick={() => addStep(journey.id, k.kind)}>
                      <k.icon className="size-3.5" aria-hidden />
                      {k.label}
                    </DemoButton>
                  ))}
                </div>
              }
            />
            {journey.steps.length === 0 ? (
              <EmptyState
                icon={Workflow}
                title="This journey has no steps"
                body="Add a trigger to start the sequence, then branch into messages and waits."
              />
            ) : (
              <ol className="space-y-3 p-5">
                {journey.steps.map((s, i) => (
                  <li
                    key={s.id}
                    className="rounded-xl border border-sky-400/15 bg-white/5 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-sky-200/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <StatusPill tone={STEP_TONE[s.kind]}>{s.kind}</StatusPill>
                        {s.channel && (
                          <StatusPill tone="info">{CHANNEL_ICON_LABEL[s.channel]}</StatusPill>
                        )}
                      </div>
                      <DemoButton
                        variant="ghost"
                        onClick={() => removeStep(journey.id, s.id)}
                        aria-label={`Remove step ${i + 1}`}
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                      </DemoButton>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {s.kind === "wait" && (
                        <DemoField label="Delay (minutes)">
                          <input
                            aria-label={`Delay in minutes for step ${i + 1}`}
                            type="number"
                            min={0}
                            value={s.delayMinutes ?? 0}
                            onChange={(e) =>
                              updateStep(journey.id, s.id, {
                                delayMinutes: Math.max(0, Number(e.target.value) || 0),
                              })
                            }
                            className={inputClass}
                          />
                        </DemoField>
                      )}

                      {s.kind === "branch" && (
                        <DemoField label="Condition">
                          <input
                            aria-label={`Condition for step ${i + 1}`}
                            type="text"
                            value={s.condition ?? ""}
                            onChange={(e) => updateStep(journey.id, s.id, { condition: e.target.value })}
                            className={inputClass}
                          />
                        </DemoField>
                      )}

                      {s.kind === "message" && (
                        <>
                          <DemoField label="Channel">
                            <select
                              aria-label={`Channel for step ${i + 1}`}
                              value={s.channel ?? "email"}
                              onChange={(e) =>
                                updateStep(journey.id, s.id, { channel: e.target.value as Channel })
                              }
                              className={inputClass}
                            >
                              {(["email", "sms", "viber"] as Channel[]).map((c) => (
                                <option key={c} value={c}>
                                  {CHANNEL_ICON_LABEL[c]}
                                </option>
                              ))}
                            </select>
                          </DemoField>
                          <DemoField label="Subject">
                            <input
                              aria-label={`Subject for step ${i + 1}`}
                              type="text"
                              value={s.subject ?? ""}
                              onChange={(e) => updateStep(journey.id, s.id, { subject: e.target.value })}
                              className={inputClass}
                            />
                          </DemoField>
                          <div className="sm:col-span-2">
                            <DemoField label="Body">
                              <textarea
                                aria-label={`Body for step ${i + 1}`}
                                rows={2}
                                value={s.body ?? ""}
                                onChange={(e) => updateStep(journey.id, s.id, { body: e.target.value })}
                                className={`${inputClass} resize-y py-2`}
                              />
                            </DemoField>
                          </div>
                        </>
                      )}

                      {s.kind === "trigger" && (
                        <div className="sm:col-span-2">
                          <DemoField label="Trigger event">
                            <input
                              aria-label={`Trigger event for step ${i + 1}`}
                              type="text"
                              value={s.subject ?? ""}
                              onChange={(e) => updateStep(journey.id, s.id, { subject: e.target.value })}
                              className={inputClass}
                            />
                          </DemoField>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </div>

        {/* Metrics sidebar */}
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Performance" icon={Save} />
            <div className="space-y-4 p-5">
              <div className="rounded-xl border border-sky-400/15 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-wider text-sky-200/70">
                  Attributed revenue
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-white">
                  {peso(journey.revenue, true)}
                </p>
              </div>
              <Meter label="Enrolled" value={journey.enrolled} max={journey.audienceSize} tone="sky" />
              <Meter label="Completed" value={journey.completed} max={journey.audienceSize} tone="sky" />
              <Meter label="Converted" value={conversionRate(journey)} tone="emerald" />
              <p className="text-xs text-sky-200/70">
                {journey.converted.toLocaleString()} of {journey.enrolled.toLocaleString()} enrolled
                contacts converted ({conversionRate(journey).toFixed(1)}%).
              </p>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Audience" icon={Plus} />
            <div className="space-y-3 p-5">
              <p className="text-sm font-semibold text-white">{journey.audience}</p>
              <p className="font-mono text-lg font-bold text-sky-200">
                {journey.audienceSize.toLocaleString()}
              </p>
              <p className="text-xs text-sky-200/70">
                Owner: {journey.owner}
              </p>
              <Link
                href="/crm-marketing/audiences"
                className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-sky-300 hover:text-white"
              >
                View segments →
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}