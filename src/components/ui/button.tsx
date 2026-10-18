"use strict";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "terracotta";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-colors focus-visible-ring disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary:
      "bg-green-800 text-white hover:bg-green-700 focus-visible:ring-green-600",
    secondary:
      "bg-terracotta-700 text-white hover:bg-terracotta-600 focus-visible:ring-terracotta-600",
    outline:
      "border border-border bg-transparent text-ink hover:bg-cream-100 focus-visible:ring-ring",
    ghost:
      "bg-transparent text-ink hover:bg-cream-100 focus-visible:ring-ring",
    terracotta:
      "bg-terracotta-800 text-white hover:bg-terracotta-700 focus-visible:ring-terracotta-600",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2",
    lg: "px-5 py-2.5 text-base",
  };

  const buttonProps = {
    className: [base, variants[variant], sizes[size], className].filter(Boolean).join(" "),
    disabled: disabled || isLoading,
    ...props,
  };

  const spinner = isLoading ? (
    <span className="flex items-center gap-1">
      <svg
        className="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
  ) : null;

  if (asChild) {
    const child = children as unknown as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...buttonProps,
      className: [
        (child.props.className ?? ""),
        buttonProps.className,
      ]
        .filter(Boolean)
        .join(" "),
      disabled: buttonProps.disabled,
    } as React.Attributes);
  }

  return (
    <button {...buttonProps}>
      {spinner}
      {children}
    </button>
  );
}
