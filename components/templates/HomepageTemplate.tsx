import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ScrollPanel } from "@/components/organisms/ScrollPanel";
import { ServicesGrid } from "@/components/organisms/ServicesGrid";

export function HomepageTemplate() {
  return (
    <>
      <main>
        <HeroSection />
        {/* relative z-10 + bg-brand-bg so these sections slide over the sticky z-0 hero */}
        <div className="relative z-10">
          <ScrollPanel pinAndScrub>
            <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-8 py-20 text-center">
              <Heading level={2} className="font-display text-brand-text" style={{ fontSize: "var(--font-size-h1)", lineHeight: "var(--leading-h1)", letterSpacing: "var(--tracking-h1)" }}>
                First chapter
              </Heading>
              <Text className="mt-4 max-w-lg text-brand-text-muted" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}>
                This section is pinned on desktop. Scroll to scrub the animation, then continue.
              </Text>
            </div>
          </ScrollPanel>
          <ScrollPanel pinAndScrub>
            <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-8 py-20 text-center">
              <Heading level={2} className="font-display text-brand-text" style={{ fontSize: "var(--font-size-h1)", lineHeight: "var(--leading-h1)", letterSpacing: "var(--tracking-h1)" }}>
                Second chapter
              </Heading>
              <Text className="mt-4 max-w-lg text-brand-text-muted" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}>
                Another pinned section. Same pattern: pin + scrub on desktop.
              </Text>
            </div>
          </ScrollPanel>
          <ServicesGrid />
        </div>
      </main>
    </>
  );
}
