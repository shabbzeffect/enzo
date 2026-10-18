"use strict";

import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-white shadow-sm",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export type CardImageProps = {
  src: string;
  alt: string;
  height?: number;
  className?: string;
};

export function CardImage({ src, alt, height, className }: CardImageProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl bg-cream-100 image-placeholder",
        className,
      ].filter(Boolean).join(" ")}
      style={{ height: height ?? 240 }}
    >
      <span>{alt}</span>
    </div>
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={["p-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
