import Link from "next/link";
import { ARTICLES, ARTICLE_CATEGORIES, articleCategoryName } from "@/lib/data/demo";
import { Card, CardContent } from "@/components/ui/card";
import { SponsorLabel } from "@/components/ui/badge";

type SearchParams = { searchParams: Promise<{ category?: string }> };

export default async function GuidesPage({ searchParams }: SearchParams) {
  const { category } = await searchParams;
  const active = category && ARTICLE_CATEGORIES.some((c) => c.slug === category) ? category : "";

  const articles = active ? ARTICLES.filter((a) => a.category === active) : ARTICLES;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Guides &amp; inspiration</h1>
        <p className="mt-2 text-muted text-sm">
          Buying guides, room inspiration and maker stories from the Nyumba Edit
          editorial team. Editorial recommendations are kept separate from paid
          placement.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="navigation" aria-label="Guide categories">
        <FilterChip href="/guides" label="All guides" active={!active} />
        {ARTICLE_CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.slug}
            href={`/guides?category=${cat.slug}`}
            label={cat.name}
            active={active === cat.slug}
            count={ARTICLES.filter((a) => a.category === cat.slug).length}
          />
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white p-12 text-center">
          <p className="text-muted">No guides in this category yet.</p>
          <Link href="/guides" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            View all guides
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/guides/${article.slug}`} className="block">
              <ArticleCard a={article} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
  count,
}: {
  href: string;
  label: string;
  active: boolean;
  count?: number;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible-ring",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-white text-muted hover:bg-cream-100 hover:text-foreground",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {label}
      {count !== undefined && <span className="ml-1.5 text-xs opacity-70">{count}</span>}
    </Link>
  );
}

function ArticleCard({ a }: { a: (typeof ARTICLES)[number] }) {
  return (
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      {a.sponsored && <SponsorLabel className="mb-3">{a.sponsorLabel || "Sponsored"}</SponsorLabel>}
      <div className="relative h-48 overflow-hidden rounded-lg bg-cream-100">
        <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
          {a.title}
        </span>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <span className="text-xs text-muted mb-2">{articleCategoryName(a.category)}</span>
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
