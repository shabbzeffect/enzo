"use client";

import * as React from "react";

type JsonLdProps = {
  type: "LocalBusiness" | "Product" | "Article" | "BreadcrumbList" | "Organization";
  data: Record<string, unknown>;
};

export function JsonLd({ type, data }: JsonLdProps) {
  const script = React.useMemo(
    () => ({
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": type,
        ...data,
      }),
    }),
    [type, data]
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={script} />;
}
