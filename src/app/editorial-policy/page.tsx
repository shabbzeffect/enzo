export const metadata = {
  title: "Editorial Policy",
  description: "Nyumba Edit editorial policy — how we separate editorial recommendations from paid placement.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">Editorial policy</h1>
      <p className="text-muted leading-relaxed">
        This draft editorial policy describes how Nyumba Edit separates
        independent editorial coverage from paid placement. It must be reviewed
        and approved before launch.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">1. Editorial independence</h2>
      <p className="text-muted leading-relaxed">
        Our buying guides, room inspiration and retailer recommendations are
        produced by the editorial team. Retailers cannot pay to appear in
        editorial "best of" lists or to receive favourable coverage.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">2. Paid placement</h2>
      <p className="text-muted leading-relaxed">
        Paid opportunities — retailer listings, Featured Partner slots and
        sponsored content — are always labelled "Sponsored" or "Featured
        Partner". Labels appear next to the placement, not hidden in a
        footnote.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">3. Disclosure</h2>
      <p className="text-muted leading-relaxed">
        Articles that mention a Featured Partner or Sponsored retailer include
        a commercial disclosure near the relevant mention. We do not accept
        gifts, loans or free products in exchange for coverage.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">4. Accuracy</h2>
      <p className="text-muted leading-relaxed">
        Prices and availability are not guaranteed current. We show the date a
        price was last checked and encourage shoppers to confirm with the
        retailer. We do not publish reviews or ratings unless a real
        verification process exists.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">5. Corrections</h2>
      <p className="text-muted leading-relaxed">
        If you spot an error, contact us. Corrected articles show an updated
        date.
      </p>

      <p className="mt-8 text-xs text-muted">
        Draft copy — requires legal and editorial review before production.
      </p>
    </div>
  );
}
