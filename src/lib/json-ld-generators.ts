import { SITE } from "@/lib/site";

export function productJsonLd(p: {
  slug: string;
  name: string;
  description: string;
  retailerName: string;
  images: string[];
  materials: string[];
  priceKes: number | null;
  priceOnRequest: boolean;
  availability: string;
  priceLastChecked: string;
  category: string;
}) {
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

export function retailerJsonLd(r: {
  slug: string;
  name: string;
  shortDescription: string | undefined;
  description: string | undefined;
  county: string;
  town: string;
  area?: string | undefined;
  phone: string;
  whatsapp: string;
  website?: string | undefined;
  instagram?: string | undefined;
  facebook?: string | undefined;
  tiktok?: string | undefined;
  cover: string;
}) {
  const formatSocialUrl = (handle: string | undefined, platform: string): string | null => {
    if (!handle) return null;
    const clean = handle.replace(/^@/, "");
    switch (platform) {
      case "instagram":
        return `https://instagram.com/${clean}`;
      case "facebook":
        return handle.startsWith("http") ? handle : `https://facebook.com/${clean}`;
      case "tiktok":
        return `https://tiktok.com/@${clean}`;
      default:
        return handle;
    }
  };

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
    sameAs: [
      r.website,
      formatSocialUrl(r.instagram, "instagram"),
      formatSocialUrl(r.facebook, "facebook"),
      formatSocialUrl(r.tiktok, "tiktok"),
    ].filter(Boolean) as string[],
    image: `${SITE.url}/images/og-default.svg`,
  };
}

export function articleJsonLd(a: {
  slug: string;
  title: string;
  excerpt: string | undefined;
  body: string | undefined;
  author: string;
  publishedAt: string;
  updatedAt?: string | undefined;
  image: string;
}) {
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