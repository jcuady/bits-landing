/**
 * Lightweight in-memory rate limiter for public, abuse-prone endpoints.
 *
 * Scope & limitations (deliberate, documented):
 * - This is per-instance in-memory state. On serverless (Vercel) it protects a
 *   single warm instance and is NOT a global limit. It raises the cost of naive
 *   spam/burst abuse; it is not a substitute for a distributed limiter.
 * - It exists because the contact form is a public write path with no other
 *   abuse control beyond a honeypot.
 *
 * For durable, cross-instance limiting, replace the Map below with a shared
 * store (e.g. Upstash Redis + @upstash/ratelimit).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Bound memory: drop expired buckets during sweep so a long-running instance
// cannot accumulate unbounded keys.
const MAX_TRACKED_KEYS = 10_000;

function sweep(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Consume one token for `key` within `windowMs`, allowing `limit` requests.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);

  return {
    ok: existing.count <= limit,
    remaining,
    retryAfterSeconds,
  };
}

/**
 * Derive a stable client identity from proxy headers.
 * Falls back to "anonymous" when no forwarding headers are present.
 */
export function clientKeyFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "anonymous";
}