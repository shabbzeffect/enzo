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
  REVIEWS,
  AUTHORS,
  ARTICLE_CATEGORIES,
  getCategory,
  getProductsByCategory,
  getRetailersByCategory,
  getRetailersByCounty,
  getReviewsByRetailer,
  getReviewsForProduct,
  getAuthor,
  getArticlesByCategory,
  articleCategoryName,
  averageRating,
  ratingBreakdown,
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

test("catalogue is large enough to browse (>= 14 retailers, 20 products, 6 articles)", () => {
  assert.ok(RETAILERS.length >= 14, `only ${RETAILERS.length} retailers`);
  assert.ok(PRODUCTS.length >= 20, `only ${PRODUCTS.length} products`);
  assert.ok(ARTICLES.length >= 6, `only ${ARTICLES.length} articles`);
});

test("product ids and slugs are unique", () => {
  const ids = new Set(PRODUCTS.map((p) => p.id));
  const slugs = new Set(PRODUCTS.map((p) => p.slug));
  assert.strictEqual(ids.size, PRODUCTS.length);
  assert.strictEqual(slugs.size, PRODUCTS.length);
});

test("every product references an existing retailer", () => {
  const retailerIds = new Set(RETAILERS.map((r) => r.id));
  const retailerSlugs = new Set(RETAILERS.map((r) => r.slug));
  for (const p of PRODUCTS) {
    assert.ok(retailerIds.has(p.retailerId), `${p.slug} -> ${p.retailerId}`);
    assert.ok(retailerSlugs.has(p.retailerSlug), `${p.slug} -> ${p.retailerSlug}`);
  }
});

test("every retailer stocks at least one existing category", () => {
  const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));
  for (const r of RETAILERS) {
    assert.ok(r.categories.length > 0, `${r.slug} has no categories`);
    for (const slug of r.categories) {
      assert.ok(categorySlugs.has(slug), `${r.slug} -> ${slug}`);
    }
  }
});

test("category counts match the product catalogue", () => {
  for (const category of CATEGORIES) {
    const expected = PRODUCTS.filter((p) => p.category === category.slug).length;
    assert.strictEqual(category.count, expected, `${category.slug} count`);
  }
});

test("every product category resolves to a category page", () => {
  for (const p of PRODUCTS) {
    assert.ok(getCategory(p.category), `${p.slug} -> ${p.category}`);
  }
});

test("getProductsByCategory and getRetailersByCategory return matching items", () => {
  for (const category of CATEGORIES) {
    const products = getProductsByCategory(category.slug);
    const retailers = getRetailersByCategory(category.slug);
    assert.strictEqual(products.length, category.count);
    for (const r of retailers) assert.ok(r.categories.includes(category.slug));
  }
});

test("getRetailersByCounty returns only retailers from that county", () => {
  const nairobi = getRetailersByCounty("Nairobi");
  assert.ok(nairobi.length >= 3);
  for (const r of nairobi) assert.strictEqual(r.county, "Nairobi");
});

test("reviews are 1–5, published, and reference existing retailers", () => {
  assert.ok(REVIEWS.length >= 15, `only ${REVIEWS.length} reviews`);
  const byId = new Map(RETAILERS.map((r) => [r.id, r]));
  for (const review of REVIEWS) {
    assert.ok(review.rating >= 1 && review.rating <= 5, review.id);
    assert.ok(review.body.length > 20, review.id);
    assert.ok(["published", "pending"].includes(review.status), review.id);
    const retailer = byId.get(review.retailerId);
    assert.ok(retailer, `${review.id} -> ${review.retailerId}`);
    assert.strictEqual(retailer.slug, review.retailerSlug);
  }
});

test("every retailer with reviews exposes them through the helper", () => {
  const withReviews = new Set(REVIEWS.map((r) => r.retailerId));
  for (const retailerId of withReviews) {
    assert.ok(getReviewsByRetailer(retailerId).length > 0, retailerId);
  }
});

test("getReviewsForProduct matches on purchased product name", () => {
  const sofa = getReviewsForProduct("Mavuno Three-Seater Sofa");
  assert.ok(sofa.length >= 1);
  for (const review of sofa) {
    assert.strictEqual(review.purchasedProduct, "Mavuno Three-Seater Sofa");
  }
  assert.strictEqual(getReviewsForProduct("Nonexistent Product").length, 0);
});

test("averageRating and ratingBreakdown compute correctly", () => {
  const sample = [
    { rating: 5 },
    { rating: 4 },
    { rating: 4 },
  ] as Parameters<typeof averageRating>[0];

  assert.strictEqual(averageRating(sample), 4.3);
  assert.strictEqual(averageRating([]), null);

  const breakdown = ratingBreakdown(sample);
  assert.strictEqual(breakdown[5], 1);
  assert.strictEqual(breakdown[4], 2);
  assert.strictEqual(breakdown[3], 0);
});

test("article categories resolve to display names and authors exist", () => {
  const categorySlugs = new Set(ARTICLE_CATEGORIES.map((c) => c.slug));
  const authorSlugs = new Set(AUTHORS.map((a) => a.slug));
  for (const article of ARTICLES) {
    assert.ok(categorySlugs.has(article.category), `${article.slug} -> ${article.category}`);
    assert.notStrictEqual(articleCategoryName(article.category), article.category);
    assert.ok(authorSlugs.has(article.authorSlug), `${article.slug} -> ${article.authorSlug}`);
    assert.ok(getAuthor(article.authorSlug), article.authorSlug);
  }
  assert.strictEqual(articleCategoryName("unknown-slug"), "unknown-slug");
});

test("getArticlesByCategory filters by category", () => {
  for (const category of ARTICLE_CATEGORIES) {
    const articles = getArticlesByCategory(category.slug);
    for (const article of articles) assert.strictEqual(article.category, category.slug);
  }
});
