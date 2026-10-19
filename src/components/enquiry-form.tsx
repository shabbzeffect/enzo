"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form";
import {
  submitContactMessage,
  submitProductEnquiry,
  submitRetailerEnquiry,
  type EnquiryFormState,
} from "@/app/enquiry/actions";

const INITIAL: EnquiryFormState = { ok: false };

export type EnquiryFormProps = {
  retailerSlug?: string;
  retailerName?: string;
  productSlug?: string;
  productName?: string;
  heading?: string;
  intro?: string;
};

export function EnquiryForm({
  retailerSlug,
  retailerName,
  productSlug,
  productName,
  heading = "Send an enquiry",
  intro = "Ask about price, stock, delivery or customisation. In this demo build, enquiries are stored in a demonstration inbox and are not actually delivered.",
}: EnquiryFormProps) {
  const isProduct = Boolean(productSlug && productName);
  const isRetailer = Boolean(retailerSlug && retailerName);

  const retailAction = submitRetailerEnquiry.bind(null, retailerSlug || "", retailerName || "");
  const productAction = submitProductEnquiry.bind(
    null,
    productSlug || "",
    productName || "",
    retailerSlug || "",
    retailerName || ""
  );

  const [state, formAction, pending] = useActionState(
    isProduct ? productAction : isRetailer ? retailAction : submitContactMessage,
    INITIAL
  );

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-success-200 bg-success-50 p-6 md:p-8">
        <h3 className="font-heading font-bold text-success-800">Enquiry sent</h3>
        <p className="mt-2 text-sm text-success-700">{state.message}</p>
        <Link
          href="/admin/enquiries"
          className="mt-4 inline-block text-sm font-semibold text-success-800 underline hover:no-underline focus-visible-ring"
        >
          See it in the demo admin inbox
        </Link>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4"
    >
      <div>
        <h3 className="font-heading font-bold text-foreground">{heading}</h3>
        {intro && <p className="mt-1 text-xs text-muted">{intro}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id={`enq-name-${productSlug || retailerSlug || "contact"}`}
          name="name"
          label="Your name"
          required
          error={state.errors?.name}
        />
        <Input
          id={`enq-phone-${productSlug || retailerSlug || "contact"}`}
          name="phone"
          label="Phone (Kenyan number)"
          type="tel"
          placeholder="+254 700 000 000"
          required
          error={state.errors?.phone}
        />
      </div>
      <Input
        id={`enq-email-${productSlug || retailerSlug || "contact"}`}
        name="email"
        label="Email (optional)"
        type="email"
        error={state.errors?.email}
      />
      <Textarea
        id={`enq-message-${productSlug || retailerSlug || "contact"}`}
        name="message"
        label="Message"
        rows={4}
        required
        placeholder="e.g. Is this in stock this weekend? What is delivery to Kilimani?"
        error={state.errors?.message}
      />

      {state.message && !state.ok && (
        <p className="text-sm text-tertiary" role="alert">
          {state.message}
        </p>
      )}

      <Button type="submit" isLoading={pending}>
        Send enquiry
      </Button>
    </form>
  );
}

export function ContactMessageForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, INITIAL);

  if (state.ok) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="font-heading font-bold text-green-800">Thanks for getting in touch</h2>
        <p className="mt-2 text-sm text-muted">{state.message}</p>
        <Link
          href="/admin/enquiries"
          className="mt-4 inline-block text-sm font-semibold text-green-800 underline hover:no-underline focus-visible-ring"
        >
          See it in the demo admin inbox
        </Link>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input id="contact-name" name="name" label="Your name" required error={state.errors?.name} />
        <Input id="contact-email" name="email" label="Email" type="email" required error={state.errors?.email} />
      </div>
      <Input id="contact-subject" name="subject" label="Subject" required error={state.errors?.subject} />
      <Textarea id="contact-message" name="message" label="Message" rows={5} required error={state.errors?.message} />
      <div className="pt-4">
        <Button type="submit" isLoading={pending}>
          Send message
        </Button>
      </div>
      <p className="text-xs text-muted mt-4">
        Demo form — messages are stored in the demonstration admin inbox only and are not emailed anywhere.
      </p>
    </form>
  );
}
