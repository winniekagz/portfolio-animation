import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CursorProvider } from "@/contexts/CursorContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { PageStackProvider } from "@/components/providers/PageStackProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/organisms/Navbar";
import { AnimatedMenu } from "@/components/organisms/AnimatedMenu";
import { CustomCursor } from "@/components/organisms/CustomCursor";
import { SiteFooter } from "@/components/organisms/SiteFooter";


const fontBody = localFont({
  src: [
    { path: "../public/fonts/goodpro/FFGoodPro-Regular.woff2", weight: "400" },
    { path: "../public/fonts/goodpro/FFGoodPro-Medium.woff2", weight: "500" },
    { path: "../public/fonts/goodpro/FFGoodPro-Bold.woff2", weight: "700" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/**
 * Good Pro Condensed / XCond (display / headlines). Next.js optimizes and self-hosts.
 * Files: public/fonts/goodprocondensed/ (from your Good Pro Condensed package).
 */
const fontDisplay = localFont({
  src: [{ path: "../public/fonts/goodprocondensed/FFGoodProXCond-Regular.woff2", weight: "400" }],
  variable: "--font-bebas-neue",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Winfred Kagendo | Frontend Engineer",
  description:
    "Portfolio of Winfred Kagendo — Frontend & Mobile Engineer based in Nairobi, crafting immersive digital experiences with React, Next.js, and React Native.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontBody.variable} ${fontDisplay.variable} antialiased bg-background text-foreground`}
      >
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
