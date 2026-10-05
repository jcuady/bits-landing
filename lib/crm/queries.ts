import { createClient } from "@/lib/supabase/server";

export async function getInboundLeads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inbound_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inbound leads:", error);
    return [];
  }
  return data || [];
}
