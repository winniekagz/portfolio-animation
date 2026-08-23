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

export const metadata: Metadata = {
  title: "Winfred Kagendo | Senior Frontend & Product Engineer",
  description:
    "Portfolio of Winfred Kagendo, a Nairobi-based Senior Frontend and Product Engineer focused on frontend architecture, React, Next.js, React Native, design systems, performance, and AI product engineering.",
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
