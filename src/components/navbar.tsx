"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DarkModeToggle } from "@/components/ui/theme";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/newsletter-signup";

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
      <nav className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur backdrop-blur-md" aria-label="Main navigation">
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold text-primary"
            aria-label="Nyumba Edit — home"
          >
            <span className="rounded bg-primary px-2 py-0.5 text-white font-sans text-xs font-bold">
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
                  "text-transition-colors",
                  pathname === link.href ? "text-primary underline underline-offset-4" : "text-muted hover:text-primary",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring"
            >
              List your business
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden rounded-xl border border-border bg-white p-2 text-foreground hover:bg-cream-100 focus-visible-ring"
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
          className="fixed inset-0 z-50 flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="container flex items-center justify-between h-16 border-b border-border px-4">
            <h2 id="mobile-menu-title" className="sr-only">Main menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border border-border bg-white p-2 text-foreground hover:bg-cream-100 focus-visible-ring"
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
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-cream-100 hover:text-primary",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-primary hover:bg-cream-100 transition-colors focus-visible-ring block text-center"
            >
              List your business
            </Link>
            <div className="pt-4">
              <DarkModeToggle className="w-full justify-center" />
            </div>
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
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded bg-primary px-2 py-0.5 text-white font-sans text-xs font-bold">NE</span>
              <span className="font-heading text-lg font-bold text-foreground">Nyumba Edit</span>
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
            <h3 className="font-semibold text-foreground mb-4">Browse</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/discover" className="hover:text-primary transition-colors">Discover &amp; search</Link></li>
              <li><Link href="/retailers" className="hover:text-primary transition-colors">Retailer directory</Link></li>
              <li><Link href="/guides" className="hover:text-primary transition-colors">Editorial guides</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">For retailers</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/submit" className="hover:text-primary transition-colors">List your business</Link></li>
              <li><Link href="/advertise" className="hover:text-primary transition-colors">Advertise &amp; sponsored placements</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-primary transition-colors">Editorial policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal &amp; contact</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin (protected)</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>Nyumba Edit — demo platform. Not a marketplace; no checkout.</p>
          <p>Kenyan shillings (KSh) • Centimetres (cm) • +254 phone format</p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <NewsletterSignup
          title="Nyumba Edit newsletter"
          description="New buying guides, retailer features and home inspiration — straight to your inbox."
        />
      </div>
    </footer>
  );
}
