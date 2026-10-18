/**
 * @file src/lib/data/demo.ts
 *
 * DEMO / SAMPLE DATA ONLY.
 *
 * Every retailer, product, article, price, address, phone number and image
 * below is fictional placeholder content used to demonstrate the Nyumba Edit
 * experience. None of these are real Kenyan businesses, prices, or locations.
 *
 * Before production, replace this layer with real data fetched from a
 * backend/database and clearly mark any sponsored placements.
 */

export type County = {
  code: string;
  name: string;
  towns: Town[];
};

export type Town = {
  slug: string;
  name: string;
  areas?: Area[];
};

export type Area = {
  slug: string;
  name: string;
};

export type Retailer = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  logo: string; // placeholder image id
  cover: string;
  categories: string[]; // category slugs
  county: string;
  town: string;
  area?: string;
  serviceAreas: string[]; // county names
  phone: string; // +254 format
  whatsapp: string; // +254 format
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  verified: boolean; // false unless a real verification process exists
  showroom: boolean;
  onlineOnly: boolean;
  madeInKenya: boolean;
  delivery: boolean;
  assembly: boolean;
  customization: boolean;
  priceConfirmed: boolean; // whether price has been confirmed recently
  priceLastChecked?: string; // ISO date
  paymentMethods: string[]; // e.g. ["M-Pesa", "Cash", "Card"]
  createdAt: string;
  updatedAt: string;
  sponsored: boolean; // paid placement flag
  sponsorLabel?: string; // "Sponsored" or "Featured Partner"
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string; // category slug
  retailerId: string;
  retailerName: string;
  retailerSlug: string;
  priceKes: number | null; // null = "price on request"
  priceOnRequest: boolean;
  dimensions: { widthCm: number; depthCm: number; heightCm: number };
  materials: string[];
  images: string[]; // placeholder image ids
  availability: "in-stock" | "made-to-order" | "unavailable" | "unknown";
  delivery: boolean;
  assembly: boolean;
  customization: boolean;
  deliveryNotes?: string;
  priceLastChecked: string; // ISO date
  priceConfirmed: boolean;
  sponsored?: boolean; // paid placement flag
  sponsorLabel?: string; // "Sponsored" or "Featured Partner"
  createdAt: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  authorSlug: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  image: string;
  category: string; // article category slug
  relatedProductSlugs: string[];
  relatedRetailerSlugs: string[];
  disclosure: string; // commercial relationship disclosure, if any
  sponsored: boolean;
  sponsorLabel?: string;
};

export type Promotion = {
  id: string;
  type: "retailer" | "product";
  targetId: string;
  targetSlug: string;
  placement: "homepage-hero" | "search-top" | "category-banner";
  label: "Sponsored" | "Featured Partner";
  startDate: string;
  endDate: string;
  active: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  retailerId?: string;
  productId?: string;
  createdAt: string;
};

// ---------------------------------------------------------------------------
// Counties (sample set — not all 47; production should seed all 47)
// ---------------------------------------------------------------------------

