/** PRD §7 Data & Content Models */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  date: string;
  category?: string;
  readTime?: string;
  url?: string;
  contentBlocks: ContentBlock[];
};

export type ContentBlock = {
  type: "heading" | "paragraph" | "quote";
  content: string;
};

// ─── Rabbit Hole ─────────────────────────────────────────────────────────────
export type RabbitHoleStatus = "investigating" | "paused" | "completed";

export type RabbitHole = {
  id: string;
  topic: string;
  startingQuestion: string;
  connections: string[];
  currentQuestion?: string;
  status: RabbitHoleStatus;
  punchline?: string;
  figjamUrl?: string;
  experimentUrl?: string;
};

// ─── Experiments & Case Studies ──────────────────────────────────────────────
export type WorkType = "case-study" | "ux-case-study" | "experiment";
export type WorkStatus = "published" | "in-progress" | "planned";

export type WorkItem = {
  slug: string;
  type: WorkType;
  status: WorkStatus;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

// ─── Beliefs ─────────────────────────────────────────────────────────────────
export type BeliefVariant = "default" | "warm" | "cool" | "note-to-self";

export type Belief = {
  id: string;
  title: string;
  body: string;
  variant?: BeliefVariant;
  related?: string; // e.g. "UI → systems → architecture"
};

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export type TechCategory = {
  id: string;
  title: string;
  description?: string;
  items: string[];
};

// ─── Certifications ──────────────────────────────────────────────────────────
export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialUrl?: string;
};

// ─── Education ───────────────────────────────────────────────────────────────
export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
};

// ─── Meet My Brain ───────────────────────────────────────────────────────────
export type BrainQuestion = {
  id: string;
  question: string;
  discipline: "ui" | "ux" | "product" | "frontend" | "systems";
  explanation?: string;
};

// ─── Thought Graph ───────────────────────────────────────────────────────────
export type ThoughtCategory = "ui" | "ux" | "frontend" | "systems" | "product";

export type ThoughtStatus = "completed" | "exploring" | "curious";

export type ThoughtNode = {
  id: string;
  label: string;
  category: ThoughtCategory;
  status: ThoughtStatus;
  experimentSlug?: string;
  description?: string;
};

export type ThoughtEdge = {
  source: string;
  target: string;
};

export type ThoughtExperiment = {
  slug: string;
  number: string;
  title: string;
  question: string;
  startedAt: string;
  ledTo: string[];
  stack: string[];
  quip?: string;
};
