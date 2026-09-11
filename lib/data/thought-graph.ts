import type { ThoughtNode, ThoughtEdge, ThoughtExperiment } from "@/lib/types";

// ─── Central Node ────────────────────────────────────────────────────────────
export const centerNode: ThoughtNode = {
  id: "center",
  label: "Why?",
  category: "product",
  status: "completed",
  description: "The question that starts everything.",
};

// ─── Domain Nodes (Ring 1) ───────────────────────────────────────────────────
export const domainNodes: ThoughtNode[] = [
  {
    id: "ui",
    label: "UI Engineering",
    category: "ui",
    status: "completed",
    description: "How interfaces feel and respond.",
  },
  {
    id: "ux",
    label: "UX",
    category: "ux",
    status: "completed",
    description: "How humans experience systems.",
  },
  {
    id: "frontend",
    label: "Frontend Systems",
    category: "frontend",
    status: "exploring",
    description: "How the client orchestrates complexity.",
  },
  {
    id: "product",
    label: "Product",
    category: "product",
    status: "completed",
    description: "Why we build what we build.",
  },
  {
    id: "systems",
    label: "Systems",
    category: "systems",
    status: "exploring",
    description: "How infrastructure supports experience.",
  },
];

// ─── Concept Nodes (Ring 2+) ─────────────────────────────────────────────────
export const conceptNodes: ThoughtNode[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // UI ENGINEERING RABBIT HOLE
  // Motion → State Transitions → Perceived Performance → Reduced Motion → A11y
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "motion",
    label: "Motion",
    category: "ui",
    status: "completed",
    description: "Animation as communication, not decoration.",
  },
  {
    id: "state-transitions",
    label: "State Transitions",
    category: "ui",
    status: "completed",
    description: "Visual continuity between states.",
  },
  {
    id: "perceived-perf",
    label: "Perceived Perf",
    category: "ui",
    status: "completed",
    description: "Speed is a feeling, not just a number.",
  },
  {
    id: "reduced-motion",
    label: "Reduced Motion",
    category: "ui",
    status: "completed",
    description: "Respecting user preferences.",
  },
  {
    id: "a11y",
    label: "Accessibility",
    category: "ui",
    status: "exploring",
    description: "Interfaces that work for everyone.",
  },

  // Component API → Composition → Variants → Tokens → Design Systems
  {
    id: "components",
    label: "Component API",
    category: "ui",
    status: "completed",
    description: "The contract between builder and consumer.",
  },
  {
    id: "composition",
    label: "Composition",
    category: "ui",
    status: "completed",
    description: "Building complex from simple.",
  },
  {
    id: "variants",
    label: "Variants",
    category: "ui",
    status: "completed",
    description: "Controlled flexibility.",
  },
  {
    id: "tokens",
    label: "Design Tokens",
    category: "ui",
    status: "completed",
    description: "Systematic visual language.",
  },
  {
    id: "design-systems",
    label: "Design Systems",
    category: "ui",
    status: "exploring",
    description: "Codified design decisions.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UX RABBIT HOLE
  // Payment UX → Pending State → Webhooks → Idempotency → Error Recovery → Trust
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "payments",
    label: "Payment UX",
    category: "ux",
    status: "exploring",
    description: "Where trust meets transaction.",
  },
  {
    id: "pending-state",
    label: "Pending State",
    category: "ux",
    status: "exploring",
    description: "What happens while we wait?",
  },
  {
    id: "feedback",
    label: "Feedback",
    category: "ux",
    status: "completed",
    description: "The system speaks to the user.",
  },
  {
    id: "trust",
    label: "Trust",
    category: "ux",
    status: "completed",
    description: "Confidence through clarity.",
  },
  {
    id: "error-recovery",
    label: "Error Recovery",
    category: "ux",
    status: "exploring",
    description: "Graceful degradation, clear paths forward.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRONTEND SYSTEMS RABBIT HOLE
  // Offline UX → Optimistic UI → Local State → Sync → Conflict Resolution → Eventual Consistency
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "offline-ux",
    label: "Offline UX",
    category: "frontend",
    status: "exploring",
    experimentSlug: "offline-first",
    description: "What works without a connection?",
  },
  {
    id: "optimistic-ui",
    label: "Optimistic UI",
    category: "frontend",
    status: "exploring",
    description: "Assume success, handle failure.",
  },
  {
    id: "local-state",
    label: "Local State",
    category: "frontend",
    status: "exploring",
    description: "The client as source of truth.",
  },
  {
    id: "sync",
    label: "Sync",
    category: "frontend",
    status: "curious",
    description: "Reconciling two worlds.",
  },
  {
    id: "conflict-resolution",
    label: "Conflict Resolution",
    category: "frontend",
    status: "curious",
    description: "When both sides are right.",
  },
  {
    id: "eventual-consistency",
    label: "Eventual Consistency",
    category: "frontend",
    status: "curious",
    description: "Agreement, eventually.",
  },

  // Async operations chain
  {
    id: "state",
    label: "State Mgmt",
    category: "frontend",
    status: "completed",
    description: "Where does the truth live?",
  },
  {
    id: "async",
    label: "Async Ops",
    category: "frontend",
    status: "exploring",
    description: "Handling the unpredictable.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT THINKING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tradeoffs",
    label: "Tradeoffs",
    category: "product",
    status: "completed",
    description: "Every decision has a cost.",
  },
  {
    id: "constraints",
    label: "Constraints",
    category: "product",
    status: "completed",
    description: "Boundaries enable creativity.",
  },
  {
    id: "scope",
    label: "Scope",
    category: "product",
    status: "completed",
    description: "What are we actually building?",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SYSTEMS RABBIT HOLE
  // Rate Limiting → Redis → Shared State → Atomicity → Concurrency → Race Conditions → Distributed
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "rate-limiting",
    label: "Rate Limiting",
    category: "systems",
    status: "completed",
    experimentSlug: "rate-limiting",
    description: "Protecting resources from abuse.",
  },
  {
    id: "redis",
    label: "Redis",
    category: "systems",
    status: "completed",
    description: "Fast, shared, ephemeral.",
  },
  {
    id: "shared-state",
    label: "Shared State",
    category: "systems",
    status: "exploring",
    description: "Multiple processes, one truth.",
  },
  {
    id: "atomicity",
    label: "Atomicity",
    category: "systems",
    status: "exploring",
    description: "All or nothing.",
  },
  {
    id: "concurrency",
    label: "Concurrency",
    category: "systems",
    status: "exploring",
    description: "Many things at once.",
  },
  {
    id: "race-conditions",
    label: "Race Conditions",
    category: "systems",
    status: "curious",
    description: "When timing becomes a bug.",
  },
  {
    id: "distributed",
    label: "Distributed Systems",
    category: "systems",
    status: "curious",
    description: "Coordination across boundaries.",
  },

  // Reliability chain
  {
    id: "reliability",
    label: "Reliability",
    category: "systems",
    status: "exploring",
    description: "Things will fail. Then what?",
  },
  {
    id: "idempotency",
    label: "Idempotency",
    category: "systems",
    status: "exploring",
    description: "Safe to retry, always.",
  },
  {
    id: "webhooks",
    label: "Webhooks",
    category: "systems",
    status: "exploring",
    description: "Push-based integration.",
  },
  {
    id: "polling-sse",
    label: "Polling / SSE",
    category: "systems",
    status: "exploring",
    description: "Staying in sync.",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI INTEGRATION RABBIT HOLE (Product → AI → Prompts → Outputs → Trust)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "ai-integration",
    label: "AI Integration",
    category: "product",
    status: "exploring",
    experimentSlug: "jobflow-ai-job-search",
    description: "AI as a tool, not magic.",
  },
  {
    id: "prompt-engineering",
    label: "Prompt Engineering",
    category: "product",
    status: "exploring",
    description: "Constraining what AI should do.",
  },
  {
    id: "structured-outputs",
    label: "Structured Outputs",
    category: "frontend",
    status: "exploring",
    description: "Machine-readable AI responses.",
  },
  {
    id: "llm-apis",
    label: "LLM APIs",
    category: "systems",
    status: "exploring",
    description: "AI as a service endpoint.",
  },
];

