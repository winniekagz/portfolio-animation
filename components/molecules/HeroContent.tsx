import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export function HeroContent() {
  return (
    <>
      <Heading level={1} className="font-display text-brand-text" style={{ fontSize: "var(--font-size-display)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }}>
        Senior Frontend & Product Engineer
      </Heading>
      <Text className="max-w-md text-brand-text-muted" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}>
        Architecting scalable product frontends across web, mobile, and AI workflows.
      </Text>
      <Button className="rounded bg-brand-accent px-6 py-3 text-brand-bg hover:opacity-90">
        Get in touch
      </Button>
    </>
  );
}
