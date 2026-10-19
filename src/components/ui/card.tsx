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

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={["flex flex-col space-y-1.5 p-4", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={["font-heading font-bold text-foreground text-lg", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={["text-sm text-muted-foreground", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </p>
  );
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={["flex items-center pt-4 border-t border-border", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
