import { notFound } from "next/navigation";
import { getProduct, getRetailer, PRODUCTS, formatKes } from "@/lib/data/demo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/ui/price";
import { Button } from "@/components/ui/button";
import { WhatsAppButton, CallButton } from "@/components/ui/whatsapp";
import Link from "next/link";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { SocialShare } from "@/components/social-share";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return { title: "Product | Nyumba Edit" };
  }
  const priceText = product.priceKes === null ? "Price on request" : `KSh ${product.priceKes.toLocaleString("en-KE")}`;
  return {
    title: `${product.name} | Nyumba Edit`,
    description: `${product.description} ${priceText}. Available from ${product.retailerName}.`,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "product",
      url: `${SITE.url}/products/${slug}`,
      images: [{ url: `${SITE.url}/images/og-default.svg`, alt: product.name, width: 1200, height: 630 }],
      price: { amount: product.priceKes ?? 0, currencyCode: "KES" },
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [`${SITE.url}/images/og-default.svg`],
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
          <li><Link href="/discover" className="hover:text-primary transition-colors">Discover</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><Link href={`/discover?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><span className="text-foreground">{product.name}</span></li>
        </ol>
      </nav>

      <section className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <ProductImageGallery images={product.images} alt={product.name} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div>
            {product.sponsored && <Badge variant="sponsor" className="mb-3">Featured Partner</Badge>}
            <h1 className="font-heading text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">{product.retailerName}</p>
          </div>

          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle>Price</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-baseline gap-2">
                <Price amount={product.priceKes} onRequest={product.priceOnRequest} size="lg" />
                {!product.priceConfirmed && (
                  <span className="text-xs text-warning font-semibold">Price may be outdated — confirm with retailer</span>
                )}
              </div>
              <p className="text-xs text-muted">
                Price last checked {new Date(product.priceLastChecked).toLocaleDateString("en-KE")}.
                Prices can change — always confirm with the retailer before buying.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between text-foreground">
                <span className="text-muted">Availability</span>
                <span className={`font-medium ${product.availability === "in-stock" ? "text-success" : "text-muted"}`}>
                  {product.availability.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between text-foreground">
                <span className="text-muted">Dimensions</span>
                <span>{product.dimensions.widthCm} × {product.dimensions.depthCm} × {product.dimensions.heightCm} cm</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span className="text-muted">Materials</span>
                <span className="line-clamp-1">{product.materials.join(", ")}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle>Services &amp; contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.delivery ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.delivery ? "Delivery available" : "No delivery"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.assembly ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.assembly ? "Assembly available" : "No assembly"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${product.customization ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
                <span className="text-sm">{product.customization ? "Customisation available" : "No customisation"}</span>
              </div>
              {product.deliveryNotes && (
                <p className="text-sm text-muted">{product.deliveryNotes}</p>
              )}
            </CardContent>
          </Card>

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
                <SocialShare
                  url={`${SITE.url}/products/${product.slug}`}
                  title={product.name}
                  message={`Hi, I found "${product.name}" (KSh ${product.priceKes?.toLocaleString("en-KE") ?? "Price on request"}) on Nyumba Edit. Could you confirm price and availability?`}
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
      <section className="section rounded-2xl border border-border bg-cream-50 p-8">
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
          <Link href="/guides/best-sofa-shops-nairobi-2026" className="block rounded-xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring">
            <h3 className="font-heading font-bold text-foreground mb-2">Best sofa shops in Nairobi, 2026</h3>
            <p className="text-sm text-muted">Where to find living-room sofas in Nairobi.</p>
          </Link>
          <Link href="/guides/furnishing-under-kes-50000" className="block rounded-xl border border-border bg-white p-5 hover:border-primary/60 transition-colors focus-visible-ring">
            <h3 className="font-heading font-bold text-foreground mb-2">Furnishing a one-bedroom apartment under KSh 50,000</h3>
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
    <Card className="flex flex-col h-full group hover:border-primary/60 transition-colors focus-visible-ring">
      <div className="relative h-40 overflow-hidden rounded-lg bg-cream-100">
        <span className="image-placeholder absolute inset-0 flex items-center justify-center text-[0.75rem] font-medium uppercase tracking-wider">
          {p.name}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
        </div>
        <Link href={`/products/${p.slug}`} className="mt-auto inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring w-full text-center">
          View product
        </Link>
      </div>
    </Card>
  );
}

function productJsonLd(p: typeof PRODUCTS[number]) {
  return {
    "@id": `${SITE.url}/products/${p.slug}#product`,
    name: p.name,
    description: p.description,
    image: `${SITE.url}/images/og-default.svg`,
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
