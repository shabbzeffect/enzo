import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES,
  COUNTIES,
  PRODUCTS,
  RETAILERS,
} from "@/lib/data/demo";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Browse categories",
  description:
    "Browse furniture categories in Kenya — sofas, beds, dining, storage, lighting, décor, outdoor and home office. Prices in KSh, dimensions in cm.",
  openGraph: {
    title: "Browse categories | Nyumba Edit",
    description: "Furniture categories for Kenyan shoppers.",
    url: `${SITE.url}/categories`,
  },
};

export default function CategoriesPage() {
  const counties = COUNTIES.map((county) => {
    const towns = county.towns.map((t) => t.name);
    const retailers = RETAILERS.filter((r) => r.county === county.name);
    return { name: county.name, count: retailers.length };
  }).filter((c) => c.count > 0);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Browse categories</h1>
        <p className="mt-2 text-muted text-sm">
          {PRODUCTS.length} demo products across {CATEGORIES.length} categories and{" "}
          {RETAILERS.length} retailers. Prices in KSh — always confirm with the
          retailer before buying.
        </p>
      </div>

      <section aria-label="Furniture categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:border-primary/60 transition-colors focus-visible-ring"
              aria-label={`Browse ${category.name}`}
            >
              <div className="relative h-40 overflow-hidden bg-cream-100">
                <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
                  {category.name}
                </span>
              </div>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>
                  <Badge variant="subtle">{category.count} products</Badge>
                </div>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {category.description}
                </p>
                <span className="mt-auto pt-3 text-xs font-semibold text-primary">
                  View category →
                </span>
              </CardContent>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Retailers by county">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-heading text-xl font-bold">Retailers by county</h2>
            <p className="text-muted text-sm">
              Demo listings across {RETAILERS.length} fictional retailers.
            </p>
          </div>
          <Link href="/retailers" className="text-sm font-semibold text-primary hover:underline">
            Full directory →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {counties.map((county) => (
            <Link
              key={county.name}
              href={`/discover?type=retailers&county=${encodeURIComponent(county.name)}`}
              className="rounded-2xl border border-border bg-white p-4 text-center hover:border-primary/60 transition-colors focus-visible-ring"
            >
              <span className="block font-heading font-bold text-foreground text-sm">
                {county.name}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {county.count} retailer{county.count === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
