/**
 * BITScrm Commerce & Billing — demo domain types.
 * Supabase-free: all state is client-side and seeded with synthetic records.
 */

export type InvoiceStatus = "paid" | "open" | "overdue" | "draft";
export type PaymentMethod = "maya" | "card" | "bank_transfer" | "cheque";
export type DunningStage = 0 | 1 | 2 | 3;

export interface Subscription {
  id: string;
  company: string;
  plan: string;
  seats: number;
  /** Recurring monthly amount in PHP, excluding VAT. */
  mrr: number;
  status: "active" | "trialing" | "past_due" | "cancelled";
  renewsOn: string;
  since: string;
}

export interface Invoice {
  id: string;
  customer: string;
  company: string;
  /** Net amount in PHP (VAT-exclusive). */
  net: number;
  /** 12% BIR VAT. */
  vat: number;
  issuedOn: string;
  dueOn: string;
  status: InvoiceStatus;
  method: PaymentMethod;
  dunningStage: DunningStage;
}

/** Philippine BIR VAT rate applied to all demo invoices. */
export const VAT_RATE = 0.12;

export function invoiceGross(i: Invoice): number {
  return i.net + i.vat;
}

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, "success" | "info" | "danger" | "neutral"> = {
  paid: "success",
  open: "info",
  overdue: "danger",
  draft: "neutral",
};

export const SUBSCRIPTION_STATUS_TONE: Record<
  Subscription["status"],
  "success" | "violet" | "warning" | "neutral"
> = {
  active: "success",
  trialing: "violet",
  past_due: "warning",
  cancelled: "neutral",
};

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  maya: "Maya Wallet",
  card: "Credit/Debit Card",
  bank_transfer: "Bank Transfer",
  cheque: "Cheque",
};

/** Smart dunning ladder used by the demo. */
export const DUNNING_SCHEDULE: { stage: DunningStage; label: string; days: number }[] = [
  { stage: 0, label: "None", days: 0 },
  { stage: 1, label: "Email reminder", days: 3 },
  { stage: 2, label: "SMS + email", days: 10 },
  { stage: 3, label: "Account hold", days: 21 },
];