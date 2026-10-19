"use strict";

import Link from "next/link";
import { CATEGORIES, RETAILERS, ARTICLES, PROMOTIONS, formatKes } from "@/lib/data/demo";
import { Card, CardImage } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp";

export const metadata = {
  title: "Find furniture and home stores in Kenya",
  description: "Browse furniture retailers, products and editorial guides in Kenya. Prices in KSh, dimensions in cm. Contact retailers directly.",
};

const ACTIVE_PROMOTIONS = PROMOTIONS.filter((p) => p.active);

export default function HomePage() {
  const featuredRetailers = RETAILERS.filter((r) => r.sponsored).slice(0, 3);
  const recentArticles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative rounded-2xl border border-border bg-green-900 text-white overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
              Find furniture and home stores in Kenya.
            </h1>
            <p className="mt-4 text-green-200/90 text-lg max-w-xl">
              Discover retailers, browse products and shopping guides, and
              contact sellers directly. Prices shown in KSh — always confirm
              with the retailer before buying.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <a href="/discover">Start searching</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/retailers">Browse retailers</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <CardImage src="placeholder:hero-interior" alt="Living room interior" height={320} />
          </div>
        </div>

        {ACTIVE_PROMOTIONS.length > 0 && (
          <div className="bg-white/5 border border-white/10 backdrop-blur backdrop-blur-sm p-4 md:p-6">
            <p className="text-xs text-green-300/80 uppercase tracking-wider mb-1">
              Paid placement
            </p>
            <p className="text-sm font-medium">
              {ACTIVE_PROMOTIONS[0].label}:{" "}
              <span className="italic">
                {RETAILERS.find((r) => r.id === ACTIVE_PROMOTIONS[0].targetId)?.name ||
                  ACTIVE_PROMOTIONS[0].targetId}
              </span>{" "}
              is a {ACTIVE_PROMOTIONS[0].label.toLowerCase()} of Nyumba Edit.
            </p>
          </div>
        )}
      </section>

      {/* Search strip */}
      <section className="relative">
        <div className="absolute -inset-px bg-green-800 rounded-2xl blur opacity-20" aria-hidden="true" />
        <Card className="relative p-6 md:p-8 shadow-lg">
          <form action="/discover" method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <label className="sr-only">Search for furniture, retailers or guides</label>
            <input
              name="q"
              className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted focus-visible-ring"
              placeholder="Search furniture, retailers or guides…"
            />
            <label className="sr-only">Category</label>
            <select
              name="category"
              className="rounded-xl border border-border bg-white px-4 py-3 text-ink focus-visible-ring"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="sr-only">County</label>
            <select name="county" className="rounded-xl border border-border bg-white px-4 py-3 text-ink focus-visible-ring">
              <option value="">All locations</option>
              {RETAILERS.map((r) => (
                <option key={r.id} value={r.county}>
                  {r.county}
                </option>
              ))}
            </select>
            <Button type="submit" size="lg">Search</Button>
          </form>
        </Card>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold">Browse by category</h2>
            <p className="text-muted text-sm">Shop sofas, beds, dining, storage, lighting, décor, outdoor and home office.</p>
          </div>
          <Link href="/discover?category=" className="text-sm font-semibold text-green-800 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/discover?category=${category.slug}`}
              className="group rounded-2xl border border-border bg-white overflow-hidden transition-colors hover:border-green-800/60 focus-visible-ring"
              aria-label={`Browse ${category.name}`}
            >
              <CardImage src={`placeholder:${category.slug}`} alt={category.name} height={170} />
              <div className="p-4">
                <h3 className="font-heading font-bold text-ink">{category.name}</h3>
                <p className="text-xs text-muted mt-1">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides / collections */}
      <section className="bg-cream-50 rounded-2xl border border-border p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold">Curated guides</h2>
            <p className="text-muted text-sm">Buying guides, room inspiration and maker stories.</p>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-green-800 hover:underline">All guides →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/guides/${article.slug}`}
              className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:border-green-800/60 transition-colors focus-visible-ring group"
            >
              <CardImage src={article.image} alt={article.title} height={200} />
              <div className="p-4 flex-1 flex flex-col">
                {article.sponsored && <SponsorLabel className="mb-3">{article.sponsorLabel || "Sponsored"}</SponsorLabel>}
                <span className="text-xs text-muted mb-2">{article.category}</span>
                <h3 className="font-heading font-bold text-ink line-clamp-2 group-hover:text-green-800 transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Retailer recommendations */}
      <section className="section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-heading text-2xl font-bold">Retailers to explore</h2>
          <Link href="/retailers" className="text-sm font-semibold text-green-800 hover:underline">All retailers →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RETAILERS.map((retailer) => (
            <Link
              key={retailer.id}
              href={`/retailers/${retailer.slug}`}
              className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:border-green-800/60 transition-colors focus-visible-ring group"
            >
              {retailer.sponsored && <SponsorLabel className="absolute top-4 left-4 z-10">{retailer.sponsorLabel}</SponsorLabel>}
              <CardImage src={retailer.cover} alt={`${retailer.name} showroom`} height={200} />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-bold text-ink">{retailer.name}</h3>
                  {retailer.sponsored && (
                    <Badge variant="tertiary" className="ml-auto text-[0.6rem] uppercase tracking-wider">
                      Featured Partner
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted line-clamp-2">{retailer.shortDescription}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">{retailer.town}, {retailer.county}</span>
                  <span className="text-xs text-muted">{retailer.madeInKenya ? "Made in Kenya" : "Retailer"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Retailer CTA */}
      <section className="section rounded-2xl border border-border bg-green-800 p-8 md:p-12 text-white">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Sell furniture? List your business.</h2>
        <p className="text-green-200/90 mb-8 max-w-xl">
          Reach shoppers across Kenya with a retailer profile. Submission does not
          guarantee publication — all listings are reviewed by our editorial team.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild>
            <a href="/submit">List your business</a>
          </Button>
          <Link href="/advertise" className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/20 transition-colors focus-visible-ring">
            Advertise with us
          </Link>
        </div>
      </section>
    </div>
  );
}
