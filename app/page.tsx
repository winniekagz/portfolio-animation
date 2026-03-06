import { AboutSection } from "@/components/organisms/AboutSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { AboutTemplate } from "@/components/templates/AboutTemplate";
import { BlogTemplate } from "@/components/templates/BlogTemplate";
import { HomepageTemplate } from "@/components/templates/HomepageTemplate";
import { ServicesTemplate } from "@/components/templates/ServicesTemplate";

export default function Home() {
  return (
    <>
      <HeroSection />
    <AboutSection/>
    </>
  );
}
