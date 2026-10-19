// src/server/store-core.ts
//
// Pure in-memory catalogue store used by the demo admin.
//
// The store is seeded from src/lib/data/demo.ts (fictional demo data) by
// src/server/demo-store.ts and mutated through server actions in
// src/app/admin/actions.ts. All mutations live in process memory only —
// they reset when the server restarts and are not shared between
// serverless invocations. Production must use the Prisma/PostgreSQL layer
// described in prisma/schema.prisma instead.
//
// This module is intentionally free of runtime imports so it can be unit
// tested directly with `node --test` (type-only imports are erased).

import type {
  Retailer,
  Product,
  Article,
  Promotion,
  Review,
} from "../lib/data/demo";

export type ListingStatus = "published" | "archived";
export type ArticleStatus = "draft" | "published" | "archived";
export type EnquiryStatus = "new" | "read" | "resolved";
export type EnquiryKind = "retailer" | "product" | "contact" | "listing-request";

export type StoredRetailer = Retailer & { status: ListingStatus };
export type StoredProduct = Product & { status: ListingStatus };
export type StoredArticle = Article & { status: ArticleStatus };

export type InboxEnquiry = {
  id: string;
  kind: EnquiryKind;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  retailerSlug?: string;
  retailerName?: string;
  productSlug?: string;
  productName?: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type StoreSeed = {
  retailers: Retailer[];
  products: Product[];
  articles: Article[];
  reviews: Review[];
  promotions: Promotion[];
  enquiries?: InboxEnquiry[];
};

export type StoreState = {
  retailers: StoredRetailer[];
  products: StoredProduct[];
  articles: StoredArticle[];
  reviews: Review[];
  promotions: Promotion[];
  enquiries: InboxEnquiry[];
  seededAt: string;
};

let idCounter = 0;

export function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

export function createStore(seed: StoreSeed): StoreState {
  const cloned = structuredClone(seed);
  return {
    retailers: cloned.retailers.map((r) => ({ ...r, status: "published" as const })),
    products: cloned.products.map((p) => ({ ...p, status: "published" as const })),
    articles: cloned.articles.map((a) => ({ ...a, status: "published" as const })),
    reviews: cloned.reviews,
    promotions: cloned.promotions,
    enquiries: cloned.enquiries ? cloned.enquiries.map((e) => ({ ...e })) : [],
    seededAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Reads (public-catalogue semantics: archived/draft hidden by default)
// ---------------------------------------------------------------------------

export function listRetailers(state: StoreState, includeHidden = false): StoredRetailer[] {
  return includeHidden
    ? state.retailers
    : state.retailers.filter((r) => r.status === "published");
}

export function findRetailer(state: StoreState, slug: string, includeHidden = false) {
  return listRetailers(state, includeHidden).find((r) => r.slug === slug);
}

export function findRetailerById(state: StoreState, id: string, includeHidden = false) {
  return listRetailers(state, includeHidden).find((r) => r.id === id);
}

export function listProducts(state: StoreState, includeHidden = false): StoredProduct[] {
  return includeHidden
    ? state.products
    : state.products.filter((p) => p.status === "published");
}

export function findProduct(state: StoreState, slug: string, includeHidden = false) {
  return listProducts(state, includeHidden).find((p) => p.slug === slug);
}

export function findProductById(state: StoreState, id: string, includeHidden = false) {
  return listProducts(state, includeHidden).find((p) => p.id === id);
}

export function listArticles(state: StoreState, includeHidden = false): StoredArticle[] {
  return includeHidden
    ? state.articles
    : state.articles.filter((a) => a.status === "published");
}

export function findArticle(state: StoreState, slug: string, includeHidden = false) {
  return listArticles(state, includeHidden).find((a) => a.slug === slug);
}

export function findArticleById(state: StoreState, id: string, includeHidden = false) {
  return listArticles(state, includeHidden).find((a) => a.id === id);
}

export function listReviews(state: StoreState): Review[] {
  return state.reviews;
}

export function listPromotions(state: StoreState): Promotion[] {
  return state.promotions;
}

export function listEnquiries(state: StoreState): InboxEnquiry[] {
  return [...state.enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function findEnquiry(state: StoreState, id: string) {
  return state.enquiries.find((e) => e.id === id);
}

// ---------------------------------------------------------------------------
// Mutations — all operate on the shared state object in place
// ---------------------------------------------------------------------------

export function updateRetailer(
  state: StoreState,
  id: string,
  patch: Partial<
    Pick<
      StoredRetailer,
      | "name"
      | "shortDescription"
      | "description"
      | "phone"
      | "whatsapp"
      | "email"
      | "sponsored"
      | "sponsorLabel"
      | "delivery"
      | "assembly"
      | "customization"
      | "madeInKenya"
      | "showroom"
    >
  >
): boolean {
  const retailer = state.retailers.find((r) => r.id === id);
  if (!retailer) return false;
  Object.assign(retailer, patch);
  retailer.updatedAt = new Date().toISOString();
  if (patch.sponsored === false) retailer.sponsorLabel = undefined;
  return true;
}

export function setRetailerStatus(state: StoreState, id: string, status: ListingStatus): boolean {
  const retailer = state.retailers.find((r) => r.id === id);
  if (!retailer) return false;
  retailer.status = status;
  retailer.updatedAt = new Date().toISOString();
  return true;
}

export function updateProduct(
  state: StoreState,
  id: string,
  patch: Partial<
    Pick<
      StoredProduct,
      | "name"
      | "description"
      | "priceKes"
      | "priceOnRequest"
      | "availability"
      | "delivery"
      | "assembly"
      | "customization"
      | "priceConfirmed"
      | "sponsored"
      | "sponsorLabel"
    >
  >
): boolean {
  const product = state.products.find((p) => p.id === id);
  if (!product) return false;
  Object.assign(product, patch);
  if (patch.sponsored === false) product.sponsorLabel = undefined;
  return true;
}

export function setProductStatus(state: StoreState, id: string, status: ListingStatus): boolean {
  const product = state.products.find((p) => p.id === id);
  if (!product) return false;
  product.status = status;
  return true;
}

export function confirmProductPrice(state: StoreState, id: string): boolean {
  const product = state.products.find((p) => p.id === id);
  if (!product) return false;
  product.priceConfirmed = true;
  product.priceLastChecked = new Date().toISOString().slice(0, 10);
  return true;
}

export function updateArticle(
  state: StoreState,
  id: string,
  patch: Partial<Pick<StoredArticle, "title" | "excerpt" | "sponsored" | "sponsorLabel">>
): boolean {
  const article = state.articles.find((a) => a.id === id);
  if (!article) return false;
  Object.assign(article, patch);
  if (patch.sponsored === false) article.sponsorLabel = undefined;
  return true;
}

export function setArticleStatus(state: StoreState, id: string, status: ArticleStatus): boolean {
  const article = state.articles.find((a) => a.id === id);
  if (!article) return false;
  article.status = status;
  article.updatedAt = new Date().toISOString();
  return true;
}

export function setReviewStatus(state: StoreState, id: string, status: Review["status"]): boolean {
  const review = state.reviews.find((r) => r.id === id);
  if (!review) return false;
  review.status = status;
  return true;
}

export function removeReview(state: StoreState, id: string): boolean {
  const index = state.reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;
  state.reviews.splice(index, 1);
  return true;
}

export function updatePromotion(
  state: StoreState,
  id: string,
  patch: Partial<Pick<Promotion, "label" | "startDate" | "endDate" | "active">>
): boolean {
  const promotion = state.promotions.find((p) => p.id === id);
  if (!promotion) return false;
  Object.assign(promotion, patch);
  return true;
}

export function setPromotionActive(state: StoreState, id: string, active: boolean): boolean {
  return updatePromotion(state, id, { active });
}

export function addEnquiry(
  state: StoreState,
  input: Omit<InboxEnquiry, "id" | "status" | "createdAt">
): InboxEnquiry {
  const enquiry: InboxEnquiry = {
    ...input,
    id: nextId("enq"),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  state.enquiries.unshift(enquiry);
  return enquiry;
}

export function setEnquiryStatus(state: StoreState, id: string, status: EnquiryStatus): boolean {
  const enquiry = state.enquiries.find((e) => e.id === id);
  if (!enquiry) return false;
  enquiry.status = status;
  return true;
}

export function deleteEnquiry(state: StoreState, id: string): boolean {
  const index = state.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return false;
  state.enquiries.splice(index, 1);
  return true;
}
