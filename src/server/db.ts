// src/server/db.ts
//
// Placeholder for the production Prisma client.
//
// The public UI runs on clearly-marked demo data (src/lib/data/demo.ts) and
// works without a database. Wire this file up to @prisma/client after running
// `prisma generate` against a real DATABASE_URL, then replace demo data fetches
// with repository functions that query through this client.
//
// Never import this file in client components. Secrets (DATABASE_URL) must never
// be exposed to the browser.

export type Db = {
  [key: string]: unknown;
};

export const db: Db = {};
export default db;
