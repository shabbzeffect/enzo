"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "nyumba-saved";
const MAX_SAVED = 50;

type SavedContextValue = {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  ready: boolean;
};

const SavedContext = React.createContext<SavedContextValue | null>(null);

function sanitize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, MAX_SAVED);
}

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw && mountedRef.current) setSlugs(sanitize(JSON.parse(raw)));
    } catch {
      // corrupted or unavailable storage — start empty
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (mountedRef.current) setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // storage unavailable (private mode) — saved list still works in-session
    }
  }, [slugs, ready]);

  const toggle = React.useCallback((slug: string) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SAVED) return prev;
      return [...prev, slug];
    });
  }, []);

  const remove = React.useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = React.useCallback(() => setSlugs([]), []);

  const has = React.useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const value = React.useMemo(
    () => ({ slugs, toggle, remove, clear, has, ready }),
    [slugs, toggle, remove, clear, has, ready]
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const context = React.useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used within a SavedProvider");
  return context;
}

export function SaveToggle({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle, ready } = useSaved();
  const saved = ready && has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      disabled={!ready}
      aria-pressed={saved}
      className={[
        "inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible-ring",
        saved
          ? "border-tertiary bg-tertiary/10 text-tertiary"
          : "border-border bg-white text-foreground hover:bg-cream-100",
        className,
      ].filter(Boolean).join(" ")}
    >
      {saved ? (
        <>
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Saved
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Save
        </>
      )}
    </button>
  );
}

export function SavedCount() {
  const { slugs, ready } = useSaved();
  if (!ready || slugs.length === 0) return null;
  return (
    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-tertiary text-white text-[0.65rem] font-bold min-w-[1.1rem] h-[1.1rem] px-1">
      {slugs.length}
    </span>
  );
}

export function SavedBar() {
  const { slugs, ready, clear } = useSaved();
  if (!ready || slugs.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="container flex flex-wrap items-center gap-3 py-3">
        <span className="text-xs font-semibold text-foreground">
          {slugs.length} saved
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
          <Button size="sm" asChild>
            <Link href="/saved">View saved</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
