import { z } from "zod";

/** Shared CRM form / mutation validation (mock auth + session UI). */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Enter a work email.")
  .max(254, "Email is too long.")
  .pipe(z.email("Enter a valid work email."));

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.")
  .max(128, "Password is too long.");

export const displayNameSchema = z
  .string()
  .trim()
  .min(1, "Enter a display name.")
  .max(80, "Keep the name under 80 characters.")
  .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), "Name contains invalid characters.");

export const replyBodySchema = z
  .string()
  .trim()
  .min(1, "Type a message before sending.")
  .max(2000, "Keep replies under 2000 characters.");

export const leadStatusSchema = z.enum(["new", "working", "qualified", "disqualified"]);
export const opportunityStageSchema = z.enum([
  "discovery",
  "proposal",
  "negotiation",
  "closed_won",
  "closed_lost",
]);
export const taskStatusSchema = z.enum(["open", "done"]);
export const campaignStatusSchema = z.enum(["draft", "active", "paused", "completed"]);
export const automationStatusSchema = z.enum(["active", "paused"]);
export const formStatusSchema = z.enum(["published", "draft"]);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export function firstZodMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}
