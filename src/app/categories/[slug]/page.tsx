import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES,
  getCategory,
  getProductsByCategory,
  getRetailersByCategory,
  ARTICLES,
} from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { CompareToggle } from "@/components/compare";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category | Nyumba Edit" };
  return {
    title: `${category.name} in Kenya`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Nyumba Edit`,
      description: category.description,
      type: "website",
      url: `${SITE.url}/categories/${slug}`,
      images: [
        {
          url: `${SITE.url}/images/og-default.svg`,
          alt: category.name,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Nyumba Edit`,
      description: category.description,
      images: [`${SITE.url}/images/og-default.svg`],
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const retailers = getRetailersByCategory(slug);
  const productSlugs = new Set(products.map((p) => p.slug));
  const relatedArticles = ARTICLES.filter((a) =>
    a.relatedProductSlugs.some((s) => productSlugs.has(s))
  ).slice(0, 3);

  return (
    <div className="space-y-12">
      <JsonLd
        type="CollectionPage"
        data={{
          name: category.name,
          description: category.description,
          url: `${SITE.url}/categories/${category.slug}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((p, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE.url}/products/${p.slug}`,
              name: p.name,
            })),
          },
        }}
      />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li>
            <Link href="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
          </li>
          <li aria-hidden="true">&rsaquo;</li>
          <li className="text-foreground">{category.name}</li>
        </ol>
      </nav>

      <section>
        <div className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                {category.name}
              </h1>
              <p className="mt-2 text-sm text-muted max-w-2xl">
                {category.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="subtle">{products.length} products</Badge>
              <Badge variant="subtle">
                {retailers.length} retailer{retailers.length === 1 ? "" : "s"}
              </Badge>
              <Button asChild size="sm">
                <Link href={`/discover?category=${category.slug}`}>
                  Search this category
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={`Products in ${category.name}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold">
            Products in {category.name}
          </h2>
        </div>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted">
            No demo products in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
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
                  {p.sponsored && (
                    <SponsorLabel className="mb-2 self-start">
                      {p.sponsorLabel || "Sponsored"}
                    </SponsorLabel>
                  )}
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
                  <div className="mt-auto pt-3 flex items-center gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <Link href={`/products/${p.slug}`}>View product</Link>
                    </Button>
                    <CompareToggle slug={p.slug} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {retailers.length > 0 && (
        <section aria-label={`Retailers stocking ${category.name}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold">
              Retailers stocking {category.name}
            </h2>
            <Link href="/retailers" className="text-sm font-semibold text-primary hover:underline">
              All retailers →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {retailers.map((r) => (
              <Link
                key={r.id}
                href={`/retailers/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring relative"
              >
                {r.sponsored && (
                  <SponsorLabel className="absolute -top-2 right-4">
                    {r.sponsorLabel}
                  </SponsorLabel>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {r.name}
                  </h3>
                  {r.verified && <Badge variant="success">Verified</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {r.shortDescription}
                </p>
                <div className="mt-auto pt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    {r.town}, {r.county}
                  </span>
                  <span className="text-muted">
                    {r.madeInKenya ? "Made in Kenya" : "Retailer"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section aria-label="Related guides">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold">Related guides</h2>
            <Link href="/guides" className="text-sm font-semibold text-primary hover:underline">
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <Link
                key={a.id}
                href={`/guides/${a.slug}`}
                className="group rounded-2xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring"
              >
                <span className="text-xs text-muted">{a.category}</span>
                <h3 className="mt-1 font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
