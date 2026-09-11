import type { Belief } from "@/lib/types";

export const beliefs: Belief[] = [
  {
    id: "why-over-how",
    title: "I want to know why.",
    body: "I'd rather understand why something works than memorize how to do it.",
    variant: "default",
    related: "curiosity → fundamentals → depth",
  },
  {
    id: "systems-everywhere",
    title: "I think everything connects.",
    body: "I'm increasingly convinced everything becomes a system if I zoom out far enough.",
    variant: "warm",
    related: "patterns → architecture → mental models",
  },
  {
    id: "beyond-interface",
    title: "I don't stop at the interface.",
    body: "If I click a button, eventually I'm going to wonder where the state lives, where the request goes, and what happens when it fails.",
    variant: "default",
    related: "UI → frontend systems → infrastructure",
  },
  {
    id: "human-matters",
    title: "I care about the human too.",
    body: "I don't think technically correct software is very useful if the person using it is confused.",
    variant: "cool",
    related: "system behaviour → interface → UX",
  },
  {
    id: "break-things",
    title: "I like breaking things.",
    body: "If an architecture only works when everything behaves perfectly, I probably have more questions.",
    variant: "warm",
  },
  {
    id: "not-just-frontend",
    title: 'I don\'t think frontend means "just frontend."',
    body: "The interface is where product decisions, system behaviour, and human expectations eventually meet.",
    variant: "default",
    related: "product → systems → humans",
  },
  {
    id: "simple-after-complex",
    title: "I like simple things — after understanding the complicated version.",
    body: "Sometimes the better engineering decision is removing the abstraction I was excited to build.",
    variant: "cool",
  },
  {
    id: "one-question",
    title: "NOTE TO SELF",
    body: `One question is rarely enough. Most of my rabbit holes start with "Wait... but what happens if?"`,
    variant: "note-to-self",
  },
];

// Doodles to scatter between notes
export const beliefDoodles = [
  { id: "rabbit-hole", text: "↳ rabbit hole", position: "top-right" },
  { id: "hmm", text: "// hmm", position: "left-middle" },
  { id: "question", text: "?", position: "right-middle" },
  { id: "arrow", text: "····→", position: "left-bottom" },
  { id: "loop", text: "↪", position: "bottom-center" },
] as const;
