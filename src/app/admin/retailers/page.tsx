import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { Badge } from "@/components/ui/badge";
import { saveRetailer, setRetailerPublished } from "../actions";

export const metadata = {
  title: "Manage retailers — Nyumba Edit admin",
  description: "Nyumba Edit admin retailer management (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminRetailersPage() {
  const retailers = getStore().retailers;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage retailers</h1>
        <p className="text-muted text-sm">
          {retailers.length} retailers ·{" "}
          {retailers.filter((r) => r.status === "archived").length} archived.
          Edits apply to the public demo site immediately (process memory only).
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[860px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 pb-3 text-xs text-muted font-medium w-1/4">Retailer</th>
              <th className="pb-3 text-xs text-muted font-medium">Location</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Categories</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {retailers.map((r) => (
              <tr key={r.id} className="text-foreground align-top">
                <td className="p-4">
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
                  <div className="flex flex-col items-center gap-1">
                    {r.status === "archived" ? (
                      <Badge variant="warning">Archived</Badge>
                    ) : (
                      <Badge variant="success">Published</Badge>
                    )}
                    {r.sponsored && <Badge variant="sponsor">{r.sponsorLabel || "Sponsored"}</Badge>}
                  </div>
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/retailers/${r.slug}`} className="text-xs text-primary hover:underline">View</Link>
                    <details className="text-left">
                      <summary className="text-xs text-muted hover:text-foreground cursor-pointer select-none list-none rounded focus-visible-ring px-1 py-0.5">
                        Edit
                      </summary>
                      <RetailerForm id={r.id} />
                    </details>
                    <form action={setRetailerPublished}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value={r.status === "archived" ? "published" : "archived"} />
                      <button
                        type="submit"
                        className="text-xs text-tertiary hover:underline"
                      >
                        {r.status === "archived" ? "Restore" : "Archive"}
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
          <li>Archived retailers disappear from the public directory, search, locations and product pages immediately.</li>
          <li>Sponsor labels are mandatory for paid placements — “Sponsored” or “Featured Partner”. Unchecking sponsored clears the label.</li>
          <li>Changes are held in process memory for this demo; connect the Prisma database layer to persist them.</li>
        </ul>
      </div>
    </div>
  );
}

function RetailerForm({ id }: { id: string }) {
  const retailer = getStore().retailers.find((r) => r.id === id);
  if (!retailer) return null;

  return (
    <form
      action={saveRetailer}
      className="mt-2 w-72 rounded-xl border border-border bg-cream-50 p-4 space-y-3 text-left"
    >
      <input type="hidden" name="id" value={retailer.id} />
      <label className="block text-xs font-semibold text-foreground">
        Name
        <input
          name="name"
          defaultValue={retailer.name}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Short description
        <input
          name="shortDescription"
          defaultValue={retailer.shortDescription}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
        <input
          type="checkbox"
          name="sponsored"
          defaultChecked={retailer.sponsored}
          className="rounded border-tertiary text-tertiary focus:ring-tertiary"
        />
        Sponsored placement
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Sponsor label
        <select
          name="sponsorLabel"
          defaultValue={retailer.sponsorLabel || "Sponsored"}
          disabled={!retailer.sponsored}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring disabled:opacity-50"
        >
          <option value="Sponsored">Sponsored</option>
          <option value="Featured Partner">Featured Partner</option>
        </select>
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Status
        <select
          name="status"
          defaultValue={retailer.status}
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
    </form>
  );
}
