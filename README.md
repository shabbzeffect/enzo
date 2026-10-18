# Nyumba Edit

Nyumba Edit is an editorial furniture-discovery and retailer directory for Kenya. It helps shoppers find furniture and homeware retailers, browse buying guides and room inspiration, and contact sellers directly — by phone or WhatsApp (+254 format). Prices are shown in Kenyan shillings (KSh); product dimensions in centimetres (cm).

This is an **editorial and discovery platform — not a marketplace**. There is no checkout and no payment processing in this build. Shoppers contact retailers directly to confirm price, stock, delivery and customisation.

## What is demo vs. production

**Everything you see is demo data.** All retailers, products, articles, prices, phone numbers, addresses and images in `src/lib/data/demo.ts` are fictional placeholder content used to demonstrate the experience. None are real Kenyan businesses, prices, or locations.

Before production you must:
1. Replace demo data with real, verified data (via the Prisma schema in `prisma/schema.prisma` and a PostgreSQL database).
2. Set `USE_DATABASE=true` and `DATABASE_URL` in `.env`.
3. Build database-backed repository functions and swap them into the data layer.
4. Review and approve draft legal copy (`/privacy`, `/terms`, `/editorial-policy`).
5. Label all paid placements "Sponsored" or "Featured Partner".
6. Do not enable M-Pesa or other payments without current official documentation and testing.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database approach:** Prisma ORM + PostgreSQL (schema in `prisma/schema.prisma`, seed in `prisma/seed.ts`)
- **Language:** English (en-KE) primary; `src/lib/i18n.ts` defines a Kiswahili (sw-KE) string table ready for translation
- **Data source (current):** `src/lib/data/demo.ts` — clearly marked demo data, no credentials required

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` if you want to connect a database. The site works out of the box using demo data without any database credentials.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Database (optional, for production backend)

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Seed demo data
npx prisma db seed
```

## Available scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project structure

```
nyumba-edit/
├── prisma/
│   ├── schema.prisma        # Data model (PostgreSQL via Prisma)
│   └── seed.ts              # Demo / fictional seed data
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage
│   │   ├── discover/        # Product & retailer search + filters
│   │   ├── retailers/       # Retailer directory + profile
│   │   ├── products/[slug]/ # Product detail
│   │   ├── guides/          # Editorial articles
│   │   ├── submit/          # Retailer submission form
│   │   ├── contact/, about/, editorial-policy/
│   │   └── layout.tsx       # Root layout (navbar + footer)
│   ├── components/
│   │   ├── ui/              # Card, Button, Badge, Price, WhatsApp/Call
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── lib/
│   │   ├── data/demo.ts     # Demo data (clearly marked fictional)
│   │   └── i18n.ts          # i18n string table (en-KE primary, sw-KE ready)
│   └── server/
│       └── db.ts            # Prisma client singleton (production data layer)
├── .env.example             # Environment variables (copy to .env)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Key design decisions

- **Mobile-first, lightweight:** placeholder image boxes, no heavy animation, lazy-loaded images, readable contrast, keyboard-accessible controls.
- **Kenyan market:** KSh pricing, centimetre dimensions, +254 phone normalisation, WhatsApp click-to-chat, county/town/area filtering (not Nairobi-only).
- **Transparency:** demo data is clearly labelled; sponsored placements are labelled "Sponsored" or "Featured Partner"; no fake reviews; no implied verification; no checkout.
- **Extensibility:** Prisma schema covers retailers, products, articles, promotions, enquiries, users/roles, geography, and future models (reviews, ads, payments) documented but not wired in the MVP.

## What needs configuration before production

| Item | Where | Notes |
|------|-------|-------|
| Real retailer/product/article data | `prisma/seed.ts` → database | Replace fictional demo records |
| Database credentials | `.env` `DATABASE_URL` | PostgreSQL (Neon/Supabase) |
| Image storage | `.env` Cloudinary/S3 | For real product photos |
| Auth (admin) | `.env` `NEXTAUTH_SECRET` | Protect `/admin` routes |
| Messaging | `.env` Africa's Talking / Twilio | SMS/WhatsApp notifications |
| Payments | `.env` M-Pesa Daraja | Future work; requires official docs + testing |
| Legal copy | `/privacy`, `/terms` | Draft copy — needs legal review |

## License

This is a demonstration build. Content shown is demo data only and is not representative of real businesses.
