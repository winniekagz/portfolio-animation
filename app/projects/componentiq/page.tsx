import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/templates/CaseStudyTemplate";
import { getCaseStudy } from "@/lib/data/case-studies";

const study = getCaseStudy("componentiq");

export const metadata: Metadata = {
  title: "ComponentIQ In-Progress Case Study | Winfred Kagendo",
  description:
    "An in-progress frontend architecture case study for ComponentIQ, an AI-assisted design system platform concept using a monorepo, docs, Storybook, and shared packages.",
};

export default function ComponentIQPage() {
  if (!study) {
    notFound();
  }

  return <CaseStudyTemplate study={study} />;
}
