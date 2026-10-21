import Link from "next/link";

export const metadata = {
  title: "About Nyumba Edit",
  description: "About Nyumba Edit — an editorial furniture-discovery and retailer directory for Kenya.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">About Nyumba Edit</h1>
      <p className="text-muted leading-relaxed">
        Nyumba Edit is an editorial furniture-discovery and retailer directory
        for Kenya. We help shoppers find furniture and homeware retailers,
        browse buying guides and room inspiration, and contact sellers directly.
      </p>
      <p className="text-muted leading-relaxed">
        We are not a marketplace. There is no checkout and we do not process
        payments. Shoppers contact retailers directly — by phone, WhatsApp or
        through a retailer&apos;s own channels — to confirm price, stock, delivery
        and customisation.
      </p>
      <h2 className="font-heading text-xl font-bold mt-6">Our approach</h2>
      <ul className="text-muted leading-relaxed space-y-3 list-disc list-inside">
        <li>Prices are shown in Kenyan shillings (KSh); dimensions in centimetres (cm).</li>
        <li>Phone numbers are shown in +254 format, with WhatsApp and call buttons where a retailer supplies a number.</li>
        <li>Retailers can be based in any Kenyan county — not just Nairobi.</li>
        <li>Paid placements are clearly labelled &ldquo;Sponsored&rdquo; or &ldquo;Featured Partner&rdquo; and are kept separate from editorial recommendations.</li>
        <li>We do not invent reviews, prices, addresses or endorsements. Sample content is clearly marked as demo data.</li>
      </ul>
      <Link href="/contact" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring inline-block">Contact us</Link>
      <p className="mt-6 text-xs text-muted">This site is a demonstration build. Content shown is demo data only and is not representative of real businesses.</p>
    </div>
  );
}
