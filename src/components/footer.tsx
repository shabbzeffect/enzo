"use strict";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded bg-green-800 px-2 py-0.5 text-white font-sans text-xs font-bold">NE</span>
              <span className="font-heading text-lg font-bold text-ink">Nyumba Edit</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Nyumba Edit is an editorial furniture-discovery and retailer
              directory for Kenya. We help shoppers find furniture and homeware
              retailers, browse guides, and contact sellers directly.
            </p>
            <p className="mt-3 text-xs text-muted">
              Sample content shown is demo data only — not real businesses,
              prices, or locations.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Browse</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/discover" className="hover:text-green-800 transition-colors">Discover &amp; search</Link></li>
              <li><Link href="/retailers" className="hover:text-green-800 transition-colors">Retailer directory</Link></li>
              <li><Link href="/guides" className="hover:text-green-800 transition-colors">Editorial guides</Link></li>
              <li><Link href="/about" className="hover:text-green-800 transition-colors">About us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">For retailers</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/submit" className="hover:text-green-800 transition-colors">List your business</Link></li>
              <li><Link href="/advertise" className="hover:text-green-800 transition-colors">Advertise &amp; sponsored placements</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-green-800 transition-colors">Editorial policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal &amp; contact</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/contact" className="hover:text-green-800 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-green-800 transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-green-800 transition-colors">Terms</Link></li>
              <li><Link href="/admin" className="hover:text-green-800 transition-colors">Admin (protected)</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>Nyumba Edit — demo platform. Not a marketplace; no checkout.</p>
          <p>Kenyan shillings (KSh) • Centimetres (cm) • +254 phone format</p>
        </div>
      </div>
    </footer>
  );
}
