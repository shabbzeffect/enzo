import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  productJsonLd,
  retailerJsonLd,
  articleJsonLd,
} from "@/lib/json-ld-generators";

const MOCK_PRODUCT = {
  slug: "mavuno-three-seater-sofa",
  name: "Mavuno Three-Seater Sofa",
  description: "A solid-wood frame three-seater sofa upholstered in durable fabric.",
  retailerName: "Highland Home Furnishings",
  images: ["placeholder:prod-mavuno-sofa-1", "placeholder:prod-mavuno-sofa-2"],
  materials: ["Mining timber frame", "Fabric upholstery", "Foam cushioning"],
  priceKes: 85000,
  priceOnRequest: false,
  availability: "in-stock",
  priceLastChecked: "2026-01-10",
  category: "sofas",
};

const MOCK_RETAILER = {
  slug: "highland-home",
  name: "Highland Home Furnishings",
  shortDescription: "Timber living and dining furniture made in Kenya.",
  description: "Workshop-led showroom serving Nairobi and surrounding counties.",
  county: "Nairobi",
  town: "Nairobi",
  area: "Karen",
  phone: "+254700000001",
  whatsapp: "+254700000001",
  website: "https://example.demo/highland-home",
  instagram: "@highlandhome.demo",
  facebook: "Highland Home Furnishings",
  cover: "placeholder:cover-highland",
};

const MOCK_ARTICLE = {
  slug: "best-sofa-shops-nairobi-2026",
  title: "Best sofa shops in Nairobi, 2026",
  excerpt: "Where to find living-room sofas in Nairobi.",
  body: "Nairobi shoppers looking for a new sofa have options...",
  author: "Nyumba Edit Editorial Team",
  publishedAt: "2026-02-01T00:00:00.000Z",
  image: "placeholder:art-best-sofa",
};

test("productJsonLd generates valid Product schema", () => {
  const jsonLd = productJsonLd(MOCK_PRODUCT);
  
  assert.ok(jsonLd["@id"], "Should have @id");
  assert.ok(jsonLd["@id"].includes("/products/mavuno-three-seater-sofa#product"));
  
  assert.strictEqual(jsonLd.name, "Mavuno Three-Seater Sofa");
  assert.strictEqual(jsonLd.description, "A solid-wood frame three-seater sofa upholstered in durable fabric.");
  assert.strictEqual(jsonLd.brand["@type"], "Brand");
  assert.strictEqual(jsonLd.brand.name, "Highland Home Furnishings");
  
  assert.strictEqual(jsonLd.offers["@type"], "Offer");
  assert.strictEqual(jsonLd.offers.priceCurrency, "KES");
  assert.strictEqual(jsonLd.offers.price, 85000);
  assert.strictEqual(jsonLd.offers.availability, "https://schema.org/InStock");
  assert.strictEqual(jsonLd.offers.itemCondition, "https://schema.org/NewCondition");
  
  assert.ok(Array.isArray(jsonLd.additionalProperty));
  assert.strictEqual(jsonLd.additionalProperty.length, 3);
});

test("productJsonLd handles price on request", () => {
  const product = { ...MOCK_PRODUCT, priceKes: null, priceOnRequest: true, availability: "made-to-order" };
  const jsonLd = productJsonLd(product);
  
  assert.strictEqual(jsonLd.offers.price, null);
  assert.strictEqual(jsonLd.offers.availability, "https://schema.org/MadeToOrder");
});

test("productJsonLd handles unavailable products", () => {
  const product = { ...MOCK_PRODUCT, availability: "unavailable" };
  const jsonLd = productJsonLd(product);
  
  assert.strictEqual(jsonLd.offers.availability, "https://schema.org/MadeToOrder");
});

test("retailerJsonLd generates valid LocalBusiness schema", () => {
  const jsonLd = retailerJsonLd(MOCK_RETAILER);
  
  assert.ok(jsonLd["@id"], "Should have @id");
  assert.ok(jsonLd["@id"].includes("/retailers/highland-home#business"));
  
  assert.strictEqual(jsonLd.name, "Highland Home Furnishings");
  assert.strictEqual(jsonLd.description, "Timber living and dining furniture made in Kenya.");
  assert.strictEqual(jsonLd.telephone, "+254700000001");
  
  assert.strictEqual(jsonLd.address["@type"], "PostalAddress");
  assert.strictEqual(jsonLd.address.addressLocality, "Karen, Nairobi");
  assert.strictEqual(jsonLd.address.addressRegion, "Nairobi");
  assert.strictEqual(jsonLd.address.addressCountry, "KE");
  
  assert.ok(Array.isArray(jsonLd.contactPoint));
  assert.strictEqual(jsonLd.contactPoint[0]["@type"], "ContactPoint");
  assert.strictEqual(jsonLd.contactPoint[0].telephone, "+254700000001");
  assert.strictEqual(jsonLd.contactPoint[0].contactType, "customer service");
  assert.ok(jsonLd.contactPoint[0].availableLanguage.includes("en"));
  assert.ok(jsonLd.contactPoint[0].availableLanguage.includes("sw"));
  
  assert.ok(Array.isArray(jsonLd.sameAs));
  assert.ok(jsonLd.sameAs.includes("https://example.demo/highland-home"));
  assert.ok(jsonLd.sameAs.some((s) => s.includes("instagram.com")));
  assert.ok(jsonLd.sameAs.includes("https://facebook.com/Highland Home Furnishings"));
});

test("retailerJsonLd handles missing optional fields", () => {
  const retailer = { ...MOCK_RETAILER, website: undefined, instagram: undefined, facebook: undefined, area: undefined };
  const jsonLd = retailerJsonLd(retailer);
  
  assert.strictEqual(jsonLd.address.addressLocality, "Nairobi");
  assert.ok(jsonLd.sameAs.length === 0 || jsonLd.sameAs.every((s) => typeof s === "string"));
});

test("articleJsonLd generates valid Article schema", () => {
  const jsonLd = articleJsonLd(MOCK_ARTICLE);
  
  assert.ok(jsonLd["@id"], "Should have @id");
  assert.ok(jsonLd["@id"].includes("/guides/best-sofa-shops-nairobi-2026#article"));
  
  assert.strictEqual(jsonLd.headline, "Best sofa shops in Nairobi, 2026");
  assert.strictEqual(jsonLd.description, "Where to find living-room sofas in Nairobi.");
  assert.strictEqual(jsonLd.articleBody, "Nairobi shoppers looking for a new sofa have options...");
  
  assert.strictEqual(jsonLd.author["@type"], "Person");
  assert.strictEqual(jsonLd.author.name, "Nyumba Edit Editorial Team");
  
  assert.strictEqual(jsonLd.publisher["@type"], "Organization");
  assert.ok(jsonLd.publisher.name);
  assert.ok(jsonLd.publisher.logo["@type"], "ImageObject");
  
  assert.strictEqual(jsonLd.datePublished, "2026-02-01T00:00:00.000Z");
  assert.strictEqual(jsonLd.dateModified, "2026-02-01T00:00:00.000Z");
  
  assert.ok(jsonLd.mainEntityOfPage["@type"], "WebPage");
  assert.ok(jsonLd.mainEntityOfPage["@id"]);
});

test("articleJsonLd handles updatedAt", () => {
  const article = { ...MOCK_ARTICLE, updatedAt: "2026-02-15T10:00:00.000Z" };
  const jsonLd = articleJsonLd(article);
  
  assert.strictEqual(jsonLd.dateModified, "2026-02-15T10:00:00.000Z");
});