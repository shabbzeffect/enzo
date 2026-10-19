import { Badge } from "@/components/ui/badge";
import { StarRating, RatingBreakdown } from "@/components/ui/rating";
import { averageRating, ratingBreakdown, type Review } from "@/lib/data/demo";

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-2xl border border-border bg-white p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <StarRating rating={review.rating} size="sm" />
          <h3 className="mt-2 font-heading font-bold text-foreground text-sm">
            {review.title}
          </h3>
        </div>
        <Badge variant="subtle" className="shrink-0">{review.county}</Badge>
      </div>
      <p className="text-sm text-muted leading-relaxed">{review.body}</p>
      <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="font-semibold text-foreground">{review.authorName}</span>
        {review.purchasedProduct && (
          <>
            <span aria-hidden="true">·</span>
            <span>Purchased: {review.purchasedProduct}</span>
          </>
        )}
        <span aria-hidden="true">·</span>
        <time dateTime={review.createdAt}>{date}</time>
        {review.verifiedPurchase && (
          <Badge variant="success" className="ml-auto">Demo verified purchase</Badge>
        )}
      </div>
    </article>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-cream-50 p-8 text-center">
        <p className="text-sm text-muted">
          No reviews yet for this retailer in the demo data.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

export function RatingSummary({ reviews }: { reviews: Review[] }) {
  const average = averageRating(reviews);
  const counts = ratingBreakdown(reviews);

  if (average === null || reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-cream-50 p-6 text-sm text-muted">
        No published reviews in the demo data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 flex flex-col sm:flex-row gap-8 items-start">
      <div className="flex flex-col items-center justify-center text-center sm:pr-8 sm:border-r border-border">
        <span className="font-heading text-4xl font-bold text-foreground tabular-nums">
          {average.toFixed(1)}
        </span>
        <div className="mt-1">
          <StarRating rating={average} size="md" />
        </div>
        <span className="mt-1 text-xs text-muted">
          {reviews.length} demo review{reviews.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="flex-1 w-full">
        <RatingBreakdown counts={counts} total={reviews.length} />
        <p className="mt-3 text-xs text-muted">
          Ratings are fictional demo data. Reviews, purchases and verification
          flags are sample content only.
        </p>
      </div>
    </div>
  );
}
