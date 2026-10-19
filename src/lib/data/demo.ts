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

export type Review = {
  id: string;
  retailerId: string;
  retailerSlug: string;
  authorName: string;
  county: string;
  rating: number; // 1–5
  title: string;
  body: string;
  purchasedProduct?: string; // demo product name, if a purchase is referenced
  createdAt: string; // ISO date
  verifiedPurchase: boolean; // demo flag only — no real verification exists
  status: "published" | "pending";
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
};

export type ArticleCategory = {
  slug: string;
  name: string;
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
// Article categories
// ---------------------------------------------------------------------------

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { slug: "guides", name: "Buying guides" },
  { slug: "buying-advice", name: "Buying advice" },
  { slug: "care", name: "Care & maintenance" },
  { slug: "inspiration", name: "Room inspiration" },
];

// ---------------------------------------------------------------------------
// Demo authors (fictional)
// ---------------------------------------------------------------------------

export const AUTHORS: Author[] = [
  {
    slug: "nyumba-edit-team",
    name: "Nyumba Edit Editorial Team",
    role: "Editorial",
    bio: "The Nyumba Edit editorial team writes and reviews buying guides, price checks and retailer features.",
  },
  {
    slug: "wanjiku-mwangi",
    name: "Wanjiku Mwangi",
    role: "Interiors writer",
    bio: "Wanjiku writes about interiors, lighting and room planning, with a focus on Nairobi homes.",
  },
  {
    slug: "otieno-ochieng",
    name: "Otieno Ochieng",
    role: "Materials & craft writer",
    bio: "Otieno covers timber, materials, craftsmanship and the practical care of furniture in Kenyan conditions.",
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
  {
    id: "ret-007",
    slug: "savanna-seating",
    name: "Savanna Seating Co.",
    shortDescription: "Upholstered sofas and dining chairs in Kilimani.",
    description:
      "A Kilimani upholstery house producing sofas, armchairs and dining seating in locally sourced fabric and timber, with made-to-measure options for Nairobi apartments.",
    logo: "placeholder:logo-savanna",
    cover: "placeholder:cover-savanna",
    categories: ["sofas", "dining", "decor"],
    county: "Nairobi",
    town: "Nairobi",
    area: "Kilimani",
    serviceAreas: ["Nairobi", "Machakos", "Kajiado"],
    phone: "+254700000007",
    whatsapp: "+254700000007",
    email: "orders@example.demo",
    website: "https://example.demo/savanna-seating",
    instagram: "@savannaseating.demo",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: true,
    priceLastChecked: "2026-02-14",
    paymentMethods: ["M-Pesa", "Card", "Cash"],
    createdAt: "2025-10-20",
    updatedAt: "2026-02-14",
    sponsored: false,
  },
  {
    id: "ret-008",
    slug: "pamoja-craft",
    name: "Pamoja Craft Collective",
    shortDescription: "Handmade Kenyan décor, storage and lighting.",
    description:
      "An online collective of Kenyan makers selling hand-woven décor, carved storage and small-batch lighting. Every piece is made to order by workshops in Nairobi and Machakos.",
    logo: "placeholder:logo-pamoja",
    cover: "placeholder:cover-pamoja",
    categories: ["decor", "storage", "lighting"],
    county: "Nairobi",
    town: "Nairobi",
    area: "Kijabe Street",
    serviceAreas: ["Nairobi", "Machakos", "Kisumu"],
    phone: "+254700000008",
    whatsapp: "+254700000008",
    email: "studio@example.demo",
    website: "https://example.demo/pamoja-craft",
    instagram: "@pamojacraft.demo",
    tiktok: "pamojacraft.demo",
    verified: false,
    showroom: false,
    onlineOnly: true,
    madeInKenya: true,
    delivery: true,
    assembly: false,
    customization: true,
    priceConfirmed: true,
    priceLastChecked: "2026-01-30",
    paymentMethods: ["M-Pesa", "Bank transfer"],
    createdAt: "2025-11-12",
    updatedAt: "2026-01-30",
    sponsored: false,
  },
  {
    id: "ret-009",
    slug: "mombasa-modern",
    name: "Mombasa Modern Living",
    shortDescription: "Ready-to-deliver sofas, beds and office furniture.",
    description:
      "A Likoni showroom stocking ready-to-deliver sofas, wardrobes and office furniture for homes and businesses along the coast, with assembly included on delivery.",
    logo: "placeholder:logo-mombasamodern",
    cover: "placeholder:cover-mombasamodern",
    categories: ["sofas", "beds", "home-office"],
    county: "Mombasa",
    town: "Mombasa",
    area: "Likoni",
    serviceAreas: ["Mombasa", "Kwale", "Kilifi"],
    phone: "+254700000009",
    whatsapp: "+254700000009",
    email: "info@example.demo",
    website: "https://example.demo/mombasa-modern",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: false,
    delivery: true,
    assembly: true,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-02-08",
    paymentMethods: ["M-Pesa", "Cash", "Card"],
    createdAt: "2025-11-28",
    updatedAt: "2026-02-08",
    sponsored: false,
  },
  {
    id: "ret-010",
    slug: "eldoret-woodworks",
    name: "Eldoret Woodworks",
    shortDescription: "Made-to-order dining and bedroom timber furniture.",
    description:
      "A Langas workshop building dining tables, beds and wardrobes from local hardwood to customer measurements, serving Uasin Gishu and the wider North Rift.",
    logo: "placeholder:logo-eldoret",
    cover: "placeholder:cover-eldoret",
    categories: ["dining", "beds", "storage"],
    county: "Eldoret",
    town: "Eldoret",
    area: "Langas",
    serviceAreas: ["Uasin Gishu", "Nandi", "Elgeyo-Marakwet"],
    phone: "+254700000010",
    whatsapp: "+254700000010",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: false,
    priceLastChecked: "2025-10-30",
    paymentMethods: ["M-Pesa", "Cash"],
    createdAt: "2025-12-05",
    updatedAt: "2025-10-30",
    sponsored: false,
  },
  {
    id: "ret-011",
    slug: "nairobi-bed-co",
    name: "Nairobi Bed Co.",
    shortDescription: "Beds, mattresses and bedroom storage on Thika Road.",
    description:
      "Bed frames, mattresses and wardrobes with same-week delivery across Nairobi, plus assembly on arrival. Made-to-order headboards available in fabric and timber.",
    logo: "placeholder:logo-nairobibed",
    cover: "placeholder:cover-nairobibed",
    categories: ["beds", "storage"],
    county: "Nairobi",
    town: "Thika Road",
    serviceAreas: ["Nairobi", "Kiambu"],
    phone: "+254700000011",
    whatsapp: "+254700000011",
    email: "hello@example.demo",
    website: "https://example.demo/nairobi-bed-co",
    facebook: "Nairobi Bed Co",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: true,
    priceLastChecked: "2026-02-16",
    paymentMethods: ["M-Pesa", "Card", "Bank transfer"],
    createdAt: "2026-01-08",
    updatedAt: "2026-02-16",
    sponsored: true,
    sponsorLabel: "Sponsored",
  },
  {
    id: "ret-012",
    slug: "shimba-outdoor",
    name: "Shimba Outdoor Co.",
    shortDescription: "Weather-resistant patio and balcony furniture.",
    description:
      "Outdoor furniture built for coastal weather — powder-coated frames, synthetic weave and quick-dry cushions — with delivery across the Mombasa region.",
    logo: "placeholder:logo-shimba",
    cover: "placeholder:cover-shimba",
    categories: ["outdoor", "decor"],
    county: "Mombasa",
    town: "Mombasa",
    area: "Nyali",
    serviceAreas: ["Mombasa", "Kilifi", "Kwale"],
    phone: "+254700000012",
    whatsapp: "+254700000012",
    website: "https://example.demo/shimba-outdoor",
    instagram: "@shimbaoutdoor.demo",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: false,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-02-05",
    paymentMethods: ["M-Pesa", "Cash"],
    createdAt: "2025-12-18",
    updatedAt: "2026-02-05",
    sponsored: false,
  },
  {
    id: "ret-013",
    slug: "acacia-lighting",
    name: "Acacia Lighting Studio",
    shortDescription: "Pendants, lamps and lighting advice in Nakuru.",
    description:
      "An online-first lighting studio stocking pendants, floor and desk lamps, with fitting advice and delivery across Nakuru and the surrounding counties.",
    logo: "placeholder:logo-acacia",
    cover: "placeholder:cover-acacia",
    categories: ["lighting", "decor"],
    county: "Nakuru",
    town: "Nakuru",
    area: "Free Area",
    serviceAreas: ["Nakuru", "Naivasha", "Gilgil"],
    phone: "+254700000013",
    whatsapp: "+254700000013",
    email: "lighting@example.demo",
    instagram: "@acacialighting.demo",
    verified: false,
    showroom: false,
    onlineOnly: true,
    madeInKenya: true,
    delivery: true,
    assembly: false,
    customization: false,
    priceConfirmed: true,
    priceLastChecked: "2026-01-28",
    paymentMethods: ["M-Pesa", "Card"],
    createdAt: "2026-01-02",
    updatedAt: "2026-01-28",
    sponsored: false,
  },
  {
    id: "ret-014",
    slug: "kisumu-craft-house",
    name: "Kisumu Craft House",
    shortDescription: "Sofas, dining and décor made around the lake.",
    description:
      "A Kisumu workshop and showroom making sofas, dining sets and woven décor for lakeside homes and lodges, with custom sizing on request.",
    logo: "placeholder:logo-kisumucraft",
    cover: "placeholder:cover-kisumucraft",
    categories: ["sofas", "dining", "decor"],
    county: "Kisumu",
    town: "Kisumu",
    area: "Milimani",
    serviceAreas: ["Kisumu", "Siaya", "Busia"],
    phone: "+254700000014",
    whatsapp: "+254700000014",
    verified: false,
    showroom: true,
    onlineOnly: false,
    madeInKenya: true,
    delivery: true,
    assembly: true,
    customization: true,
    priceConfirmed: false,
    priceLastChecked: "2025-12-12",
    paymentMethods: ["M-Pesa", "Cash"],
    createdAt: "2026-01-12",
    updatedAt: "2025-12-12",
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
  {
    id: "prod-009",
    slug: "tamu-l-shaped-sofa",
    name: "Tamu L-Shaped Sofa",
    description:
      "Corner L-shaped sofa with removable, washable covers, sized for open-plan Nairobi living rooms.",
    category: "sofas",
    retailerId: "ret-007",
    retailerName: "Savanna Seating Co.",
    retailerSlug: "savanna-seating",
    priceKes: 128000,
    priceOnRequest: false,
    dimensions: { widthCm: 280, depthCm: 180, heightCm: 85 },
    materials: ["Kiln-dried timber frame", "Removable fabric covers", "High-density foam"],
    images: ["placeholder:prod-tamu-sofa-1", "placeholder:prod-tamu-sofa-2"],
    availability: "made-to-order",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Made to order in 3–4 weeks. Free delivery and assembly within Nairobi.",
    priceLastChecked: "2026-02-14",
    priceConfirmed: true,
    createdAt: "2026-01-05",
  },
  {
    id: "prod-010",
    slug: "pamoja-open-bookshelf",
    name: "Pamoja Open Bookshelf",
    description:
      "Hand-built open bookshelf with five shelves and a woven back panel, made to order by Nairobi craftspeople.",
    category: "storage",
    retailerId: "ret-008",
    retailerName: "Pamoja Craft Collective",
    retailerSlug: "pamoja-craft",
    priceKes: 34500,
    priceOnRequest: false,
    dimensions: { widthCm: 90, depthCm: 35, heightCm: 180 },
    materials: ["Reclaimed hardwood", "Hand-woven sisal panel", "Natural wax finish"],
    images: ["placeholder:prod-pamoja-shelf-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: false,
    customization: true,
    deliveryNotes: "Made to order in 2–3 weeks. Delivery quoted per destination.",
    priceLastChecked: "2026-01-30",
    priceConfirmed: true,
    createdAt: "2026-01-10",
  },
  {
    id: "prod-011",
    slug: "bahari-two-door-wardrobe",
    name: "Bahari Two-Door Wardrobe",
    description:
      "Two-door wardrobe with an internal hanging rail and drawer, finished for humid coastal conditions.",
    category: "beds",
    retailerId: "ret-009",
    retailerName: "Mombasa Modern Living",
    retailerSlug: "mombasa-modern",
    priceKes: 67000,
    priceOnRequest: false,
    dimensions: { widthCm: 180, depthCm: 60, heightCm: 210 },
    materials: ["Moisture-resistant board", "Soft-close hinges", "Metal rail"],
    images: ["placeholder:prod-bahari-wardrobe-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered and assembled within Mombasa County.",
    priceLastChecked: "2026-02-08",
    priceConfirmed: true,
    createdAt: "2026-01-18",
  },
  {
    id: "prod-012",
    slug: "eldoret-six-seat-dining-set",
    name: "Eldoret Six-Seat Dining Set",
    description:
      "Solid hardwood dining table with six matching chairs, built to order in the Langas workshop.",
    category: "dining",
    retailerId: "ret-010",
    retailerName: "Eldoret Woodworks",
    retailerSlug: "eldoret-woodworks",
    priceKes: 89000,
    priceOnRequest: false,
    dimensions: { widthCm: 180, depthCm: 90, heightCm: 76 },
    materials: ["Solid hardwood", "Hand-sanded oil finish"],
    images: ["placeholder:prod-eldoret-dining-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Lead time 3–4 weeks. Delivery across the North Rift quoted per order.",
    priceLastChecked: "2025-10-30",
    priceConfirmed: false,
    createdAt: "2025-12-20",
  },
  {
    id: "prod-013",
    slug: "tembo-bunk-bed",
    name: "Tembo Bunk Bed",
    description:
      "Sturdy pine bunk bed with a ladder and guard rail, sized for children's rooms and guest rooms.",
    category: "beds",
    retailerId: "ret-011",
    retailerName: "Nairobi Bed Co.",
    retailerSlug: "nairobi-bed-co",
    priceKes: 48500,
    priceOnRequest: false,
    dimensions: { widthCm: 200, depthCm: 100, heightCm: 160 },
    materials: ["Solid pine", "Guard rail", "Metal fixings"],
    images: ["placeholder:prod-tembo-bunk-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered and assembled within Nairobi, typically within a week.",
    priceLastChecked: "2026-02-16",
    priceConfirmed: true,
    createdAt: "2026-02-01",
  },
  {
    id: "prod-014",
    slug: "shimba-patio-table",
    name: "Shimba Patio Table",
    description:
      "Slatted outdoor dining table for four, in powder-coated aluminium that stands up to salt air.",
    category: "outdoor",
    retailerId: "ret-012",
    retailerName: "Shimba Outdoor Co.",
    retailerSlug: "shimba-outdoor",
    priceKes: 26000,
    priceOnRequest: false,
    dimensions: { widthCm: 120, depthCm: 80, heightCm: 75 },
    materials: ["Powder-coated aluminium", "Slatted top"],
    images: ["placeholder:prod-shimba-table-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery across the Mombasa region. Assembly not required.",
    priceLastChecked: "2026-02-05",
    priceConfirmed: true,
    createdAt: "2026-01-22",
  },
  {
    id: "prod-015",
    slug: "acacia-dome-pendant",
    name: "Acacia Dome Pendant",
    description:
      "Dome pendant light with a woven shade, suited to dining tables and kitchen islands.",
    category: "lighting",
    retailerId: "ret-013",
    retailerName: "Acacia Lighting Studio",
    retailerSlug: "acacia-lighting",
    priceKes: 5400,
    priceOnRequest: false,
    dimensions: { widthCm: 45, depthCm: 45, heightCm: 30 },
    materials: ["Woven shade", "Metal fitting", "2m braided cable"],
    images: ["placeholder:prod-acacia-pendant-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Bulb not included. Fitting advice available before purchase.",
    priceLastChecked: "2026-01-28",
    priceConfirmed: true,
    createdAt: "2026-01-15",
  },
  {
    id: "prod-016",
    slug: "kiboko-coffee-table",
    name: "Kiboko Coffee Table",
    description:
      "Low coffee table with a lower storage shelf, finished in a warm natural lacquer.",
    category: "sofas",
    retailerId: "ret-004",
    retailerName: "Lake View Furniture",
    retailerSlug: "lake-view-furniture",
    priceKes: 18500,
    priceOnRequest: false,
    dimensions: { widthCm: 110, depthCm: 60, heightCm: 45 },
    materials: ["Pine timber", "Natural lacquer"],
    images: ["placeholder:prod-kiboko-table-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered and assembled in Kisumu.",
    priceLastChecked: "2026-01-22",
    priceConfirmed: true,
    createdAt: "2025-12-15",
  },
  {
    id: "prod-017",
    slug: "hodari-office-chair",
    name: "Hodari Ergonomic Office Chair",
    description:
      "Adjustable office chair with lumbar support and breathable mesh back, for home and contract use.",
    category: "home-office",
    retailerId: "ret-005",
    retailerName: "Rift Valley Office",
    retailerSlug: "rift-valley-office",
    priceKes: 18500,
    priceOnRequest: false,
    dimensions: { widthCm: 65, depthCm: 65, heightCm: 110 },
    materials: ["Mesh back", "Foam seat", "Nylon base", "Gas lift"],
    images: ["placeholder:prod-hodari-chair-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered partly assembled. Delivery within Nakuru town included.",
    priceLastChecked: "2026-02-10",
    priceConfirmed: true,
    createdAt: "2026-01-25",
  },
  {
    id: "prod-018",
    slug: "rangi-woven-rug",
    name: "Rangi Woven Rug (2 × 3 m)",
    description:
      "Flat-woven wool blend rug in warm earth tones, suitable for living rooms and bedrooms.",
    category: "decor",
    retailerId: "ret-006",
    retailerName: "Westlands Décor Studio",
    retailerSlug: "westlands-decor",
    priceKes: 9800,
    priceOnRequest: false,
    dimensions: { widthCm: 300, depthCm: 200, heightCm: 1 },
    materials: ["Wool blend", "Cotton backing"],
    images: ["placeholder:prod-rangi-rug-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Nairobi delivery only. Rolled for transport.",
    priceLastChecked: "2026-02-01",
    priceConfirmed: true,
    createdAt: "2026-01-12",
  },
  {
    id: "prod-019",
    slug: "mbiriti-side-table",
    name: "Mbiriti Side Table",
    description:
      "Small round side table with a woven top, made for verandas and reading corners.",
    category: "decor",
    retailerId: "ret-002",
    retailerName: "Coast Living",
    retailerSlug: "coast-living",
    priceKes: 7500,
    priceOnRequest: false,
    dimensions: { widthCm: 45, depthCm: 45, heightCm: 55 },
    materials: ["Powder-coated frame", "Woven top"],
    images: ["placeholder:prod-mbiriti-table-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery within Mombasa County.",
    priceLastChecked: "2026-02-03",
    priceConfirmed: true,
    createdAt: "2026-01-08",
  },
  {
    id: "prod-020",
    slug: "mvua-storage-bench",
    name: "Mvua Storage Bench",
    description:
      "Entryway bench with lift-up storage for shoes and bags, sized for apartments.",
    category: "storage",
    retailerId: "ret-009",
    retailerName: "Mombasa Modern Living",
    retailerSlug: "mombasa-modern",
    priceKes: 21000,
    priceOnRequest: false,
    dimensions: { widthCm: 120, depthCm: 40, heightCm: 45 },
    materials: ["Moisture-resistant board", "Soft-close hinges", "Cushioned top"],
    images: ["placeholder:prod-mvua-bench-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered within Mombasa County.",
    priceLastChecked: "2026-02-08",
    priceConfirmed: true,
    createdAt: "2026-01-20",
  },
  {
    id: "prod-021",
    slug: "duka-display-cabinet",
    name: "Duka Display Cabinet",
    description:
      "Glass-front display cabinet with adjustable shelves, for dining rooms and living spaces.",
    category: "storage",
    retailerId: "ret-004",
    retailerName: "Lake View Furniture",
    retailerSlug: "lake-view-furniture",
    priceKes: 39500,
    priceOnRequest: false,
    dimensions: { widthCm: 90, depthCm: 40, heightCm: 180 },
    materials: ["Pine timber", "Tempered glass", "Lacquer finish"],
    images: ["placeholder:prod-duka-cabinet-1"],
    availability: "in-stock",
    delivery: true,
    assembly: true,
    customization: false,
    deliveryNotes: "Delivered and assembled in Kisumu.",
    priceLastChecked: "2026-01-22",
    priceConfirmed: true,
    createdAt: "2025-11-22",
  },
  {
    id: "prod-022",
    slug: "taa-desk-lamp",
    name: "Taa Desk Lamp",
    description:
      "Adjustable desk lamp with a warm LED bulb, suited to home-office workspaces.",
    category: "lighting",
    retailerId: "ret-013",
    retailerName: "Acacia Lighting Studio",
    retailerSlug: "acacia-lighting",
    priceKes: 3200,
    priceOnRequest: false,
    dimensions: { widthCm: 15, depthCm: 15, heightCm: 45 },
    materials: ["Powder-coated metal", "LED bulb included"],
    images: ["placeholder:prod-taa-lamp-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery across Nakuru County. Bulb included.",
    priceLastChecked: "2026-01-28",
    priceConfirmed: true,
    createdAt: "2026-01-28",
  },
  {
    id: "prod-023",
    slug: "zawadi-round-mirror",
    name: "Zawadi Round Mirror",
    description:
      "Round mirror with a hand-wrapped frame, made to order in woven fibre or timber.",
    category: "decor",
    retailerId: "ret-008",
    retailerName: "Pamoja Craft Collective",
    retailerSlug: "pamoja-craft",
    priceKes: 12500,
    priceOnRequest: false,
    dimensions: { widthCm: 80, depthCm: 4, heightCm: 80 },
    materials: ["Hand-wrapped frame", "Float glass"],
    images: ["placeholder:prod-zawadi-mirror-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: false,
    customization: true,
    deliveryNotes: "Made to order in 2 weeks. Delivery quoted per destination.",
    priceLastChecked: "2026-01-30",
    priceConfirmed: true,
    createdAt: "2026-02-02",
  },
  {
    id: "prod-024",
    slug: "serena-lounge-chair",
    name: "Serena Lounge Chair",
    description:
      "Deep lounge chair with a low profile and firm cushioning, for living rooms and studies.",
    category: "sofas",
    retailerId: "ret-007",
    retailerName: "Savanna Seating Co.",
    retailerSlug: "savanna-seating",
    priceKes: 31000,
    priceOnRequest: false,
    dimensions: { widthCm: 85, depthCm: 90, heightCm: 80 },
    materials: ["Timber frame", "Fabric upholstery", "Foam cushioning"],
    images: ["placeholder:prod-serena-chair-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: true,
    deliveryNotes: "Free delivery within Nairobi. Fabric choices available.",
    priceLastChecked: "2026-02-14",
    priceConfirmed: true,
    createdAt: "2026-01-30",
  },
  {
    id: "prod-025",
    slug: "ahadi-bar-stool-set",
    name: "Ahadi Bar Stool Set (4)",
    description:
      "Set of four counter-height bar stools with footrests, in solid timber with a clear finish.",
    category: "dining",
    retailerId: "ret-001",
    retailerName: "Highland Home Furnishings",
    retailerSlug: "highland-home",
    priceKes: 16500,
    priceOnRequest: false,
    dimensions: { widthCm: 40, depthCm: 40, heightCm: 75 },
    materials: ["Solid timber", "Clear lacquer"],
    images: ["placeholder:prod-ahadi-stools-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: true,
    deliveryNotes: "Delivery within Nairobi included.",
    priceLastChecked: "2026-01-10",
    priceConfirmed: true,
    createdAt: "2025-12-12",
  },
  {
    id: "prod-026",
    slug: "pwani-sun-lounger",
    name: "Pwani Sun Lounger",
    description:
      "Adjustable sun lounger with quick-dry cushion, built for pool sides and balconies.",
    category: "outdoor",
    retailerId: "ret-012",
    retailerName: "Shimba Outdoor Co.",
    retailerSlug: "shimba-outdoor",
    priceKes: 19500,
    priceOnRequest: false,
    dimensions: { widthCm: 190, depthCm: 70, heightCm: 35 },
    materials: ["Powder-coated aluminium", "Quick-dry foam", "Texteline fabric"],
    images: ["placeholder:prod-pwani-lounger-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery across the Mombasa region.",
    priceLastChecked: "2026-02-05",
    priceConfirmed: true,
    createdAt: "2026-02-06",
  },
  {
    id: "prod-027",
    slug: "tumaini-dining-set",
    name: "Tumaini Six-Seat Dining Set",
    description:
      "Dining table with six chairs in stained hardwood, made in the Kisumu workshop.",
    category: "dining",
    retailerId: "ret-014",
    retailerName: "Kisumu Craft House",
    retailerSlug: "kisumu-craft-house",
    priceKes: 72000,
    priceOnRequest: false,
    dimensions: { widthCm: 160, depthCm: 90, heightCm: 76 },
    materials: ["Stained hardwood", "Woven seat pads"],
    images: ["placeholder:prod-tumaini-dining-1"],
    availability: "made-to-order",
    delivery: true,
    assembly: true,
    customization: true,
    deliveryNotes: "Lead time 3 weeks. Delivery across Western Kenya quoted per order.",
    priceLastChecked: "2025-12-12",
    priceConfirmed: false,
    createdAt: "2026-01-16",
  },
  {
    id: "prod-028",
    slug: "pwani-balcony-set",
    name: "Pwani Balcony Set",
    description:
      "Compact two-seat balcony set with a small table, in weather-resistant woven weave.",
    category: "outdoor",
    retailerId: "ret-002",
    retailerName: "Coast Living",
    retailerSlug: "coast-living",
    priceKes: 33500,
    priceOnRequest: false,
    dimensions: { widthCm: 120, depthCm: 60, heightCm: 70 },
    materials: ["Synthetic rattan", "Powder-coated aluminium", "Quick-dry cushions"],
    images: ["placeholder:prod-pwani-balcony-1"],
    availability: "in-stock",
    delivery: true,
    assembly: false,
    customization: false,
    deliveryNotes: "Delivery within Mombasa County.",
    priceLastChecked: "2026-02-03",
    priceConfirmed: true,
    createdAt: "2026-02-07",
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
  {
    id: "art-004",
    slug: "solid-wood-vs-mdf",
    title: "Solid wood vs MDF: which should you buy?",
    excerpt:
      "How the two most common furniture materials differ on price, durability, weight and repair — with Kenyan examples.",
    body: "Solid wood and MDF (medium-density fibreboard) cover most of the furniture sold in Kenya, and the right choice depends on use, budget and where the piece will live. Solid wood can be sanded and repaired repeatedly, moves slightly with humidity, and costs more. MDF is stable, takes paint well, is lighter on budget, and does not tolerate long-term moisture. For coastal homes and outdoor exposure, the material choice matters more than the finish. Ask a retailer what the frame and the visible panels are each made from — many pieces mix both.",
    author: "Otieno Ochieng",
    authorSlug: "otieno-ochieng",
    publishedAt: "2026-02-12",
    image: "placeholder:art-solid-wood-mdf",
    category: "buying-advice",
    relatedProductSlugs: ["jomo-dining-table", "eldoret-six-seat-dining-set", "mkate-sideboard"],
    relatedRetailerSlugs: ["highland-home", "eldoret-woodworks"],
    disclosure: "This guide is editorial. Retailers named were not paid for inclusion.",
    sponsored: false,
  },
  {
    id: "art-005",
    slug: "bedroom-furniture-buying-guide",
    title: "A buying guide to beds and bedroom storage",
    excerpt:
      "Bed sizes, mattress clearance, wardrobe depth and the measurements to check before ordering a bedroom set.",
    body: "Before buying a bed, measure the room, not just the wall: leave at least 60 cm on each side for walking, and check that wardrobes clear door swings and curtain rails. Standard Kenyan king frames are around 200 × 200 cm, but made-to-order workshops will build to your mattress. Wardrobe interiors need roughly 55–60 cm of depth for hanging clothes, and shelves deeper than 40 cm become hard to reach. Order storage with adjustable shelves where possible, and confirm delivery access — stairwells and lifts limit what can be assembled on site.",
    author: "Wanjiku Mwangi",
    authorSlug: "wanjiku-mwangi",
    publishedAt: "2026-02-06",
    image: "placeholder:art-bedroom-guide",
    category: "guides",
    relatedProductSlugs: ["nyati-bed", "tembo-bunk-bed", "bahari-two-door-wardrobe"],
    relatedRetailerSlugs: ["nzoia-workshop", "nairobi-bed-co", "mombasa-modern"],
    disclosure: "Editorial guide. Prices mentioned were last checked on the dates listed with each product.",
    sponsored: false,
  },
  {
    id: "art-006",
    slug: "lighting-your-living-room",
    title: "Lighting your living room: a practical guide",
    excerpt:
      "Layer ambient, task and accent lighting so a Nairobi living room works through the day and evening.",
    body: "A living room lit by a single ceiling bulb is the most common mistake we see. Layer three sources: ambient light for the room as a whole, task light for reading and work, and accent light for shelves or artwork. A pendant over the coffee table, a floor lamp beside the sofa and a small desk lamp on a shelf gives most rooms a workable setup for under KSh 20,000. Check the fitting type before ordering — ceiling roses and bulb types differ — and ask whether bulbs are included, as many lamps ship without them.",
    author: "Wanjiku Mwangi",
    authorSlug: "wanjiku-mwangi",
    publishedAt: "2026-01-28",
    image: "placeholder:art-living-room-lighting",
    category: "guides",
    relatedProductSlugs: ["uzuri-floor-lamp", "acacia-dome-pendant", "taa-desk-lamp"],
    relatedRetailerSlugs: ["westlands-decor", "acacia-lighting"],
    disclosure: "This guide is editorial and contains no paid placement.",
    sponsored: false,
  },
  {
    id: "art-007",
    slug: "furniture-delivery-in-kenya",
    title: "What to know about furniture delivery in Kenya",
    excerpt:
      "Delivery fees, assembly, access and payment expectations when buying furniture across Kenyan counties.",
    body: "Delivery is where most furniture purchases go wrong. Confirm four things in writing before paying: the fee (and whether it is included), who assembles the piece, the lead time, and what happens if the item does not fit through the door or stairwell. Within Nairobi, many retailers deliver free or for a flat fee; outside the city, fees are usually quoted per distance and load. Most retailers accept M-Pesa, some add card or bank transfer, and made-to-order pieces often require a deposit. Photograph the space and doorway dimensions before ordering large pieces.",
    author: "Otieno Ochieng",
    authorSlug: "otieno-ochieng",
    publishedAt: "2026-01-24",
    image: "placeholder:art-delivery-kenya",
    category: "buying-advice",
    relatedProductSlugs: ["mavuno-three-seater-sofa", "tembo-bunk-bed", "shimba-patio-table"],
    relatedRetailerSlugs: ["highland-home", "nairobi-bed-co", "shimba-outdoor"],
    disclosure: "Editorial guide. Delivery terms vary by retailer — always confirm directly before ordering.",
    sponsored: false,
  },
  {
    id: "art-008",
    slug: "caring-for-outdoor-furniture",
    title: "Caring for outdoor furniture in Kenyan weather",
    excerpt:
      "Rinse-down routines, cushion storage and rust checks that keep patio furniture usable for years.",
    body: "Coastal humidity, highland rain and strong sun all shorten the life of outdoor furniture. Rinse frames fortnightly with fresh water to remove salt and dust, dry cushions after rain rather than leaving them stacked, and store cushions indoors during long wet spells. Check bolt fixings each season and touch up scratches on powder-coated frames with matching paint before rust sets in. Synthetic weave and aluminium need the least care; timber needs oiling once or twice a year depending on exposure.",
    author: "Otieno Ochieng",
    authorSlug: "otieno-ochieng",
    publishedAt: "2026-01-10",
    image: "placeholder:art-outdoor-care",
    category: "care",
    relatedProductSlugs: ["bahari-outdoor-lounge", "shimba-patio-table", "pwani-sun-lounger"],
    relatedRetailerSlugs: ["coast-living", "shimba-outdoor"],
    disclosure: "Editorial guide. Shimba Outdoor Co. is a Nyumba Edit retailer and is named with a link to its listing; it did not review or pay for this article.",
    sponsored: false,
  },
];

// ---------------------------------------------------------------------------
// Demo reviews (fictional — no real customers, purchases or verifications)
// ---------------------------------------------------------------------------

export const REVIEWS: Review[] = [
  {
    id: "rev-001",
    retailerId: "ret-001",
    retailerSlug: "highland-home",
    authorName: "Amina W.",
    county: "Nairobi",
    rating: 5,
    title: "Solid sofa, careful delivery",
    body: "The sofa arrived on the promised day and the team assembled it in the living room without any fuss. Fabric matches the sample we saw in the showroom. It has been three months and the cushions have held their shape.",
    purchasedProduct: "Mavuno Three-Seater Sofa",
    createdAt: "2026-01-18",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-002",
    retailerId: "ret-001",
    retailerSlug: "highland-home",
    authorName: "Peter K.",
    county: "Kiambu",
    rating: 4,
    title: "Good table, longer lead time",
    body: "The dining table is well finished and the grain looks great. It took a week longer than quoted, but they called ahead to explain. Delivery to Ruaka was included in the price.",
    purchasedProduct: "Jomo Dining Table",
    createdAt: "2025-12-28",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-003",
    retailerId: "ret-002",
    retailerSlug: "coast-living",
    authorName: "Halima S.",
    county: "Mombasa",
    rating: 5,
    title: "Holds up well in coastal weather",
    body: "We have had the lounge set on the balcony since January and the frame still looks new after the rains. Cushions dry quickly, which was the main thing we wanted.",
    purchasedProduct: "Bahari Outdoor Lounge Set",
    createdAt: "2026-02-11",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-004",
    retailerId: "ret-002",
    retailerSlug: "coast-living",
    authorName: "Brian O.",
    county: "Kilifi",
    rating: 4,
    title: "Small table, honest pricing",
    body: "Side table was exactly as described and the WhatsApp responses were quick. Delivery to Bamburi took two days longer than expected.",
    purchasedProduct: "Mbiriti Side Table",
    createdAt: "2026-01-25",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-005",
    retailerId: "ret-003",
    retailerSlug: "nzoia-workshop",
    authorName: "Joseph M.",
    county: "Trans Nzoia",
    rating: 5,
    title: "Built to our measurements",
    body: "They built the bed to our mattress size and the finish is clean. Price was quoted before work started and did not change. Delivery to Kitale town was on schedule.",
    purchasedProduct: "Nyati King Bed",
    createdAt: "2026-01-05",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-006",
    retailerId: "ret-004",
    retailerSlug: "lake-view-furniture",
    authorName: "Grace A.",
    county: "Kisumu",
    rating: 4,
    title: "Neat sideboard, good shelves",
    body: "Shelves are adjustable, which we needed for crockery. Assembly was done on arrival. The lacquer finish scratches more easily than we expected.",
    purchasedProduct: "Mkate Sideboard",
    createdAt: "2025-12-10",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-007",
    retailerId: "ret-004",
    retailerSlug: "lake-view-furniture",
    authorName: "Dennis O.",
    county: "Kisumu",
    rating: 5,
    title: "Comfortable chair for the veranda",
    body: "The weave is tight and the frame is solid. Made to order took about two weeks, as quoted. Reasonable for the quality.",
    purchasedProduct: "Kitawa Lounge Chair",
    createdAt: "2026-01-30",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-008",
    retailerId: "ret-005",
    retailerSlug: "rift-valley-office",
    authorName: "Mercy N.",
    county: "Nakuru",
    rating: 5,
    title: "Chair solved my back pain",
    body: "I work from home four days a week and the lumbar support made a difference within a few days. They delivered and assembled the same week I ordered.",
    purchasedProduct: "Hodari Ergonomic Office Chair",
    createdAt: "2026-02-14",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-009",
    retailerId: "ret-005",
    retailerSlug: "rift-valley-office",
    authorName: "Samuel K.",
    county: "Nakuru",
    rating: 3,
    title: "Desk is fine, packaging rough",
    body: "The desk itself is good value and fits a small room. One corner arrived dented but they replaced the panel within three days after I sent photos.",
    purchasedProduct: "Maisha Home Office Desk",
    createdAt: "2025-12-19",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-010",
    retailerId: "ret-006",
    retailerSlug: "westlands-decor",
    authorName: "Lydia M.",
    county: "Nairobi",
    rating: 4,
    title: "Lamp looks better in person",
    body: "Warm light, sturdy base, and it was delivered to Parklands the next day. Bulb was not included, which was mentioned at purchase.",
    purchasedProduct: "Uzuri Floor Lamp",
    createdAt: "2026-01-22",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-011",
    retailerId: "ret-007",
    retailerSlug: "savanna-seating",
    authorName: "Faith W.",
    county: "Nairobi",
    rating: 5,
    title: "Fabrics to choose from",
    body: "We picked the fabric in the showroom and the L-shaped sofa was delivered in under a month. It fills the room well and the covers are washable as promised.",
    purchasedProduct: "Tamu L-Shaped Sofa",
    createdAt: "2026-02-15",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-012",
    retailerId: "ret-007",
    retailerSlug: "savanna-seating",
    authorName: "Kevin M.",
    county: "Machakos",
    rating: 4,
    title: "Comfortable, straightforward process",
    body: "Chair is firm and well stitched. Delivery to Athi River was quoted clearly upfront. Only note: assembly took a while on arrival.",
    purchasedProduct: "Serena Lounge Chair",
    createdAt: "2026-02-03",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-013",
    retailerId: "ret-008",
    retailerSlug: "pamoja-craft",
    authorName: "Njeri G.",
    county: "Nairobi",
    rating: 5,
    title: "Beautiful handmade finish",
    body: "The bookshelf has real character and the sisal panel is neatly done. Two weeks from order to delivery, and they sent progress photos.",
    purchasedProduct: "Pamoja Open Bookshelf",
    createdAt: "2026-01-29",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-014",
    retailerId: "ret-009",
    retailerSlug: "mombasa-modern",
    authorName: "Ali M.",
    county: "Mombasa",
    rating: 4,
    title: "Wardrobe assembled quickly",
    body: "Delivered to Likoni and assembled the same afternoon. Doors align well. No complaints about the price either.",
    purchasedProduct: "Bahari Two-Door Wardrobe",
    createdAt: "2026-02-09",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-015",
    retailerId: "ret-011",
    retailerSlug: "nairobi-bed-co",
    authorName: "Sarah L.",
    county: "Nairobi",
    rating: 5,
    title: "Fast delivery, sturdy bunk",
    body: "Ordered on Monday, delivered and assembled on Thursday. The kids love it and the guard rail feels secure.",
    purchasedProduct: "Tembo Bunk Bed",
    createdAt: "2026-02-17",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-016",
    retailerId: "ret-012",
    retailerSlug: "shimba-outdoor",
    authorName: "Joyce K.",
    county: "Mombasa",
    rating: 4,
    title: "Table suits the balcony",
    body: "Light enough to move, heavy enough not to rattle in wind. No rust so far after a month of sea air.",
    purchasedProduct: "Shimba Patio Table",
    createdAt: "2026-02-12",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-017",
    retailerId: "ret-013",
    retailerSlug: "acacia-lighting",
    authorName: "Tom W.",
    county: "Nakuru",
    rating: 5,
    title: "Helpful fitting advice",
    body: "They checked my ceiling fitting type before I ordered, which saved a return. Pendant arrived well packed.",
    purchasedProduct: "Acacia Dome Pendant",
    createdAt: "2026-02-05",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-018",
    retailerId: "ret-014",
    retailerSlug: "kisumu-craft-house",
    authorName: "Esther A.",
    county: "Siaya",
    rating: 5,
    title: "Dining set built well",
    body: "Chairs have woven pads and the table is heavy in a good way. Took the full three weeks but quality justifies it.",
    purchasedProduct: "Tumaini Six-Seat Dining Set",
    createdAt: "2026-02-08",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-019",
    retailerId: "ret-014",
    retailerSlug: "kisumu-craft-house",
    authorName: "Collins A.",
    county: "Kisumu",
    rating: 3,
    title: "Good piece, slow responses",
    body: "The coffee table is nicely made but replies on WhatsApp took a day or two each time. End product was worth the wait.",
    purchasedProduct: "Kiboko Coffee Table",
    createdAt: "2026-01-14",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-020",
    retailerId: "ret-010",
    retailerSlug: "eldoret-woodworks",
    authorName: "Jane C.",
    county: "Uasin Gishu",
    rating: 4,
    title: "Table worth the wait",
    body: "Solid hardwood and finished nicely. Lead time was quoted as two to three weeks and took three, which was fine.",
    purchasedProduct: "Eldoret Six-Seat Dining Set",
    createdAt: "2026-01-21",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-021",
    retailerId: "ret-004",
    retailerSlug: "lake-view-furniture",
    authorName: "Beatrice O.",
    county: "Kisumu",
    rating: 5,
    title: "Coffee table fits the room",
    body: "Lower shelf is useful for magazines and the finish matches our existing furniture. Delivered and assembled the same day.",
    purchasedProduct: "Kiboko Coffee Table",
    createdAt: "2026-02-13",
    verifiedPurchase: true,
    status: "published",
  },
  {
    id: "rev-022",
    retailerId: "ret-006",
    retailerSlug: "westlands-decor",
    authorName: "Rachel M.",
    county: "Nairobi",
    rating: 5,
    title: "Rug quality surprised me",
    body: "Thicker than expected for the price and the colours are warm without being loud. Rolled and delivered neatly.",
    purchasedProduct: "Rangi Woven Rug (2 × 3 m)",
    createdAt: "2026-02-16",
    verifiedPurchase: true,
    status: "published",
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
  {
    id: "promo-003",
    type: "retailer",
    targetId: "ret-011",
    targetSlug: "nairobi-bed-co",
    placement: "category-banner",
    label: "Sponsored",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    active: true,
  },
  {
    id: "promo-004",
    type: "retailer",
    targetId: "ret-008",
    targetSlug: "pamoja-craft",
    placement: "category-banner",
    label: "Featured Partner",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
    active: false,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Populate live category counts from the product catalogue at module load.
for (const category of CATEGORIES) {
  category.count = PRODUCTS.filter((p) => p.category === category.slug).length;
}

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

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getRetailersByCategory(slug: string) {
  return RETAILERS.filter((r) => r.categories.includes(slug));
}

export function getRetailersByCounty(county: string) {
  return RETAILERS.filter((r) => r.county === county);
}

export function getArticlesByCategory(slug: string) {
  return ARTICLES.filter((a) => a.category === slug);
}

export function getAuthor(slug: string) {
  return AUTHORS.find((a) => a.slug === slug);
}

export function articleCategoryName(slug: string) {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getReviewsByRetailer(retailerId: string) {
  return REVIEWS.filter((r) => r.retailerId === retailerId && r.status === "published");
}

export function getReviewsForProduct(productName: string) {
  return REVIEWS.filter((r) => r.purchasedProduct === productName && r.status === "published");
}

export function averageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

export function ratingBreakdown(reviews: Review[]) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  for (const review of reviews) {
    if (counts[review.rating] !== undefined) counts[review.rating] += 1;
  }
  return counts;
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
