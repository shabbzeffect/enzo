"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/discover", label: "Discover" },
    { href: "/retailers", label: "Retailers" },
    { href: "/guides", label: "Guides" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur backdrop-blur-md" aria-label="Main navigation">
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold text-green-800"
            aria-label="Nyumba Edit — home"
          >
            <span className="rounded bg-green-800 px-2 py-0.5 text-white font-sans text-xs font-bold">
              NE
            </span>
            <span>Nyumba Edit</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-ink transition-colors",
                  pathname === link.href ? "text-green-800 underline underline-offset-4" : "text-muted hover:text-green-800",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring"
            >
              List your business
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-xl border border-border bg-white p-2 text-ink hover:bg-cream-100 focus-visible-ring"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="container flex items-center justify-between h-16 border-b border-border px-4">
            <h2 id="mobile-menu-title" className="sr-only">Main menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border border-border p-2 text-ink hover:bg-cream-100 focus-visible-ring"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-green-50 text-green-800"
                      : "text-muted hover:bg-cream-100 hover:text-green-800",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring block text-center"
            >
              List your business
            </Link>
            <div className="pt-4 text-sm text-muted">
              <p>Prices in KSh. Dimensions in cm.</p>
              <p>English • Kiswahili coming soon</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-green-900 text-green-100 mt-auto">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded bg-white px-2 py-0.5 text-green-900 font-sans text-xs font-bold">NE</span>
              <span className="font-heading text-lg font-bold text-white">Nyumba Edit</span>
            </div>
            <p className="text-green-200/80 text-sm leading-relaxed">
              Nyumba Edit is an editorial furniture-discovery and retailer
              directory for Kenya. We help shoppers find furniture and homeware
              retailers, browse guides, and contact sellers directly.
            </p>
            <p className="mt-3 text-xs text-green-300/70">
              Sample content shown is demo data only — not real businesses,
              prices, or locations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Browse</h3>
            <ul className="space-y-3 text-sm text-green-200/80">
              <li><Link href="/discover" className="hover:text-white transition-colors">Discover &amp; search</Link></li>
              <li><Link href="/retailers" className="hover:text-white transition-colors">Retailer directory</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Editorial guides</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">For retailers</h3>
            <ul className="space-y-3 text-sm text-green-200/80">
              <li><Link href="/submit" className="hover:text-white transition-colors">List your business</Link></li>
              <li><Link href="/advertise" className="hover:text-white transition-colors">Advertise &amp; sponsored placements</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-white transition-colors">Editorial policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal &amp; contact</h3>
            <ul className="space-y-3 text-sm text-green-200/80">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin (protected)</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-green-400/80">
          <p>Nyumba Edit — demo platform. Not a marketplace; no checkout.</p>
          <p>Kenyan shillings (KSh) • Centimetres (cm) • +254 phone format</p>
        </div>
      </div>
    </footer>
  );
}
