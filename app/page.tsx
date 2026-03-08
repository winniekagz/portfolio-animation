import { AboutSection } from "@/components/organisms/AboutSection";
import { ExperienceSection } from "@/components/organisms/ExperienceSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { BlogTemplate } from "@/components/templates/BlogTemplate";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <BlogTemplate />
    </>
  );
}
