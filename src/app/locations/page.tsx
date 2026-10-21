import type { Metadata } from "next";
import Link from "next/link";
import { COUNTIES, getRetailersByCounty, getProductsByCounty } from "@/lib/data/demo";

export const metadata: Metadata = {
  title: "Shop by location",
  description:
    "Browse furniture retailers by county across Kenya — Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Machakos and more.",
};

export default function LocationsPage() {
  const countiesWithCounts = COUNTIES.map((county) => ({
    ...county,
    retailerCount: getRetailersByCounty(county.name).length,
    productCount: getProductsByCounty(county.name).length,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Shop by location</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          Find furniture retailers near you. Browse by county to see local stores,
          their towns and the products they stock.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countiesWithCounts.map((county) => (
          <Link
            key={county.code}
            href={`/locations/${county.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group rounded-2xl border border-border bg-white p-6 hover:border-primary/60 transition-colors focus-visible-ring"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {county.name}
              </h2>
              <span className="text-xs text-muted">Code {county.code}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Retailers</p>
                <p className="font-bold text-foreground text-lg">{county.retailerCount}</p>
              </div>
              <div>
                <p className="text-muted">Products</p>
                <p className="font-bold text-foreground text-lg">{county.productCount}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted mb-1">Towns &amp; areas</p>
              <div className="flex flex-wrap gap-1.5">
                {county.towns.map((town) => (
                  <span key={town.slug} className="rounded-full bg-cream-100 px-2 py-0.5 text-[0.65rem] text-muted">
                    {town.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
