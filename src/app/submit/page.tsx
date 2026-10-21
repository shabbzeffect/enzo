"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea, Checkbox } from "@/components/ui/form";
import { submitRetailerRequest, type SubmissionErrors } from "@/app/submit/actions";

const CATEGORY_LABELS: Record<string, string> = {
  sofas: "Sofas & Living",
  beds: "Beds & Bedroom",
  dining: "Dining",
  storage: "Storage",
  lighting: "Lighting",
  decor: "Décor & Accessories",
  outdoor: "Outdoor",
  "home-office": "Home Office",
};

const COUNTIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

export default function SubmitPage() {
  const [state, setState] = useState<{ ok: boolean; message: string; errors?: SubmissionErrors }>({
    ok: false,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const result = await submitRetailerRequest(formData);
      setState(result);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">List your business</h1>
        <p className="mt-2 text-muted text-sm">
          Request a retailer profile on Nyumba Edit. We review every submission
          before publishing — completing this form does not guarantee listing or
          verification.
        </p>
      </div>

      {state.message && (
        <div
          className={[
            "rounded-xl p-4 text-sm transition-colors",
            state.ok
              ? "border-success-200 bg-success-50 text-success-800"
              : "border-tertiary-200 bg-tertiary-50 text-tertiary-800",
          ].join(" ")}
        >
          {state.message}
        </div>
      )}

      <Card className="rounded-2xl border border-border shadow-sm p-6 md:p-8">
        <form action={handleSubmit} className="space-y-6" id="listing-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Your name"
              id="name"
              placeholder="Asha Njeri"
              error={state.errors?.name}
              required
            />
            <Input
              label="Business name"
              id="businessName"
              placeholder="Asha's Furniture"
              error={state.errors?.businessName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="County"
              id="county"
              error={state.errors?.county}
              required
            >
              <option value="">Select a county</option>
              {COUNTIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
            <Input
              label="Town / area"
              id="town"
              placeholder="e.g. Karen, Nyali, Milimani"
              error={state.errors?.town}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone (+254)"
              id="phone"
              type="tel"
              placeholder="+254 700 000 000"
              error={state.errors?.phone}
              required
            />
            <Input
              label="Email (optional)"
              id="email"
              type="email"
              placeholder="you@example.com"
              error={state.errors?.email}
            />
          </div>

          <Input
            label="Website (optional)"
            id="website"
            type="url"
            placeholder="https://example.com"
            error={state.errors?.website}
          />

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">Product categories</label>
            <p className="text-xs text-muted">Select the categories your business sells.</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer border rounded-xl border-border bg-white px-3 py-2 text-sm hover:bg-cream-100 transition-colors group">
                  <input
                    type="checkbox"
                    name="categories"
                    value={key}
                    className="rounded border-primary text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">{label}</span>
                </label>
              ))}
            </div>
            {state.errors?.categories && (
              <p className="text-xs text-tertiary">{state.errors.categories}</p>
            )}
          </div>

          <Textarea
            label="Tell us about your business"
            id="message"
            rows={4}
            placeholder="What do you make or sell? Where are you located? Do you offer delivery, assembly or customisation?"
            error={state.errors?.message}
            required
          />

          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              label={
                <>
                  I understand that submitting this form does not guarantee publication
                  or a verified badge. All listings are reviewed by our editorial team.
                </>
              }
              required
            />
          </div>
          {state.errors?.terms && (
            <p className="text-xs text-tertiary">{state.errors.terms}</p>
          )}

          <div className="pt-4">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting…" : "Submit listing request"}
            </Button>
          </div>
        </form>
      </Card>

<div className="bg-cream-50 rounded-xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-2">What happens next?</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Our editorial team reviews your request within a few business days.</li>
          <li>If accepted, we&apos;ll contact you to confirm details and publish your profile.</li>
          <li>Paid &ldquo;Featured Partner&rdquo; placements are available separately and are always labelled.</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["rounded-2xl border border-border bg-white shadow-sm p-6 md:p-8", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
