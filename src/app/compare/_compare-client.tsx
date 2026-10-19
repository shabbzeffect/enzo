"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PRODUCTS, RETAILERS, getCategory, formatKes, type Product } from "@/lib/data/demo";
import { useCompare, CompareToggle, MAX_COMPARE } from "@/components/compare";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp";

type Row = {
  label: string;
  render: (product: Product) => React.ReactNode;
};

const ROWS: Row[] = [
  {
    label: "Price",
    render: (p) => <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />,
  },
  {
    label: "Price status",
    render: (p) =>
      p.priceConfirmed ? (
        <Badge variant="success">Confirmed {p.priceLastChecked}</Badge>
      ) : (
        <Badge variant="warning">Not confirmed since {p.priceLastChecked}</Badge>
      ),
  },
  {
    label: "Availability",
    render: (p) => {
      const map: Record<string, { label: string; variant: "success" | "warning" | "subtle" }> = {
        "in-stock": { label: "In stock", variant: "success" },
        "made-to-order": { label: "Made to order", variant: "warning" },
        unavailable: { label: "Unavailable", variant: "subtle" },
        unknown: { label: "Unknown", variant: "subtle" },
      };
      const item = map[p.availability] ?? map.unknown;
      return <Badge variant={item.variant}>{item.label}</Badge>;
    },
  },
  {
    label: "Category",
    render: (p) => <Link href={`/categories/${p.category}`} className="text-primary hover:underline">{getCategory(p.category)?.name ?? p.category}</Link>,
  },
  {
    label: "Retailer",
    render: (p) => (
      <Link href={`/retailers/${p.retailerSlug}`} className="text-primary hover:underline">
        {p.retailerName}
      </Link>
    ),
  },
  {
    label: "Dimensions (W × D × H)",
    render: (p) => (
      <span className="tabular-nums">
        {p.dimensions.widthCm} × {p.dimensions.depthCm} × {p.dimensions.heightCm} cm
      </span>
    ),
  },
  {
    label: "Materials",
    render: (p) => <span className="text-muted">{p.materials.join(", ")}</span>,
  },
  {
    label: "Delivery",
    render: (p) => (p.delivery ? <Badge variant="success">Yes</Badge> : <Badge variant="subtle">No</Badge>),
  },
  {
    label: "Assembly",
    render: (p) => (p.assembly ? <Badge variant="success">Yes</Badge> : <Badge variant="subtle">No</Badge>),
  },
  {
    label: "Customisation",
    render: (p) => (p.customization ? <Badge variant="success">Yes</Badge> : <Badge variant="subtle">No</Badge>),
  },
  {
    label: "Delivery notes",
    render: (p) => <span className="text-muted">{p.deliveryNotes ?? "—"}</span>,
  },
];

export default function CompareClient() {
  const { slugs, ready, remove, clear } = useCompare();

  const products = useMemo(
    () =>
      slugs
        .map((slug) => PRODUCTS.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p)),
    [slugs]
  );

  const suggestions = useMemo(
    () => PRODUCTS.filter((p) => !slugs.includes(p.slug)).slice(0, 6),
    [slugs]
  );

  if (!ready) {
    return (
      <div className="py-16 text-center text-muted">Loading comparison…</div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">Compare products</h1>
          <p className="mt-2 text-muted text-sm">
            Select up to {MAX_COMPARE} products to compare price, size,
            materials and delivery side by side.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-12 text-center">
          <p className="text-lg text-muted">Nothing to compare yet.</p>
          <p className="mt-2 text-sm text-muted">
            Use “Add to compare” on any product page or card.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/discover">Browse products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories">Browse categories</Link>
            </Button>
          </div>
        </div>
        <SuggestionGrid products={suggestions} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">Compare products</h1>
          <p className="mt-2 text-muted text-sm">
            {products.length} of {MAX_COMPARE} selected. Prices in KSh, dimensions in cm —
            always confirm with the retailer before buying.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clear}>
          Clear all
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[640px] text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 align-bottom text-xs font-semibold uppercase tracking-wider text-muted w-40">
                Product
              </th>
              {products.map((p) => (
                <th key={p.id} className="p-4 align-bottom">
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-heading font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {p.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      className="self-start text-xs text-muted hover:text-foreground focus-visible-ring"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ROWS.map((row) => (
              <tr key={row.label} className="align-top">
                <th scope="row" className="p-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  {row.label}
                </th>
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-foreground">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="align-top">
              <th scope="row" className="p-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Actions
              </th>
              {products.map((p) => {
                const retailer = RETAILERS.find((r) => r.id === p.retailerId);
                return (
                  <td key={p.id} className="p-4">
                    <div className="flex flex-col items-start gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/products/${p.slug}`}>View product</Link>
                      </Button>
                      {retailer && (
                        <WhatsAppButton
                          phone={retailer.whatsapp}
                          message={`Hi, I found ${p.name} (${formatKes(p.priceKes)}) on Nyumba Edit and would like to check availability and delivery.`}
                          size="sm"
                          label="Ask retailer"
                        />
                      )}
                      <CompareToggle slug={p.slug} />
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <SuggestionGrid products={suggestions} />
    </div>
  );
}

function SuggestionGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section>
      <h2 className="font-heading text-lg font-bold mb-4">Add more to compare</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-border bg-white p-4 flex flex-col gap-2"
          >
            <Link
              href={`/products/${p.slug}`}
              className="font-heading font-bold text-foreground text-sm hover:text-primary transition-colors"
            >
              {p.name}
            </Link>
            <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="sm" />
            <span className="text-xs text-muted">{p.retailerName}</span>
            <CompareToggle slug={p.slug} className="mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
}
