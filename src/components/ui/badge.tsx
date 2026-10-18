"use strict";

import * as React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "green" | "terracotta" | "subtle" | "sponsor";
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
    terracotta:
      "border-terracotta-200/60 bg-terracotta-50 text-terracotta-800",
    subtle: "border-border bg-cream-100 text-muted",
    sponsor:
      "border-terracotta-300 bg-terracotta-100 text-terracotta-800",
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
