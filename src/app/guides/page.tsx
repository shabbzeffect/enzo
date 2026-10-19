import { ARTICLES } from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { SponsorLabel } from "@/components/ui/badge";
import Link from "next/link";

export default function GuidesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Guides &amp; inspiration</h1>
        <p className="mt-2 text-muted text-sm">
          Buying guides, room inspiration and maker stories from the Nyumba Edit
          editorial team. Editorial recommendations are kept separate from paid
          placement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <Link key={article.id} href={`/guides/${article.slug}`} className="block">
            <ArticleCard a={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ a }: { a: any }) {
  return (
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      {a.sponsored && <SponsorLabel className="mb-3">{a.sponsorLabel || "Sponsored"}</SponsorLabel>}
      <div className="relative h-48 overflow-hidden rounded-lg bg-cream-100">
        <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider text-muted">
          {a.title}
        </span>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-muted mb-2">{a.category}</span>
        <h3 className="font-heading font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {a.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{a.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 text-xs text-muted">
          <span>By {a.author}</span>
          <span>·</span>
          <span>{new Date(a.publishedAt).toLocaleDateString("en-KE")}</span>
        </div>
        <Link
          href={`/guides/${a.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring w-full text-center"
        >
          Read guide
        </Link>
      </CardContent>
    </Card>
  );
}
