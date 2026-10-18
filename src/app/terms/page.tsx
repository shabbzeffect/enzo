export const metadata = {
  title: "Terms — Nyumba Edit",
  description: "Nyumba Edit terms of service — use of the furniture discovery platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">Terms of service</h1>
      <p className="text-muted leading-relaxed">
        These draft terms govern your use of Nyumba Edit, an editorial
        furniture-discovery and retailer directory for Kenya. They must be
        reviewed and approved before launch.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">1. Not a marketplace</h2>
      <p className="text-muted leading-relaxed">
        Nyumba Edit is an editorial and discovery platform — not a marketplace.
        There is no checkout and we do not process payments. Shoppers contact
        retailers directly to confirm price, stock, delivery and customisation.
        All transactions are between you and the retailer.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">2. No guaranteed accuracy</h2>
      <p className="text-muted leading-relaxed">
        Prices, availability, retailer details and product information are not
        guaranteed to be current. We show the date a price was last checked
        where available and encourage you to confirm with the retailer before
        buying. We do not publish reviews or ratings unless a real verification
        process exists.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">3. Listing requests</h2>
      <p className="text-muted leading-relaxed">
        Submitting a retailer listing request does not guarantee publication or
        a verified badge. All listings are reviewed by our editorial team.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">4. Paid placement</h2>
      <p className="text-muted leading-relaxed">
        Sponsored placements and Featured Partner listings are paid for by the
        retailer and are always labelled. Paid placement is independent of our
        editorial recommendations.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">5. Your conduct</h2>
      <p className="text-muted leading-relaxed">
        You agree not to submit false information, impersonate a retailer, or
        misuse the enquiry or listing request forms. We reserve the right to
        reject or remove submissions that violate these terms.
      </p>

      <p className="mt-8 text-xs text-muted">
        Draft copy — requires legal review before production. This page does not
        constitute legal advice.
      </p>
    </div>
  );
}
