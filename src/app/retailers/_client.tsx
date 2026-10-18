"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { searchRetailersDemo, COUNTIES, CATEGORIES } from "@/app/retailers/actions";
import { Card, CardImage } from "@/components/ui/card";
import { Badge, SponsorLabel } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp";

export default function RetailersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [retailers, setRetailers] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    county: searchParams.get("county") || "",
    category: searchParams.get("category") || "",
  });

  const runSearch = async (p: any) => {
    setError(null);
    try {
      const data = await searchRetailersDemo(p);
      startTransition(() => {
        setRetailers(data.retailers);
        setCount(data.count);
      });
    } catch {
      setError("Unable to load retailers. Please try again.");
    }
  };

  useEffect(() => {
    runSearch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const nav = (p: any) => {
    const sp = new URLSearchParams();
    if (p.q) sp.set("q", p.q);
    if (p.county) sp.set("county", p.county);
    if (p.category) sp.set("category", p.category);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">Retailer directory</h1>
          <p className="text-muted text-sm">Find furniture and homeware retailers across Kenyan counties.</p>
        </div>
        <Button onClick={() => setOpenFilter(true)} className="hidden lg:inline-flex">Filters</Button>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const p: any = {
              q: (form.get("q") as string) || "",
              county: (form.get("county") as string) || "",
              category: (form.get("category") as string) || "",
            };
            setFilters(p);
            nav(p);
          }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4"
        >
          <label className="sr-only">Search retailers</label>
          <input
            name="q"
            defaultValue={filters.q}
            className="rounded-xl border border-border bg-white px-4 py-3 text-ink placeholder:text-muted focus-visible-ring"
            placeholder="Search retailers by name or town…"
          />
          <label className="sr-only">County</label>
          <select name="county" defaultValue={filters.county} className="rounded-xl border border-border bg-white px-4 py-3 text-ink focus-visible-ring">
            <option value="">All counties</option>
            {COUNTIES.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
          <label className="sr-only">Category</label>
          <select name="category" defaultValue={filters.category} className="rounded-xl border border-border bg-white px-4 py-3 text-ink focus-visible-ring">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <Button type="submit" className="w-full">Search</Button>
        </form>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-semibold text-ink">{count} retailer{count !== 1 ? "s" : ""}</span>
      </div>

      {isPending && <div className="py-16 text-center text-muted">Loading retailers…</div>}
      {!isPending && error && (
        <div className="rounded-2xl border border-terracotta-200 bg-terracotta-50 p-8 text-center">
          <h3 className="font-bold text-terracotta-800">Something went wrong</h3>
          <p className="mt-2 text-sm text-terracotta-700">{error}</p>
          <Button onClick={() => runSearch(filters)} className="mt-4">Try again</Button>
        </div>
      )}
      {!isPending && !error && count === 0 && (
        <div className="rounded-2xl border border-border bg-white p-16 text-center">
          <p className="text-muted text-lg">No retailers found</p>
          <p className="mt-2 text-sm text-muted">Try adjusting your search or filters.</p>
          <Button onClick={() => { setFilters({ q: "", county: "", category: "" }); nav({}); }} className="mt-6">Clear filters</Button>
        </div>
      )}
      {!isPending && !error && count > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retailers.map((r) => (
            <Link key={r.id} href={`/retailers/${r.slug}`} className="block">
              <RetailerCard r={r} />
            </Link>
          ))}
        </div>
      )}

      <div className="fixed inset-0 z-50 hidden lg:hidden" aria-hidden={!openFilter ? "true" : "false"}>
        <div onClick={() => setOpenFilter(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="fixed right-0 top-0 h-full w-full sm:w-[80%] bg-white border-l border-border shadow-2xl transform transition-transform translate-x-full open:translate-x-0 duration-300">
          <div className="container flex items-center justify-between h-16 border-b border-border px-4">
            <h2 className="font-heading font-bold text-ink">Filters</h2>
            <button onClick={() => setOpenFilter(false)} className="p-2 text-muted hover:text-ink focus-visible-ring" aria-label="Close">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="container py-6 px-4 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Search</label>
              <input defaultValue={filters.q} className="w-full rounded-xl border border-border bg-white px-4 py-2 text-ink focus-visible-ring" onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">County</label>
              <select defaultValue={filters.county} className="w-full rounded-xl border border-border bg-white px-4 py-2 text-ink focus-visible-ring" onChange={(e) => setFilters({ ...filters, county: e.target.value })}>
                <option value="">All counties</option>
                {COUNTIES.map((c) => (<option key={c.code} value={c.name}>{c.name}</option>))}
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-ink">Category</label>
              <select defaultValue={filters.category} className="w-full rounded-xl border border-border bg-white px-4 py-2 text-ink focus-visible-ring">
                <option value="">All categories</option>
                {CATEGORIES.map((c) => (<option key={c.slug} value={c.slug}>{c.name}</option>))}
              </select>
            </div>
            <div className="pt-4 space-y-3">
              <Button onClick={() => { setOpenFilter(false); runSearch(filters); nav(filters); }} className="w-full">Apply</Button>
              <Button variant="outline" onClick={() => { setFilters({ q: "", county: "", category: "" }); nav({}); setOpenFilter(false); }} className="w-full">Reset</Button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setOpenFilter(true)} className="lg:hidden fixed bottom-4 right-4 z-40 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-cream-100 transition-colors focus-visible-ring" aria-expanded={openFilter} aria-haspopup="true">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6 6A1 1 0 017 14H7a1 1 0 01-.707-.293l-6-6A1 1 0 011 6.586V4z" /></svg>
        Filters
      </button>
    </div>
  );
}

function RetailerCard({ r }: { r: any }) {
  return (
    <Card className="flex flex-col h-full group hover:border-green-800/60 transition-colors focus-visible-ring">
      {r.sponsored && <SponsorLabel className="absolute top-4 left-4 z-10">{r.sponsorLabel}</SponsorLabel>}
      <CardImage src={r.cover} alt={r.name} height={200} />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-ink line-clamp-1 mb-2 group-hover:text-green-800 transition-colors">{r.name}</h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{r.shortDescription}</p>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-ink">{r.town}, {r.county}</span>
          <WhatsAppButton phone={r.whatsapp} size="sm" label="Message" />
        </div>
      </div>
    </Card>
  );
}
