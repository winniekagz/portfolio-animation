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
