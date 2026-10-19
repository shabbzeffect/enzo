import Link from "next/link";
import { RETAILERS, PROMOTIONS } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Manage sponsored placements — Nyumba Edit admin",
  description: "Nyumba Edit admin sponsored placement management (demonstration only).",
};

export default function AdminPromotionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage sponsored placements</h1>
        <p className="text-muted text-sm">
          Set promotion dates and disclosure labels for sponsored placements.
          All paid placements must be labelled "Sponsored" or "Featured Partner"
          and are kept separate from editorial recommendations.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-xs text-muted font-medium w-1/3">Placement</th>
              <th className="pb-3 text-xs text-muted font-medium">Target</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Type</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Dates</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Label</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PROMOTIONS.map((p) => {
              const target = p.type === "retailer" ? RETAILERS.find((r) => r.id === p.targetId) : null;
              return (
                <tr key={p.id} className="text-foreground">
                  <td className="py-4">
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
                    <Badge
                      variant={p.label === "Sponsored" ? "tertiary" : "success"}
                    >
                      {p.label}
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant={p.active ? "success" : "default"}>
                      {p.active ? "Active" : "Inactive"}
                    </Badge>
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
          <li>Every paid placement must carry a "Sponsored" or "Featured Partner" label next to the placement.</li>
          <li>Labels must not be hidden in footnotes or terms and conditions.</li>
          <li>Promotion start and end dates control when a placement is displayed.</li>
          <li>Edit and archive actions are UI-only in this demonstration build.</li>
        </ul>
      </div>
    </div>
  );
}
