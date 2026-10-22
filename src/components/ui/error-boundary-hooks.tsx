"use client";

import * as React from "react";

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((err: Error) => {
    setError(err);
    console.error("Caught error:", err);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}

export function AsyncErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    return (
      fallback || (
        <div className="rounded-2xl border border-terracotta-200 bg-terracotta-50 p-8 text-center">
          <h2 className="font-bold text-terracotta-800">Something went wrong</h2>
          <p className="mt-2 text-sm text-terracotta-700">
            {error.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => setError(null)}
            className="mt-4 rounded-xl border border-terracotta-200 bg-white px-4 py-2 text-sm font-semibold text-terracotta-800 hover:bg-terracotta-50 transition-colors focus-visible-ring"
          >
            Try again
          </button>
        </div>
      )
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="space-y-4" role="status" aria-label="Loading">
          <div className="h-8 bg-cream-100 rounded animate-pulse" />
          <div className="h-8 bg-cream-100 rounded animate-pulse w-3/4" />
          <div className="h-8 bg-cream-100 rounded animate-pulse w-1/2" />
        </div>
      }
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              onError: setError,
            } as React.ComponentPropsWithoutRef<React.ElementType>)
          : child
      )}
    </React.Suspense>
  );
}