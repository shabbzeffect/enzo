import Link from "next/link";
import { RETAILERS } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Manage retailers — Nyumba Edit admin",
  description: "Nyumba Edit admin retailer management (demonstration only).",
};

export default function AdminRetailersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage retailers</h1>
        <p className="text-muted text-sm">
          View, edit, publish or archive retailer listings. This is a
          demonstration build — changes are not persisted to a database.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-xs text-muted font-medium w-1/3">Retailer</th>
              <th className="pb-3 text-xs text-muted font-medium">Location</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Categories</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {RETAILERS.map((r) => (
              <tr key={r.id} className="text-foreground">
                <td className="py-4">
                  <div className="font-medium">{r.name}</div>
                  <p className="text-xs text-muted">{r.shortDescription}</p>
                </td>
                <td className="py-4">
                  {r.area ? `${r.area}, ` : ""}{r.town}, {r.county}
                </td>
                <td className="py-4 text-center">
                  <span className="text-xs text-muted">{r.categories.join(", ")}</span>
                </td>
                <td className="py-4 text-center">
                  {r.sponsored ? (
                    <Badge variant="sponsor">Sponsored</Badge>
                  ) : (
                    <Badge variant="default">Listed</Badge>
                  )}
                </td>
                <td className="py-4 text-right">
                  <Link href={`/retailers/${r.slug}`} className="text-xs text-primary hover:underline mr-3">View</Link>
                  <button className="text-xs text-muted hover:text-foreground">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">Notes</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Edit and archive actions are UI-only in this demonstration build.</li>
          <li>Connect the Prisma database layer to persist changes.</li>
          <li>Paid placements remain labelled "Sponsored" or "Featured Partner" and are never disguised as editorial coverage.</li>
        </ul>
      </div>
    </div>
  );
}
