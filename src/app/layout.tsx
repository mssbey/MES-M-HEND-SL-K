import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavService } from "@/components/layout/Header";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { serviceGroups, services } from "@/content/services";
import { ogImage, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Mekanik Tesisat ve Projelendirme`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#142446",
  colorScheme: "light",
};

const navServices: NavService[] = services.map(({ slug, shortTitle, icon, group }) => ({
  slug,
  shortTitle,
  icon,
  group,
}));

const serviceTitles = Object.fromEntries(services.map((s) => [s.slug, s.shortTitle]));

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#icerik"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-navy-900 px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          İçeriğe geç
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header services={navServices} groups={serviceGroups} />
        <main id="icerik" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileContactBar serviceTitles={serviceTitles} />
      </body>
    </html>
  );
}
