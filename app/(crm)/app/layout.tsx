import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CRM_SESSION_COOKIE, decodeSession } from "@/lib/crm/auth";
import { CrmProvider } from "@/lib/crm/store";
import { AppShellClient } from "@/components/crm/app-shell-client";

export default async function CrmAppLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const session = decodeSession(jar.get(CRM_SESSION_COOKIE)?.value);
  if (!session) redirect("/login");

  return (
    <CrmProvider initialName={session.name} userEmail={session.email}>
      <AppShellClient userName={session.name} userEmail={session.email}>
        {children}
      </AppShellClient>
    </CrmProvider>
  );
}
