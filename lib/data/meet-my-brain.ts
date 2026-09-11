import type { BrainQuestion } from "@/lib/types";

export const brainScenario = {
  trigger: 'A user clicks "Submit Payment"',
  punchline: "...and now I have a FigJam.",
};

export const brainQuestions: BrainQuestion[] = [
  {
    id: "ui",
    question: "What happens when they click?",
    discipline: "ui",
    explanation:
      "UI asks: How should the button behave? What's the loading state? Does it disable? What does the user see immediately?",
  },
  {
    id: "ux",
    question: "What should they see while it's processing?",
    discipline: "ux",
    explanation:
      "UX asks: Does this make sense for the human using it? Are we reducing anxiety? Is the feedback appropriate for the wait time?",
  },
  {
    id: "product",
    question: "Why are we letting them pay here?",
    discipline: "product",
    explanation:
      "Product asks: Why are we building this? What's the business context? What happens to conversion if this is confusing?",
  },
  {
    id: "frontend",
    question: "Where does the payment state live?",
    discipline: "frontend",
    explanation:
      "Frontend Systems asks: What if the request fails mid-flight? How do we handle optimistic updates? Where's the source of truth?",
  },
  {
    id: "systems",
    question: "What happens with 10,000 concurrent payments?",
    discipline: "systems",
    explanation:
      "Systems asks: How do we prevent double-charging? What's the idempotency strategy? How does this behave under load?",
  },
];

export const disciplineLabels: Record<BrainQuestion["discipline"], string> = {
  ui: "UI",
  ux: "UX",
  product: "Product",
  frontend: "Frontend Systems",
  systems: "Systems",
};
