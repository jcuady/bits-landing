/**
 * BITScrm Marketing Journeys — demo domain types.
 * Supabase-free: all state is client-side and seeded with synthetic records.
 */

export type Channel = "email" | "sms" | "viber";
export type JourneyStatus = "draft" | "live" | "paused" | "completed";
export type StepKind = "trigger" | "wait" | "branch" | "message";

export interface JourneyStep {
  id: string;
  kind: StepKind;
  /** Delay in minutes for `wait` steps. */
  delayMinutes?: number;
  /** Channel for `message` steps. */
  channel?: Channel;
  subject?: string;
  body?: string;
  /** Condition label for `branch` steps. */
  condition?: string;
}

export interface Journey {
  id: string;
  name: string;
  status: JourneyStatus;
  audience: string;
  audienceSize: number;
  steps: JourneyStep[];
  enrolled: number;
  completed: number;
  converted: number;
  revenue: number;
  owner: string;
}

export interface Audience {
  id: string;
  name: string;
  size: number;
  rule: string;
  growthThisWeek: number;
}

export const CHANNEL_ICON_LABEL: Record<Channel, string> = {
  email: "Email",
  sms: "SMS",
  viber: "Viber",
};

export const JOURNEY_STATUS_TONE: Record<
  JourneyStatus,
  "neutral" | "success" | "warning" | "info"
> = {
  draft: "neutral",
  live: "success",
  paused: "warning",
  completed: "info",
};

export function conversionRate(j: Journey): number {
  return j.enrolled === 0 ? 0 : (j.converted / j.enrolled) * 100;
}

export function completionRate(j: Journey): number {
  return j.enrolled === 0 ? 0 : (j.completed / j.enrolled) * 100;
}

export function totalJourneyMinutes(j: Journey): number {
  return j.steps.reduce((sum, s) => sum + (s.delayMinutes ?? 0), 0);
}