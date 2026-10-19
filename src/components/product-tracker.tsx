"use client";

import * as React from "react";
import { useRecentlyViewed } from "@/components/recently-viewed";

export function ProductTracker({ slug }: { slug: string }) {
  const { track } = useRecentlyViewed();

  React.useEffect(() => {
    track(slug);
  }, [slug, track]);

  return null;
}
