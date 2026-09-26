"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import type { Template } from "@/lib/crm/types";
import { Mail, MessageSquare, Copy, Check } from "lucide-react";
import { useToast } from "@/components/crm/crm-toast";

export default function TemplatesPage() {
  const { state } = useCrm();
  const { showToast } = useToast();
  const [q, setQ] = React.useState("");
  const [channel, setChannel] = React.useState("all");
  const [preview, setPreview] = React.useState<Template | null>(null);
  const [copied, setCopied] = React.useState(false);

  const rows = state.templates.filter((t) => {
    const hay = `${t.name} ${t.category}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (channel === "all" || t.channel === channel);
  });

  const copyTemplateContent = () => {
    if (!preview) return;
    const body =
      preview.channel === "sms"
        ? `Hi {{first_name}} — reminder from BITS: your next step is ready. Reply STOP to opt out.`
        : `Subject: Following up on {{company}}\n\nHi {{first_name}},\n\nThanks for the conversation. Attached is a short outline of how BITS can support your team this quarter.\n\nBest,\n{{sender_name}}`;
    navigator.clipboard.writeText(body);
    setCopied(true);
    showToast("Template text copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Outreach & Collections Templates"
        description="Standardized omnichannel communication templates with dynamic merge parameters."
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search templates by title or category…">
        <StatusFilter
          label="Channel"
          value={channel}
          onChange={setChannel}
          options={[
            { value: "all", label: "All channels" },
            { value: "email", label: "Email" },
            { value: "sms", label: "SMS" },
          ]}
        />
      </FilterBar>

      {rows.length === 0 ? (
        <EmptyState
          title="No templates match"
          description="Try selecting a different channel or clear your search query."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((t) => (
            <li
              key={t.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-electric-600/40 dark:border-neutral-800 dark:bg-[#141414]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {t.channel === "email" ? (
                      <Mail className="size-4 text-electric-600" />
                    ) : (
                      <MessageSquare className="size-4 text-emerald-600" />
                    )}
                    <h2 className="text-sm font-semibold text-foreground dark:text-neutral-100">
                      {t.name}
                    </h2>
                  </div>
                  <StatusBadge status={t.channel} label={t.channel.toUpperCase()} />
                </div>

                <p className="mt-2 text-xs font-medium text-muted-foreground dark:text-neutral-400">
                  Category: <span className="text-foreground dark:text-neutral-200">{t.category}</span>
                </p>

                <p className="mt-3 text-xs text-muted-foreground dark:text-neutral-400">
                  Last updated {t.updatedAt} · Dispatched{" "}
                  <strong className="font-mono text-foreground dark:text-neutral-200">{t.usage30d}×</strong> this month
                </p>
              </div>

              <div className="mt-5">
                <CrmButton
                  variant="outline"
                  className="w-full"
                  onClick={() => setPreview(t)}
                >
                  Inspect Template
                </CrmButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Accessible Preview Modal */}
      {preview ? (
        <CrmModal
          isOpen={Boolean(preview)}
          onClose={() => setPreview(null)}
          title={preview.name}
          description={`${preview.channel.toUpperCase()} Dispatch Template · Category: ${preview.category}`}
        >
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs font-mono leading-relaxed text-foreground dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100">
              {preview.channel === "sms" ? (
                <p>
                  Hi {"{{first_name}}"} — reminder from BITS: your next step is ready. Reply STOP to opt out.
                </p>
              ) : (
                <div className="space-y-3 font-sans">
                  <p className="font-semibold text-sm">Subject: Following up on {"{{company}}"}</p>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Hi {"{{first_name}}"},
                    <br />
                    <br />
                    Thanks for the conversation. Attached is a short outline of how BITS can support your revops, collections, and AI workflow automation this quarter.
                    <br />
                    <br />
                    Best regards,
                    <br />
                    {"{{sender_name}}"}
                    <br />
                    <span className="text-electric-600 font-medium">Boundless IT Solutions (BITS)</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-muted-foreground dark:text-neutral-400">
                Variables: <code className="text-electric-600">{"{{first_name}}"}</code>, <code className="text-electric-600">{"{{company}}"}</code>
              </span>
              <div className="flex gap-2">
                <CrmButton
                  variant="outline"
                  onClick={copyTemplateContent}
                  className="flex items-center gap-1.5"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy Content"}
                </CrmButton>
                <CrmButton variant="primary" onClick={() => setPreview(null)}>
                  Done
                </CrmButton>
              </div>
            </div>
          </div>
        </CrmModal>
      ) : null}
    </div>
  );
}
