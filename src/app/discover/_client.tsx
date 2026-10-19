"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { searchDemo, CATEGORIES, COUNTIES, type SearchParams } from "@/app/discover/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { WhatsAppButton } from "@/components/ui/whatsapp";

type Result = { type: string; item: any };

const STYLE_OPTIONS = ["Modern", "Traditional", "Scandinavian", "Industrial", "Rustic"];
const MATERIAL_OPTIONS = ["Timber", "Metal", "MDF", "Fabric", "Leather", "Rattan"];

export default function DiscoverClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<Result[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "retailers" | "articles">("products");

  const initialQ = searchParams.get("q") || "";
  const initialType = (searchParams.get("type") as any) || "products";
  const initialCategory = searchParams.get("category") || "";
  const initialCounty = searchParams.get("county") || "";
  const initialMin = searchParams.get("minPrice") || "";
  const initialMax = searchParams.get("maxPrice") || "";
  const initialDelivery = searchParams.get("delivery") || "";
  const initialAssembly = searchParams.get("assembly") || "";
  const initialCustomization = searchParams.get("customization") || "";
  const initialSort = (searchParams.get("sort") as any) || "relevance";

  const [filters, setFilters] = useState({
    q: initialQ,
    type: initialType,
    category: initialCategory,
    county: initialCounty,
    minPrice: initialMin,
    maxPrice: initialMax,
    delivery: initialDelivery,
    assembly: initialAssembly,
    customization: initialCustomization,
    sort: initialSort,
  });

  const runSearch = useCallback(async (params: SearchParams) => {
    setError(null);
    try {
      const data = await searchDemo(params);
      startTransition(() => {
        setResults(data.results);
        setCount(data.count);
      });
    } catch (err) {
      setError("Unable to load results. Please try again.");
      setResults([]);
      setCount(0);
    }
  }, []);

  useEffect(() => {
    runSearch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const buildUrl = (params: SearchParams) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.type && params.type !== "products") sp.set("type", params.type);
    if (params.category) sp.set("category", params.category);
    if (params.county) sp.set("county", params.county);
    if (params.minPrice) sp.set("minPrice", params.minPrice);
    if (params.maxPrice) sp.set("maxPrice", params.maxPrice);
    if (params.delivery) sp.set("delivery", params.delivery);
    if (params.assembly) sp.set("assembly", params.assembly);
    if (params.customization) sp.set("customization", params.customization);
    if (params.sort && params.sort !== "relevance") sp.set("sort", params.sort);
    return `${pathname}?${sp.toString()}`;
  };

  const nav = (params: SearchParams) => {
    router.push(buildUrl(params));
  };

  const filteredByType = results.filter((r) => r.type === activeTab);

  return (
    <div className="space-y-8">
      {/* Header + search */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold">Discover</h1>
            <p className="text-muted text-sm">
              Search and filter furniture, retailers and guides across Kenya.
            </p>
          </div>
          <Button onClick={() => setOpenFilter(true)} className="hidden sm:inline-flex">
            Filters
          </Button>
        </div>

        <Card className="p-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const params: SearchParams = {
                q: (form.get("q") as string) || "",
                type: activeTab,
                category: (form.get("category") as string) || "",
                county: (form.get("county") as string) || "",
                minPrice: (form.get("minPrice") as string) || "",
                maxPrice: (form.get("maxPrice") as string) || "",
                delivery: form.get("delivery") as string,
                assembly: form.get("assembly") as string,
                customization: form.get("customization") as string,
                sort: (form.get("sort") as any) || "relevance",
              };
              setFilters(params as typeof filters);
              nav(params);
            }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5"
          >
            <Input
              label="Search"
              name="q"
              defaultValue={filters.q}
              placeholder="Search furniture, retailers or guides…"
            />
            <Select
              label="Category"
              name="category"
              defaultValue={filters.category}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </Select>
            <Select
              label="County"
              name="county"
              defaultValue={filters.county}
            >
              <option value="">All locations</option>
              {COUNTIES.map((c) => (
                <option key={c.code} value={c.name}>{c.name}</option>
              ))}
            </Select>
            <Button type="submit" className="w-full">Search</Button>
          </form>
        </Card>
      </section>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1 border-b border-border pb-1 overflow-x-auto no-scrollbar">
          <TabButton
            tab="products"
            active={activeTab === "products"}
            onSelect={() => {
              setActiveTab("products");
              setFilters((prev) => ({ ...prev, type: "products" }));
              nav({ ...filters, type: "products" });
            }}
          />
          <TabButton
            tab="retailers"
            active={activeTab === "retailers"}
            onSelect={() => {
              setActiveTab("retailers");
              setFilters((prev) => ({ ...prev, type: "retailers" }));
              nav({ ...filters, type: "retailers" });
            }}
          />
          <TabButton
            tab="articles"
            active={activeTab === "articles"}
            onSelect={() => {
              setActiveTab("articles");
              setFilters((prev) => ({ ...prev, type: "articles" }));
              nav({ ...filters, type: "articles" });
            }}
          />
        </div>
      </div>

      {/* Results / states */}
      <section>
        {isPending && (
          <div className="flex flex-col items-center justify-center py-16 text-muted">
            Loading results…
          </div>
        )}
        {!isPending && error && (
          <div className="rounded-2xl border border-terracotta-200 bg-terracotta-50 p-8 text-center">
            <h3 className="font-bold text-terracotta-800">Something went wrong</h3>
            <p className="mt-2 text-sm text-terracotta-700">{error}</p>
            <Button onClick={() => runSearch(filters)} className="mt-4">Try again</Button>
          </div>
        )}
        {!isPending && !error && count === 0 && (
          <div className="rounded-2xl border border-border bg-white p-16 text-center">
            <p className="text-muted text-lg">No results found</p>
            <p className="mt-2 text-sm text-muted">Try adjusting your search or filters.</p>
            <Button onClick={() => { setFilters({ q: "", type: "products", category: "", county: "", minPrice: "", maxPrice: "", delivery: "", assembly: "", customization: "", sort: "relevance" }); nav({}); }} className="mt-6">
              Clear filters
            </Button>
          </div>
        )}
        {!isPending && !error && count > 0 && (
          <>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-semibold text-ink">{count} result{count !== 1 ? "s" : ""}</span>
            <span className="text-xs text-muted">·</span>
            <label className="text-xs text-muted mr-2">Sort by</label>
            <select
              defaultValue={filters.sort}
              onChange={(e) => {
                const sort = e.target.value as any;
                setFilters((prev) => ({ ...prev, sort }));
                nav({ ...filters, sort });
              }}
              className="rounded border border-border bg-white px-3 py-1 text-xs text-ink focus-visible-ring"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredByType.map((result) => {
              if (result.type === "products") return <ProductCard key={result.item.id} p={result.item} />;
              if (result.type === "retailers") return <RetailerCard key={result.item.id} r={result.item} />;
              return <ArticleCard key={result.item.id} a={result.item} />;
            })}
          </div>
          </>
        )}
      </section>

      {/* Mobile filter panel */}
      <div className="fixed inset-0 z-50 hidden lg:hidden" aria-hidden={!openFilter ? "true" : "false"}>
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          aria-label="Close filters"
        />
        <div className="fixed right-0 top-0 h-full w-full sm:w-[80%] bg-white border-l border-border shadow-2xl transform transition-transform translate-x-full duration-300 open:translate-x-0">
          <div className="container flex items-center justify-between h-16 border-b border-border px-4">
            <h2 className="font-heading font-bold text-ink">Filters</h2>
            <button onClick={() => setOpenFilter(false)} className="p-2 text-muted hover:text-ink focus-visible-ring" aria-label="Close">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="container py-6 px-4 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Search</label>
              <input
                defaultValue={filters.q}
                className="rounded-xl border border-border bg-white px-4 py-2 text-ink focus-visible-ring w-full"
                onChange={(e) => updateFilter("q", e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => updateFilter("category", c.slug)}
                    className={[
                      "rounded-xl border px-3 py-2 text-xs text-center transition-colors",
                      filters.category === c.slug
                        ? "border-green-800 bg-green-50 text-green-800"
                        : "border-border text-muted hover:bg-cream-100",
                    ].join(" ")}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Location</label>
              <select
                defaultValue={filters.county}
                className="rounded-xl border border-border bg-white px-4 py-2 text-ink w-full focus-visible-ring"
                onChange={(e) => updateFilter("county", e.target.value)}
              >
                <option value="">All counties</option>
                {COUNTIES.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Price range (KSh)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  defaultValue={filters.minPrice}
                  className="rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring"
                  placeholder="Min"
                />
                <input
                  type="number"
                  defaultValue={filters.maxPrice}
                  className="rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Options</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.delivery === "true"}
                    onChange={(e) => updateFilter("delivery", e.target.checked ? "true" : "")}
                    className="rounded border-green-800 text-green-800 focus:ring-green-800"
                  />
                  <span className="text-sm text-ink">Delivery available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.assembly === "true"}
                    onChange={(e) => updateFilter("assembly", e.target.checked ? "true" : "")}
                    className="rounded border-green-800 text-green-800 focus:ring-green-800"
                  />
                  <span className="text-sm text-ink">Assembly available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.customization === "true"}
                    onChange={(e) => updateFilter("customization", e.target.checked ? "true" : "")}
                    className="rounded border-green-800 text-green-800 focus:ring-green-800"
                  />
                  <span className="text-sm text-ink">Customisation available</span>
                </label>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button onClick={() => { setOpenFilter(false); runSearch(filters); nav(filters); }} className="w-full">
                Apply filters
              </Button>
              <Button variant="outline" onClick={() => {
                setFilters({ q: "", type: "products", category: "", county: "", minPrice: "", maxPrice: "", delivery: "", assembly: "", customization: "", sort: "relevance" });
                nav({});
                setOpenFilter(false);
              }} className="w-full">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter trigger */}
      <button
        onClick={() => setOpenFilter(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold shadow-lg hover:bg-cream-100 transition-colors focus-visible-ring flex items-center gap-2"
        aria-expanded={openFilter}
        aria-haspopup="true"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6 6A1 1 0 0117 14H7a1 1 0 01-.707-.293l-6-6A1 1 0 011 6.586V4z" />
        </svg>
        Filters
      </button>
    </div>
  );
}

