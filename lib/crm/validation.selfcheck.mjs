import assert from "node:assert/strict";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(254)
  .pipe(z.email());

const passwordSchema = z.string().min(6).max(128);
const displayNameSchema = z.string().trim().min(1).max(80);
const replyBodySchema = z.string().trim().min(1).max(2000);

assert.equal(emailSchema.safeParse("a@b.co").success, true);
assert.equal(emailSchema.safeParse("not-an-email").success, false);
assert.equal(passwordSchema.safeParse("12345").success, false);
assert.equal(passwordSchema.safeParse("123456").success, true);
assert.equal(displayNameSchema.safeParse("").success, false);
assert.equal(displayNameSchema.safeParse("QA Lead").success, true);
assert.equal(replyBodySchema.safeParse("   ").success, false);
assert.equal(replyBodySchema.safeParse("ok").success, true);
console.log("validation.selfcheck: PASS");
