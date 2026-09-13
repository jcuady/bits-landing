"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm } from "@/lib/crm/store";
import type { Template } from "@/lib/crm/types";

export default function TemplatesPage() {
  const { state } = useCrm();
  const [q, setQ] = React.useState("");
  const [channel, setChannel] = React.useState("all");
  const [preview, setPreview] = React.useState<Template | null>(null);
  const rows = state.templates.filter((t) => {
    const hay = `${t.name} ${t.category}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (channel === "all" || t.channel === channel);
  });

  return (
    <div>
      <PageHeader title="Templates" description="Email and SMS message templates." />
      <FilterBar value={q} onChange={setQ} placeholder="Search templates…">
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
        <EmptyState title="No templates match" />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((t) => (
            <li key={t.id} className="flex flex-col rounded-xl border border-linelight bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[0.92rem] font-semibold text-ink">{t.name}</h2>
                <StatusBadge status={t.channel} label={t.channel.toUpperCase()} />
              </div>
              <p className="mt-2 text-[0.8rem] text-slateblue">{t.category}</p>
              <p className="mt-3 flex-1 text-[0.78rem] text-slateblue">
                Updated {t.updatedAt} · Used {t.usage30d}× in 30d
              </p>
              <CrmButton className="mt-4 w-full" onClick={() => setPreview(t)}>
                Preview
              </CrmButton>
            </li>
          ))}
        </ul>
      )}

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-end justify-center bg-navy-900/40 p-4 sm:items-center"
          role="presentation"
          onClick={() => setPreview(null)}
          onKeyDown={(e) => e.key === "Escape" && setPreview(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${preview.name}`}
            className="w-full max-w-lg cursor-default rounded-2xl border border-linelight bg-white p-5 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[1.05rem] font-bold text-ink">{preview.name}</h3>
                <p className="mt-1 text-[0.8rem] text-slateblue">
                  {preview.channel.toUpperCase()} · {preview.category}
                </p>
              </div>
              <CrmButton onClick={() => setPreview(null)}>Close</CrmButton>
            </div>
            <div className="mt-4 rounded-xl border border-linelight bg-cloud/70 p-4 text-[0.9rem] leading-relaxed text-ink">
              {preview.channel === "sms" ? (
                <p>
                  Hi {"{{first_name}}"} — reminder from BITS: your next step is ready. Reply STOP to opt out.
                </p>
              ) : (
                <>
                  <p className="font-semibold">Subject: Following up on {"{{company}}"}</p>
                  <p className="mt-3">
                    Hi {"{{first_name}}"},
                    <br />
                    <br />
                    Thanks for the conversation. Attached is a short outline of how BITS can support your team
                    this quarter.
                    <br />
                    <br />
                    Best,
                    <br />
                    {"{{sender_name}}"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
