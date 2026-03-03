import { BlogTemplate } from "@/components/templates/BlogTemplate";
import { HomepageTemplate } from "@/components/templates/HomepageTemplate";
import { ServicesTemplate } from "@/components/templates/ServicesTemplate";

export default function Home() {
  return (
    <>
      <HomepageTemplate />
      <ServicesTemplate />
      <BlogTemplate/>
    </>
  );
}
