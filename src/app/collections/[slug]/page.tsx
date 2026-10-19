import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCollection,
  getProductsByCollection,
  getRetailersByCollection,
  averageRating,
  getReviewsByRetailer,
} from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/rating";
import { CompareToggle } from "@/components/compare";
import { SaveToggle } from "@/components/saved";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection | Nyumba Edit" };
  return {
    title: collection.title,
    description: collection.excerpt,
    openGraph: {
      title: `${collection.title} | Nyumba Edit`,
      description: collection.excerpt,
      type: "article",
      url: `${SITE.url}/collections/${slug}`,
      images: [
        {
          url: `${SITE.url}/images/og-default.svg`,
          alt: collection.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: collection.title,
      description: collection.excerpt,
      images: [`${SITE.url}/images/og-default.svg`],
    },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);
  const retailers = getRetailersByCollection(slug);

  return (
    <div className="space-y-12">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li>
            <Link href="/collections" className="hover:text-primary transition-colors">
              Collections
            </Link>
          </li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-foreground">{collection.title}</li>
        </ol>
      </nav>

      <section>
        <div className="rounded-2xl border border-border bg-cream-50 p-6 md:p-10">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <Badge variant="subtle">{collection.theme}</Badge>
            {collection.room && <Badge variant="subtle">{collection.room.replace(/-/g, " ")}</Badge>}
            {collection.sponsored && (
              <SponsorLabel>{collection.sponsorLabel || "Sponsored"}</SponsorLabel>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {collection.title}
          </h1>
          <p className="mt-3 text-muted max-w-2xl">{collection.excerpt}</p>
          {collection.curatorNote && (
            <p className="mt-4 text-sm text-foreground border-l-2 border-primary pl-4 italic max-w-2xl">
              {collection.curatorNote}
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold mb-6">The edit</h2>
        <div className="prose prose-invert text-muted max-w-2xl leading-relaxed">
          {collection.body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </section>

      <section aria-label="Products in this collection">
        <h2 className="font-heading text-xl font-bold mb-6">
          {products.length} piece{products.length === 1 ? "" : "s"} in this collection
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
                <div className="mt-3 flex items-baseline gap-2">
                  <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
                  {!p.priceConfirmed && (
                    <span className="text-xs text-warning font-semibold">Price may be outdated</span>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted">
                  <Link href={`/retailers/${p.retailerSlug}`} className="hover:text-primary transition-colors">
                    {p.retailerName}
                  </Link>
                </div>
                <div className="mt-auto pt-3 flex items-center gap-2">
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <Link href={`/products/${p.slug}`}>View product</Link>
                  </Button>
                  <CompareToggle slug={p.slug} />
                  <SaveToggle slug={p.slug} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {retailers.length > 0 && (
        <section aria-label="Retailers in this collection">
          <h2 className="font-heading text-xl font-bold mb-6">Retailers in this edit</h2>
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
                    <span className="font-semibold text-foreground">{r.town}, {r.county}</span>
                    {rating !== null && (
                      <StarRating rating={rating} size="sm" count={reviews.length} />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
        <h2 className="font-heading text-lg font-bold mb-2">About collections</h2>
        <p className="text-sm text-muted max-w-2xl">
          Collections are editorial groupings, not paid placements unless clearly
          labelled. Retailers cannot pay to be included in a collection. Prices
          shown are demo data last checked on the dates listed with each product.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/collections">All collections</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/editorial-policy">Editorial policy</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
