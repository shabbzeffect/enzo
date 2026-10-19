// src/lib/data/catalog.ts
//
// Live read layer over the demo store (src/server/demo-store.ts).
//
// Public server pages import from here instead of directly from demo.ts so
// that admin changes (archiving, moderation, price confirmations, promotion
// toggles) are reflected on the public site. Reads fall back to the same
// fictional demo dataset; hidden items (archived listings, draft articles,
// unapproved reviews) are filtered out with public-catalogue semantics.
//
// Client-only components (saved items, compare, recently viewed) continue to
// read demo.ts directly — they run in the browser with a static snapshot.

import { getStore } from "@/server/demo-store";
import {
  ARTICLE_CATEGORIES,
  AUTHORS,
  CATEGORIES,
  COUNTIES,
  PLANNER_ROOMS,
  PRICE_HISTORY,
  articleCategoryName,
  averageRating,
  estimatePlannerBudget,
  formatKes,
  getAuthor,
  getCategory,
  getCollectionsByRoom,
  getCollection,
  getProductsByCollection,
  getPriceChange,
  getPlannerRoom,
  getRetailersByCollection,
  parseKenyanPhone,
  ratingBreakdown,
  whatsappLink,
  type ArticleCategory,
  type Author,
  type Collection,
  type County,
  type PlannerRoom,
  type PriceHistory,
  type PricePoint,
  type Product,
  type Promotion,
  type Retailer,
  type Review,
} from "./demo";

// Re-export pure helpers and static reference data (no store involvement).
export {
  ARTICLE_CATEGORIES,
  AUTHORS,
  COUNTIES,
  PLANNER_ROOMS,
  articleCategoryName,
  averageRating,
  estimatePlannerBudget,
  formatKes,
  getAuthor,
  getCategory,
  getCollectionsByRoom,
  getCollection,
  getProductsByCollection,
  getPriceChange,
  getPlannerRoom,
  getRetailersByCollection,
  parseKenyanPhone,
  ratingBreakdown,
  whatsappLink,
};
export type {
  ArticleCategory,
  Author,
  Collection,
  County,
  PlannerRoom,
  PriceHistory,
  PricePoint,
  Product,
  Promotion,
  Retailer,
  Review,
};

// ---------------------------------------------------------------------------
// Catalogue reads (store-backed; archived/draft/hidden excluded)
// ---------------------------------------------------------------------------

export function getRetailers(): Retailer[] {
  return getStore().retailers.filter((r) => r.status === "published");
}

export function getAllRetailers() {
  return getStore().retailers;
}

export function getRetailer(slug: string): Retailer | undefined {
  return getStore().retailers.find((r) => r.slug === slug && r.status === "published");
}

export function getProducts(): Product[] {
  return getStore().products.filter((p) => p.status === "published");
}

export function getAllProducts() {
  return getStore().products;
}

export function getProduct(slug: string): Product | undefined {
  return getStore().products.find((p) => p.slug === slug && p.status === "published");
}

export function getArticles() {
  return getStore().articles.filter((a) => a.status === "published");
}

export function getArticle(slug: string) {
  return getStore().articles.find((a) => a.slug === slug && a.status === "published");
}

export function getReviews(): Review[] {
  return getStore().reviews.filter((r) => r.status === "published");
}

export function getPromotions(): Promotion[] {
  return getStore().promotions;
}

export function getActivePromotions(): Promotion[] {
  const now = Date.now();
  return getStore().promotions.filter((p) => {
    if (!p.active) return false;
    const start = Date.parse(p.startDate);
    const end = Date.parse(p.endDate);
    if (!Number.isNaN(start) && start > now) return false;
    if (!Number.isNaN(end) && end < now) return false;
    return true;
  });
}

export function getCategories() {
  const products = getProducts();
  return CATEGORIES.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.slug).length,
  }));
}

export function getLiveCategory(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

export function getProductsByRetailer(retailerId: string): Product[] {
  return getProducts().filter((p) => p.retailerId === retailerId);
}

export function getRetailersByCategory(slug: string): Retailer[] {
  return getRetailers().filter((r) => r.categories.includes(slug));
}

export function getProductsByCategory(slug: string): Product[] {
  return getProducts().filter((p) => p.category === slug);
}

export function getRetailersByCounty(county: string): Retailer[] {
  return getRetailers().filter((r) => r.county === county);
}

export function getProductsByCounty(county: string): Product[] {
  const retailerIds = new Set(getRetailersByCounty(county).map((r) => r.id));
  return getProducts().filter((p) => retailerIds.has(p.retailerId));
}

export function getArticlesByCategory(slug: string) {
  return getArticles().filter((a) => a.category === slug);
}

export function getReviewsByRetailer(retailerId: string): Review[] {
  return getStore().reviews.filter((r) => r.retailerId === retailerId && r.status === "published");
}

export function getReviewsForProduct(productName: string): Review[] {
  return getStore().reviews.filter((r) => r.purchasedProduct === productName && r.status === "published");
}

export function getEnquiryCount(): number {
  return getStore().enquiries.length;
}

// Collections reference product/retailer slugs; resolve against live items.
export function getLiveProductsByCollection(slug: string): Product[] {
  const collection = getCollection(slug);
  if (!collection) return [];
  return collection.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
}

export function getLiveRetailersByCollection(slug: string): Retailer[] {
  const collection = getCollection(slug);
  if (!collection) return [];
  return collection.retailerSlugs
    .map((s) => getRetailer(s))
    .filter((r): r is Retailer => Boolean(r));
}

export function getPriceHistory(productSlug: string): PriceHistory | undefined {
  return PRICE_HISTORY.find((h) => h.productSlug === productSlug);
}
