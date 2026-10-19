"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { useSaved } from "@/components/saved";
import { PRODUCTS, RETAILERS } from "@/lib/data/demo";
import Link from "next/link";

export function SavedPageClient() {
  const { slugs, remove, clear, ready } = useSaved();

  if (!ready) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl border border-border bg-cream-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (slugs.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-cream-50 p-10 text-center">
        <h2 className="font-heading text-xl font-bold text-foreground">No saved items yet</h2>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Tap the heart icon on any product to save it here for later. Your saved
          items stay in this browser — no account needed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/discover">Start browsing</Link>
        </Button>
      </div>
    );
  }

  const items = slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted">
          {items.length} item{items.length === 1 ? "" : "s"} saved
        </p>
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => {
          const retailer = RETAILERS.find((r) => r.slug === p.retailerSlug);
          return (
            <Card key={p.id} className="flex flex-col h-full group hover:border-primary/60 transition-colors relative">
              <div className="relative h-40 overflow-hidden rounded-t-2xl bg-cream-100">
                <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
                  {p.name}
                </span>
                <button
                  type="button"
                  onClick={() => remove(p.slug)}
                  aria-label={`Remove ${p.name} from saved`}
                  className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-white border border-border hover:bg-cream-100 transition-colors"
                >
                  <svg className="h-4 w-4 text-tertiary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <CardContent className="flex-1 flex flex-col">
                <h3 className="font-heading font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2 flex-1">{p.description}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
                  {!p.priceConfirmed && (
                    <Badge variant="warning" className="text-[0.65rem]">Outdated</Badge>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted">
                  <Link href={`/retailers/${p.retailerSlug}`} className="hover:text-primary transition-colors">
                    {retailer?.name ?? p.retailerName}
                  </Link>
                </div>
                <div className="mt-auto pt-3">
                  <Button size="sm" variant="outline" asChild className="w-full">
                    <Link href={`/products/${p.slug}`}>View product</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
