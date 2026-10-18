import { test } from "node:test";
import { strict as assert } from "node:assert";
import { submitRetailerRequest, type SubmissionResult } from "./actions.ts";

// Runs with: node --experimental-strip-types --test src/app/submit/actions.test.ts

async function submit(formData: FormData): Promise<SubmissionResult> {
  return submitRetailerRequest(formData);
}

function formData(overrides: Record<string, string | null> = {}): FormData {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    name: "Asha Njeri",
    businessName: "Asha's Furniture",
    county: "Nairobi",
    town: "Karen",
    phone: "+254700000001",
    message: "We make timber dining tables and sofas. Delivery within Nairobi.",
    categories: "dining",
    terms: "on",
  };
  for (const [k, v] of Object.entries({ ...defaults, ...overrides })) {
    if (v !== null && v !== undefined) fd.append(k, v);
  }
  return fd;
}

test("submitRetailerRequest accepts a valid submission", async () => {
  const result = await submit(formData());
  assert.strictEqual(result.ok, true);
  assert.ok(result.message.includes("received"));
});

test("submitRetailerRequest rejects missing required fields", async () => {
  const result = await submit(formData({ name: "", businessName: "" }));
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors?.name);
  assert.ok(result.errors?.businessName);
});

test("submitRetailerRequest validates Kenyan phone numbers", async () => {
  const bad = await submit(formData({ phone: "0700" }));
  assert.strictEqual(bad.ok, false);
  assert.ok(bad.errors?.phone);

  const good = await submit(formData({ phone: "0700000001" }));
  assert.strictEqual(good.ok, true);
});

test("submitRetailerRequest validates email when provided", async () => {
  const bad = await submit(formData({ email: "not-an-email" }));
  assert.strictEqual(bad.ok, false);
  assert.ok(bad.errors?.email);

  const good = await submit(formData({ email: "asha@example.demo" }));
  assert.strictEqual(good.ok, true);
});

test("submitRetailerRequest requires at least one category", async () => {
  const result = await submit(formData({ categories: "" }));
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors?.categories);
});

test("submitRetailerRequest requires terms acknowledgement", async () => {
  const result = await submit(formData({ terms: null }));
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors?.terms);
});

test("submitRetailerRequest rejects short messages", async () => {
  const result = await submit(formData({ message: "hi" }));
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors?.message);
  assert.ok(result.errors?.message!.includes("20 characters"));
});

test("submitRetailerRequest validates website scheme", async () => {
  const result = await submit(formData({ website: "ftp://example.demo" }));
  assert.strictEqual(result.ok, false);
  assert.ok(result.errors?.website);
});
