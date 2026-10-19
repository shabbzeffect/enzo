import { notFound } from "next/navigation";
import { getProduct, getRetailer, PRODUCTS, formatKes } from "@/lib/data/demo";
import { Card, CardImage } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { WhatsAppButton, CallButton } from "@/components/ui/whatsapp";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE, absolutePath } from "@/lib/site";

export const metadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product | Nyumba Edit" };
  }
  const retailer = getRetailer(product.retailerSlug);
  const priceText = product.priceKes === null ? "Price on request" : `KSh ${product.priceKes.toLocaleString("en-KE")}`;
  const image = product.images?.[0] ? absolutePath(`/images/placeholder:${product.images[0]}`) : `${SITE.url}/images/og-default.svg`;
  return {
    title: `${product.name} | Nyumba Edit`,
    description: `${product.description} ${priceText}. Available from ${product.retailerName} in ${product.retailerSlug}.`,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "product",
      url: absolutePath(`/products/${slug}`),
      images: [{ url: image, alt: product.name, width: 1200, height: 630 }],
      price: { amount: product.priceKes ?? 0, currencyCode: "KES" },
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [image],
    },
  };
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const retailer = getRetailer(product.retailerSlug);

  return (
    <div className="space-y-12">
      <JsonLd type="Product" data={productJsonLd(product)} />
      <nav className="mb-2" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li><Link href="/discover" className="hover:text-green-800 transition-colors">Discover</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><Link href={`/discover?category=${product.category}`} className="hover:text-green-800 transition-colors">{product.category}</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><span className="text-ink">{product.name}</span></li>
        </ol>
      </nav>

      <section className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-2xl border border-border overflow-hidden bg-cream-100 h-[480px]">
            <CardImage src={product.images?.[0] || "placeholder:product"} alt={product.name} height={480} />
            {product.priceOnRequest && (
              <div className="absolute bottom-4 left-4 z-10 rounded-xl border border-white bg-black/60 px-3 py-1 text-xs text-white">Price on request</div>
            )}
          </div>
          {product.images.slice(1).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {product.images.slice(1).map((img, i) => (
                <CardImage key={i} src={img} alt={`${product.name} image ${i + 1}`} height={140} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div>
            {product.sponsored && <Badge variant="terracotta" className="mb-3">Sponsored</Badge>}
            <h1 className="font-heading text-3xl font-bold text-ink">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">{product.retailerName}</p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-baseline gap-2 mb-2">
              <Price amount={product.priceKes} onRequest={product.priceOnRequest} size="md" />
              {!product.priceConfirmed && (
                <span className="text-xs text-terracotta-700 font-semibold">Price may be outdated — confirm with retailer</span>
              )}
            </div>
            <p className="text-xs text-muted mb-4">
              Price last checked {new Date(product.priceLastChecked).toLocaleDateString("en-KE")}.
              Prices can change — always confirm with the retailer before buying.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-ink">
                <span className="text-muted">Availability</span>
                <span className={`font-medium ${product.availability === "in-stock" ? "text-green-700" : "text-muted"}`}>
                  {product.availability.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between text-ink">
                <span className="text-muted">Dimensions</span>
                <span>{product.dimensions.widthCm} × {product.dimensions.depthCm} × {product.dimensions.heightCm} cm</span>
              </div>
              <div className="flex justify-between text-ink">
                <span className="text-muted">Materials</span>
                <span className="line-clamp-1">{product.materials.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-heading font-bold text-ink mb-4">Services &amp; contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.delivery ? "bg-green-600" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.delivery ? "Delivery available" : "No delivery"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.assembly ? "bg-green-600" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.assembly ? "Assembly available" : "No assembly"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.customization ? "bg-green-600" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.customization ? "Customisation available" : "No customisation"}</span>
              </div>
              {product.deliveryNotes && (
                <p className="text-sm text-muted">{product.deliveryNotes}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {retailer ? (
              <>
                <CallButton phone={retailer.phone} label="Call retailer" size="lg" className="w-full" />
                <WhatsAppButton
                  phone={retailer.whatsapp}
                  message={`Hi, I found "${product.name}" on Nyumba Edit. Could you confirm the price, stock and delivery options?`}
                  size="lg"
                  className="w-full"
                />
              </>
            ) : (
              <p className="text-sm text-muted">No contact details available for this retailer.</p>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <h2 className="font-heading text-xl font-bold mb-4">About this product</h2>
        <p className="text-muted leading-relaxed max-w-2xl">{product.description}</p>
      </section>

      {/* Related products */}
      <section className="section bg-cream-50 rounded-2xl border border-border p-8">
        <h2 className="font-heading text-xl font-bold mb-6">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getRelatedProducts(product).map((p) => (
            <RelatedProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Related guides */}
      <section className="section">
        <h2 className="font-heading text-xl font-bold mb-6">Related guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/guides/best-sofa-shops-nairobi-2026" className="block rounded-xl border border-border bg-white p-5 hover:border-green-800/60 transition-colors focus-visible-ring">
            <h3 className="font-heading font-bold text-ink mb-2">Best sofa shops in Nairobi, 2026</h3>
            <p className="text-sm text-muted">Where to find living-room sofas in Nairobi.</p>
          </Link>
          <Link href="/guides/furnishing-under-kes-50000" className="block rounded-xl border border-border bg-white p-5 hover:border-green-800/60 transition-colors focus-visible-ring">
            <h3 className="font-heading font-bold text-ink mb-2">Furnishing a one-bedroom apartment under KSh 50,000</h3>
            <p className="text-sm text-muted">A realistic starter kit with price-check dates.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

function getRelatedProducts(product: { category: string; id: string }) {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
}

function RelatedProductCard({ p }: { p: { id: string; slug: string; name: string; description: string; priceKes: number | null; priceOnRequest: boolean; images: string[] } }) {
  return (
    <Card className="flex flex-col h-full group hover:border-green-800/60 transition-colors focus-visible-ring">
      <CardImage src={p.images?.[0] || "placeholder:product"} alt={p.name} height={200} />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-ink line-clamp-2 mb-2 group-hover:text-green-800 transition-colors">{p.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
        </div>
        <Link href={`/products/${p.slug}`} className="mt-auto rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring text-center">
          View product
        </Link>
      </div>
    </Card>
  );
}

function productJsonLd(p: typeof PRODUCTS[number]) {
  const image = p.images?.[0] ? `${SITE.url}/images/placeholder:${p.images[0]}` : `${SITE.url}/images/og-default.svg`;
  return {
    "@id": `${SITE.url}/products/${p.slug}#product`,
    name: p.name,
    description: p.description,
    image: image,
    brand: { "@type": "Brand", name: p.retailerName },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${p.slug}`,
      priceCurrency: "KES",
      price: p.priceKes ?? null,
      priceValidUntil: p.priceLastChecked,
      availability: p.availability === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/MadeToOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
    category: p.category,
    additionalProperty: p.materials.map((m) => ({ "@type": "PropertyValue", name: "material", value: m })),
  };
}
