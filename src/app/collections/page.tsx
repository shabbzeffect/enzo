import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS, getProductsByCollection } from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections & lookbooks",
  description:
    "Curated furniture collections for Kenyan homes — small living rooms, first apartments, outdoor living, home offices and more.",
  openGraph: {
    title: "Collections & lookbooks | Nyumba Edit",
    description: "Curated furniture collections for Kenyan homes.",
    url: `${SITE.url}/collections`,
  },
};

const THEME_LABELS: Record<string, string> = {
  room: "Room ideas",
  budget: "By budget",
  style: "Style edit",
  season: "Seasonal",
};

export default function CollectionsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Collections &amp; lookbooks</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          Editorial picks grouped by room, budget and style. Every piece links to
          its retailer listing — prices in KSh, last checked on the dates shown.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTIONS.map((collection) => {
          const products = getProductsByCollection(collection.slug);
          return (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:border-primary/60 transition-colors focus-visible-ring"
            >
              <div className="relative h-44 overflow-hidden bg-cream-100">
                <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
                  {collection.title}
                </span>
                {collection.sponsored && (
                  <SponsorLabel className="absolute top-3 left-3">
                    {collection.sponsorLabel || "Sponsored"}
                  </SponsorLabel>
                )}
              </div>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="subtle">{THEME_LABELS[collection.theme] ?? collection.theme}</Badge>
                  {collection.room && <Badge variant="subtle">{collection.room.replace(/-/g, " ")}</Badge>}
                </div>
                <h2 className="mt-2 font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {collection.title}
                </h2>
                <p className="mt-1 text-sm text-muted line-clamp-2 flex-1">{collection.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>{products.length} pieces</span>
                  <span>{new Date(collection.publishedAt).toLocaleDateString("en-KE")}</span>
                </div>
              </CardContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
