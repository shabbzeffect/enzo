import Link from "next/link";
import { ARTICLES } from "@/lib/data/demo";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Manage articles — Nyumba Edit admin",
  description: "Nyumba Edit admin article management (demonstration only).",
};

export default function AdminArticlesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage articles</h1>
        <p className="text-muted text-sm">
          View, edit, publish or archive editorial content. This is a
          demonstration build — changes are not persisted to a database.
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-xs text-muted font-medium w-1/3">Article</th>
              <th className="pb-3 text-xs text-muted font-medium">Category</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Published</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Sponsored</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ARTICLES.map((a) => (
              <tr key={a.id} className="text-foreground">
                <td className="py-4">
                  <div className="font-medium">{a.title}</div>
                  <p className="text-xs text-muted">{a.excerpt}</p>
                </td>
                <td className="py-4">{a.category}</td>
                <td className="py-4 text-center">
                  <span className="text-xs text-muted">{new Date(a.publishedAt).toLocaleDateString("en-KE")}</span>
                </td>
                <td className="py-4 text-center">
                  {a.sponsored ? (
                    <Badge variant="sponsor">Sponsored</Badge>
                  ) : (
                    <Badge variant="default">Editorial</Badge>
                  )}
                </td>
                <td className="py-4 text-right">
                  <Link href={`/guides/${a.slug}`} className="text-xs text-primary hover:underline mr-3">View</Link>
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
          <li>Editorial recommendations must be kept separate from paid placement. Sponsored articles require a commercial disclosure.</li>
          <li>Edit and publish actions are UI-only in this demonstration build.</li>
          <li>Connect the Prisma database layer to persist changes.</li>
        </ul>
      </div>
    </div>
  );
}
