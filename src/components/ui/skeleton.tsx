"use client";

import * as React from "react";

export type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  radius?: "sm" | "md" | "lg" | "xl";
};

const RADIUS: Record<string, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function Skeleton({ className, width, height, radius = "md" }: SkeletonProps) {
  return (
    <div
      className={[
        "skeleton",
        RADIUS[radius],
        className,
      ].filter(Boolean).join(" ")}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

export type SkeletonTextProps = {
  lines?: number;
  lineHeight?: string;
  lineWidth?: string | number;
  className?: string;
};

export function SkeletonText({ lines = 3, lineHeight = "1.25rem", lineWidth = "100%", className }: SkeletonTextProps) {
  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "60%" : lineWidth}
          height={lineHeight}
          className="w-full"
        />
      ))}
    </div>
  );
}

export type SkeletonCardProps = {
  className?: string;
};

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={["rounded-2xl border border-border bg-white shadow-sm p-6", className].filter(Boolean).join(" ")}>
      <div className="h-48 w-full skeleton rounded-xl mb-4" />
      <div className="space-y-3">
        <Skeleton width="40%" height="0.875rem" className="w-full" />
        <Skeleton width="70%" height="0.875rem" className="w-full" />
        <Skeleton width="100%" height="1rem" className="w-full" />
      </div>
    </div>
  );
}
