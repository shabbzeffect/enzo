import { notFound } from "next/navigation";
import { getArticle, getProduct } from "@/lib/data/demo";
import Link from "next/link";
import { Card, CardImage } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="space-y-10">
      <nav className="mb-2" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li><Link href="/guides" className="hover:text-green-800 transition-colors">Guides</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><span className="text-ink">{article.title}</span></li>
        </ol>
      </nav>

      <article className="max-w-3xl">
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
          <div className="flex-1">
            <CardImage src={article.image} alt={article.title} height={320} />
            {article.sponsored && (
              <Badge className="mt-4">Sponsored</Badge>
            )}
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">{article.category}</span>
            <h1 className="font-heading text-3xl font-bold text-ink leading-tight">{article.title}</h1>
            <p className="mt-3 text-sm text-muted">By {article.author} · {new Date(article.publishedAt).toLocaleDateString("en-KE")}</p>
          </div>
        </div>

        <div className="prose prose-invert lg:prose-lg text-muted max-w-none leading-relaxed">
          {article.body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-6">{para}</p>
          ))}
        </div>

        {article.disclosure && (
          <section className="mt-10 rounded-xl border border-terracotta-200 bg-terracotta-50 p-6">
            <h3 className="font-bold text-terracotta-800 mb-2">Commercial disclosure</h3>
            <p className="text-sm text-terracotta-700">{article.disclosure}</p>
          </section>
        )}

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-heading text-xl font-bold mb-4">Products mentioned</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {article.relatedProductSlugs.map((slug) => {
              const product = getProduct(slug);
              if (!product) return null;
              return (
                <Link key={slug} href={`/products/${slug}`} className="block rounded-xl border border-border bg-white p-4 hover:border-green-800/60 transition-colors focus-visible-ring">
                  <h3 className="font-heading font-bold text-ink line-clamp-2 mb-2">{product.name}</h3>
                  <Price amount={product.priceKes} onRequest={product.priceOnRequest} size="md" className="mt-auto" />
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </div>
  );
}
