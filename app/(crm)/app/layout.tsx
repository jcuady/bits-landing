import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CrmProvider } from "@/lib/crm/store";
import { AppShellClient } from "@/components/crm/app-shell-client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function CrmAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Derive display name from user_metadata → email local part
  const displayName: string =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email
      ?.split("@")[0]
      ?.replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim() ||
    "BITS User";

  const email = user.email ?? "";

  return (
    <CrmProvider initialName={displayName} userEmail={email}>
      <AppShellClient userName={displayName} userEmail={email}>
        {children}
      </AppShellClient>
    </CrmProvider>
  );
}
