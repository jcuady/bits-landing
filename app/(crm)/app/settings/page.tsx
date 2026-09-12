"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Logo } from "@/components/ui/logo";

export default function SettingsPage() {
  const [name, setName] = React.useState("Malcolm Cuady");
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [dealAlerts, setDealAlerts] = React.useState(true);
  const [digest, setDigest] = React.useState(false);

  return (
    <div>
      <PageHeader title="Settings" description="Profile and notification preferences (local only)." />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Profile</h2>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">Display name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-xl border border-linelight px-3 text-[0.88rem] outline-none focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12"
            />
          </label>
          <p className="mt-3 text-[0.8rem] text-slateblue">Changes stay in this browser session only.</p>
        </section>

        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Notifications</h2>
          <ul className="mt-4 space-y-3">
            <Toggle label="Email notifications" checked={emailNotif} onChange={setEmailNotif} />
            <Toggle label="Stalled deal alerts" checked={dealAlerts} onChange={setDealAlerts} />
            <Toggle label="Weekly digest" checked={digest} onChange={setDigest} />
          </ul>
        </section>

        <section className="rounded-xl border border-linelight bg-white p-5 lg:col-span-2">
          <h2 className="text-[0.9rem] font-semibold text-ink">Branding preview</h2>
          <div className="mt-4 flex items-center gap-4 rounded-xl border border-dashed border-linelight bg-cloud/60 px-5 py-6">
            <Logo variant="horizontal" className="h-8" />
            <div>
              <p className="text-[0.88rem] font-semibold text-ink">BITS CRM</p>
              <p className="text-[0.78rem] text-slateblue">Navy + electric Soft-UI shell</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-[0.88rem] text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-electric-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </li>
  );
}
