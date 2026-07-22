import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/templates/CaseStudyTemplate";
import { OfflineFirstCaseStudy } from "@/components/templates/OfflineFirstCaseStudy";
import { caseStudies, getCaseStudy } from "@/lib/data/case-studies";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies
    .filter((study) => study.slug !== "componentiq")
    .map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Project Not Found | Winfred Kagendo",
    };
  }

  return {
    title: `${study.title} Case Study | Winfred Kagendo`,
    description: study.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  if (study.slug === "offline-first-engineering") {
    return <OfflineFirstCaseStudy />;
  }

  return <CaseStudyTemplate study={study} />;
}
