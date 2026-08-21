import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

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
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased bg-background text-foreground`}>
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
