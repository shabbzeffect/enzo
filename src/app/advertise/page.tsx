import Link from "next/link";

export const metadata = {
  title: "Advertise with Nyumba Edit",
  description: "Sponsored placements, Featured Partner listings and advertising on Nyumba Edit.",
};

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">Advertise with Nyumba Edit</h1>
      <p className="text-muted leading-relaxed">
        Nyumba Edit offers sponsored placements and Featured Partner listings for
        furniture retailers and homeware brands wanting to reach Kenyan shoppers.
        All paid placements are clearly labelled &ldquo;Sponsored&rdquo; or &ldquo;Featured Partner&rdquo;
        and are kept separate from our editorial recommendations.
      </p>

      <h2 className="font-heading text-xl font-bold mt-6">Placement options</h2>
      <ul className="text-muted leading-relaxed space-y-3 list-disc list-inside">
        <li>
          <strong>Homepage hero placement</strong> &mdash; featured retailer at the top
          of the homepage, labelled &ldquo;Featured Partner&rdquo;.
        </li>
        <li>
          <strong>Search-top placement</strong> &mdash; labelled &ldquo;Sponsored&rdquo; retailer or
          product at the top of search results.
        </li>
        <li>
          <strong>Category banner</strong> &mdash; labelled placement on category browse
          pages.
        </li>
        <li>
          <strong>Sponsored guide mention</strong> &mdash; labelled retailer mention
          within an editorial guide, with a commercial disclosure.
        </li>
      </ul>

      <h2 className="font-heading text-xl font-bold mt-6">Editorial separation</h2>
      <p className="text-muted leading-relaxed">
        Paid placement never influences our buying guides, room inspiration or
        retailer recommendations. Editorial coverage is independent, and any
        commercial relationship is disclosed next to the placement. See our{" "}
        <Link href="/editorial-policy">editorial policy</Link> for details.
      </p>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-heading text-xl font-bold">Get in touch</h3>
        <p className="text-muted text-sm">
          Interested in a sponsored placement? Contact our team to discuss rates
          and availability. Advertising enquiries are handled separately from
          free retailer listing requests.
        </p>
        <Link href="/contact" className="rounded-xl border border-border bg-white inline-block px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring">Contact us</Link>
        <p className="text-xs text-muted mt-4">
          This is a demonstration build. Advertising rates and placement terms
          shown are draft copy and are not live offers.
        </p>
      </div>
    </div>
  );
}
