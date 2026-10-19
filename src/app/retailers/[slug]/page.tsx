import { notFound } from "next/navigation";
import { getRetailer, getProductsByRetailer, formatKes } from "@/lib/data/demo";
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
  const retailer = getRetailer(slug);
  if (!retailer) {
    return { title: "Retailer | Nyumba Edit" };
  }
  return {
    title: `${retailer.name} | Nyumba Edit`,
    description: retailer.shortDescription,
    openGraph: {
      title: retailer.name,
      description: retailer.description || retailer.shortDescription,
      type: "profile",
      url: absolutePath(`/retailers/${slug}`),
      images: [{ url: `${SITE.url}/images/placeholder:${retailer.cover}`, alt: retailer.name, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: retailer.name,
      description: retailer.shortDescription,
      images: [`${SITE.url}/images/placeholder:${retailer.cover}`],
    },
  };
};

export default async function RetailerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const retailer = getRetailer(slug);
  if (!retailer) notFound();

  const products = getProductsByRetailer(retailer.id);

  return (
    <div className="space-y-12">
      <JsonLd type="LocalBusiness" data={retailerJsonLd(retailer)} />
      <nav className="mb-2" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2 text-xs text-muted">
          <li><Link href="/retailers" className="hover:text-green-800 transition-colors">Retailer directory</Link></li>
          <li><span aria-hidden="true">&rsaquo;</span><span className="text-ink">{retailer.name}</span></li>
        </ol>
      </nav>

      <section>
        <div className="rounded-2xl border border-border overflow-hidden bg-white">
          <CardImage src={retailer.cover} alt={`${retailer.name} cover`} height={300} />
          {retailer.sponsored && <Badge variant="terracotta" className="absolute top-4 left-4 z-10">{retailer.sponsorLabel}</Badge>}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-heading text-3xl font-bold text-ink">{retailer.name}</h1>
                <p className="mt-1 text-sm text-muted">{retailer.shortDescription}</p>
                {retailer.verified && <Badge variant="green" className="mt-3 inline-flex">Verified retailer</Badge>}
                {!retailer.verified && <Badge variant="subtle" className="mt-3 inline-flex">Not independently verified</Badge>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <CallButton phone={retailer.phone} label="Call" size="sm" />
                <WhatsAppButton
                  phone={retailer.whatsapp}
                  message={`Hi, I found ${retailer.name} on Nyumba Edit. I'd like to enquire about your products, prices and delivery.`}
                  size="sm"
                  label="WhatsApp"
                />
              </div>
            </div>
            <p className="text-muted text-sm mb-6">{retailer.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted">Location</span>
                <span className="text-ink">{retailer.area ? `${retailer.area}, ` : ""}{retailer.town}, {retailer.county}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Service areas</span>
                <span className="text-ink line-clamp-1">{retailer.serviceAreas.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Showroom</span>
                <span className={`font-medium ${retailer.showroom ? "text-green-700" : "text-muted"}`}>{retailer.showroom ? "Yes" : "Online only"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Made in Kenya</span>
                <span className={`font-medium ${retailer.madeInKenya ? "text-green-700" : "text-muted"}`}>{retailer.madeInKenya ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Delivery</span>
                <span className={`font-medium ${retailer.delivery ? "text-green-700" : "text-muted"}`}>{retailer.delivery ? "Available" : "Not offered"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Assembly</span>
                <span className={`font-medium ${retailer.assembly ? "text-green-700" : "text-muted"}`}>{retailer.assembly ? "Available" : "Not offered"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Customisation</span>
                <span className={`font-medium ${retailer.customization ? "text-green-700" : "text-muted"}`}>{retailer.customization ? "Available" : "Not offered"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted">Price confirmed</span>
                <span className={`font-medium ${retailer.priceConfirmed ? "text-green-700" : "text-terracotta-700"}`}>
                  {retailer.priceConfirmed ? "Yes" : "Not recently confirmed"}
                </span>
              </div>
            </div>
            {retailer.paymentMethods.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Payment methods</span>
                {retailer.paymentMethods.map((m) => (
                  <Badge key={m} variant="subtle">{m}</Badge>
                ))}
              </div>
            )}
            {retailer.website || retailer.instagram || retailer.facebook || retailer.tiktok ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {retailer.website && (
                  <a href={retailer.website} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-white px-4 py-2 text-sm text-ink hover:bg-cream-100 transition-colors focus-visible-ring">Website</a>
                )}
                {retailer.instagram && (
                  <a href={`https://instagram.com/${retailer.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-white px-4 py-2 text-sm text-ink hover:bg-cream-100 transition-colors focus-visible-ring">Instagram</a>
                )}
                {retailer.facebook && (
                  <a href={`https://facebook.com/${retailer.facebook}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-white px-4 py-2 text-sm text-ink hover:bg-cream-100 transition-colors focus-visible-ring">Facebook</a>
                )}
                {retailer.tiktok && (
                  <a href={`https://tiktok.com/@${retailer.tiktok.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border bg-white px-4 py-2 text-sm text-ink hover:bg-cream-100 transition-colors focus-visible-ring">TikTok</a>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-bold">Products from {retailer.name}</h2>
            <Link href="/discover" className="text-sm font-semibold text-green-800 hover:underline">Browse all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block">
                <ProductCard p={p} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductCard({ p }: { p: any }) {
  return (
    <Card className="flex flex-col h-full group hover:border-green-800/60 transition-colors focus-visible-ring">
      <CardImage src={p.images?.[0] || "placeholder:product"} alt={p.name} height={200} />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-ink line-clamp-1 mb-2 group-hover:text-green-800 transition-colors">{p.name}</h3>
        <p className="text-sm text-muted line-clamp-2 mb-3 flex-1">{p.description}</p>
        <div className="mt-auto flex items-baseline gap-2">
          <Price amount={p.priceKes} onRequest={p.priceOnRequest} size="md" />
        </div>
      </div>
    </Card>
  );
}

function retailerJsonLd(r: { id: string; slug: string; name: string; shortDescription: string | undefined; description: string | undefined; county: string; town: string; area?: string | undefined; phone: string; whatsapp: string; website?: string | undefined; instagram?: string | undefined; facebook?: string | undefined; tiktok?: string | undefined; cover: string }) {
  return {
    "@id": `${SITE.url}/retailers/${r.slug}#business`,
    name: r.name,
    description: r.shortDescription,
    url: `${SITE.url}/retailers/${r.slug}`,
    telephone: r.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: r.area ? `${r.area}, ${r.town}` : r.town,
      addressRegion: r.county,
      addressCountry: "KE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: r.whatsapp,
        contactType: "customer service",
        availableLanguage: ["en", "sw"],
      },
    ],
    sameAs: [r.website, r.instagram, r.facebook, r.tiktok].filter(Boolean),
    image: `${SITE.url}/images/placeholder:${r.cover}`,
  };
}
