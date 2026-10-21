import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { RETAILERS } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";
import { savePromotion, togglePromotionActive } from "../actions";

export const metadata = {
  title: "Manage sponsored placements — Nyumba Edit admin",
  description: "Nyumba Edit admin sponsored placement management (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminPromotionsPage() {
  const promotions = getStore().promotions;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage sponsored placements</h1>
        <p className="text-muted text-sm">
          {promotions.length} placements &middot; {promotions.filter((p) => p.active).length} active.
          All paid placements must be labelled &ldquo;Sponsored&rdquo; or &ldquo;Featured Partner&rdquo;
          and are kept separate from editorial recommendations.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 pb-3 text-xs text-muted font-medium w-1/4">Placement</th>
              <th className="pb-3 text-xs text-muted font-medium">Target</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Type</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Dates</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Label</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Active</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {promotions.map((p) => {
              const target = p.type === "retailer" ? RETAILERS.find((r) => r.id === p.targetId) : null;
              return (
                <tr key={p.id} className="text-foreground align-top">
                  <td className="p-4">
                    <div className="font-medium">{p.placement}</div>
                    <p className="text-xs text-muted">{p.type}</p>
                  </td>
                  <td className="py-4">{target ? target.name : p.targetSlug}</td>
                  <td className="py-4 text-center">{p.type}</td>
                  <td className="py-4 text-center">
                    {new Date(p.startDate).toLocaleDateString("en-KE")} —{" "}
                    {new Date(p.endDate).toLocaleDateString("en-KE")}
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant={p.label === "Sponsored" ? "tertiary" : "success"}>
                      {p.label}
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant={p.active ? "success" : "default"}>
                      {p.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <details className="text-left">
                        <summary className="text-xs text-muted hover:text-foreground cursor-pointer select-none list-none rounded focus-visible-ring px-1 py-0.5">
                          Edit
                        </summary>
                        <PromotionForm promotion={p} />
                      </details>
                      <form action={togglePromotionActive}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="active" value={!p.active ? "on" : ""} />
                        <button type="submit" className="text-xs text-tertiary hover:underline">
                          {p.active ? "Deactivate" : "Activate"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-border bg-cream-50 p-6">
        <h3 className="font-bold text-foreground mb-2">Disclosure requirements</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Every paid placement must carry a &ldquo;Sponsored&rdquo; or &ldquo;Featured Partner&rdquo; label next to the placement.</li>
          <li>Labels must not be hidden in footnotes or terms and conditions.</li>
          <li>Promotion start and end dates control when a placement is displayed on the public site.</li>
        </ul>
      </div>
    </div>
  );
}

function PromotionForm({ promotion }: { promotion: ReturnType<typeof getStore>["promotions"][0] }) {
  return (
    <form
      action={savePromotion}
      className="mt-2 w-80 rounded-xl border border-border bg-cream-50 p-4 space-y-3 text-left"
    >
      <input type="hidden" name="id" value={promotion.id} />
      <label className="block text-xs font-semibold text-foreground">
        Label
        <select
          name="label"
          defaultValue={promotion.label}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        >
          <option value="Sponsored">Sponsored</option>
          <option value="Featured Partner">Featured Partner</option>
        </select>
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Start date
        <input
          type="date"
          name="startDate"
          defaultValue={promotion.startDate.slice(0, 10)}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="block text-xs font-semibold text-foreground">
        End date
        <input
          type="date"
          name="endDate"
          defaultValue={promotion.endDate.slice(0, 10)}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
        <input
          type="checkbox"
          name="active"
          defaultChecked={promotion.active}
          className="rounded border-tertiary text-tertiary focus:ring-tertiary"
        />
        Active
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