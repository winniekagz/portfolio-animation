import { Layout, Palette, Sparkles } from "lucide-react";
import type { Service } from "@/lib/types";
import { CardBase } from "@/components/atoms/CardBase";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

const ICON_MAP = {
  palette: Palette,
  layout: Layout,
  sparkles: Sparkles,
} as const;

function ServiceIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name as keyof typeof ICON_MAP] ?? Layout;
  return <Icon className="h-8 w-8 shrink-0 text-brand-accent" aria-hidden />;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <CardBase className="flex flex-col rounded-lg border border-white/10 bg-brand-surface p-6 transition-colors hover:border-brand-accent/30 hover:bg-brand-surface/90">
      <ServiceIcon name={service.icon} />
      <Heading
        level={3}
        className="mt-4 font-display text-brand-text"
        style={{
          fontSize: "var(--font-size-h3)",
          lineHeight: "var(--leading-h3)",
        }}
      >
        {service.title}
      </Heading>
      <Text
        className="mt-2 text-brand-text-muted"
        style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}
      >
        {service.description}
      </Text>
      {service.features.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${service.title} features`}>
          {service.features.map((feature) => (
            <li key={feature}>
              <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-brand-text" style={{ fontSize: "var(--font-size-small)", lineHeight: "var(--leading-small)" }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardBase>
  );
}
