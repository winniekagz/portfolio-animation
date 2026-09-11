import type { Metadata } from "next";
import {
  AboutSection,
  BeliefsSection,
  ContactSection,
  HeroSection,
  MeetMyBrainSection,
  ProfessionalSection,
  ProjectsSection,
  RabbitHoleSection,
} from "@/components/organisms";
import { BlogTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "Winfred Kagendo Labs | Frontend Systems, UI Engineering & System Design",
  description:
    "I'm Winfred Kagendo, a software engineer with a frontend heart. Labs is where I explore frontend systems, UI engineering, UX, product thinking, and the architecture underneath the interfaces I build.",
  alternates: {
    canonical: "https://labs.winfredkagendo.com",
  },
  openGraph: {
    title: "Winfred Kagendo Labs | Frontend Systems, UI Engineering & System Design",
    description:
      "Engineering experiments exploring frontend architecture, UI engineering, UX, system design, and product engineering.",
    url: "https://labs.winfredkagendo.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RabbitHoleSection />
      <ProjectsSection />
      <MeetMyBrainSection />
      <BeliefsSection />
      <ProfessionalSection />
      <BlogTemplate />
      <ContactSection />
    </>
  );
}
