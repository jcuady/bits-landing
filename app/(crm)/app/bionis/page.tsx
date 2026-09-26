import { redirect } from "next/navigation";

export default function BionisRedirectPage() {
  redirect("/app/telemetry");
}
