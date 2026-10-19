"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Price } from "@/components/ui/price";
import { PRODUCTS } from "@/lib/data/demo";

const STORAGE_KEY = "nyumba-recently-viewed";
const MAX_ITEMS = 8;

type RecentContextValue = {
  slugs: string[];
  track: (slug: string) => void;
  ready: boolean;
};

const RecentContext = React.createContext<RecentContextValue | null>(null);

function sanitize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").slice(0, MAX_ITEMS);
}

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(sanitize(JSON.parse(raw)));
    } catch {
      // corrupted or unavailable storage
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // storage unavailable — session-only
    }
  }, [slugs, ready]);

  const track = React.useCallback((slug: string) => {
    setSlugs((prev) => {
      const without = prev.filter((s) => s !== slug);
      return [slug, ...without].slice(0, MAX_ITEMS);
    });
  }, []);

  const value = React.useMemo(() => ({ slugs, track, ready }), [slugs, track, ready]);

  return <RecentContext.Provider value={value}>{children}</RecentContext.Provider>;
}

export function useRecentlyViewed() {
  const context = React.useContext(RecentContext);
  if (!context) throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  return context;
}

export function RecentlyViewedSection() {
  const { slugs, ready } = useRecentlyViewed();
  const items = slugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!ready || items.length === 0) return null;

  return (
    <section aria-label="Recently viewed" className="space-y-4">
      <h2 className="font-heading text-xl font-bold">Recently viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="group">
            <Card className="flex flex-col h-full hover:border-primary/60 transition-colors">
              <div className="relative h-28 overflow-hidden rounded-t-2xl bg-cream-100">
                <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.65rem] font-medium uppercase tracking-wider">
                  {p.name}
                </span>
              </div>
              <CardContent className="flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="mt-auto pt-1">
                  <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="sm" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
