"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";

export type NewsletterSignupProps = {
  title?: string;
  description?: string;
};

export function NewsletterSignup({ title, description }: NewsletterSignupProps = {}) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-success-200 bg-success-50 p-6 md:p-8 text-center">
        <h3 className="font-heading font-bold text-success-800 mb-2">Subscribed</h3>
        <p className="text-sm text-success-700">Thanks for joining our newsletter.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <h3 className="font-heading font-bold text-foreground mb-2 sm:mb-0 sm:mr-4">{title || "Stay updated"}</h3>
        <p className="text-xs text-muted mb-2 sm:mb-0 sm:mr-4 hidden sm:block">{description || "New guides and retailer features straight to your inbox."}</p>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          className="flex-1"
        />
        <Button type="submit" className="w-auto">
          Subscribe
        </Button>
      </form>
      <p className="text-xs text-muted mt-2">
        We’ll never share your email. Unsubscribe anytime.
      </p>
    </div>
  );
}