export const COUNTIES: County[] = [
  {
    code: "01",
    name: "Nairobi",
    towns: [
      { slug: "nairobi", name: "Nairobi", areas: [
        { slug: "westlands", name: "Westlands" },
        { slug: "kilimani", name: "Kilimani" },
        { slug: "karen", name: "Karen" },
        { slug: "ngong-road", name: "Ngong Road" },
        { slug: "mombasa-road", name: "Mombasa Road" },
        { slug: "kijabe-street", name: "Kijabe Street" },
      ] },
      { slug: "thika-road", name: "Thika Road" },
    ],
  },
  {
    code: "01",
    name: "Mombasa",
    towns: [
      { slug: "mombasa", name: "Mombasa", areas: [
        { slug: "nyali", name: "Nyali" },
        { slug: "likoni", name: "Likoni" },
      ] },
    ],
  },
  {
    code: "01",
    name: "Kisumu",
    towns: [
      { slug: "kisumu", name: "Kisumu", areas: [
        { slug: "milimani", name: "Milimani" },
      ] },
    ],
  },
  {
    code: "01",
    name: "Nakuru",
    towns: [
      { slug: "nakuru", name: "Nakuru", areas: [
        { slug: "free-area", name: "Free Area" },
      ] },
    ],
  },
  {
    code: "01",
    name: "Eldoret",
    towns: [
      { slug: "eldoret", name: "Eldoret", areas: [
        { slug: "langas", name: "Langas" },
      ] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
  {
    slug: "sofas",
    name: "Sofas & Living",
    description: "Sofas, armchairs and living-room seating.",
    image: "placeholder:sofas",
    count: 0,
  },
  {
    slug: "beds",
    name: "Beds & Bedroom",
    description: "Beds, headboards, wardrobes and bedside furniture.",
    image: "placeholder:beds",
    count: 0,
  },
  {
    slug: "dining",
    name: "Dining",
    description: "Dining tables, chairs and sideboards.",
    image: "placeholder:dining",
    count: 0,
  },
  {
    slug: "storage",
    name: "Storage",
    description: "Cabinets, shelving, bookcases and chests.",
    image: "placeholder:storage",
    count: 0,
  },
  {
    slug: "lighting",
    name: "Lighting",
    description: "Lamps, pendants and ceiling lighting.",
    image: "placeholder:lighting",
    count: 0,
  },
  {
    slug: "decor",
    name: "Décor & Accessories",
    description: "Rugs, cushions, mirrors and decorative objects.",
    image: "placeholder:decor",
    count: 0,
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    description: "Patio, garden and balcony furniture.",
    image: "placeholder:outdoor",
    count: 0,
  },
  {
    slug: "home-office",
    name: "Home Office",
    description: "Desks, office chairs and workspace storage.",
    image: "placeholder:home-office",
    count: 0,
  },
];

// ---------------------------------------------------------------------------
// Demo retailers (fictional)
// ---------------------------------------------------------------------------

export const RETAILERS: Retailer[] = [
  {
    id: "ret-001",
    slug: "highland-home",
    name: "Highland Home Furnishings",
    shortDescription: "Timber living and dining furniture made in Kenya.",
    description:
      "Highland Home Furnishings crafts living-room and dining-room furniture from sustainably sourced Kenyan timber. A workshop-led showroom serving Nairobi and surrounding counties.",
    logo: "placeholder:logo-highland",
    cover: "placeholder:cover-highland",
    categories: ["sofas", "dining", "storage"],
    county: "Nairobi",
    town: "Nairobi",
    area: "Karen",
    serviceAreas: ["Nairobi", "Kiambu", "Kajiado"],
    phone: "+254700000001",
    whatsapp: "+254700000001",
    email: "info@example.demo",
    website: "https://example.demo/highland-home",
    instagram: "@highlandhome.demo",
    facebook: "Highland Home Furnishings",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: true,
    priceLastChecked: "2026-01-10",
    paymentMethods: ["M-Pesa", "Cash", "Bank transfer"],
    createdAt: "2025-06-01",
    updatedAt: "2026-01-10",
    sponsored: true,
    sponsorLabel: "Featured Partner",
  },
  {
    id: "ret-002",
    slug: "coast-living",
    name: "Coast Living",
    shortDescription: "Coastal-inspired outdoor and décor pieces.",
    description:
      "Coast Living brings relaxed, coastal-inspired outdoor and décor pieces to the Kenyan coast, with showroom pieces available for delivery across Mombasa County.",
    logo: "placeholder:logo-coast",
    cover: "placeholder:cover-coast",
    categories: ["outdoor", "decor", "storage"],
    county: "Mombasa",
    town: "Mombasa",
    area: "Nyali",
    serviceAreas: ["Mombasa", "Kilifi", "Kwale"],
    phone: "+254700000002",
    whatsapp: "+254700000002",
    email: "hello@example.demo",
    website: "https://example.demo/coast-living",
    instagram: "@coastliving.demo",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: false,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-02-03",
    paymentMethods: ["M-Pesa", "Cash"],
    createdAt: "2025-07-15",
    updatedAt: "2026-02-03",
    sponsored: false,
  },
  {
    id: "ret-003",
    slug: "nzoia-workshop",
    name: "Nzoia Timber Workshop",
    shortDescription: "Bespoke beds and wardrobes, made to order.",
    description:
      "A Kitale-based timber workshop making bespoke beds, wardrobes and storage to customer measurements. Delivery across the North Rift and western Kenya.",
    logo: "placeholder:logo-nzoia",
    cover: "placeholder:cover-nzoia",
    categories: ["beds", "storage"],
    county: "Trans Nzoia",
    town: "Kitale",
    serviceAreas: ["Trans Nzoia", "Uasin Gishu", "West Pokot"],
    phone: "+254700000003",
    whatsapp: "+254700000003",
    website: "https://example.demo/nzoia-timber",
    verified: false,
    showroom: false,
    onlineOnly: true,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: false,
    priceLastChecked: "2025-11-20",
    paymentMethods: ["M-Pesa", "Cash"],
    createdAt: "2025-08-01",
    updatedAt: "2025-11-20",
    sponsored: false,
  },
  {
    id: "ret-004",
    slug: "lake-view-furniture",
    name: "Lake View Furniture",
    shortDescription: "Dining and bedroom sets in Kisumu.",
    description:
      "Lake View Furniture supplies dining and bedroom sets to homes and small hospitality businesses around Kisumu and the lakeside region.",
    logo: "placeholder:logo-lakeview",
    cover: "placeholder:cover-lakeview",
    categories: ["dining", "beds", "storage"],
    county: "Kisumu",
    town: "Kisumu",
    area: "Milimani",
    serviceAreas: ["Kisumu", "Siaya", "Homa Bay"],
    phone: "+254700000004",
    whatsapp: "+254700000004",
    email: "sales@example.demo",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-01-22",
    paymentMethods: ["M-Pesa", "Cash", "Card"],
    createdAt: "2025-09-01",
    updatedAt: "2026-01-22",
    sponsored: true,
    sponsorLabel: "Sponsored",
  },
  {
    id: "ret-005",
    slug: "rift-valley-office",
    name: "Rift Valley Office",
    shortDescription: "Home-office and contract furniture in Nakuru.",
    description:
      "Office and home-workspace furniture — desks, ergonomic chairs and filing — for Nakuru businesses and remote workers.",
    logo: "placeholder:logo-rift",
    cover: "placeholder:cover-rift",
    categories: ["home-office", "storage"],
    county: "Nakuru",
    town: "Nakuru",
    area: "Free Area",
    serviceAreas: ["Nakuru", "Baringo", "Laikipia"],
    phone: "+254700000005",
    whatsapp: "+254700000005",
    website: "https://example.demo/rift-valley-office",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: false,
    delivery: true,
    assembly: true,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-02-10",
    paymentMethods: ["M-Pesa", "Bank transfer", "Cash"],
    createdAt: "2025-09-20",
    updatedAt: "2026-02-10",
    sponsored: false,
  },
  {
    id: "ret-006",
    slug: "westlands-decor",
    name: "Westlands Décor Studio",
    shortDescription: "Curated décor, lighting and accessories.",
    description:
      "Curated lighting, rugs and decorative accessories for Nairobi interiors, stocked in a Westlands studio with delivery across the city.",
    logo: "placeholder:logo-westlands",
    cover: "placeholder:cover-westlands",
    categories: ["decor", "lighting"],
    county: "Nairobi",
    town: "Nairobi",
    area: "Westlands",
    serviceAreas: ["Nairobi"],
    phone: "+254700000006",
    whatsapp: "+254700000006",
    instagram: "@westlandsdecor.demo",
    verified: false,
    showroom: true,
    onlineOnly: true,
    madeInKenya: false,
    delivery: true,
    assembly: false,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-02-01",
    paymentMethods: ["M-Pesa", "Card", "Cash"],
    createdAt: "2025-10-05",
    updatedAt: "2026-02-01",
    sponsored: false,
  },
];

// ---------------------------------------------------------------------------
// Demo products (fictional)
// ---------------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "mavuno-three-seater-sofa",
    name: "Mavuno Three-Seater Sofa",
    description:
      "A solid-wood frame three-seater sofa upholstered in durable fabric, designed for everyday family living.",
    category: "sofas",
    retailerId: "ret-001",
    retailerName: "Highland Home Furnishings",
    retailerSlug: "highland-home",
    priceKes: 85000,
    priceOnRequest: false,
    dimensions: { widthCm: 210, depthCm: 90, heightCm: 85 },
    materials: ["Mining timber frame", "Fabric upholstery", "Foam cushioning"],
    images: ["placeholder:prod-mavuno-sofa-1", "placeholder:prod-mavuno-sofa-2"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Delivered and assembled within Nairobi; KSh 2,500 delivery fee outside the city.",
    priceLastChecked: "2026-01-10",
    priceConfirmed: true,
    createdAt: "2025-12-01",
  },
  {
    id: "prod-002",
    slug: "jomo-dining-table",
    name: "Jomo Dining Table",
    description:
      "Rectangular solid timber dining table seating six, with a natural finish that shows the grain.",
    category: "dining",
    retailerId: "ret-001",
    retailerName: "Highland Home Furnishings",
    retailerSlug: "highland-home",
    priceKes: 42000,
    priceOnRequest: false,
    dimensions: { widthCm: 160, depthCm: 90, heightCm: 78 },
    materials: ["Mvule timber", "Natural oil finish"],
    images: ["placeholder:prod-jomo-table-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Made to order; lead time 2–3 weeks. Delivery within Nairobi included.",
    priceLastChecked: "2026-01-10",
    priceConfirmed: true,
    createdAt: "2025-12-01",
  },
  {
    id: "prod-003",
    slug: "nyati-bed",
    name: "Nyati King Bed",
    description:
      "King-size bed frame with integrated side rails, built for firm support and a clean silhouette.",
    category: "beds",
    retailerId: "ret-003",
    retailerName: "Nzoia Timber Workshop",
    retailerSlug: "nzoia-workshop",
    priceKes: null,
    priceOnRequest: true,
    dimensions: { widthCm: 200, depthCm: 200, heightCm: 110 },
    materials: ["Cypress timber", "Metal brackets"],
    images: ["placeholder:prod-nyati-bed-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Built to your dimensions. Delivery across the North Rift quoted per order.",
    priceLastChecked: "2025-11-20",
    priceConfirmed: false,
    createdAt: "2025-10-15",
  },
  {
    id: "prod-004",
    slug: "bahari-outdoor-lounge",
    name: "Bahari Outdoor Lounge Set",
    description:
      "Weather-resistant outdoor lounge set for patios and balconies, with washable cushions.",
    category: "outdoor",
    retailerId: "ret-002",
    retailerName: "Coast Living",
    retailerSlug: "coast-living",
    priceKes: 38000,
    priceOnRequest: false,
    dimensions: { widthCm: 140, depthCm: 85, heightCm: 80 },
    materials: ["Synthetic rattan", "Powder-coated aluminium", "Polyester cushions"],
    images: ["placeholder:prod-bahari-lounge-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery within Mombasa County. Assembly not included.",
    priceLastChecked: "2026-02-03",
    priceConfirmed: true,
    createdAt: "2026-01-10",
  },
  {
    id: "prod-005",
    slug: "maisha-desk",
    name: "Maisha Home Office Desk",
    description:
      "Compact home-office desk with cable management and a small drawer, suited to flats and bedsitters.",
    category: "home-office",
    retailerId: "ret-005",
    retailerName: "Rift Valley Office",
    retailerSlug: "rift-valley-office",
    priceKes: 14500,
    priceOnRequest: false,
    dimensions: { widthCm: 110, depthCm: 55, heightCm: 75 },
    materials: ["MDF", "Melamine finish", "Metal legs"],
    images: ["placeholder:prod-maisha-desk-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered flat-packed and assembled in Nakuru town.",
    priceLastChecked: "2026-02-10",
    priceConfirmed: true,
    createdAt: "2026-01-20",
  },
  {
    id: "prod-006",
    slug: "mkate-sideboard",
    name: "Mkate Sideboard",
    description:
      "Four-door sideboard with adjustable shelves, for dining rooms and living rooms.",
    category: "storage",
    retailerId: "ret-004",
    retailerName: "Lake View Furniture",
    retailerSlug: "lake-view-furniture",
    priceKes: 56000,
    priceOnRequest: false,
    dimensions: { widthCm: 180, depthCm: 45, heightCm: 90 },
    materials: ["Pine timber", "Lacquer finish"],
    images: ["placeholder:prod-mkate-sideboard-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered and assembled in Kisumu; delivery outside town quoted separately.",
    priceLastChecked: "2026-01-22",
    priceConfirmed: true,
    createdAt: "2025-11-05",
  },
  {
    id: "prod-007",
    slug: "uzuri-floor-lamp",
    name: "Uzuri Floor Lamp",
    description:
      "Tall floor lamp with a fabric shade and timber base, for living rooms and reading corners.",
    category: "lighting",
    retailerId: "ret-006",
    retailerName: "Westlands Décor Studio",
    retailerSlug: "westlands-decor",
    priceKes: 7200,
    priceOnRequest: false,
    dimensions: { widthCm: 40, depthCm: 40, heightCm: 155 },
    materials: ["Timber base", "Fabric shade", "Cable and fitting"],
    images: ["placeholder:prod-uzuri-lamp-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Nairobi delivery only. Bulb not included.",
    priceLastChecked: "2026-02-01",
    priceConfirmed: true,
    createdAt: "2026-01-15",
  },
  {
    id: "prod-008",
    slug: "kitawa-lounge-chair",
    name: "Kitawa Lounge Chair",
    description:
      "Armchair with a woven seat and solid timber frame, suited to verandas and reading nooks.",
    category: "sofas",
    retailerId: "ret-004",
    retailerName: "Lake View Furniture",
    retailerSlug: "lake-view-furniture",
    priceKes: 22500,
    priceOnRequest: false,
    dimensions: { widthCm: 80, depthCm: 85, heightCm: 95 },
    materials: ["Timber frame", "Natural fibre weave"],
    images: ["placeholder:prod-kitawa-chair-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: false,
    customization: true,
    deliveryNotes: "Made to order in Kisumu; delivery within Western Kenya quoted per order.",
    priceLastChecked: "2026-01-22",
    priceConfirmed: true,
    createdAt: "2025-12-10",
  },
];

// ---------------------------------------------------------------------------
// Demo articles (fictional editorial)
// ---------------------------------------------------------------------------

export const ARTICLES: Article[] = [
  {
    id: "art-001",
    slug: "best-sofa-shops-nairobi-2026",
    title: "Best sofa shops in Nairobi, 2026",
    excerpt:
      "Where to find living-room sofas in Nairobi, from workshop-made timber frames to ready-to-deliver upholstered pieces.",
    body: "Nairobi shoppers looking for a new sofa have options across the city, from workshop-made timber frames in Karen to ready-to-deliver upholstered pieces in Westlands. This guide walks through what to look for — frame timber, cushion density, and delivery lead times — and which retailers to contact for a quote.",
    author: "Nyumba Edit Editorial Team",
    authorSlug: "nyumba-edit-team",
    publishedAt: "2026-02-01",
    updatedAt: "2026-02-01",
    image: "placeholder:art-sofa-shops",
    category: "guides",
    relatedProductSlugs: ["mavuno-three-seater-sofa", "kitawa-lounge-chair"],
    relatedRetailerSlugs: ["highland-home", "lake-view-furniture"],
    disclosure: "This article contains editorial recommendations. One retailer mentioned is a Featured Partner of Nyumba Edit and is labelled as such.",
    sponsored: false,
  },
  {
    id: "art-002",
    slug: "furnishing-under-kes-50000",
    title: "Furnishing a one-bedroom apartment under KSh 50,000",
    excerpt:
      "A realistic starter kit for a one-bedroom apartment, with price-check dates and where to buy in Nairobi and Mombasa.",
    body: "Furnishing a one-bedroom apartment on a KSh 50,000 budget means prioritising a bed, a small dining or work surface, and storage. This guide puts together a realistic starter kit with prices last checked on the dates listed. Prices can change — always confirm with the retailer before buying.",
    author: "Nyumba Edit Editorial Team",
    authorSlug: "nyumba-edit-team",
    publishedAt: "2026-01-15",
    image: "placeholder:art-under-50k",
    category: "guides",
    relatedProductSlugs: ["maisha-desk", "uzuri-floor-lamp"],
    relatedRetailerSlugs: ["rift-valley-office", "westlands-decor"],
    disclosure: "Prices shown were last checked on the dates listed. Retailers may have changed prices; always confirm before buying.",
    sponsored: false,
  },
  {
    id: "art-003",
    slug: "coastal-outdoor-furniture-mombasa",
    title: "Choosing outdoor furniture for the Kenyan coast",
    excerpt:
      "Materials that withstand humidity and salt air, plus coastal retailers with delivery across Mombasa County.",
    body: "Coastal conditions — humidity, salt air and strong sun — demand outdoor furniture that won't corrode or fade quickly. Synthetic rattan, powder-coated aluminium and weather-treated timber are good starting points. Coast Living, based in Nyali, Mombasa, offers weather-resistant pieces with delivery across Mombasa County.",
    author: "Nyumba Edit Editorial Team",
    authorSlug: "nyumba-edit-team",
    publishedAt: "2026-01-20",
    image: "placeholder:art-coastal-outdoor",
    category: "guides",
    relatedProductSlugs: ["bahari-outdoor-lounge"],
    relatedRetailerSlugs: ["coast-living"],
    disclosure: "Coast Living is a Nyumba Edit Featured Partner and is labelled as such in this guide.",
    sponsored: false,
  },
];

// ---------------------------------------------------------------------------
// Demo promotions
// ---------------------------------------------------------------------------

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-001",
    type: "retailer",
    targetId: "ret-001",
    targetSlug: "highland-home",
    placement: "homepage-hero",
    label: "Featured Partner",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    active: true,
  },
  {
    id: "promo-002",
    type: "retailer",
    targetId: "ret-004",
    targetSlug: "lake-view-furniture",
    placement: "search-top",
    label: "Sponsored",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    active: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getRetailer(slug: string) {
  return RETAILERS.find((r) => r.slug === slug);
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getProductsByRetailer(retailerId: string) {
  return PRODUCTS.filter((p) => p.retailerId === retailerId);
}

export function formatKes(amount: number | null) {
  if (amount === null || amount === undefined) return "Price on request";
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function parseKenyanPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return `+254${digits}`;
}

export function whatsappLink(phone: string, text: string) {
  const normalized = parseKenyanPhone(phone);
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${normalized.replace("+", "")}?text=${encoded}`;
}
