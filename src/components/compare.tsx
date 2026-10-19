"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const MAX_COMPARE = 4;
const STORAGE_KEY = "nyumba-compare";

type CompareContextValue = {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  ready: boolean;
};

const CompareContext = React.createContext<CompareContextValue | null>(null);

function sanitize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, MAX_COMPARE);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(sanitize(JSON.parse(raw)));
    } catch {
      // corrupted or unavailable storage — start empty
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // storage unavailable (private mode) — comparison still works in-session
    }
  }, [slugs, ready]);

  const toggle = React.useCallback((slug: string) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const remove = React.useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = React.useCallback(() => setSlugs([]), []);

  const has = React.useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs]
  );

  const value = React.useMemo(
    () => ({ slugs, toggle, remove, clear, has, ready }),
    [slugs, toggle, remove, clear, has, ready]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = React.useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

export function CompareToggle({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle, slugs, ready } = useCompare();
  const selected = ready && has(slug);
  const full = slugs.length >= MAX_COMPARE && !selected;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      disabled={!ready || full}
      aria-pressed={selected}
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible-ring",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-white text-foreground hover:bg-cream-100",
        full ? "opacity-50 cursor-not-allowed" : "",
        className,
      ].filter(Boolean).join(" ")}
      title={full ? "Comparison is full (4 products)" : undefined}
    >
      {selected ? (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          Added to compare
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add to compare
        </>
      )}
    </button>
  );
}

export function CompareBar() {
  const { slugs, ready, clear, remove } = useCompare();

  if (!ready || slugs.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="container flex flex-wrap items-center gap-3 py-3">
        <span className="text-xs font-semibold text-foreground">
          Compare ({slugs.length}/{MAX_COMPARE})
        </span>
        <ul className="flex flex-1 flex-wrap items-center gap-2">
          {slugs.map((slug) => (
            <li key={slug}>
              <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-cream-100 px-2 py-1 text-xs text-muted">
                <span className="max-w-[10rem] truncate">{slug}</span>
                <button
                  type="button"
                  onClick={() => remove(slug)}
                  className="text-muted hover:text-foreground focus-visible-ring"
                  aria-label={`Remove ${slug} from comparison`}
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
          <Button size="sm" asChild>
            <Link href="/compare">Compare now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