// ─── All Nodes Combined ──────────────────────────────────────────────────────
export const allNodes: ThoughtNode[] = [centerNode, ...domainNodes, ...conceptNodes];

// ─── Edges ───────────────────────────────────────────────────────────────────
// These define the rabbit hole chains and cross-domain connections
export const edges: ThoughtEdge[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CENTER TO DOMAINS
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "center", target: "ui" },
  { source: "center", target: "ux" },
  { source: "center", target: "frontend" },
  { source: "center", target: "product" },
  { source: "center", target: "systems" },

  // ═══════════════════════════════════════════════════════════════════════════
  // UI RABBIT HOLE: Motion chain
  // Motion → State Transitions → Perceived Perf → Reduced Motion → A11y
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "ui", target: "motion" },
  { source: "motion", target: "state-transitions" },
  { source: "state-transitions", target: "perceived-perf" },
  { source: "perceived-perf", target: "reduced-motion" },
  { source: "reduced-motion", target: "a11y" },

  // UI RABBIT HOLE: Component chain
  // Component API → Composition → Variants → Tokens → Design Systems
  { source: "ui", target: "components" },
  { source: "components", target: "composition" },
  { source: "composition", target: "variants" },
  { source: "variants", target: "tokens" },
  { source: "tokens", target: "design-systems" },

  // ═══════════════════════════════════════════════════════════════════════════
  // UX RABBIT HOLE: Payment chain
  // Payment UX → Pending State → Webhooks → Idempotency → Error Recovery → Trust
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "ux", target: "payments" },
  { source: "payments", target: "pending-state" },
  { source: "pending-state", target: "webhooks" },
  { source: "webhooks", target: "idempotency" },
  { source: "idempotency", target: "error-recovery" },
  { source: "error-recovery", target: "trust" },

  // UX: Feedback loop
  { source: "ux", target: "feedback" },
  { source: "feedback", target: "trust" },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRONTEND RABBIT HOLE: Offline chain
  // Offline UX → Optimistic UI → Local State → Sync → Conflict Resolution → Eventual Consistency
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "frontend", target: "offline-ux" },
  { source: "offline-ux", target: "optimistic-ui" },
  { source: "optimistic-ui", target: "local-state" },
  { source: "local-state", target: "sync" },
  { source: "sync", target: "conflict-resolution" },
  { source: "conflict-resolution", target: "eventual-consistency" },

  // Frontend: State management
  { source: "frontend", target: "state" },
  { source: "state", target: "async" },
  { source: "async", target: "optimistic-ui" },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT: Constraints
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "product", target: "tradeoffs" },
  { source: "product", target: "constraints" },
  { source: "product", target: "scope" },
  { source: "constraints", target: "scope" },

  // ═══════════════════════════════════════════════════════════════════════════
  // SYSTEMS RABBIT HOLE: Rate limiting chain
  // Rate Limiting → Redis → Shared State → Atomicity → Concurrency → Race Conditions → Distributed
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "systems", target: "rate-limiting" },
  { source: "rate-limiting", target: "redis" },
  { source: "redis", target: "shared-state" },
  { source: "shared-state", target: "atomicity" },
  { source: "atomicity", target: "concurrency" },
  { source: "concurrency", target: "race-conditions" },
  { source: "race-conditions", target: "distributed" },

  // Systems: Reliability chain
  { source: "systems", target: "reliability" },
  { source: "reliability", target: "idempotency" },
  { source: "reliability", target: "polling-sse" },

  // ═══════════════════════════════════════════════════════════════════════════
  // CROSS-DOMAIN CONNECTIONS (the interesting part!)
  // These show how disciplines connect
  // ═══════════════════════════════════════════════════════════════════════════
  
  // UI ↔ UX: Motion affects perceived performance which builds trust
  { source: "state-transitions", target: "feedback" },
  { source: "perceived-perf", target: "feedback" },
  
  // Frontend ↔ UX: Optimistic UI creates better feedback
  { source: "optimistic-ui", target: "feedback" },
  { source: "optimistic-ui", target: "pending-state" },
  
  // Frontend ↔ Systems: Async operations need reliability
  { source: "async", target: "reliability" },
  { source: "local-state", target: "shared-state" },
  { source: "eventual-consistency", target: "distributed" },
  
  // UX ↔ Systems: Error recovery needs idempotency
  { source: "error-recovery", target: "idempotency" },
  { source: "payments", target: "idempotency" },
  
  // Product ↔ Everything: Tradeoffs affect all decisions
  { source: "tradeoffs", target: "reliability" },
  { source: "constraints", target: "design-systems" },
  
  // A11y connects across
  { source: "a11y", target: "design-systems" },

  // ═══════════════════════════════════════════════════════════════════════════
  // AI INTEGRATION RABBIT HOLE
  // Product → AI Integration → Prompt Engineering → Structured Outputs → Trust
  // ═══════════════════════════════════════════════════════════════════════════
  { source: "product", target: "ai-integration" },
  { source: "ai-integration", target: "prompt-engineering" },
  { source: "prompt-engineering", target: "structured-outputs" },
  { source: "structured-outputs", target: "trust" },
  { source: "ai-integration", target: "llm-apis" },
  { source: "llm-apis", target: "reliability" },
  
  // AI ↔ Other domains
  { source: "prompt-engineering", target: "constraints" },
  { source: "structured-outputs", target: "async" },
];

