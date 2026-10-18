"use client";

import { useState } from "react";
import { submitRetailerRequest, type SubmissionErrors } from "@/app/submit/actions";
import { Button } from "@/components/ui/button";

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

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        {state.message && (
          <div
            className={[
              "rounded-xl p-4 text-sm",
              state.ok ? "border-green-200 bg-green-50 text-green-800" : "border-terracotta-200 bg-terracotta-50 text-terracotta-800",
            ].join(" ")}
          >
            {state.message}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6" id="listing-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Your name"
              id="name"
              error={state.errors?.name}
              required
            />
            <Field
              label="Business name"
              id="businessName"
              error={state.errors?.businessName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="County"
              id="county"
              type="select"
              error={state.errors?.county}
              required
            >
              <option value="">Select a county</option>
              {COUNTIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </Field>
            <Field
              label="Town / area"
              id="town"
              placeholder="e.g. Karen, Nyali, Milimani"
              error={state.errors?.town}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Phone (+254)"
              id="phone"
              type="tel"
              placeholder="+254 700 000 000"
              error={state.errors?.phone}
              required
            />
            <Field
              label="Email (optional)"
              id="email"
              type="email"
              placeholder="you@example.com"
              error={state.errors?.email}
            />
          </div>

          <Field
            label="Website (optional)"
            id="website"
            type="url"
            placeholder="https://example.com"
            error={state.errors?.website}
          />

          <div className="space-y-3">
            <label className="text-sm font-semibold text-ink block">Product categories</label>
            <p className="text-xs text-muted">Select the categories your business sells.</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer border rounded-xl border-border bg-white px-3 py-2 text-sm hover:bg-cream-100 transition-colors group">
                  <input
                    type="checkbox"
                    name="categories"
                    value={key}
                    className="rounded border-green-800 text-green-800 focus:ring-green-800"
                  />
                  <span className="text-ink">{label}</span>
                </label>
              ))}
            </div>
            {state.errors?.categories && (
              <p className="text-xs text-terracotta-700">{state.errors.categories}</p>
            )}
          </div>

          <Field
            label="Tell us about your business"
            id="message"
            type="textarea"
            rows={4}
            placeholder="What do you make or sell? Where are you located? Do you offer delivery, assembly or customisation?"
            error={state.errors?.message}
            required
          />

          <div className="flex items-start gap-3">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="mt-0.5 rounded border-green-800 text-green-800 focus:ring-green-800"
              required
            />
            <label className="text-sm text-ink leading-relaxed" htmlFor="terms">
              I understand that submitting this form does not guarantee publication
              or a verified badge. All listings are reviewed by our editorial team.
            </label>
          </div>
          {state.errors?.terms && (
            <p className="text-xs text-terracotta-700">{state.errors.terms}</p>
          )}

          <div className="pt-4">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting…" : "Submit listing request"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-cream-50 rounded-xl border border-border p-6">
        <h3 className="font-bold text-ink mb-2">What happens next?</h3>
        <ul className="text-sm text-muted space-y-2 list-disc list-inside">
          <li>Our editorial team reviews your request within a few business days.</li>
          <li>If accepted, we’ll contact you to confirm details and publish your profile.</li>
          <li>Paid "Featured Partner" placements are available separately and are always labelled.</li>
        </ul>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  error,
  required = false,
  rows,
  children,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-ink block" htmlFor={id}>
        {label}{required ? <span className="text-terracotta-700 ml-1" aria-hidden="true">*</span> : null}
      </label>
      {type === "select" || type === "textarea" ? (
        children === undefined ? (
          <select
            id={id}
            name={id}
            className="w-full rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring"
            required={required}
          >
            {children}
          </select>
        ) : (
          <textarea
            id={id}
            name={id}
            rows={rows}
            className="w-full rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring"
            required={required}
          />
        )
      ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className="w-full rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring"
            required={required}
          />
      )}
      {error && <p className="text-xs text-terracotta-700">{error}</p>}
    </div>
  );
}
