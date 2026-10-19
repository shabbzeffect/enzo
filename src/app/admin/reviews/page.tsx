import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { getRetailer } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/rating";
import { moderateReview } from "../actions";

export const metadata = {
  title: "Moderate reviews — Nyumba Edit admin",
  description: "Nyumba Edit admin review moderation (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminReviewsPage() {
  const reviews = getStore().reviews;
  const published = reviews.filter((r) => r.status === "published").length;
  const pending = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Moderate reviews</h1>
        <p className="text-muted text-sm">
          {reviews.length} demo reviews · {published} published · {pending} pending.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 pb-3 text-xs text-muted font-medium">Review</th>
              <th className="pb-3 text-xs text-muted font-medium">Retailer</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Rating</th>
              <th className="pb-3 text-xs text-muted font-medium">Date</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reviews.map((review) => {
              const retailer = getRetailer(review.retailerSlug);
              return (
                <tr key={review.id} className="text-foreground align-top">
                  <td className="p-4 max-w-md">
                    <div className="font-medium">{review.title}</div>
                    <p className="text-xs text-muted line-clamp-2">{review.body}</p>
                    <p className="mt-1 text-[0.7rem] text-muted">
                      {review.authorName} · {review.county}
                      {review.purchasedProduct ? ` · ${review.purchasedProduct}` : ""}
                    </p>
                  </td>
                  <td className="py-4">
                    {retailer ? (
                      <Link href={`/retailers/${retailer.slug}`} className="text-primary hover:underline">
                        {retailer.name}
                      </Link>
                    ) : (
                      review.retailerSlug
                    )}
                  </td>
                  <td className="py-4 text-center">
                    <StarRating rating={review.rating} size="sm" />
                  </td>
                  <td className="py-4 text-xs text-muted">
                    {new Date(review.createdAt).toLocaleDateString("en-KE")}
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant={review.status === "published" ? "success" : "warning"}>
                      {review.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right whitespace-nowrap">
                    <form action={moderateReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <button type="submit" name="action" value="approve" className="text-xs text-primary hover:underline mr-3">Approve</button>
                      <button type="submit" name="action" value="hold" className="text-xs text-muted hover:text-foreground mr-3">Hold</button>
                      <button type="submit" name="action" value="remove" className="text-xs text-tertiary hover:underline">Remove</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">Moderation notes</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>All reviews, ratings, authors and “verified purchase” flags in this build are fictional demo data.</li>
          <li>A real moderation queue must log moderator identity, reason and timestamp for every action.</li>
          <li>Reviews referencing sponsored relationships must be labelled and never fed into editorial recommendations.</li>
        </ul>
      </div>
    </div>
  );
}