// ─── Experiments ─────────────────────────────────────────────────────────────
export const experiments: ThoughtExperiment[] = [
  {
    slug: "rate-limiting",
    number: "001",
    title: "Rate Limiting an API",
    question: "How do I protect an expensive endpoint?",
    startedAt: "API abuse",
    ledTo: ["Redis", "Atomicity", "Concurrency", "Distributed Systems"],
    stack: ["Next.js", "Redis", "Upstash"],
    quip: "I came here to understand rate limiting. Things got out of hand.",
  },
  {
    slug: "offline-first",
    number: "002",
    title: "Offline-First Architecture",
    question: "What if the network is unreliable?",
    startedAt: "Flaky mobile connections",
    ledTo: ["Optimistic UI", "Local State", "Sync", "Conflict Resolution"],
    stack: ["React", "IndexedDB", "Service Workers"],
    quip: "I have more questions than when I started.",
  },
  // Future experiments (not linked yet)
  // {
  //   slug: "payment-flow",
  //   number: "003",
  //   title: "Bulletproof Payment Flow",
  //   question: "How do we never charge someone twice?",
  //   startedAt: "Double-charge bug",
  //   ledTo: ["Idempotency", "Webhooks", "State Machines", "Error Recovery"],
  //   stack: ["Next.js", "Stripe", "PostgreSQL"],
  //   quip: "Turns out 'exactly once' is a lie we tell ourselves.",
  // },
];

