"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "nyumba-theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
  return stored ?? "system";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("system");
  const [resolved, setResolved] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    setResolved(resolveTheme(stored));
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const resolvedTheme = resolveTheme(theme);
    setResolved(resolvedTheme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggle = React.useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "system" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeContext = React.createContext<{
  theme: Theme;
  resolved: "light" | "dark";
  toggle: () => void;
  mounted: boolean;
} | null>(null);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function DarkModeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  const labels: Record<Theme, string> = {
    light: "Light mode",
    dark: "Dark mode",
    system: "System",
  };

  const icons: Record<Theme, React.ReactNode> = {
    light: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4M20.4 35.4H20.4" />
      </svg>
    ),
    dark: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21c9.003 0 0 0 0 0" />
      </svg>
    ),
    system: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-4 0v6a2 2 0 004 0zm10 0v-6a2 2 0 00-4 0v6a2 2 0 004 0zm-6 4a2 2 0 00-2-2v6a2 2 0 002 2zm6 0a2 2 0 002-2v6a2 2 0 002 2zm-6-4a2 2 0 002-2v6a2 2 0 002 2zm-6 4a2 2 0 002-2v6a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <button
      onClick={toggle}
      className={[
        "inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition-colors focus-visible-ring",
        className,
      ].filter(Boolean).join(" ")}
      aria-label="Toggle theme"
      title={labels[theme]}
    >
      {icons[theme]}
      <span className="hidden sm:inline">{labels[theme]}</span>
    </button>
  );
}
