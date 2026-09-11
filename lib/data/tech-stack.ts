import type { TechCategory } from "@/lib/types";

export const techStack: TechCategory[] = [
  {
    id: "interfaces",
    title: "Interfaces",
    description: "Where I have the deepest production mileage",
    items: ["React", "Next.js", "React Native", "TypeScript"],
  },
  {
    id: "state-data",
    title: "State + Data",
    items: ["TanStack Query", "Zustand", "PostgreSQL", "Prisma"],
  },
  {
    id: "craft",
    title: "Craft",
    items: ["Figma", "Storybook", "Playwright", "Accessibility"],
  },
  {
    id: "going-deeper",
    title: "Going Deeper",
    description: "Where I'm building fluency",
    items: ["NestJS", "Redis", "Docker", "Queues", "Cloud / Infrastructure"],
  },
];