function ProductCard({ p }: { p: any }) {
  const retailer = p.retailerName;
  return (
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      <div className="relative h-48 overflow-hidden rounded-lg bg-cream-100">
        <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
          {p.name}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        {p.sponsored && <SponsorLabel className="mb-3">{p.sponsorLabel || "Sponsored"}</SponsorLabel>}
        <h3 className="font-heading font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{p.description}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="lg" />
          {!p.priceConfirmed && <span className="text-xs text-warning font-semibold">Price may be outdated</span>}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          {p.availability === "in-stock" && <span className="flex items-center gap-1">In stock</span>}
          <span>{retailer}</span>
        </div>
        <Link href={`/products/${p.slug}`} className="mt-auto inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring w-full text-center">
          View product
        </Link>
      </div>
    </Card>
  );
}

function RetailerCard({ r }: { r: any }) {
  return (
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      {r.sponsored && <SponsorLabel className="absolute top-4 left-4 z-10">{r.sponsorLabel}</SponsorLabel>}
      <div className="relative h-40 overflow-hidden rounded-lg bg-cream-100">
        <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
          {r.name}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
          {r.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{r.shortDescription}</p>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">{r.town}, {r.county}</span>
          <WhatsAppButton phone={r.whatsapp} size="sm" label="Message" />
        </div>
      </div>
    </Card>
  );
}

function TabButton({
  tab,
  active,
  onSelect,
}: {
  tab: "products" | "retailers" | "articles";
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={[
        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
        active ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground",
      ].join(" ")}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  );
}

function ArticleCard({ a }: { a: any }) {
  return (
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      {a.sponsored && <SponsorLabel className="mb-3">{a.sponsorLabel || "Sponsored"}</SponsorLabel>}
      <div className="relative h-40 overflow-hidden rounded-lg bg-cream-100">
        <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
          {a.title}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-muted mb-2">{a.category}</span>
        <h3 className="font-heading font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {a.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{a.excerpt}</p>
        <Link href={`/guides/${a.slug}`} className="mt-auto inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring w-full text-center">
          Read guide
        </Link>
      </div>
    </Card>
  );
}
