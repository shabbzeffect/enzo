"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatKes, estimatePlannerBudget, type PlannerRoom } from "@/lib/data/demo";

export function PlannerClient({ rooms }: { rooms: PlannerRoom[] }) {
  const [selected, setSelected] = React.useState(rooms[0]?.slug ?? "");
  const room = rooms.find((r) => r.slug === selected) ?? rooms[0];

  if (!room) {
    return <p className="text-sm text-muted">No rooms available.</p>;
  }

  const totalBudget = estimatePlannerBudget(room.slug);

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Room type" className="flex flex-wrap gap-2">
        {rooms.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={r.slug === selected}
            onClick={() => setSelected(r.slug)}
            className={[
              "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors focus-visible-ring",
              r.slug === selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-foreground hover:bg-cream-100",
            ].join(" ")}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{room.name}</h2>
            <p className="mt-1 text-sm text-muted max-w-xl">{room.description}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Estimated minimum</p>
            <p className="font-heading text-2xl font-bold text-primary">{formatKes(totalBudget)}</p>
          </div>
        </div>
      </div>

      <section aria-label="Essential items">
        <h3 className="font-heading text-lg font-bold mb-4">Essential items</h3>
        <div className="space-y-3">
          {room.essentials.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground">{item.label}</h4>
                  <Badge variant="subtle">
                    <Link href={`/categories/${item.category}`} className="hover:text-primary transition-colors">
                      {item.category.replace(/-/g, " ")}
                    </Link>
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{item.tip}</p>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-xs text-muted">From</p>
                <p className="font-bold text-foreground">{formatKes(item.minBudget)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {room.tips.length > 0 && (
        <section aria-label="Tips">
          <h3 className="font-heading text-lg font-bold mb-4">Tips for {room.name.toLowerCase()}</h3>
          <ul className="space-y-2">
            {room.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-0.5 text-primary">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">How this estimate works</h3>
        <p className="text-sm text-muted max-w-2xl">
          Minimum budgets are the lowest demo prices for each essential item in
          our catalogue. Real costs vary by material, size and retailer. Use this
          as a starting point, then browse{" "}
          <Link href={`/categories/${room.essentials[0]?.category ?? "sofas"}`} className="text-primary hover:underline">
            categories
          </Link>{" "}
          or{" "}
          <Link href="/collections" className="text-primary hover:underline">
            collections
          </Link>{" "}
          to build your actual list.
        </p>
      </section>
    </div>
  );
}
