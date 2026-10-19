"use strict";

import * as React from "react";

export type StarRatingProps = {
  rating: number; // 0–5, may be fractional
  size?: "sm" | "md" | "lg";
  count?: number; // number of reviews to display alongside
  className?: string;
  label?: string;
};

const STAR_PATH =
  "M12 2.5l2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.31l-5.81 3.07 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z";

function Star({ fill, px }: { fill: number; px: number }) {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <span
      className="relative inline-block shrink-0 align-middle"
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full text-muted/40"
        fill="currentColor"
      >
        <path d={STAR_PATH} />
      </svg>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${clamped * 100}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full text-tertiary"
          fill="currentColor"
          style={{ width: px, height: px }}
        >
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  );
}

export function StarRating({
  rating,
  size = "md",
  count,
  className,
  label,
}: StarRatingProps) {
  const px = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  const stars = [0, 1, 2, 3, 4].map((i) => (
    <Star key={i} fill={rating - i} px={px} />
  ));

  return (
    <span
      className={["inline-flex items-center gap-1.5", className].filter(Boolean).join(" ")}
      title={`${rating} out of 5`}
    >
      <span className="inline-flex items-center gap-0.5" role="img" aria-label={label ?? `${rating} out of 5 stars`}>
        {stars}
      </span>
      <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-muted">
          ({count} review{count === 1 ? "" : "s"})
        </span>
      )}
    </span>
  );
}

export type RatingBreakdownProps = {
  counts: Record<number, number>; // { 5: n, 4: n, ... }
  total: number;
};

export function RatingBreakdown({ counts, total }: RatingBreakdownProps) {
  const rows = [5, 4, 3, 2, 1];
  return (
    <div className="space-y-2" aria-label="Rating breakdown">
      {rows.map((star) => {
        const n = counts[star] ?? 0;
        const pct = total > 0 ? Math.round((n / total) * 100) : 0;
        return (
          <div key={star} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-muted tabular-nums">{star} star</span>
            <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-cream-200">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-tertiary"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="w-6 text-right text-muted tabular-nums">{n}</span>
          </div>
        );
      })}
    </div>
  );
}
