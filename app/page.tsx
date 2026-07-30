import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
} from "@/components/organisms";
import { BlogTemplate } from "@/components/templates";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogTemplate />
      <ContactSection />
    </>
  );
}