// ─── Layout Positions (Desktop) ──────────────────────────────────────────────
// Positions are percentages of container (0-100)
// Organized to show rabbit hole chains flowing outward from domains

export type NodePosition = { x: number; y: number };

export const nodePositions: Record<string, NodePosition> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CENTER - "Why?" node
  // ═══════════════════════════════════════════════════════════════════════════
  center: { x: 50, y: 50 },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN RING (5 domains evenly spaced around center)
  // ═══════════════════════════════════════════════════════════════════════════
  product: { x: 50, y: 30 },      // Above center
  ui: { x: 25, y: 40 },           // Left of center
  ux: { x: 75, y: 40 },           // Right of center
  frontend: { x: 30, y: 65 },     // Below-left
  systems: { x: 70, y: 65 },      // Below-right

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT SECTOR (top, above product domain)
  // ═══════════════════════════════════════════════════════════════════════════
  tradeoffs: { x: 35, y: 15 },
  constraints: { x: 50, y: 10 },
  scope: { x: 65, y: 15 },

  // AI Integration chain (connected to product, flows toward trust and reliability)
  "ai-integration": { x: 62, y: 23 },
  "prompt-engineering": { x: 77, y: 15 },
  "structured-outputs": { x: 77, y: 5 },
  "llm-apis": { x: 62, y: 5 },

  // ═══════════════════════════════════════════════════════════════════════════
  // UI SECTOR (far left column)
  // ═══════════════════════════════════════════════════════════════════════════
  // Motion chain - stacked vertically on left
  motion: { x: 8, y: 25 },
  "state-transitions": { x: 8, y: 38 },
  "perceived-perf": { x: 8, y: 51 },
  "reduced-motion": { x: 8, y: 64 },
  a11y: { x: 8, y: 77 },

  // Component chain - row above UI domain
  components: { x: 25, y: 25 },
  composition: { x: 12, y: 12 },
  variants: { x: 25, y: 12 },
  tokens: { x: 38, y: 12 },
  "design-systems": { x: 25, y: 5 },

  // ═══════════════════════════════════════════════════════════════════════════
  // UX SECTOR (far right column)
  // ═══════════════════════════════════════════════════════════════════════════
  // Payment chain - stacked vertically on right
  payments: { x: 92, y: 25 },
  "pending-state": { x: 92, y: 38 },
  webhooks: { x: 92, y: 51 },
  idempotency: { x: 92, y: 64 },
  "error-recovery": { x: 92, y: 77 },
  trust: { x: 92, y: 90 },

  // Feedback (near UX domain)
  feedback: { x: 75, y: 25 },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRONTEND SECTOR (bottom-left row)
  // ═══════════════════════════════════════════════════════════════════════════
  // State management
  state: { x: 15, y: 65 },
  async: { x: 15, y: 78 },

  // Offline chain - horizontal row at bottom
  "offline-ux": { x: 15, y: 91 },
  "optimistic-ui": { x: 28, y: 78 },
  "local-state": { x: 28, y: 91 },
  sync: { x: 41, y: 78 },
  "conflict-resolution": { x: 41, y: 91 },
  "eventual-consistency": { x: 54, y: 91 },

  // ═══════════════════════════════════════════════════════════════════════════
  // SYSTEMS SECTOR (bottom-right row)
  // ═══════════════════════════════════════════════════════════════════════════
  // Reliability branch
  reliability: { x: 70, y: 78 },
  "polling-sse": { x: 57, y: 65 },

  // Rate limiting chain - horizontal row at bottom-right
  "rate-limiting": { x: 83, y: 65 },
  redis: { x: 83, y: 78 },
  "shared-state": { x: 70, y: 91 },
  atomicity: { x: 83, y: 91 },
  concurrency: { x: 57, y: 78 },
  "race-conditions": { x: 57, y: 91 },
  distributed: { x: 96, y: 91 },
};

