// src/lib/i18n.ts
//
// Internationalisation structure.
//
// English (en-KE) is the primary language. A Kiswahili (sw-KE) string table is
// defined below and ready to be populated with translations before launch.
// UI components should read strings through `t()` rather than hardcoding text.

export type Locale = "en-KE" | "sw-KE";
export const LOCALES: Locale[] = ["en-KE", "sw-KE"];
export const DEFAULT_LOCALE: Locale = "en-KE";

type StringTable = {
  common: {
    search: string;
    searchPlaceholder: string;
    filter: string;
    reset: string;
    apply: string;
    clearFilters: string;
    results: (n: number) => string;
    noResults: string;
    loading: string;
    error: string;
    tryAgain: string;
    priceOnRequest: string;
    ksh: (amount: number) => string;
    whatsapp: string;
    call: string;
    listYourBusiness: string;
    readMore: string;
  };
  nav: {
    home: string;
    discover: string;
    retailers: string;
    guides: string;
    about: string;
    listYourBusiness: string;
    advertise: string;
  };
  pages: {
    home: {
      headline: string;
      subhead: string;
      startSearching: string;
      browseRetailers: string;
      browseCategories: string;
      categoryViewAll: string;
      curatedGuides: string;
      guidesSubhead: string;
      allGuides: string;
      retailersToExplore: string;
      allRetailers: string;
    locationLabel: (town: string, county: string) => string;
    madeInKenya: string;
      listYourBusinessHeading: string;
      listYourBusinessBody: string;
      listButton: string;
      advertiseButton: string;
    };
  };
};

const en: StringTable = {
  common: {
    search: "Search",
    searchPlaceholder: "Search furniture, retailers or guides…",
    filter: "Filters",
    reset: "Reset",
    apply: "Apply",
    clearFilters: "Clear filters",
    results: (n: number) => `${n} result${n !== 1 ? "s" : ""}`,
    noResults: "No results found",
    loading: "Loading results…",
    error: "Unable to load results. Please try again.",
    tryAgain: "Try again",
    priceOnRequest: "Price on request",
    ksh: (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`,
    whatsapp: "WhatsApp",
    call: "Call",
    listYourBusiness: "List your business",
    readMore: "Read more",
  },
  nav: {
    home: "Home",
    discover: "Discover",
    retailers: "Retailers",
    guides: "Guides",
    about: "About",
    listYourBusiness: "List your business",
    advertise: "Advertise with us",
  },
  pages: {
    home: {
      headline: "Find furniture and home stores in Kenya.",
      subhead:
        "Discover retailers, browse products and shopping guides, and contact sellers directly. Prices shown in KSh — always confirm with the retailer before buying.",
      startSearching: "Start searching",
      browseRetailers: "Browse retailers",
      browseCategories: "Browse by category",
      categoryViewAll: "View all →",
      curatedGuides: "Curated guides",
      guidesSubhead: "Buying guides, room inspiration and maker stories.",
      allGuides: "All guides →",
      retailersToExplore: "Retailers to explore",
      allRetailers: "All retailers →",
      locationLabel: (town: string, county: string) => `${town}, ${county}`,
      madeInKenya: "Made in Kenya",
      listYourBusinessHeading: "Sell furniture? List your business.",
      listYourBusinessBody:
        "Reach shoppers across Kenya with a retailer profile. Submission does not guarantee publication — all listings are reviewed by our editorial team.",
      listButton: "List your business",
      advertiseButton: "Advertise with us",
    },
  },
};

// Placeholder Kiswahili table — populate with translations before launch.
// Until then, the app falls back to English for any missing sw-KE string.
const sw: StringTable = {
  ...en,
  common: {
    ...en.common,
    search: "Tafuta",
    searchPlaceholder: "Tafuta meza, duka au maelezo…",
    filter: "Vifurushi",
    reset: "Vinywashe",
    apply: "Apply",
  },
  nav: { ...en.nav, home: "Nyumbani", discover: "Tafuta", retailers: "Duka", guides: "Maelezo", about: "Kuhusu" },
  pages: { ...en.pages, home: { ...en.pages.home, headline: "Pata furniture na duka za nyumba Kenya." } },
};

export const strings: Record<Locale, StringTable> = {
  "en-KE": en,
  "sw-KE": sw,
};

export function t(locale: Locale, path: string, ...args: unknown[]): string {
  const table = strings[locale] ?? strings[DEFAULT_LOCALE];
  const keys = path.split(".");
  let value: unknown = table;
  for (const key of keys) {
    value = (value as Record<string, unknown>)?.[key];
    if (value === undefined) return path;
  }
  if (typeof value === "function") {
    return (value as (...args: unknown[]) => string)(...args);
  }
  return String(value);
}
