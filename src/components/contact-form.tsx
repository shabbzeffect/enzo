"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type ContactFormProps = {};

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="font-heading font-bold text-green-800">Thanks for getting in touch</h2>
        <p className="mt-2 text-sm text-muted">We'll aim to reply soon.</p>
        <Link href="/" className="mt-4 inline-block rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-cream-100 transition-colors focus-visible-ring">Back to homepage</Link>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Your name" id="name" required />
        <Field label="Email" id="email" type="email" required />
      </div>
      <Field label="Subject" id="subject" required />
      <Field label="Message" id="message" type="textarea" rows={5} required />
      <div className="pt-4">
        <Button type="submit">Send message</Button>
      </div>
      <p className="text-xs text-muted mt-4">
        This is a demo form. Messages are not sent anywhere in this build.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  rows,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-ink block" htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea id={id} name={id} rows={rows} required={required} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring" />
      ) : (
        <input id={id} name={id} type={type} required={required} className="w-full rounded-xl border border-border bg-white px-3 py-2 text-ink focus-visible-ring" />
      )}
    </div>
  );
}
