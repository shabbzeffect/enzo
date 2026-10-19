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
  COLLECTIONS,
  PRICE_HISTORY,
  PLANNER_ROOMS,
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
  getCollection,
  getProductsByCollection,
  getRetailersByCollection,
  getCollectionsByRoom,
  getPriceHistory,
  getPriceChange,
  getPlannerRoom,
  estimatePlannerBudget,
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

test("COUNTIES seed includes at least 10 counties with towns", () => {
  assert.ok(COUNTIES.length >= 10, `only ${COUNTIES.length} counties`);
  for (const county of COUNTIES) {
    assert.ok(county.towns.length > 0, `${county.name} has no towns`);
  }
});

test("catalogue grew: >= 20 retailers, 40 products, 11 articles, 30 reviews", () => {
  assert.ok(RETAILERS.length >= 20, `only ${RETAILERS.length} retailers`);
  assert.ok(PRODUCTS.length >= 40, `only ${PRODUCTS.length} products`);
  assert.ok(ARTICLES.length >= 11, `only ${ARTICLES.length} articles`);
  assert.ok(REVIEWS.length >= 30, `only ${REVIEWS.length} reviews`);
});

test("every product has a county-backed retailer", () => {
  const counties = new Set(COUNTIES.map((c) => c.name));
  for (const r of RETAILERS) {
    assert.ok(counties.has(r.county), `${r.slug} county ${r.county} not in COUNTIES`);
  }
});

test("COLLECTIONS reference existing products and retailers", () => {
  assert.ok(COLLECTIONS.length >= 6, `only ${COLLECTIONS.length} collections`);
  const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
  const retailerSlugs = new Set(RETAILERS.map((r) => r.slug));
  for (const collection of COLLECTIONS) {
    assert.ok(collection.productSlugs.length >= 3, `${collection.slug} too few products`);
    for (const slug of collection.productSlugs) {
      assert.ok(productSlugs.has(slug), `${collection.slug} -> ${slug}`);
    }
    for (const slug of collection.retailerSlugs) {
      assert.ok(retailerSlugs.has(slug), `${collection.slug} -> ${slug}`);
    }
  }
});

test("getProductsByCollection and getRetailersByCollection resolve", () => {
  for (const collection of COLLECTIONS) {
    const products = getProductsByCollection(collection.slug);
    const retailers = getRetailersByCollection(collection.slug);
    assert.strictEqual(products.length, collection.productSlugs.length);
    assert.strictEqual(retailers.length, collection.retailerSlugs.length);
  }
  assert.strictEqual(getProductsByCollection("nope").length, 0);
});

test("getCollectionsByRoom filters by room", () => {
  const living = getCollectionsByRoom("living-room");
  assert.ok(living.length >= 1);
  for (const c of living) assert.strictEqual(c.room, "living-room");
});

test("PRICE_HISTORY points are chronological and reference products", () => {
  const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
  assert.ok(PRICE_HISTORY.length >= 10, `only ${PRICE_HISTORY.length} histories`);
  for (const history of PRICE_HISTORY) {
    assert.ok(productSlugs.has(history.productSlug), history.productSlug);
    assert.ok(history.points.length >= 1, history.productSlug);
    for (let i = 1; i < history.points.length; i++) {
      assert.ok(
        history.points[i].date >= history.points[i - 1].date,
        `${history.productSlug} not chronological`
      );
    }
  }
});

test("getPriceChange computes direction and percentage", () => {
  const down = getPriceChange(getPriceHistory("mavuno-three-seater-sofa"));
  assert.strictEqual(down.direction, "down");
  assert.ok(down.changeKes !== null && down.changeKes < 0);
  assert.ok(down.changePct !== null && down.changePct < 0);

  const flat = getPriceChange(getPriceHistory("tembo-bunk-bed"));
  assert.strictEqual(flat.direction, "flat");
  assert.strictEqual(flat.changeKes, 0);

  const none = getPriceChange(undefined);
  assert.strictEqual(none.direction, "none");
  assert.strictEqual(none.changeKes, null);
});

test("PLANNER_ROOMS have essentials with budgets and tips", () => {
  assert.ok(PLANNER_ROOMS.length >= 3, `only ${PLANNER_ROOMS.length} rooms`);
  for (const room of PLANNER_ROOMS) {
    assert.ok(room.essentials.length >= 3, room.slug);
    for (const item of room.essentials) {
      assert.ok(item.minBudget > 0, `${room.slug} -> ${item.label}`);
      assert.ok(item.tip.length > 10, `${room.slug} -> ${item.label} tip`);
      assert.ok(
        CATEGORIES.some((c) => c.slug === item.category),
        `${room.slug} -> ${item.category}`
      );
    }
  }
});

test("estimatePlannerBudget sums essential budgets", () => {
  const studio = estimatePlannerBudget("studio");
  const room = getPlannerRoom("studio");
  const expected = room!.essentials.reduce((s, i) => s + i.minBudget, 0);
  assert.strictEqual(studio, expected);
  assert.strictEqual(estimatePlannerBudget("nope"), 0);
});
