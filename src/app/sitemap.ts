import { MetadataRoute } from "next";
import { RETAILERS, PRODUCTS, ARTICLES, CATEGORIES, COLLECTIONS, COUNTIES } from "@/lib/data/demo";
import { SITE } from "@/lib/site";

function getLastModifiedDate(dateString: string): string {
  return new Date(dateString).toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/discover", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/categories", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/retailers", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/guides", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/collections", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/locations", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/planner", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/compare", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/saved", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/submit", priority: 0.4, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
    { route: "/about", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/advertise", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { route: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { route: "/editorial-policy", priority: 0.2, changeFrequency: "yearly" as const },
    { route: "/faq", priority: 0.4, changeFrequency: "monthly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: SITE.url + route,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: SITE.url + `/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collectionRoutes = COLLECTIONS.map((c) => ({
    url: SITE.url + `/collections/${c.slug}`,
    lastModified: getLastModifiedDate(c.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationRoutes = COUNTIES.map((c) => ({
    url: SITE.url + `/locations/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const retailerRoutes = RETAILERS
    .filter((r) => !r.sponsored || r.sponsored)
    .map((r) => ({
      url: SITE.url + `/retailers/${r.slug}`,
      lastModified: getLastModifiedDate(r.updatedAt),
      changeFrequency: "weekly" as const,
      priority: r.sponsored ? 0.8 : 0.7,
    }));

  const productRoutes = PRODUCTS
    .filter((p) => p.availability !== "unavailable")
    .map((p) => ({
      url: SITE.url + `/products/${p.slug}`,
      lastModified: getLastModifiedDate(p.priceLastChecked),
      changeFrequency: "weekly" as const,
      priority: p.sponsored ? 0.7 : 0.6,
    }));

  const articleRoutes = ARTICLES
    .filter((a) => !a.sponsored || a.sponsored)
    .map((a) => ({
      url: SITE.url + `/guides/${a.slug}`,
      lastModified: getLastModifiedDate(a.updatedAt || a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: a.sponsored ? 0.6 : 0.7,
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
