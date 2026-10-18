import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Contact Nyumba Edit",
  description: "Contact the Nyumba Edit editorial team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold">Contact us</h1>
      <p className="text-muted text-sm">
        Got a question about Nyumba Edit, a listing or a paid placement? Drop
        us a line.
      </p>

      <ContactForm />

      <div className="bg-cream-50 rounded-xl border border-border p-6">
        <h3 className="font-bold text-ink mb-2">WhatsApp channel</h3>
        <p className="text-sm text-muted mb-4">
          Follow Nyumba Edit on WhatsApp for new guides and retailer features
          (demo link).
        </p>
        <Button asChild>
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">Open WhatsApp chat</a>
        </Button>
      </div>
    </div>
  );
}
