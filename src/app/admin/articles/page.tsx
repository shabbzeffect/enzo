import Link from "next/link";
import { getStore } from "@/server/demo-store";
import { Badge } from "@/components/ui/badge";
import { saveArticle, setArticleStatusAction } from "../actions";

export const metadata = {
  title: "Manage articles — Nyumba Edit admin",
  description: "Nyumba Edit admin article management (demonstration only).",
};

export const dynamic = "force-dynamic";

export default function AdminArticlesPage() {
  const articles = getStore().articles;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Manage articles</h1>
        <p className="text-muted text-sm">
          {articles.length} articles · {articles.filter((a) => a.status === "draft").length} draft · {articles.filter((a) => a.status === "archived").length} archived.
          Edits apply to the public demo site immediately (process memory only).
        </p>
        <Link href="/admin" className="text-sm text-primary hover:underline">&larr; Back to dashboard</Link>
      </div>

      <div className="rounded-2xl border border-border bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[860px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 pb-3 text-xs text-muted font-medium w-1/3">Article</th>
              <th className="pb-3 text-xs text-muted font-medium">Category</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Published</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Sponsored</th>
              <th className="pb-3 text-xs text-muted font-medium text-center">Status</th>
              <th className="pb-3 text-xs text-muted font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((a) => (
              <tr key={a.id} className="text-foreground align-top">
                <td className="p-4">
                  <div className="font-medium">{a.title}</div>
                  <p className="text-xs text-muted line-clamp-2">{a.excerpt}</p>
                </td>
                <td className="py-4">{a.category}</td>
                <td className="py-4 text-center">
                  <span className="text-xs text-muted">{new Date(a.publishedAt).toLocaleDateString("en-KE")}</span>
                </td>
                <td className="py-4 text-center">
                  {a.sponsored ? <Badge variant="sponsor">{a.sponsorLabel || "Sponsored"}</Badge> : <Badge variant="default">Editorial</Badge>}
                </td>
                <td className="py-4 text-center">
                  {a.status === "draft" ? <Badge variant="warning">Draft</Badge> : a.status === "archived" ? <Badge variant="warning">Archived</Badge> : <Badge variant="success">Published</Badge>}
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/guides/${a.slug}`} className="text-xs text-primary hover:underline">View</Link>
                    <details className="text-left">
                      <summary className="text-xs text-muted hover:text-foreground cursor-pointer select-none list-none rounded focus-visible-ring px-1 py-0.5">Edit</summary>
                      <ArticleForm article={a} />
                    </details>
                    <form action={setArticleStatusAction}>
                      <input type="hidden" name="id" value={a.id} />
                      <input type="hidden" name="status" value={a.status === "published" ? "draft" : "published"} />
                      <button type="submit" className="text-xs text-tertiary hover:underline">
                        {a.status === "published" ? "Unpublish" : "Publish"}
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
          <li>Draft and archived articles are hidden from the public guides section immediately.</li>
          <li>Sponsored articles require a commercial disclosure; sponsor label is mandatory when sponsored is checked.</li>
          <li>Changes are held in process memory for this demo; connect the Prisma database layer to persist them.</li>
        </ul>
      </div>
    </div>
  );
}

function ArticleForm({ article }: { article: ReturnType<typeof getStore>["articles"][0] }) {
  return (
    <form
      action={saveArticle}
      className="mt-2 w-72 rounded-xl border border-border bg-cream-50 p-4 space-y-3 text-left"
    >
      <input type="hidden" name="id" value={article.id} />
      <label className="block text-xs font-semibold text-foreground">
        Title
        <input
          name="title"
          defaultValue={article.title}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        />
      </label>
      <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
        <input
          type="checkbox"
          name="sponsored"
          defaultChecked={article.sponsored}
          className="rounded border-tertiary text-tertiary focus:ring-tertiary"
        />
        Sponsored
      </label>
      <label className="block text-xs font-semibold text-foreground">
        Sponsor label
        <select
          name="sponsorLabel"
          defaultValue={article.sponsorLabel || "Sponsored"}
          disabled={!article.sponsored}
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
          defaultValue={article.status}
          className="mt-1 w-full rounded-lg border border-border bg-white px-2 py-1.5 text-sm text-foreground focus-visible-ring"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
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