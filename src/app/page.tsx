"use strict";

import Link from "next/link";
import { CATEGORIES, RETAILERS, ARTICLES, PROMOTIONS } from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp";
import { Input, Select } from "@/components/ui/form";
import { RecentlyViewedSection } from "@/components/recently-viewed";

export const metadata = {
  title: "Find furniture and home stores in Kenya",
  description: "Browse furniture retailers, products and editorial guides in Kenya. Prices in KSh, dimensions in cm. Contact retailers directly.",
};

const ACTIVE_PROMOTIONS = PROMOTIONS.filter((p) => p.active);

export default function HomePage() {
  const featuredRetailers = RETAILERS.filter((r) => r.sponsored).slice(0, 3);
  const recentArticles = ARTICLES.slice(0, 3);
  const homeRetailers = RETAILERS.slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative rounded-2xl border border-border bg-primary text-accent-foreground overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold text-white/90 uppercase tracking-wider">
              Editorial discovery for Kenya
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mt-4">
              Find furniture and home stores in Kenya.
            </h1>
            <p className="mt-4 text-white/90 text-lg max-w-xl">
              Discover retailers, browse products and shopping guides, and
              contact sellers directly. Prices shown in KSh — always confirm
              with the retailer before buying.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <a href="/discover">Start searching</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/retailers">Browse retailers</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-[320px] rounded-xl overflow-hidden bg-secondary border border-white/20">
              <span className="absolute inset-0 flex items-center justify-center text-[0.875rem] font-medium text-white/60 uppercase tracking-wider">
                Hero interior image
              </span>
            </div>
          </div>
        </div>

        {ACTIVE_PROMOTIONS.length > 0 && (
          <div className="bg-white/5 border border-white/10 backdrop-blur backdrop-blur-sm p-4 md:p-6">
            <p className="text-xs text-white/80 uppercase tracking-wider mb-1">
              Paid placement
            </p>
            <p className="text-sm font-medium text-white">
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
        <Card className="relative p-6 md:p-8 shadow-lg">
          <form action="/discover" method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Search"
              name="q"
              placeholder="Search furniture, retailers or guides…"
            />
            <Select
              label="Category"
              name="category"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </Select>
            <Select
              label="County"
              name="county"
            >
              <option value="">All locations</option>
              {[...new Set(RETAILERS.map((r) => r.county))].map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </Select>
            <Button type="submit" size="lg" className="w-full">
              Search
            </Button>
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
          <Link href="/categories" className="text-sm font-semibold text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-xl border border-border bg-white overflow-hidden transition-colors hover:border-primary/60 focus-visible-ring"
              aria-label={`Browse ${category.name}`}
            >
              <div className="relative h-48 overflow-hidden rounded-lg bg-cream-100 group-hover:scale-105 transition-transform duration-300">
                <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider text-muted">
                  {category.name}
                </span>
              </div>
              <CardContent>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading font-bold text-foreground">{category.name}</h3>
                  <span className="text-[0.65rem] font-semibold text-muted">{category.count}</span>
                </div>
                <p className="text-xs text-muted mt-1">{category.description}</p>
              </CardContent>
            </Link>
          ))}
        </div>
      </section>

      {/* Guides / collections */}
      <section className="section rounded-2xl border border-border bg-cream-50 p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold">Curated guides</h2>
            <p className="text-muted text-sm">Buying guides, room inspiration and maker stories.</p>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-primary hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <Link
              key={article.id}
              href={`/guides/${article.slug}`}
              className="flex flex-col rounded-xl border border-border bg-white overflow-hidden hover:border-primary/60 transition-colors focus-visible-ring group"
            >
              <div className="relative h-48 overflow-hidden rounded-lg bg-cream-100">
                <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider text-muted">
                  {article.title}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                {article.sponsored && <SponsorLabel className="mb-3">{article.sponsorLabel || "Sponsored"}</SponsorLabel>}
                <span className="text-xs text-muted mb-2">{article.category}</span>
                <h3 className="font-heading font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
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
          <Link href="/retailers" className="text-sm font-semibold text-primary hover:underline">
            All retailers →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeRetailers.map((retailer) => (
            <Link
              key={retailer.id}
              href={`/retailers/${retailer.slug}`}
              className="flex flex-col rounded-xl border border-border bg-white overflow-hidden hover:border-primary/60 transition-colors focus-visible-ring group"
            >
              {retailer.sponsored && <SponsorLabel className="absolute top-4 left-4 z-10">{retailer.sponsorLabel}</SponsorLabel>}
              <div className="relative h-40 overflow-hidden rounded-lg bg-cream-100">
                <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider text-muted">
                  {retailer.name}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-bold text-foreground">{retailer.name}</h3>
                  {retailer.sponsored && (
                    <Badge variant="sponsor" className="ml-auto text-[0.6rem] uppercase tracking-wider">
                      Featured Partner
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted line-clamp-2">{retailer.shortDescription}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{retailer.town}, {retailer.county}</span>
                  <span className="text-xs text-muted">{retailer.madeInKenya ? "Made in Kenya" : "Retailer"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      <RecentlyViewedSection />

      {/* Retailer CTA */}
      <section className="section rounded-2xl border border-border bg-primary p-8 md:p-12 text-accent-foreground">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Sell furniture? List your business.</h2>
        <p className="text-white/90 mb-8 max-w-xl">
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
