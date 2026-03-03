import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CursorProvider } from "@/contexts/CursorContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { PageStackProvider } from "@/components/providers/PageStackProvider";
import { Navbar } from "@/components/organisms/Navbar";
import { AnimatedMenu } from "@/components/organisms/AnimatedMenu";
import { CustomCursor } from "@/components/organisms/CustomCursor";

/**
 * Good Pro (body). Next.js optimizes and self-hosts these local files.
 * Files: public/fonts/goodpro/ (from your Good Pro package).
 */
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
  title: "Scrollytelling Landing",
  description: "Immersive scrollytelling portfolio experience",
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
        <CursorProvider>
          <MenuProvider>
            <Navbar />
            <PageStackProvider>
              {children}
            </PageStackProvider>
            <AnimatedMenu />
            <CustomCursor />
          </MenuProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
