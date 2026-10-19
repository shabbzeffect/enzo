"use server";

import { revalidatePath } from "next/cache";
import { getStore } from "@/server/demo-store";
import { addEnquiry, type EnquiryKind } from "@/server/store-core";
import { isValidEmail, isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/validators";

export type EnquiryFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const PHONE_HINT = "Enter a valid Kenyan number (e.g. +254 700 000 000).";

function validate(formData: FormData) {
  const name = (formData.get("name") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();
  const subject = (formData.get("subject") || "").toString().trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Your name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!isValidKenyanPhone(phone)) errors.phone = PHONE_HINT;
  if (email && !isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Please include a message.";
  else if (message.length < 10) errors.message = "Please provide a little more detail (at least 10 characters).";

  return {
    name,
    phone: normalizeKenyanPhone(phone),
    email: email || undefined,
    message,
    subject: subject || undefined,
    errors,
  };
}

export async function submitRetailerEnquiry(
  retailerSlug: string,
  retailerName: string,
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const { name, phone, email, message, errors } = validate(formData);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  addEnquiry(getStore(), {
    kind: "retailer",
    name,
    phone,
    email,
    message,
    retailerSlug,
    retailerName,
  });
  revalidatePath(`/retailers/${retailerSlug}`);
  revalidatePath("/admin/enquiries");
  return {
    ok: true,
    message: "Thanks — your enquiry has been sent to our demo inbox. In this demonstration build the retailer is not actually contacted; production would forward enquiries by email or WhatsApp.",
  };
}

export async function submitProductEnquiry(
  productSlug: string,
  productName: string,
  retailerSlug: string,
  retailerName: string,
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const { name, phone, email, message, errors } = validate(formData);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  addEnquiry(getStore(), {
    kind: "product",
    name,
    phone,
    email,
    message,
    productSlug,
    productName,
    retailerSlug,
    retailerName,
  });
  revalidatePath(`/products/${productSlug}`);
  revalidatePath("/admin/enquiries");
  return {
    ok: true,
    message: "Thanks — your enquiry has been sent to our demo inbox. In this demonstration build the retailer is not actually contacted; production would forward enquiries by email or WhatsApp.",
  };
}

export async function submitContactMessage(
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const subject = (formData.get("subject") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Your name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message) errors.message = "Please include a message.";
  else if (message.length < 10) errors.message = "Please provide a little more detail (at least 10 characters).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  addEnquiry(getStore(), {
    kind: "contact",
    name,
    phone: "—",
    email,
    subject,
    message,
  });
  revalidatePath("/admin/enquiries");
  return {
    ok: true,
    message: "Thanks for getting in touch. In this demonstration build your message is stored in the demo admin inbox only — nothing is emailed anywhere.",
  };
}

export type { EnquiryKind };
