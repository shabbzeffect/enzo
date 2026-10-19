import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/ui/theme";
import { CompareProvider, CompareBar } from "@/components/compare";
import { SavedProvider, SavedBar } from "@/components/saved";
import { RecentlyViewedProvider } from "@/components/recently-viewed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    template: "%s | Nyumba Edit",
    default: "Nyumba Edit — Find furniture and home stores in Kenya",
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    siteName: SITE.name,
    title: "Nyumba Edit — Find furniture and home stores in Kenya",
    description: SITE.description,
    type: "website",
    locale: "en-KE",
    url: SITE.url,
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Nyumba Edit — furniture discovery for Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    images: ["/images/og-default.svg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <CompareProvider>
        <SavedProvider>
          <RecentlyViewedProvider>
            <html lang="en">
              <body className="font-sans antialiased">
                <a href="#main-content" className="skip-link">
                  Skip to main content
                </a>
                <JsonLd type="Organization" data={SITE.organizationJsonLd?.()} />
                <Navbar />
                <main id="main-content" tabIndex={-1} role="main">
                  {children}
                </main>
                <Footer />
                <CompareBar />
                <SavedBar />
              </body>
            </html>
          </RecentlyViewedProvider>
        </SavedProvider>
      </CompareProvider>
    </ThemeProvider>
  );
}
