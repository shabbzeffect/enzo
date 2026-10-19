import type { Metadata } from "next";
import CompareClient from "./_compare-client";

export const metadata: Metadata = {
  title: "Compare products",
  description:
    "Compare furniture products side by side — price, dimensions, materials, availability and delivery. Prices in KSh, dimensions in cm.",
};

export default function ComparePage() {
  return <CompareClient />;
}
