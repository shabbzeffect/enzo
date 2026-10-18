"use server";

import { RETAILERS, COUNTIES, CATEGORIES } from "@/lib/data/demo";

export interface RetailerSearchParams {
  q?: string;
  county?: string;
  category?: string;
}

export async function searchRetailersDemo(params: RetailerSearchParams) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const q = (params.q || "").trim().toLowerCase();
  const county = params.county || "";
  const category = params.category || "";

  const items = RETAILERS.filter((r) => {
    if (county && r.county !== county) return false;
    if (category && !r.categories.includes(category)) return false;
    if (q) {
      const haystack = [r.name, r.description, r.shortDescription, r.town, r.county, r.area || "", r.categories.join(" ")].join(" ").toLowerCase();
      return haystack.includes(q);
    }
    return true;
  });

  return { retailers: items, count: items.length };
}

export { RETAILERS, COUNTIES, CATEGORIES };
