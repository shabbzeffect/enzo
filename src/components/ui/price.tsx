"use strict";

import * as React from "react";

export type PriceProps = {
  amount: number | null;
  onRequest?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Price({
  amount,
  onRequest = false,
  className,
  size = "md",
}: PriceProps) {
  const sizes: Record<string, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };
  const weight = size === "lg" ? "font-bold" : "font-semibold";

  if (onRequest || amount === null || amount === undefined) {
    return (
      <span className={[sizes[size], weight, "text-muted", className].filter(Boolean).join(" ")}>
        Price on request
      </span>
    );
  }

  return (
    <span className={[sizes[size], weight, "text-foreground", className].filter(Boolean).join(" ")}>
      KSh {amount.toLocaleString("en-KE")}
    </span>
  );
}
