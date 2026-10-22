"use client";

import * as React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-2xl border border-terracotta-200 bg-terracotta-50 p-8 text-center">
          <h2 className="font-bold text-terracotta-800">Something went wrong</h2>
          <p className="mt-2 text-sm text-terracotta-700">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <details className="mt-4 text-left text-xs text-terracotta-600">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <pre className="mt-2 p-2 bg-white rounded border border-terracotta-200 overflow-auto">
              {this.state.error?.message}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl border border-terracotta-200 bg-white px-4 py-2 text-sm font-semibold text-terracotta-800 hover:bg-terracotta-50 transition-colors focus-visible-ring"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="rounded-2xl border border-terracotta-200 bg-terracotta-50 p-8 text-center">
      <h2 className="font-bold text-terracotta-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-terracotta-700">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded-xl border border-terracotta-200 bg-white px-4 py-2 text-sm font-semibold text-terracotta-800 hover:bg-terracotta-50 transition-colors focus-visible-ring"
      >
        Try again
      </button>
    </div>
  );
}