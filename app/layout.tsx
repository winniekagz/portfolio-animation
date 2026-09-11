import type { Metadata } from "next";
import "./globals.css";
import { CursorProvider } from "@/contexts/CursorContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { PageStackProvider } from "@/components/providers/PageStackProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import {
  AnimatedMenu,
  CustomCursor,
  Navbar,
  SiteFooter,
} from "@/components/organisms";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://labs.winfredkagendo.com"),
  title: {
    default: "Winfred Kagendo Labs | Frontend Systems, UI Engineering & System Design",
    template: "%s | Winfred Kagendo Labs",
  },
  description:
    "Engineering experiments by Winfred Kagendo exploring frontend architecture, UI engineering, UX, system design, payments, performance, and product engineering.",
  keywords: [
    "Winfred Kagendo",
    "Frontend Engineering",
    "UI Engineering",
    "System Design",
    "Product Engineering",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Winfred Kagendo", url: "https://winfredkagendo.com" }],
  creator: "Winfred Kagendo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://labs.winfredkagendo.com",
    siteName: "Winfred Kagendo Labs",
    title: "Winfred Kagendo Labs | Frontend Systems, UI Engineering & System Design",
    description:
      "Engineering experiments exploring frontend architecture, UI engineering, UX, system design, and product engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winfred Kagendo Labs",
    description:
      "Engineering experiments exploring frontend architecture, UI engineering, UX, system design, and product engineering.",
    creator: "@winfredkagendo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://labs.winfredkagendo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="antialiased bg-background text-foreground">
        <LenisProvider>
        <CursorProvider>
          <MenuProvider>
            {/* Skip navigation — visible on focus for keyboard users (WCAG 2.4.1) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-lg focus:bg-brand-accent focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:font-bold focus:text-brand-bg focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
              <PageStackProvider>
                {children}
              </PageStackProvider>
            </main>
            <SiteFooter />
            <AnimatedMenu />
            <CustomCursor />
          </MenuProvider>
        </CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
