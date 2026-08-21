import type { Metadata } from "next";
import { ComponentIQProductTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "ComponentIQ | Winfred Kagendo",
  description:
    "ComponentIQ is a token-first design system and component library for product teams, and the configuration foundation for a planned automated engineering audit platform.",
};

export default function ComponentIQProductPage() {
  return <ComponentIQProductTemplate />;
}
