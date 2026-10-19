import Link from "next/link";
import { getStore } from "@/server/demo-store";

export const metadata = {
  title: "Admin dashboard — Nyumba Edit",
  description: "Nyumba Edit admin dashboard (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const store = getStore();
  const retailers = store.retailers;
  const products = store.products;
  const articles = store.articles;
  const reviews = store.reviews;
  const promotions = store.promotions;
  const enquiries = store.enquiries;

  const sponsoredRetailers = retailers.filter((r) => r.sponsored).length;
  const activePromotions = promotions.filter((p) => p.active).length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const archivedCount =
    retailers.filter((r) => r.status === "archived").length +
    products.filter((p) => p.status === "archived").length +
    articles.filter((a) => a.status !== "published").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Admin dashboard</h1>
        <p className="text-muted text-sm">
          Manage retailers, products, articles, reviews, sponsored placements and
          enquiries. Changes apply to the live demo site immediately but are held
          in process memory only.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Retailers" value={retailers.length} href="/admin/retailers" />
        <StatCard title="Products" value={products.length} href="/admin/products" />
        <StatCard title="Articles" value={articles.length} href="/admin/articles" />
        <StatCard
          title="Reviews"
          value={reviews.length}
          href="/admin/reviews"
          badge={pendingReviews > 0 ? `${pendingReviews} pending` : undefined}
        />
        <StatCard title="Promotions" value={activePromotions} href="/admin/promotions" badge={activePromotions > 0 ? "active" : undefined} />
        <StatCard
          title="Enquiries"
          value={enquiries.length}
          href="/admin/enquiries"
          badge={newEnquiries > 0 ? `${newEnquiries} new` : undefined}
        />
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickLink href="/admin/reviews" title="Moderate reviews" description="Approve, hold or remove customer reviews." badge={pendingReviews > 0 ? `${pendingReviews} pending` : undefined} />
          <QuickLink href="/admin/enquiries" title="Read enquiries" description="Shopper enquiries and listing requests land here." badge={newEnquiries > 0 ? `${newEnquiries} new` : undefined} />
          <QuickLink href="/admin/products" title="Manage products" description="Edit prices, confirm availability, archive listings." />
          <QuickLink href="/admin/retailers" title="Manage retailers" description="Edit listings, toggle sponsor labels, archive stores." />
          <QuickLink href="/admin/articles" title="Manage articles" description="Draft, publish or archive editorial content." />
          <QuickLink href="/admin/promotions" title="Sponsored placements" description="Set promotion dates and disclosure labels." />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold mb-4">Latest enquiries</h2>
        {enquiries.length === 0 ? (
          <p className="text-sm text-muted">No enquiries yet. Try the enquiry form on a retailer page.</p>
        ) : (
          <ul className="divide-y divide-border">
            {enquiries.slice(0, 5).map((e) => (
              <li key={e.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div>
                  <span className="font-medium text-foreground">{e.name}</span>
                  <span className="text-muted"> · {e.kind.replace("-", " ")}</span>
                  <p className="text-xs text-muted line-clamp-1 max-w-xl">{e.message}</p>
                </div>
                <Link href="/admin/enquiries" className="text-xs text-primary hover:underline shrink-0">
                  Open inbox
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold mb-4">Recent activity (demo)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-xs text-muted font-medium">Type</th>
                <th className="pb-3 text-xs text-muted font-medium">Item</th>
                <th className="pb-3 text-xs text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {retailers.slice(0, 5).map((r) => (
                <tr key={r.id} className="text-foreground">
                  <td className="py-3">Retailer</td>
                  <td className="py-3">{r.name}</td>
                  <td className="py-3">
                    {r.status === "archived" ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-cream-100 px-2 py-0.5 text-xs font-medium text-muted">
                        Archived
                      </span>
                    ) : r.sponsored ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-terracotta-200 bg-terracotta-50 px-2 py-0.5 text-xs font-medium text-terracotta-800">
                        Sponsored
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md border border-border bg-cream-100 px-2 py-0.5 text-xs font-medium text-muted">
                        Listed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-cream-50 rounded-xl border border-border p-6">
        <h3 className="font-bold text-ink mb-2">Important</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>
            {archivedCount} item{archivedCount === 1 ? "" : "s"} currently hidden from the public site
            (archived listings, draft articles).
          </li>
          <li>
            Demo store state is per-process. On serverless hosting, mutations may not persist
            between invocations — use the Prisma database layer for production.
          </li>
          <li>
            Protect admin routes with real authentication (NextAuth) before production. Do not
            rely on the demo session cookie.
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
  badge,
}: {
  title: string;
  value: number;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-white p-5 hover:bg-cream-100 transition-colors focus-visible-ring block"
    >
      <p className="text-xs text-muted uppercase tracking-wider mb-1">{title}</p>
      <p className="font-heading text-2xl font-bold text-ink">{value}</p>
      {badge && (
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-warning">{badge}</p>
      )}
    </Link>
  );
}

function QuickLink({
  href,
  title,
  description,
  badge,
}: {
  href: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
      <h3 className="font-heading font-bold text-ink mb-1">
        {title}
        {badge && (
          <span className="ml-2 align-middle rounded-md border border-warning-200 bg-warning-50 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-warning">
            {badge}
          </span>
        )}
      </h3>
      <p className="text-xs text-muted">{description}</p>
    </Link>
  );
}
