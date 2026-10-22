import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  COUNTIES,
  getRetailersByCounty,
  getProductsByCounty,
  CATEGORIES,
} from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ county: string }> };

function countySlugToName(slug: string): string | null {
  const matched = COUNTIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  return matched?.name ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { county: countySlug } = await params;
  const countyName = countySlugToName(countySlug);
  if (!countyName) return { title: "Location | Nyumba Edit" };
  const retailers = getRetailersByCounty(countyName);
  return {
    title: `Furniture retailers in ${countyName}`,
    description: `Find ${retailers.length} furniture and homeware retailers in ${countyName}, Kenya. Browse products, compare prices and contact stores directly.`,
    openGraph: {
      title: `Furniture retailers in ${countyName} | Nyumba Edit`,
      description: `Browse ${retailers.length} retailers in ${countyName}.`,
      type: "website",
      url: `${SITE.url}/locations/${countySlug}`,
    },
  };
}

export default async function CountyPage({ params }: Params) {
  const { county: countySlug } = await params;
  const countyName = countySlugToName(countySlug);

  if (!countyName) notFound();

  const retailers = getRetailersByCounty(countyName);
  const products = getProductsByCounty(countyName);
  const categorySlugs = Array.from(new Set(retailers.flatMap((r) => r.categories)));
  const categoriesInCounty = categorySlugs
    .map((slug) => CATEGORIES.find((c) => c.slug === slug))
    .filter((c): c is (typeof CATEGORIES)[number] => Boolean(c));

  return (
    <div className="space-y-12">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li>
            <Link href="/locations" className="hover:text-primary transition-colors">
              All locations
            </Link>
          </li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-foreground">{countyName}</li>
        </ol>
      </nav>

      <section>
        <div className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {countyName}
          </h1>
          <p className="mt-2 text-muted max-w-2xl">
            {retailers.length} retailer{retailers.length === 1 ? "" : "s"} across{" "}
            {new Set(retailers.map((r) => r.town)).size} town{new Set(retailers.map((r) => r.town)).size === 1 ? "" : "s"}.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted">Retailers</p>
              <p className="font-bold text-foreground text-xl">{retailers.length}</p>
            </div>
            <div>
              <p className="text-muted">Products</p>
              <p className="font-bold text-foreground text-xl">{products.length}</p>
            </div>
            <div>
              <p className="text-muted">Categories</p>
              <p className="font-bold text-foreground text-xl">
                {categoriesInCounty.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {categoriesInCounty.length > 0 && (
        <section aria-label="Categories available in this county">
          <h2 className="font-heading text-xl font-bold mb-4">
            Categories available
          </h2>
          <div className="flex flex-wrap gap-2">
            {categoriesInCounty.map((cat) => (
              <Link
                key={cat.slug}
                href={`/discover?county=${encodeURIComponent(countyName)}&category=${cat.slug}`}
                className="rounded-xl border border-border bg-white px-4 py-2 text-sm hover:border-primary/60 transition-colors focus-visible-ring"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-label={`Retailers in ${countyName}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold">
            Retailers in {countyName}
          </h2>
          <Link href="/retailers" className="text-sm font-semibold text-primary hover:underline">
            All retailers &rarr;
          </Link>
        </div>
        {retailers.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted">
            No retailers listed in {countyName} yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailers.map((r) => (
              <Link
                key={r.id}
                href={`/retailers/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring relative"
              >
                {r.sponsored && (
                  <Badge variant="sponsor" className="absolute -top-2 right-4">
                    {r.sponsorLabel}
                  </Badge>
                )}
                <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {r.name}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {r.shortDescription}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    {r.town}{r.area ? `, ${r.area}` : ""}
                  </span>
                  <span className="text-muted">
                    {r.madeInKenya ? "Made in Kenya" : "Retailer"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section aria-label={`Sample products from ${countyName}`}>
        <h2 className="font-heading text-xl font-bold mb-6">
          Sample products
        </h2>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted">
            No demo products from retailers in {countyName}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 9).map((p) => (
              <Card
                key={p.id}
                className="flex flex-col h-full group hover:border-primary/60 transition-colors"
              >
                <div className="relative h-40 overflow-hidden rounded-t-2xl bg-cream-100">
                  <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
                    {p.name}
                  </span>
                </div>
                <CardContent className="flex-1 flex flex-col">
                  <h3 className="font-heading font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2 flex-1">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
                    {!p.priceConfirmed && (
                      <span className="text-xs text-warning font-semibold">
                        Price may be outdated
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-muted">
                    <Link
                      href={`/retailers/${p.retailerSlug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {p.retailerName}
                    </Link>
                  </div>
                  <div className="mt-auto pt-3">
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <Link href={`/products/${p.slug}`}>View product</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {products.length > 9 && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline" size="sm">
              <Link href={`/discover?county=${encodeURIComponent(countyName)}`}>
                View all {products.length} products
              </Link>
            </Button>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
        <h2 className="font-heading text-lg font-bold mb-2">Looking for something specific?</h2>
        <p className="text-sm text-muted max-w-2xl mb-4">
          Use the discover page to search and filter products, retailers and guides
          across {countyName}.
        </p>
        <Button asChild>
          <Link href={`/discover?county=${encodeURIComponent(countyName)}`}>
            Search in {countyName}
          </Link>
        </Button>
      </section>
    </div>
  );
}