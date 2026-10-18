import { Suspense } from "react";
import DiscoverClient from "./_client";

export const dynamic = "force-dynamic";

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="space-y-8 p-8">Loading results…</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
