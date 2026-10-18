import { Suspense } from "react";
import RetailersClient from "./_client";

export const dynamic = "force-dynamic";

export default function RetailersPage() {
  return (
    <Suspense fallback={<div className="space-y-8 p-8">Loading retailers…</div>}>
      <RetailersClient />
    </Suspense>
  );
}
