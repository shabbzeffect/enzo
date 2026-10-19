// src/server/demo-store.ts
//
// Process-local demo store, seeded from the fictional demo dataset in
// src/lib/data/demo.ts. Mutations from the demo admin live here until the
// server restarts (module state is cached on globalThis so it survives
// Next.js dev-server reloads on the same process).
//
// This is demonstration infrastructure only. Production must back the admin
// with the Prisma/PostgreSQL schema in prisma/schema.prisma.

import {
  ARTICLES,
  PRODUCTS,
  PROMOTIONS,
  REVIEWS,
  RETAILERS,
} from "@/lib/data/demo";
import { createStore, type InboxEnquiry, type StoreState } from "./store-core";

const GLOBAL_KEY = "__nyumba_demo_store__" as const;

type GlobalWithStore = typeof globalThis & { [GLOBAL_KEY]?: StoreState };

function seedEnquiries(): InboxEnquiry[] {
  const day = (offset: number) =>
    new Date(Date.now() - offset * 24 * 60 * 60 * 1000).toISOString();

  return [
    {
      id: "enq-demo-001",
      kind: "retailer",
      name: "Amina W.",
      phone: "+254711000111",
      email: "amina@example.demo",
      message:
        "Hi, do you have the three-seater sofa in stock in Kilimani this weekend? Also, is delivery to Thika included?",
      retailerSlug: RETAILERS[0]?.slug,
      retailerName: RETAILERS[0]?.name,
      status: "new",
      createdAt: day(1),
    },
    {
      id: "enq-demo-002",
      kind: "product",
      name: "Brian K.",
      phone: "+254722000222",
      message:
        "Could you confirm the current price of the oak dining table and whether assembly is available in Kisumu?",
      productSlug: PRODUCTS[0]?.slug,
      productName: PRODUCTS[0]?.name,
      retailerSlug: PRODUCTS[0]?.retailerSlug,
      retailerName: PRODUCTS[0]?.retailerName,
      status: "read",
      createdAt: day(3),
    },
    {
      id: "enq-demo-003",
      kind: "listing-request",
      name: "Lucy N.",
      phone: "+254733000333",
      email: "lucy@example.demo",
      subject: "List our Nakuru showroom",
      message:
        "We run a handmade rattan furniture workshop in Nakuru Free Area and would like to be listed on Nyumba Edit.",
      status: "resolved",
      createdAt: day(6),
    },
    {
      id: "enq-demo-004",
      kind: "contact",
      name: "David O.",
      phone: "+254700111222",
      email: "david@example.demo",
      subject: "Correction to a product price",
      message:
        "The price shown for one of the wardrobes looks out of date — happy to share the retailer's current quote.",
      status: "new",
      createdAt: day(2),
    },
  ];
}

function getStore(): StoreState {
  const g = globalThis as GlobalWithStore;
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = createStore({
      retailers: RETAILERS,
      products: PRODUCTS,
      articles: ARTICLES,
      reviews: REVIEWS,
      promotions: PROMOTIONS,
      enquiries: seedEnquiries(),
    });
  }
  return g[GLOBAL_KEY];
}

export { getStore };
export type { StoreState, InboxEnquiry } from "./store-core";
