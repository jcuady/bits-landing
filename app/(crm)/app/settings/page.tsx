"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Logo } from "@/components/ui/logo";
import { useCrm, roleForEmail } from "@/lib/crm/store";

export default function SettingsPage() {
  const { displayName, setDisplayName, state, userEmail } = useCrm();
  const [nameDraft, setNameDraft] = React.useState(displayName);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [dealAlerts, setDealAlerts] = React.useState(true);
  const [digest, setDigest] = React.useState(false);
  const role = roleForEmail(userEmail, state);
  const canManageTeam = role === "Admin" || role === "Manager";

  React.useEffect(() => {
    setNameDraft(displayName);
  }, [displayName]);

  function commitName() {
    const result = setDisplayName(nameDraft);
    if (!result.ok) {
      setNameError(result.error);
      setNameDraft(displayName);
      return;
    }
    setNameError(null);
  }

  return (
    <div>
      <PageHeader title="Settings" description="Profile and notification preferences (session only)." />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-linelight bg-white p-5">
          <h2 className="text-[0.9rem] font-semibold text-ink">Profile</h2>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-[0.78rem] font-semibold text-ink">Display name</span>
            <input
              value={nameDraft}
              maxLength={80}
              aria-invalid={Boolean(nameError) || undefined}
              aria-describedby={nameError ? "name-error" : undefined}
              onChange={(e) => {
                setNameDraft(e.target.value);
                if (nameError) setNameError(null);
              }}
              onBlur={commitName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitName();
                }
              }}
              className="h-10 w-full cursor-text rounded-xl border border-linelight px-3 text-[0.88rem] outline-none focus:border-electric-600 focus:ring-4 focus:ring-electric-600/12 aria-[invalid=true]:border-red-400"
            />
          </label>
          {nameError ? (
            <p id="name-error" className="mt-2 text-[0.8rem] font-medium text-red-600" role="alert">
              {nameError}
            </p>
          ) : (
            <p className="mt-3 text-[0.8rem] text-slateblue">
              Updates the top bar name for this browser session. Demo role: {role}.
            </p>
          )}
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
          <h2 className="text-[0.9rem] font-semibold text-ink">Workspace</h2>
          <p className="mt-2 text-[0.85rem] text-slateblue">
            {canManageTeam
              ? "Admin/Manager can invite teammates after database auth is wired."
              : "Rep/Marketing seats can edit personal preferences only. Team invites require Admin or Manager."}
          </p>
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
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-11 w-12 min-h-11 min-w-12 cursor-pointer rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-600/15 ${checked ? "bg-electric-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-1 left-1 size-9 rounded-full bg-white shadow-sm transition ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </li>
  );
}
