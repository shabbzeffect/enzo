import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { COUNTIES, getRetailersByCounty, getProductsByCounty, averageRating, getReviewsByRetailer } from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { StarRating } from "@/components/ui/rating";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ county: string }> };

function countyFromSlug(slug: string) {
  return COUNTIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
}

export async function generateStaticParams() {
  return COUNTIES.map((c) => ({
    county: c.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { county: countySlug } = await params;
  const county = countyFromSlug(countySlug);
  if (!county) return { title: "Location | Nyumba Edit" };
  const retailerCount = getRetailersByCounty(county.name).length;
  const productCount = getProductsByCounty(county.name).length;
  return {
    title: `Furniture in ${county.name}`,
    description: `${retailerCount} furniture retailers and ${productCount} products in ${county.name}, Kenya. Browse stores, prices and contact details.`,
    openGraph: {
      title: `Furniture in ${county.name} | Nyumba Edit`,
      description: `${retailerCount} furniture retailers and ${productCount} products in ${county.name}, Kenya.`,
      url: `${SITE.url}/locations/${countySlug}`,
    },
  };
}

export default async function CountyPage({ params }: Params) {
  const { county: countySlug } = await params;
  const county = countyFromSlug(countySlug);
  if (!county) notFound();

  const retailers = getRetailersByCounty(county.name);
  const products = getProductsByCounty(county.name);

  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li>
            <Link href="/locations" className="hover:text-primary transition-colors">
              Locations
            </Link>
          </li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-foreground">{county.name}</li>
        </ol>
      </nav>

      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">
          Furniture in {county.name}
        </h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          {retailers.length} retailer{retailers.length === 1 ? "" : "s"} and{" "}
          {products.length} product{products.length === 1 ? "" : "s"} listed in{" "}
          {county.name}. All demo data.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {county.towns.map((town) => (
            <Badge key={town.slug} variant="subtle">
              {town.name}
            </Badge>
          ))}
        </div>
      </div>

      <section aria-label="Retailers in this county">
        <h2 className="font-heading text-xl font-bold mb-6">Retailers in {county.name}</h2>
        {retailers.length === 0 ? (
          <p className="text-sm text-muted">
            No retailers listed in this county yet.{" "}
            <Link href="/submit" className="text-primary hover:underline">
              Know one? List it.
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailers.map((r) => {
              const reviews = getReviewsByRetailer(r.id);
              const rating = averageRating(reviews);
              return (
                <Link
                  key={r.id}
                  href={`/retailers/${r.slug}`}
                  className="group rounded-2xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring relative"
                >
                  {r.sponsored && (
                    <SponsorLabel className="absolute -top-2 right-4">{r.sponsorLabel}</SponsorLabel>
                  )}
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{r.shortDescription}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {r.town}, {r.county}
                    </span>
                    {rating !== null && <StarRating rating={rating} size="sm" count={reviews.length} />}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {products.length > 0 && (
        <section aria-label="Products in this county">
          <h2 className="font-heading text-xl font-bold mb-6">
            {products.length} product{products.length === 1 ? "" : "s"} in {county.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="flex flex-col h-full group hover:border-primary/60 transition-colors">
                <div className="relative h-40 overflow-hidden rounded-t-2xl bg-cream-100">
                  <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
                    {p.name}
                  </span>
                </div>
                <CardContent className="flex-1 flex flex-col">
                  <h3 className="font-heading font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2 flex-1">{p.description}</p>
                  <div className="mt-3">
                    <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
                  </div>
                  <div className="mt-2 text-xs text-muted">{p.retailerName}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
