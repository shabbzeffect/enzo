import Link from "next/link";
import { RETAILERS, PRODUCTS, ARTICLES, PROMOTIONS, REVIEWS } from "@/lib/data/demo";

export const metadata = {
  title: "Admin dashboard — Nyumba Edit",
  description: "Nyumba Edit admin dashboard (demonstration only).",
};

export default function AdminDashboardPage() {
  const sponsoredRetailers = RETAILERS.filter((r) => r.sponsored).length;
  const activePromotions = PROMOTIONS.filter((p) => p.active).length;
  const pendingReviews = REVIEWS.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Admin dashboard</h1>
        <p className="text-muted text-sm">
          Manage retailers, products, articles, reviews and sponsored placements.
          This is a demonstration build backed by demo data — changes are not
          persisted to a database.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Retailers" value={RETAILERS.length} href="/admin/retailers" />
        <StatCard title="Products" value={PRODUCTS.length} href="/admin/products" />
        <StatCard title="Articles" value={ARTICLES.length} href="/admin/articles" />
        <StatCard title="Reviews" value={REVIEWS.length} href="/admin/reviews" badge={pendingReviews > 0 ? `${pendingReviews} pending` : undefined} />
        <StatCard title="Active promotions" value={activePromotions} href="/admin/promotions" />
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/retailers" className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
            <h3 className="font-heading font-bold text-ink mb-1">Manage retailers</h3>
            <p className="text-xs text-muted">View, edit, publish or archive retailer listings.</p>
          </Link>
          <Link href="/admin/products" className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
            <h3 className="font-heading font-bold text-ink mb-1">Manage products</h3>
            <p className="text-xs text-muted">View, edit, publish or archive product listings.</p>
          </Link>
          <Link href="/admin/articles" className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
            <h3 className="font-heading font-bold text-ink mb-1">Manage articles</h3>
            <p className="text-xs text-muted">View, edit, publish or archive editorial content.</p>
          </Link>
          <Link href="/admin/promotions" className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
            <h3 className="font-heading font-bold text-ink mb-1">Manage sponsored placements</h3>
            <p className="text-xs text-muted">Set promotion dates and sponsor disclosure labels.</p>
          </Link>
          <Link href="/admin/reviews" className="rounded-xl border border-border bg-white p-4 text-left hover:bg-cream-100 transition-colors focus-visible-ring block">
            <h3 className="font-heading font-bold text-ink mb-1">Moderate reviews</h3>
            <p className="text-xs text-muted">Publish, hold or remove customer reviews (demo).</p>
          </Link>
        </div>
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
              {RETAILERS.slice(0, 5).map((r) => (
                <tr key={r.id} className="text-ink">
                  <td className="py-3">Retailer</td>
                  <td className="py-3">{r.name}</td>
                  <td className="py-3">
                    {r.sponsored ? (
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
          <li>This admin UI operates on demo data only. Changes are reset when the server restarts.</li>
          <li>To use a real database, set `USE_DATABASE=true` and `DATABASE_URL` in `.env`, run `prisma generate`, `prisma migrate deploy` and `prisma db seed`, then replace the demo data layer with database-backed repository functions.</li>
          <li>Protect admin routes with real authentication (NextAuth) before production. Do not rely on the demo session cookie.</li>
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
