import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { Badge } from "@/components/ui/badge";
import { saveProduct, confirmProductPriceAction, setProductStatusAction } from "../actions";

export const metadata = {
  title: "Manage products — Nyumba Edit admin",
  description: "Nyumba Edit admin product management (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getStore().products;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage products</h1>
        <p className="text-muted text-sm">
          {products.length} products · {products.filter((p) => p.status === "archived").length} archived.
          Edits apply to the public demo site immediately (process memory only).
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[960px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 pb-3 text-xs text-muted font-medium w-1/4">Product</th>
              <th className="pb-3 text-xs text-muted font-medium">Retailer</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Price (KSh)</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Availability</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Price confirmed</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id} className="text-foreground align-top">
                <td className="p-4">
                  <div className="font-medium">{p.name}</div>
                  <p className="text-xs text-muted line-clamp-2">{p.description}</p>
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
                  <span className="text-xs capitalize">{p.availability.replace("-", " ")}</span>
                </td>
                <td className="py-4 text-center">
                  {p.priceConfirmed ? (
                    <Badge variant="success">Confirmed</Badge>
                  ) : (
                    <Badge variant="warning">Not confirmed</Badge>
                  )}
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {p.status === "archived" ? (
                      <Badge variant="warning">Archived</Badge>
                    ) : (
                      <Badge variant="success">Published</Badge>
                    )}
                    {p.sponsored && <Badge variant="sponsor">{p.sponsorLabel || "Sponsored"}</Badge>}
                  </div>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/products/${p.slug}`} className="text-xs text-primary hover:underline">View</Link>
                    <details className="text-left">
                      <summary className="text-xs text-muted hover:text-foreground cursor-pointer select-none list-none rounded focus-visible-ring px-1 py-0.5">
                        Edit
                      </summary>
                      <ProductForm product={p} />
                    </details>
                    <form action={setProductStatusAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="status" value={p.status === "archived" ? "published" : "archived"} />
                      <button
                        type="submit"
                        className="text-xs text-tertiary hover:underline"
                      >
                        {p.status === "archived" ? "Restore" : "Archive"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">Notes</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Archived products disappear from the public catalogue, search, retailer pages and collections immediately.</li>
          <li>Price confirmation sets &ldquo;Price confirmed&rdquo; badge and today&apos;s date as last checked.</li>
          <li>Availability options: in-stock, made-to-order, unavailable, unknown.</li>
          <li>Changes are held in process memory for this demo; connect the Prisma database layer to persist them.</li>
        </ul>
      </div>
    </div>
  );
}

function ProductForm({ product }: { product: ReturnType<typeof getStore>["products"][0] }) {
  return (
    <form
      action={saveProduct}
      className="mt-2 w-80 rounded-xl border border-border bg-cream-50 p-4 space-y-3 text-left"
    >
      <input type="hidden" name="id" value={product.id} />
      <label className="block text-xs font-semibold text-foreground">
        Name
        <input
          name="name"
          defaultValue={product.name}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Price (KSh) &mdash; leave blank for &ldquo;on request&rdquo;
        <input
          name="priceKes"
          type="number"
          min="0"
          step="1"
          defaultValue={product.priceKes ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Availability
        <select
          name="availability"
          defaultValue={product.availability}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        >
          <option value="in-stock">In stock</option>
          <option value="made-to-order">Made to order</option>
          <option value="unavailable">Unavailable</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
        <input
          type="checkbox"
          name="priceConfirmed"
          defaultChecked={product.priceConfirmed}
          className="rounded border-tertiary text-tertiary focus:ring-tertiary"
        />
        Price confirmed
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Status
        <select
          name="status"
          defaultValue={product.status}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        >
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors focus-visible-ring"
      >
        Save changes
      </button>
      <form action={confirmProductPriceAction} className="pt-2 border-t border-border">
        <input type="hidden" name="id" value={product.id} />
        <button
          type="submit"
          className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted hover:bg-cream-100 transition-colors focus-visible-ring"
        >
          Confirm price today
        </button>
      </form>
    </form>
  );
}