import { AboutSection } from "@/components/organisms/AboutSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { ExperienceSection } from "@/components/organisms/ExperienceSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsSection } from "@/components/organisms/ProjectsSection";
import { BlogTemplate } from "@/components/templates/BlogTemplate";


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
