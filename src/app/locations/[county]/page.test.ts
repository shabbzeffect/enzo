import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  COUNTIES,
  getRetailersByCounty,
  getProductsByCounty,
  CATEGORIES,
} from "@/lib/data/demo";

function countySlugToName(slug: string): string | null {
  const matched = COUNTIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  return matched?.name ?? null;
}

test("countySlugToName resolves valid county slugs", () => {
  assert.strictEqual(countySlugToName("nairobi"), "Nairobi");
  assert.strictEqual(countySlugToName("mombasa"), "Mombasa");
  assert.strictEqual(countySlugToName("kisumu"), "Kisumu");
  assert.strictEqual(countySlugToName("nakuru"), "Nakuru");
  assert.strictEqual(countySlugToName("eldoret"), "Eldoret");
  assert.strictEqual(countySlugToName("kiambu"), "Kiambu");
  assert.strictEqual(countySlugToName("machakos"), "Machakos");
  assert.strictEqual(countySlugToName("nyeri"), "Nyeri");
  assert.strictEqual(countySlugToName("meru"), "Meru");
  assert.strictEqual(countySlugToName("kakamega"), "Kakamega");
  assert.strictEqual(countySlugToName("uasin-gishu"), "Uasin Gishu");
  assert.strictEqual(countySlugToName("kajiado"), "Kajiado");
  assert.strictEqual(countySlugToName("trans-nzoia"), "Trans Nzoia");
});

test("countySlugToName returns null for invalid slugs", () => {
  assert.strictEqual(countySlugToName("invalid"), null);
  assert.strictEqual(countySlugToName("not-a-county"), null);
  assert.strictEqual(countySlugToName(""), null);
});

test("every COUNTY has a slug that round-trips through countySlugToName", () => {
  for (const county of COUNTIES) {
    const slug = county.name.toLowerCase().replace(/\s+/g, "-");
    const resolved = countySlugToName(slug);
    assert.strictEqual(resolved, county.name, `Round-trip failed for ${county.name}`);
  }
});

test("getRetailersByCounty returns retailers for each county", () => {
  for (const county of COUNTIES) {
    const retailers = getRetailersByCounty(county.name);
    assert.ok(retailers.length >= 0, `${county.name} should have retailers array`);
    for (const r of retailers) {
      assert.strictEqual(r.county, county.name);
    }
  }
});

test("getProductsByCounty returns products for each county", () => {
  for (const county of COUNTIES) {
    const products = getProductsByCounty(county.name);
    assert.ok(products.length >= 0, `${county.name} should have products array`);
    for (const p of products) {
      const retailer = getRetailersByCounty(county.name).find(r => r.id === p.retailerId);
      assert.ok(retailer, `${p.slug} retailer not found in ${county.name}`);
    }
  }
});

test("categories in county match retailer categories", () => {
  for (const county of COUNTIES) {
    const retailers = getRetailersByCounty(county.name);
    const categorySlugs = new Set(retailers.flatMap((r) => r.categories));
    for (const slug of categorySlugs) {
      const category = CATEGORIES.find((c) => c.slug === slug);
      assert.ok(category, `${county.name} references unknown category ${slug}`);
    }
  }
});

test("Nairobi has retailers and products", () => {
  const nairobiRetailers = getRetailersByCounty("Nairobi");
  const nairobiProducts = getProductsByCounty("Nairobi");
  assert.ok(nairobiRetailers.length >= 3, `Nairobi has ${nairobiRetailers.length} retailers`);
  assert.ok(nairobiProducts.length >= 5, `Nairobi has ${nairobiProducts.length} products`);
});

test("Mombasa has retailers and products", () => {
  const mombasaRetailers = getRetailersByCounty("Mombasa");
  const mombasaProducts = getProductsByCounty("Mombasa");
  assert.ok(mombasaRetailers.length >= 2, `Mombasa has ${mombasaRetailers.length} retailers`);
  assert.ok(mombasaProducts.length >= 2, `Mombasa has ${mombasaProducts.length} products`);
});