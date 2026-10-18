import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Nyumba Edit",
    default: "Nyumba Edit — Find furniture and home stores in Kenya",
  },
  description:
    "Nyumba Edit is an editorial furniture-discovery and retailer directory for Kenya. Browse products, shopping guides and interiors, and contact retailers directly. Prices in KSh.",
  metadataBase: new URL(((process as unknown as { env: Record<string, string> }).env?.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")),
  openGraph: {
    siteName: "Nyumba Edit",
    title: "Nyumba Edit — Find furniture and home stores in Kenya",
    description:
      "An editorial furniture-discovery and retailer directory for Kenya. Prices in KSh, dimensions in cm.",
    type: "website",
    locale: "en-KE",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nyumbaedit.demo",
    creator: "@nyumbaedit.demo",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