// ─── Category Colors ─────────────────────────────────────────────────────────
export const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  ui: {
    border: "border-pink-400/50",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
  },
  ux: {
    border: "border-purple-400/50",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  frontend: {
    border: "border-cyan-400/50",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  product: {
    border: "border-amber-400/50",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  systems: {
    border: "border-emerald-400/50",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
};

// ─── Rabbit Holes (Problem Paths) ────────────────────────────────────────────
// These are the curated problem paths users can select
export interface RabbitHole {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  question: string;
  nodeIds: string[]; // nodes in this path, in order
  category: string;
}

export const rabbitHoles: RabbitHole[] = [
  {
    id: "payment-ux",
    label: "Payment UX",
    shortLabel: "Payments",
    description: "How do you build trust when money is on the line?",
    question: "Why does every payment flow feel fragile?",
    nodeIds: ["ux", "payments", "pending-state", "webhooks", "idempotency", "error-recovery", "trust"],
    category: "ux",
  },
  {
    id: "offline-first",
    label: "Offline-First",
    shortLabel: "Offline",
    description: "What happens when the network lies?",
    question: "How do we build for unreliable connections?",
    nodeIds: ["frontend", "offline-ux", "optimistic-ui", "local-state", "sync", "conflict-resolution", "eventual-consistency"],
    category: "frontend",
  },
  {
    id: "rate-limiting",
    label: "Rate Limiting",
    shortLabel: "Rate Limits",
    description: "How do distributed systems protect themselves?",
    question: "I just wanted to limit API calls...",
    nodeIds: ["systems", "rate-limiting", "redis", "shared-state", "atomicity", "concurrency", "race-conditions", "distributed"],
    category: "systems",
  },
  {
    id: "ui-motion",
    label: "UI Motion",
    shortLabel: "Motion",
    description: "Animation as communication, not decoration.",
    question: "Why do some interfaces feel better than others?",
    nodeIds: ["ui", "motion", "state-transitions", "perceived-perf", "reduced-motion", "a11y"],
    category: "ui",
  },
  {
    id: "component-api",
    label: "Component APIs",
    shortLabel: "Components",
    description: "The contract between builder and consumer.",
    question: "How do you design APIs that scale?",
    nodeIds: ["ui", "components", "composition", "variants", "tokens", "design-systems"],
    category: "ui",
  },
];

// Get edges that belong to a rabbit hole path
export function getRabbitHoleEdges(rabbitHoleId: string): ThoughtEdge[] {
  const hole = rabbitHoles.find((h) => h.id === rabbitHoleId);
  if (!hole) return [];

  const pathEdges: ThoughtEdge[] = [];
  for (let i = 0; i < hole.nodeIds.length - 1; i++) {
    const source = hole.nodeIds[i];
    const target = hole.nodeIds[i + 1];
    // Find matching edge (could be either direction)
    const edge = edges.find(
      (e) =>
        (e.source === source && e.target === target) ||
        (e.source === target && e.target === source)
    );
    if (edge) pathEdges.push(edge);
  }
  return pathEdges;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getNodeById(id: string): ThoughtNode | undefined {
  return allNodes.find((n) => n.id === id);
}

export function getConnectedNodes(nodeId: string): ThoughtNode[] {
  const connectedIds = edges
    .filter((e) => e.source === nodeId || e.target === nodeId)
    .map((e) => (e.source === nodeId ? e.target : e.source));

  return connectedIds
    .map((id) => getNodeById(id))
    .filter((n): n is ThoughtNode => n !== undefined);
}

export function getExperimentBySlug(slug: string): ThoughtExperiment | undefined {
  return experiments.find((e) => e.slug === slug);
}

export function getNodesByCategory(category: string): ThoughtNode[] {
  return allNodes.filter((n) => n.category === category);
}

export function isDomainNode(nodeId: string): boolean {
  return domainNodes.some((n) => n.id === nodeId);
}
