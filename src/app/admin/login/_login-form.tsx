"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

// Demo-only admin login form. Sets a session cookie via an API route so the
// admin middleware grants access to /admin routes. In production, replace with
// NextAuth/Auth.js sign-in.
export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo: true }),
      });
      if (!res.ok) throw new Error("Login failed");

      router.push(callbackUrl);
    } catch {
      setError("Unable to start admin session. This is a demonstration build.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-6">
      {error && (
        <div className="rounded-xl border border-terracotta-200 bg-terracotta-50 p-4 text-sm text-terracotta-800">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-ink block">Admin session</label>
        <p className="text-xs text-muted">
          Click "Sign in" to establish a demo admin session for this browser.
        </p>
      </div>
      <div className="pt-4">
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Signing in…" : "Sign in as admin (demo)"}
        </Button>
      </div>
      <p className="text-xs text-muted mt-4">
        <Link href="/" className="text-green-800 hover:underline">&larr; Back to site</Link>
      </p>
    </form>
  );
}
