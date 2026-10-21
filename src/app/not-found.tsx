import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found — Nyumba Edit",
  description: "The page you're looking for doesn't exist.",
  robots: "noindex",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center py-16">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink">Page not found</h1>
      <p className="text-muted text-lg">
        We couldn&apos;t find the page you&apos;re looking for. It may have moved or been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring inline-block">
          Back to homepage
        </Link>
        <Link href="/discover" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring inline-block">
          Start searching
        </Link>
      </div>
      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        <h3 className="font-bold text-ink mb-3">Still need help?</h3>
        <p className="text-sm text-muted mb-4">
          Contact us or browse the retailer directory to find furniture and homeware
          sellers across Kenya.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring inline-block">Contact us</Link>
          <Button asChild>
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-green-700 text-white font-sm font-semibold hover:bg-green-600 focus-visible-ring transition-colors px-5 py-2.5">
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
