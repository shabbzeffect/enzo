"use server";

import { PRODUCTS, RETAILERS, ARTICLES, CATEGORIES, COUNTIES, type Product, type Retailer, type Article } from "@/lib/data/demo";

export type SearchResultType = "products" | "retailers" | "articles";

export interface SearchParams {
  q?: string;
  type?: SearchResultType;
  category?: string;
  county?: string;
  town?: string;
  minPrice?: string;
  maxPrice?: string;
  delivery?: string;
  assembly?: string;
  customization?: string;
  sort?: "relevance" | "newest" | "price-asc" | "price-desc";
}

export async function searchDemo(params: SearchParams) {
  // Simulate a small network delay for a realistic loading state in dev.
  await new Promise((resolve) => setTimeout(resolve, 300));

  const q = (params.q || "").trim().toLowerCase();
  const type = params.type || "products";
  const category = params.category || "";
  const county = params.county || "";
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
  const delivery = params.delivery === "true";
  const assembly = params.assembly === "true";
  const customization = params.customization === "true";
  const sort = params.sort || "relevance";

  const results: { type: SearchResultType; item: Product | Retailer | Article }[] = [];

  if (type === "products" || type === "retailers" || type === "articles") {
    if (type === "products") {
      let items = PRODUCTS.filter((p) => {
        if (category && p.category !== category) return false;
        if (minPrice !== null && (p.priceKes === null || p.priceKes < minPrice)) return false;
        if (maxPrice !== null && (p.priceKes === null || p.priceKes > maxPrice)) return false;
        if (delivery && !p.delivery) return false;
        if (assembly && !p.assembly) return false;
        if (customization && !p.customization) return false;
        if (q) {
          const haystack = [p.name, p.description, p.materials.join(" "), p.retailerName].join(" ").toLowerCase();
          return haystack.includes(q);
        }
        return true;
      });
      items = sortResults(items, sort);
      items.forEach((p) => results.push({ type: "products", item: p }));
    }
    if (type === "retailers") {
      let items = RETAILERS.filter((r) => {
        if (county && r.county !== county) return false;
        if (category && !r.categories.includes(category)) return false;
        if (delivery && !r.delivery) return false;
        if (assembly && !r.assembly) return false;
        if (customization && !r.customization) return false;
        if (q) {
          const haystack = [r.name, r.description, r.town, r.county, r.area || ""].join(" ").toLowerCase();
          return haystack.includes(q);
        }
        return true;
      });
      items = sortRetailers(items, sort);
      items.forEach((r) => results.push({ type: "retailers", item: r }));
    }
    if (type === "articles") {
      const items = ARTICLES.filter((a) => {
        if (q) {
          const haystack = [a.title, a.excerpt, a.category].join(" ").toLowerCase();
          return haystack.includes(q);
        }
        return true;
      });
      items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      items.forEach((a) => results.push({ type: "articles", item: a }));
    }
  }

  return { results, count: results.length, params };
}

function sortResults(items: Product[], sort: string) {
  return [...items].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "price-asc") {
      if (a.priceKes === null) return 1;
      if (b.priceKes === null) return -1;
      return a.priceKes - b.priceKes;
    }
    if (sort === "price-desc") {
      if (a.priceKes === null) return -1;
      if (b.priceKes === null) return 1;
      return b.priceKes - a.priceKes;
    }
    return 0;
  });
}

function sortRetailers(items: Retailer[], sort: string) {
  return [...items].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });
}

export { CATEGORIES, COUNTIES };
