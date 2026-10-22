"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getStore } from "@/server/demo-store";
import {
  addEnquiry as addEnquiryToStore,
  confirmProductPrice,
  deleteEnquiry,
  removeReview,
  setArticleStatus,
  setEnquiryStatus,
  setProductStatus,
  setPromotionActive,
  setRetailerStatus,
  setReviewStatus,
  updateArticle,
  updateProduct,
  updatePromotion,
  updateRetailer,
  type ArticleStatus,
  type EnquiryStatus,
  type ListingStatus,
} from "@/server/store-core";
import { isValidEmail, isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/validators";

function revalidateAll() {
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

export async function logoutAdmin() {
  await signOut({ redirectTo: "/admin/login" });
}

// ---------------------------------------------------------------------------
// Retailers
// ---------------------------------------------------------------------------

export async function saveRetailer(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const shortDescription = String(formData.get("shortDescription") || "").trim();
  const status = String(formData.get("status") || "published") as ListingStatus;
  const sponsored = formData.get("sponsored") === "on";
  const sponsorLabel = String(formData.get("sponsorLabel") || "").trim();

  if (id && name) {
    updateRetailer(getStore(), id, {
      name,
      shortDescription,
      sponsored,
      sponsorLabel: sponsored ? sponsorLabel || "Sponsored" : undefined,
    });
    setRetailerStatus(getStore(), id, status === "archived" ? "archived" : "published");
    revalidateAll();
  }
  redirect("/admin/retailers");
}

export async function setRetailerPublished(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "published") as ListingStatus;
  if (id) {
    setRetailerStatus(getStore(), id, status);
    revalidateAll();
  }
  redirect("/admin/retailers");
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const priceRaw = String(formData.get("priceKes") || "").trim();
  const availability = String(formData.get("availability") || "unknown") as "in-stock" | "made-to-order" | "unavailable" | "unknown";
  const priceConfirmed = formData.get("priceConfirmed") === "on";
  const status = String(formData.get("status") || "published") as ListingStatus;

  if (id && name) {
    const priceKes = priceRaw === "" ? null : Number.parseInt(priceRaw, 10);
    updateProduct(getStore(), id, {
      name,
      priceKes: Number.isFinite(priceKes as number) ? (priceKes as number) : null,
      priceOnRequest: priceKes === null,
      availability,
      priceConfirmed,
    });
    setProductStatus(getStore(), id, status === "archived" ? "archived" : "published");
    revalidateAll();
  }
  redirect("/admin/products");
}

export async function confirmProductPriceAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) {
    confirmProductPrice(getStore(), id);
    revalidateAll();
  }
  redirect("/admin/products");
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

export async function saveArticle(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const status = String(formData.get("status") || "published") as ArticleStatus;
  const sponsored = formData.get("sponsored") === "on";
  const sponsorLabel = String(formData.get("sponsorLabel") || "").trim();

  if (id && title) {
    updateArticle(getStore(), id, {
      title,
      sponsored,
      sponsorLabel: sponsored ? sponsorLabel || "Sponsored" : undefined,
    });
    setArticleStatus(
      getStore(),
      id,
      status === "draft" ? "draft" : status === "archived" ? "archived" : "published"
    );
    revalidateAll();
  }
  redirect("/admin/articles");
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export async function moderateReview(formData: FormData) {
  const id = String(formData.get("id") || "");
  const action = String(formData.get("action") || "");
  if (id) {
    if (action === "approve") setReviewStatus(getStore(), id, "published");
    else if (action === "hold") setReviewStatus(getStore(), id, "pending");
    else if (action === "remove") removeReview(getStore(), id);
    revalidateAll();
  }
  redirect("/admin/reviews");
}

// ---------------------------------------------------------------------------
// Promotions
// ---------------------------------------------------------------------------

export async function savePromotion(formData: FormData) {
  const id = String(formData.get("id") || "");
  const label = String(formData.get("label") || "Sponsored");
  const startDate = String(formData.get("startDate") || "");
  const endDate = String(formData.get("endDate") || "");
  const active = formData.get("active") === "on";

  if (id) {
    updatePromotion(getStore(), id, {
      label: label === "Featured Partner" ? "Featured Partner" : "Sponsored",
      startDate,
      endDate,
      active,
    });
    revalidateAll();
  }
  redirect("/admin/promotions");
}

export async function togglePromotionActive(formData: FormData) {
  const id = String(formData.get("id") || "");
  const active = formData.get("active") === "on";
  if (id) {
    setPromotionActive(getStore(), id, active);
    revalidateAll();
  }
  redirect("/admin/promotions");
}

// ---------------------------------------------------------------------------
// Enquiries
// ---------------------------------------------------------------------------

export async function updateEnquiryStatusAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "read") as EnquiryStatus;
  if (id) {
    setEnquiryStatus(getStore(), id, status);
    revalidatePath("/admin/enquiries");
  }
  redirect("/admin/enquiries");
}

export async function deleteEnquiryAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) {
    deleteEnquiry(getStore(), id);
    revalidatePath("/admin/enquiries");
  }
  redirect("/admin/enquiries");
}

export async function seedDemoEnquiry(formData: FormData) {
  const name = String(formData.get("name") || "").trim() || "Demo shopper";
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const kind = String(formData.get("kind") || "contact");

  const normalized = phone && isValidKenyanPhone(phone) ? normalizeKenyanPhone(phone) : "+254700000000";
  const email = String(formData.get("email") || "").trim();

  addEnquiryToStore(getStore(), {
    kind: kind === "retailer" || kind === "product" || kind === "listing-request" ? kind : "contact",
    name,
    phone: normalized,
    email: email && isValidEmail(email) ? email : undefined,
    subject: "Demo enquiry",
    message: message || "Sample enquiry generated from the demo admin for demonstration purposes.",
  });
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
}

export async function setArticleStatusAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "published") as ArticleStatus;
  if (id) {
    setArticleStatus(getStore(), id, status);
    revalidateAll();
  }
  redirect("/admin/articles");
}

export async function setProductStatusAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "published") as ListingStatus;
  if (id) {
    setProductStatus(getStore(), id, status);
    revalidateAll();
  }
  redirect("/admin/products");
}
