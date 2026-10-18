import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  formatKes,
  parseKenyanPhone,
  whatsappLink,
  PRODUCTS,
  RETAILERS,
  ARTICLES,
  CATEGORIES,
  COUNTIES,
} from "./demo.ts";

// Runs with: node --experimental-strip-types --test src/lib/data/demo.test.ts

test("formatKes formats amounts in KSh with en-KE grouping", () => {
  assert.strictEqual(formatKes(85000), "KSh 85,000");
  assert.strictEqual(formatKes(7200), "KSh 7,200");
  assert.strictEqual(formatKes(0), "KSh 0");
});

test("formatKes returns 'Price on request' for null", () => {
  assert.strictEqual(formatKes(null), "Price on request");
  assert.strictEqual(formatKes(null), "Price on request");
});

test("parseKenyanPhone normalises to +254 format", () => {
  assert.strictEqual(parseKenyanPhone("+254700000001"), "+254700000001");
  assert.strictEqual(parseKenyanPhone("0700000001"), "+254700000001");
  assert.strictEqual(parseKenyanPhone("254700000001"), "+254700000001");
  assert.strictEqual(parseKenyanPhone("+254 700 000 000"), "+254700000000");
});

test("whatsappLink builds a wa.me URL without the plus", () => {
  const url = whatsappLink("+254700000001", "Hi");
  assert.ok(url.startsWith("https://wa.me/254700000001?text="));
  assert.ok(url.includes("Hi"));
});

test("RETAILERS contains demo entries across multiple counties", () => {
  const counties = new Set(RETAILERS.map((r) => r.county));
  assert.ok(counties.has("Nairobi"));
  assert.ok(counties.has("Mombasa"));
  assert.ok(counties.has("Kisumu"));
  assert.ok(counties.has("Nakuru"));
  assert.ok(counties.has("Trans Nzoia"));
});

test("PRODUCTS use KSh pricing and centimetre dimensions", () => {
  for (const p of PRODUCTS) {
    assert.ok(p.dimensions.widthCm > 0);
    assert.ok(p.dimensions.depthCm > 0);
    assert.ok(p.dimensions.heightCm > 0);
    assert.ok(p.priceLastChecked);
  }
});

test("ARTICLES have publication dates and authors", () => {
  for (const a of ARTICLES) {
    assert.ok(a.publishedAt);
    assert.ok(a.author);
  }
});

test("CATEGORIES cover the required browsing categories", () => {
  const slugs = new Set(CATEGORIES.map((c) => c.slug));
  for (const s of ["sofas", "beds", "dining", "storage", "lighting", "decor", "outdoor", "home-office"]) {
    assert.ok(slugs.has(s), `Missing category: ${s}`);
  }
});

test("COUNTIES seed includes major Kenyan counties", () => {
  const names = new Set(COUNTIES.map((c) => c.name));
  assert.ok(names.has("Nairobi"));
  assert.ok(names.has("Mombasa"));
  assert.ok(names.has("Kisumu"));
  assert.ok(names.has("Nakuru"));
});
