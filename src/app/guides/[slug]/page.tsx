import { notFound } from "next/navigation";
import { getArticle, getProduct, articleCategoryName } from "@/lib/data/demo";
import Link from "next/link";
import { CardImage } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { JsonLd } from "@/components/json-ld";
import { SITE, absolutePath } from "@/lib/site";

export const metadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Guide | Nyumba Edit" };
  }
  return {
    title: `${article.title} | Nyumba Edit`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: absolutePath(`/guides/${slug}`),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author],
      images: [{ url: `${SITE.url}/images/placeholder:${article.image}`, alt: article.title, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${SITE.url}/images/placeholder:${article.image}`],
    },
  };
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="space-y-10">
      <JsonLd type="Article" data={articleJsonLd(article)} />
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
            <Link
              href={`/guides?category=${article.category}`}
              className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block hover:underline"
            >
              {articleCategoryName(article.category)}
            </Link>
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

function articleJsonLd(a: { id: string; slug: string; title: string; excerpt: string | undefined; body: string | undefined; author: string; publishedAt: string; updatedAt?: string | undefined; image: string }) {
  return {
    "@id": `${SITE.url}/guides/${a.slug}#article`,
    headline: a.title,
    description: a.excerpt,
    articleBody: a.body,
    author: { "@type": "Person", name: a.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/images/og-default.svg` },
    },
    datePublished: a.publishedAt,
    dateModified: a.updatedAt || a.publishedAt,
    image: `${SITE.url}/images/placeholder:${a.image}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/guides/${a.slug}`,
    },
  };
}
