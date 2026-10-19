// src/lib/site.ts
//
// Canonical site metadata shared across pages and SEO files.

export const SITE = {
  name: "Nyumba Edit",
  shortName: "Nyumba Edit",
  url: (process as unknown as { env: Record<string, string> }).env?.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  tagline: "Find furniture and home stores in Kenya.",
  description:
    "Nyumba Edit is an editorial furniture-discovery and retailer directory for Kenya. Browse products, shopping guides and interiors, and contact retailers directly. Prices in KSh.",
  defaultImage: "/images/og-default.svg",
  twitter: "@nyumbaedit.demo",
  email: "hello@example.demo",
  phone: "+254700000000",
  address: {
    streetAddress: "Demo address",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
    postalCode: "00100",
  },
  organizationJsonLd() {
    return {
      "@id": `${this.url}#organization`,
      name: this.name,
      url: this.url,
      logo: `${this.url}/images/og-default.svg`,
      image: `${this.url}/images/og-default.svg`,
      telephone: this.phone,
      email: this.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: this.address.streetAddress,
        addressLocality: this.address.addressLocality,
        addressRegion: this.address.addressRegion,
        postalCode: this.address.postalCode,
        addressCountry: this.address.addressCountry,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: this.phone,
          contactType: "customer service",
          availableLanguage: ["en", "sw"],
        },
      ],
      sameAs: [],
    };
  },
} as const;

export function absolutePath(path: string) {
  return SITE.url.replace(/\/$/, "") + path;
}
