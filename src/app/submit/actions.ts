"use server";

import { getStore } from "@/server/demo-store";
import { addEnquiry } from "@/server/store-core";
import { isValidEmail, isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/validators";

export interface SubmissionErrors {
  name?: string;
  businessName?: string;
  county?: string;
  town?: string;
  phone?: string;
  email?: string;
  website?: string;
  categories?: string;
  message?: string;
  terms?: string;
  form?: string;
}

export interface SubmissionResult {
  ok: boolean;
  message: string;
  errors?: SubmissionErrors;
}

const REQUIRED_CATEGORIES = [
  "sofas", "beds", "dining", "storage", "lighting", "decor", "outdoor", "home-office",
];

export async function submitRetailerRequest(formData: FormData): Promise<SubmissionResult> {
  const name = (formData.get("name") || "").toString().trim();
  const businessName = (formData.get("businessName") || "").toString().trim();
  const county = (formData.get("county") || "").toString().trim();
  const town = (formData.get("town") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const website = (formData.get("website") || "").toString().trim();
  const categories = (formData.get("categories") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();
  const terms = formData.get("terms");

  const errors: SubmissionErrors = {};

  if (!name) errors.name = "Your name is required.";
  if (!businessName) errors.businessName = "Business name is required.";
  if (!county) errors.county = "County is required.";
  if (!town) errors.town = "Town or area is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!isValidKenyanPhone(phone)) errors.phone = "Enter a valid Kenyan number (e.g. +254 700 000 000).";
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (website && !/^https?:\/\//.test(website)) errors.website = "Website must start with http:// or https://.";
  if (!categories) errors.categories = "Select at least one product category.";
  if (!message) errors.message = "Tell us about your business.";
  else if (message.length < 20) errors.message = "Please provide more detail (at least 20 characters).";
  if (!terms) errors.terms = "You must acknowledge that submission does not guarantee publication.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please fix the errors below.", errors };
  }

  // Record the listing request in the demo admin inbox
  // (visible at /admin/enquiries). Production: insert into a
  // `retailer_requests` table and notify admins.
  addEnquiry(getStore(), {
    kind: "listing-request",
    name,
    phone: normalizeKenyanPhone(phone),
    email: email || undefined,
    subject: `Listing request — ${businessName}`,
    message: [
      `Business: ${businessName}`,
      `Location: ${town}, ${county}`,
      `Categories: ${categories}`,
      `Website: ${website || "—"}`,
      "",
      message,
    ].join("\n"),
  });

  return {
    ok: true,
    message: "Thanks — your listing request has been received. Our editorial team will review it and be in touch. Submission does not guarantee publication or verification.",
  };
}
