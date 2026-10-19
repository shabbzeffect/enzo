import type { Metadata } from "next";
import { SavedPageClient } from "./_saved-client";

export const metadata: Metadata = {
  title: "Saved items",
  description: "Your saved furniture picks — stored in this browser, no account needed.",
};

export default function SavedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold">Saved items</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          Everything you&apos;ve hearted across the site. Saved locally in your browser —
          clearing cookies will remove them.
        </p>
      </div>
      <SavedPageClient />
    </div>
  );
}
