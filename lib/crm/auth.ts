export const CRM_SESSION_COOKIE = "bits_crm_session";

export type CrmSession = {
  email: string;
  name: string;
  signedInAt: string;
};

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeSession(session: CrmSession): string {
  return toBase64Url(JSON.stringify(session));
}

export function decodeSession(value: string | undefined | null): CrmSession | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(fromBase64Url(value)) as CrmSession;
    if (!parsed?.email || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}
