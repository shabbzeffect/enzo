import { MetadataRoute } from "next";
import { RETAILERS, PRODUCTS, ARTICLES, CATEGORIES, COLLECTIONS, COUNTIES } from "@/lib/data/demo";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/discover",
    "/categories",
    "/collections",
    "/compare",
    "/saved",
    "/planner",
    "/locations",
    "/faq",
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

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: SITE.url + `/categories/${c.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionRoutes = COLLECTIONS.map((c) => ({
    url: SITE.url + `/collections/${c.slug}`,
    lastModified: c.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes = COUNTIES.map((c) => ({
    url: SITE.url + `/locations/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
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

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...locationRoutes,
    ...retailerRoutes,
    ...productRoutes,
    ...articleRoutes,
  ];
}
