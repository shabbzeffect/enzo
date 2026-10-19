import Link from "next/link";
import { PRODUCTS } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Manage products — Nyumba Edit admin",
  description: "Nyumba Edit admin product management (demonstration only).",
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage products</h1>
        <p className="text-muted text-sm">
          View, edit, publish or archive product listings. This is a
          demonstration build — changes are not persisted to a database.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-xs text-muted font-medium w-1/3">Product</th>
              <th className="pb-3 text-xs text-muted font-medium">Retailer</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Price (KSh)</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="text-foreground">
                <td className="py-4">
                  <div className="font-medium">{p.name}</div>
                  <p className="text-xs text-muted">{p.description}</p>
                </td>
                <td className="py-4">{p.retailerName}</td>
                <td className="py-4 text-center">
                  {p.priceKes === null ? (
                    <span className="text-xs text-muted">On request</span>
                  ) : (
                    <span className="text-xs font-medium text-foreground">KSh {p.priceKes.toLocaleString("en-KE")}</span>
                  )}
                </td>
                <td className="py-4 text-center">
                  {p.priceConfirmed ? (
                    <Badge variant="success">Price confirmed</Badge>
                  ) : (
                    <Badge variant="warning">Not confirmed</Badge>
                  )}
                </td>
                <td className="py-4 text-right">
                  <Link href={`/products/${p.slug}`} className="text-xs text-primary hover:underline mr-3">View</Link>
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
          <li>Prices are shown in Kenyan shillings (KSh); dimensions are in centimetres (cm).</li>
          <li>Price confirmation status and last-checked dates must be maintained against real retailer data before publication.</li>
          <li>Edit and archive actions are UI-only in this demonstration build.</li>
        </ul>
      </div>
    </div>
  );
}
