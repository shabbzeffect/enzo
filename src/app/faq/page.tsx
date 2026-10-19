import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Nyumba Edit — how listings work, prices, contacting retailers, submitting your business and more.",
  openGraph: {
    title: "FAQ | Nyumba Edit",
    description: "Frequently asked questions about Nyumba Edit.",
    url: `${SITE.url}/faq`,
  },
};

const FAQS = [
  {
    q: "What is Nyumba Edit?",
    a: "Nyumba Edit is an editorial furniture-discovery and retailer directory for Kenya. We help shoppers find furniture and homeware retailers, browse editorial guides, compare products, and contact sellers directly via WhatsApp or phone.",
  },
  {
    q: "Is Nyumba Edit a marketplace?",
    a: "No. Nyumba Edit is not a marketplace and does not handle checkout or payment. We list retailers and products so you can contact the seller directly to arrange viewing, delivery and payment.",
  },
  {
    q: "Are the prices real?",
    a: "All prices shown are demo data for this staging site. In production, prices are collected from retailers and shown in Kenyan Shillings (KSh) with a 'last checked' date. Prices can change — always confirm with the retailer before buying.",
  },
  {
    q: "How do I contact a retailer?",
    a: "Every retailer and product page has a WhatsApp button and, where available, a phone number. Clicking WhatsApp opens a pre-filled message so you can ask about price, stock and delivery. Always confirm details directly with the seller.",
  },
  {
    q: "Can I save products for later?",
    a: "Yes. Tap the heart icon on any product to save it. Saved items are stored locally in your browser — no account needed. Visit the Saved page to view everything you have hearted.",
  },
  {
    q: "How does product comparison work?",
    a: "Add up to four products to the comparison tool using the Compare toggle on product cards. The comparison view shows price, availability, dimensions, materials, delivery, assembly and customisation side by side. Comparison data is stored locally in your browser.",
  },
  {
    q: "How do I list my furniture business?",
    a: "Click 'List your business' in the navigation and fill in the submission form. Submissions are reviewed by our editorial team before publication — not all listings are accepted. Listing is free for this demo.",
  },
  {
    q: "What are sponsored placements?",
    a: "Some retailers and products carry a 'Sponsored' or 'Featured Partner' label. These are paid placements, clearly marked. Sponsored placement never influences editorial collections, guides or reviews. See our editorial policy for details.",
  },
  {
    q: "How do collections and lookbooks work?",
    a: "Collections are editorial groupings of products by room, budget or style — for example 'Small living room' or 'First apartment'. They are curated by our team, not paid for. Every piece links to its retailer listing.",
  },
  {
    q: "What is the budget planner?",
    a: "The budget planner helps you estimate what it might cost to furnish a room — studio, one-bedroom, two-bedroom or home office. It shows essential items with minimum budgets and tips. All figures are demo estimates in KSh.",
  },
  {
    q: "Do you cover all of Kenya?",
    a: "We currently list retailers across 13 counties including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Kiambu, Machakos, Nyeri, Meru, Kakamega, Uasin Gishu, Kajiado and Trans Nzoia. Coverage grows as we add more retailers.",
  },
  {
    q: "How do I report incorrect information?",
    a: "Use the Contact page to flag incorrect prices, outdated listings or incorrect business details. We aim to review corrections promptly. All current data on this site is demo data.",
  },
  {
    q: "Is there an app?",
    a: "Not yet. Nyumba Edit is a website that works well on mobile browsers. You can add it to your home screen for quick access.",
  },
  {
    q: "How is my data handled?",
    a: "Nyumba Edit does not require an account for browsing, saving or comparing. Saved items and comparison data are stored in your browser's local storage and are not sent to our servers. See the Privacy page for full details.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="space-y-10">
      <JsonLd type="FAQPage" data={faqJsonLd} />
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Frequently asked questions</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          Everything you need to know about how Nyumba Edit works.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {FAQS.map((faq, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-border bg-white p-5 open:border-primary/40 transition-colors"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
              <h2 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                {faq.q}
              </h2>
              <svg
                className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-cream-50 p-6 md:p-8">
        <h2 className="font-heading text-lg font-bold mb-2">Still have questions?</h2>
        <p className="text-sm text-muted max-w-2xl">
          Get in touch and we will get back to you.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible-ring"
          >
            Contact us
          </Link>
          <Link
            href="/editorial-policy"
            className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-cream-100 transition-colors focus-visible-ring"
          >
            Editorial policy
          </Link>
        </div>
      </section>
    </div>
  );
}
