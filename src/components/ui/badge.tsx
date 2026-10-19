"use strict";

import * as React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "green" | "tertiary" | "subtle" | "sponsor" | "success" | "warning";
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 rounded-lg border font-medium text-xs transition-colors";
  const variants: Record<string, string> = {
    default: "border-border bg-white text-ink",
    green: "border-green-200/60 bg-green-50 text-green-800",
    tertiary: "border-tertiary-200/60 bg-tertiary-50 text-tertiary-800",
    subtle: "border-border bg-cream-100 text-muted",
    sponsor: "border-tertiary-300 bg-tertiary-100 text-tertiary-800",
    success: "border-success-200/60 bg-success-50 text-success-800",
    warning: "border-warning-200/60 bg-warning-50 text-warning-800",
  };

  return (
    <span
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}

export type SponsorLabelProps = React.HTMLAttributes<HTMLSpanElement>;

export function SponsorLabel({ className, children, ...props }: SponsorLabelProps) {
  return (
    <Badge
      variant="sponsor"
      className={["uppercase tracking-wider text-[0.65rem]", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Badge>
  );
}
