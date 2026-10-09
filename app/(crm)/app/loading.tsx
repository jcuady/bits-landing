/**
 * Loading skeleton for the CRM workspace shell.
 *
 * `app/(crm)/app` is server-rendered (Supabase auth + data), so navigation
 * shows this while the segment resolves instead of a blank frame.
 */
export default function CrmLoading() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-[#0a2046] px-6"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-3">
          <span className="size-8 animate-pulse rounded-lg bg-white/10" />
          <span className="h-4 w-40 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        <span className="sr-only">Loading workspace…</span>
      </div>
    </div>
  );
}