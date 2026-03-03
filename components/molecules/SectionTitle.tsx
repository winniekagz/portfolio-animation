import type { ReactNode } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Heading
        level={2}
        className="font-display text-brand-text"
        style={{ fontSize: "var(--font-size-h2)", lineHeight: "var(--leading-h2)", letterSpacing: "var(--tracking-h2)" }}
      >
        {title}
      </Heading>
      {subtitle != null && (
        <Text className="mt-2 text-brand-text-muted" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}>
          {subtitle}
        </Text>
      )}
    </div>
  );
}
