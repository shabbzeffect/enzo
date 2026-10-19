import { MetadataRoute } from "next";
import { RETAILERS, PRODUCTS, ARTICLES } from "@/lib/data/demo";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/discover",
    "/retailers",
    "/guides",
    "/submit",
    "/contact",
    "/about",
    "/advertise",
    "/privacy",
    "/terms",
    "/editorial-policy",
  ].map((route) => ({
    url: SITE.url + route,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const retailerRoutes = RETAILERS.map((r) => ({
    url: SITE.url + `/retailers/${r.slug}`,
    lastModified: r.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: SITE.url + `/products/${p.slug}`,
    lastModified: p.priceLastChecked,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = ARTICLES.map((a) => ({
    url: SITE.url + `/guides/${a.slug}`,
    lastModified: a.updatedAt || a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...retailerRoutes, ...productRoutes, ...articleRoutes];
}
