import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "1",
    title: "Frontend Architecture",
    description: "Structure product frontends around clear rendering, state, accessibility, and performance decisions so teams can extend them without slowing down.",
    icon: "palette",
    features: ["Rendering strategy", "State boundaries", "Performance budgets"],
  },
  {
    id: "2",
    title: "Product Engineering",
    description: "Translate ambiguous product problems into maintainable web and mobile flows, balancing delivery speed with long-term system health.",
    icon: "layout",
    features: ["Web and mobile", "API integration", "UX tradeoffs"],
  },
  {
    id: "3",
    title: "Design Systems & AI",
    description: "Build shared component patterns, developer guardrails, and AI-assisted workflows that make product teams more consistent and reviewable.",
    icon: "sparkles",
    features: ["Shared libraries", "AI workflows", "Developer experience"],
  },
];
