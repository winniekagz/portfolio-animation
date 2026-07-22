export type CaseStudyLink = {
  label: string;
  href: string;
};

export type Decision = {
  title: string;
  reason: string;
  tradeoff: string;
  outcome: string;
};

export type NamedDescription = {
  title: string;
  description: string;
};

export type Workflow = {
  title: string;
  steps: string[];
};

export type RoadmapPhase = {
  title: string;
  items: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: CaseStudyLink[];
  problem: string[];
  productGoal: string;
  users: NamedDescription[];
  systemParts: NamedDescription[];
  architectureTree: string;
  architectureNotes: string[];
  decisions: Decision[];
  workflows: Workflow[];
  designSystem: string[];
  scope: {
    included: string[];
    excluded: string[];
  };
  roadmap: RoadmapPhase[];
  impact: string[];
  reflection: string[];
};

export const caseStudies: CaseStudy[] = [
  // {
  //   slug: "componentiq",
  //   title: "ComponentIQ",
  //   subtitle: "In-Progress AI-Assisted Design System Platform",
  //   description:
  //     "An in-progress frontend architecture case study for a monorepo-based platform combining docs, Storybook, and AI-assisted workflows. The current work focuses on product direction, system shape, guardrails, and implementation planning rather than a completed production launch.",
  //   tags: [
  //     "React / Next.js",
  //     "TypeScript",
  //     "Monorepo",
  //     "Design Systems",
  //     "Storybook",
  //     "AI Workflows",
  //     "Frontend Architecture",
  //   ],
  //   links: [
  //     { label: "Architecture Notes", href: "#" },
  //     { label: "Planned Docs App", href: "#" },
  //     { label: "Planned AI Assistant", href: "#" },
  //     { label: "Planned Storybook", href: "#" },
  //   ],
  //   problem: [
  //     "Engineers often do not know which component or pattern to use.",
  //     "Teams rebuild UI that already exists.",
  //     "Design-system documentation is often passive.",
  //     "PR reviews catch UI, accessibility, and token issues too late.",
  //     "New engineers need faster onboarding into component rules.",
  //     "Frontend decisions are often undocumented or repeated across PRs.",
  //   ],
  //   productGoal:
  //     "ComponentIQ is being designed to help frontend teams choose reusable components, follow accessibility and design-token guardrails, and review UI decisions before opening a PR.",
  //   users: [
  //     {
  //       title: "Frontend engineers",
  //       description:
  //         "Need to know which component to use and how to use it correctly.",
  //     },
  //     {
  //       title: "New team members",
  //       description: "Need fast onboarding into the design system.",
  //     },
  //     {
  //       title: "Reviewers / tech leads",
  //       description:
  //         "Need earlier visibility into UI, accessibility, and token issues.",
  //     },
  //   ],
  //   systemParts: [
  //     {
  //       title: "Docs App",
  //       description:
  //         "Planned source of truth for components, usage rules, guardrails, and implementation guidance.",
  //     },
  //     {
  //       title: "AI Assistant App",
  //       description:
  //         "Planned decision-support layer for recommendations, setup guidance, and pre-PR audit simulation.",
  //     },
  //     {
  //       title: "Storybook",
  //       description: "Visual component documentation and testing surface.",
  //     },
  //     {
  //       title: "Shared packages",
  //       description:
  //         "UI components, design tokens, guardrail rules, shared types, and config.",
  //     },
  //   ],
  //   architectureTree: `componentiq/
  // apps/
  //   docs-app/
  //   ai-assistant-app/
  //   storybook/
  // packages/
  //   ui/
  //   tokens/
  //   guardrails/
  //   shared-types/
  //   config/`,
  //   architectureNotes: [
  //     "Separation of concerns between documentation, AI workflows, and visual component testing.",
  //     "Shared packages keep design tokens, components, and guardrails consistent.",
  //     "The AI app can evolve independently without making the docs app unstable.",
  //     "Storybook remains scoped to visual component development and QA in the proposed architecture.",
  //   ],
  //   decisions: [
  //     {
  //       title: "Separate Docs App, AI App, and Storybook",
  //       reason: "Each proposed surface serves a different user need.",
  //       tradeoff: "More apps and deployment surfaces.",
  //       outcome:
  //         "Clearer planned UX, easier evolution, and better separation of concerns.",
  //     },
  //     {
  //       title: "Use a monorepo",
  //       reason: "The planned apps need to share components, tokens, rules, and types.",
  //       tradeoff: "Requires stronger project structure and tooling.",
  //       outcome: "A clearer path toward less duplication and better consistency across surfaces.",
  //     },
  //     {
  //       title: "Treat AI as decision support, not source of truth",
  //       reason:
  //         "Design-system rules should remain documented and reviewable.",
  //       tradeoff: "AI needs guardrails and constrained workflows.",
  //       outcome: "Safer AI recommendations grounded in documented rules.",
  //     },
  //     {
  //       title: "Start with PR review simulation before GitHub automation",
  //       reason:
  //         "Validate rules, UX, and structured output before integrating into real PRs.",
  //       tradeoff: "V1 is not fully automated.",
  //       outcome: "Faster MVP with lower risk and clearer learning.",
  //     },
  //   ],
  //   workflows: [
  //     {
  //       title: "Component Recommendation",
  //       steps: [
  //         "User describes UI task",
  //         "AI recommends component or pattern",
  //         "AI explains tradeoffs",
  //         "User follows linked docs",
  //       ],
  //     },
  //     {
  //       title: "Setup Guidance",
  //       steps: [
  //         "User selects stack and options",
  //         "AI generates setup steps",
  //         "User copies implementation guidance",
  //       ],
  //     },
  //     {
  //       title: "Pre-PR Audit Simulation",
  //       steps: [
  //         "User pastes UI plan or code snippet",
  //         "AI checks against guardrails",
  //         "AI returns structured review comments",
  //       ],
  //     },
  //   ],
  //   designSystem: [
  //     "Components are planned to be documented in the Docs App and visually tested in Storybook.",
  //     "Guardrails cover component usage, accessibility, design-token usage, and AI safety.",
  //     "Storybook is scoped to prove actual UI components and variants as the platform matures.",
  //     "Docs explain when and why to use components.",
  //   ],
  //   scope: {
  //     included: [
  //       "Docs App",
  //       "AI Assistant App",
  //       "Storybook",
  //       "shared UI package",
  //       "design tokens",
  //       "guardrail rules",
  //       "5-6 documented components",
  //       "component recommendation flow",
  //       "setup guidance",
  //       "pre-PR audit simulator",
  //     ],
  //     excluded: [
  //       "real GitHub PR comments",
  //       "full RAG over docs",
  //       "user accounts",
  //       "analytics dashboard",
  //       "SDUI renderer",
  //       "advanced governance workflows",
  //     ],
  //   },
  //   roadmap: [
  //     {
  //       title: "V1 Decision Support",
  //       items: [
  //         "Constrained recommendations",
  //         "Setup guidance",
  //         "Pre-PR audit simulation",
  //         "Documented guardrails",
  //       ],
  //     },
  //     {
  //       title: "V2 Workflow Automation",
  //       items: [
  //         "RAG over docs and guardrails",
  //         "GitHub Actions integration",
  //         "structured AI PR comments",
  //         "rule citations in AI responses",
  //         "decision history",
  //         "component adoption metrics",
  //         "token usage audit",
  //         "optional Figma/design handoff integration",
  //       ],
  //     },
  //   ],
  //   impact: [
  //     "Clarifies the product and architecture direction before deeper implementation work.",
  //     "Shows how duplicated UI could be reduced by guiding engineers toward existing components.",
  //     "Defines an onboarding model that would centralize docs, setup guidance, and guardrails.",
  //     "Frames how accessibility, token, and component-choice issues could be surfaced earlier than PR review.",
  //     "Creates a technical communication artifact that explains the decisions behind the platform.",
  //   ],
  //   reflection: [
  //     "AI-assisted developer tools work best when they narrow the decision space instead of pretending to replace engineering judgment.",
  //     "Constrained workflows create better outputs than a generic chatbot because the system can ask for the right inputs and return reviewable structure.",
  //     "Separating docs, AI, and Storybook makes the proposed platform easier to reason about because each surface has one primary job.",
  //     "Next, I would strengthen retrieval, add citations to every recommendation, and connect the audit simulator to real PR workflows.",
  //   ],
  // },
  {
    slug: "offline-first-engineering",
    title: "Offline-First Engineering",
    subtitle: "Reverse-Engineered Notion Architecture Study",
    description:
      "An independent engineering case study explaining why caching a page is not the same as making it available offline, using Notion's offline architecture to reason about dependency guarantees, provenance, hierarchy reconciliation, and freshness.",
    tags: [
      "Reverse Engineering",
      "Offline-First",
      "Frontend Architecture",
      "State Modeling",
      "Data Freshness",
      "Product Systems",
    ],
    links: [
      {
        label: "Source Article",
        href: "https://www.notion.com/blog/how-we-made-notion-available-offline",
      },
      { label: "Prototype Reference", href: "#" },
    ],
    problem: [
      "A cached record can still fail the user if related records, permissions, hierarchy, or freshness guarantees are missing.",
      "A naive offline toggle collapses multiple reasons for offline availability into one boolean and can remove a page too early.",
      "Moving pages inside a hierarchy can create stale inherited offline state unless the system reconciles old and new parent relationships.",
      "Offline content needs a reconnection strategy; otherwise the product returns stale data with false confidence.",
    ],
    productGoal:
      "Explain the architectural difference between local cache and true offline availability, then turn that reasoning into reusable product-engineering principles for teams building resilient frontend systems.",
    users: [
      {
        title: "Engineering managers",
        description:
          "Need evidence that an engineer can reason from product promise to system guarantees, not only reproduce UI behavior.",
      },
      {
        title: "Senior frontend engineers",
        description:
          "Need concrete models for dependency loading, derived state, and reconnection behavior in unreliable-network products.",
      },
      {
        title: "Product teams",
        description:
          "Need clearer language for when a feature can honestly be called offline-ready.",
      },
    ],
    systemParts: [
      {
        title: "Offline Unit",
        description:
          "A page is treated as available offline only when the page and every required render dependency are present locally.",
      },
      {
        title: "Provenance Model",
        description:
          "Separate offline_page state from offline_action causes so explicit, recent, and inherited reasons can be added and removed safely.",
      },
      {
        title: "Hierarchy Reconciliation",
        description:
          "Page moves require insert/delete operations that preserve independent offline reasons while removing stale inherited ones.",
      },
      {
        title: "Freshness Loop",
        description:
          "Push updates and reconnection catch-up keep offline content current instead of treating download time as the final source of truth.",
      },
    ],
    architectureTree: `offline-first/
  local-store/
    pages
    dependencies
    permissions
  offline-model/
    offline_page
    offline_action
  sync/
    push-updates
    reconnect-catch-up
  reconciliation/
    hierarchy-move-log`,
    architectureNotes: [
      "The complete offline unit is larger than the primary page record because rendering depends on nested data.",
      "Derived offline state needs provenance so the product can reverse one cause without deleting another valid cause.",
      "Hierarchy changes are data-model events, not just UI moves, because inherited availability can become stale.",
      "Freshness must be designed with the offline feature, not added after users start trusting local content.",
    ],
    decisions: [
      {
        title: "Model offline as a dependency guarantee",
        reason:
          "Users experience offline mode as a product promise, not as a best-effort cache hit.",
        tradeoff:
          "The system needs to track and validate more records before claiming availability.",
        outcome:
          "The case study distinguishes partial cache success from a page that can fully render offline.",
      },
      {
        title: "Separate result state from cause state",
        reason:
          "A page can be offline because it was explicitly selected, recently opened, or inherited from a parent.",
        tradeoff:
          "The model is more verbose than a single set of page IDs.",
        outcome:
          "The system can remove one reason without accidentally removing valid offline access.",
      },
      {
        title: "Reconcile hierarchy moves with explicit operations",
        reason:
          "Moving a child page changes inherited offline relationships and can leave stale edges behind.",
        tradeoff:
          "The sync layer has to reason about insert and delete operations, not just final tree shape.",
        outcome:
          "The study makes the hidden complexity of offline page trees visible to product and engineering readers.",
      },
      {
        title: "Design reconnect behavior as part of offline mode",
        reason:
          "Offline support is incomplete if the product cannot recover freshness after connectivity returns.",
        tradeoff:
          "The product must define how stale local state, remote updates, and user edits converge.",
        outcome:
          "The final principles move beyond storage into trust, freshness, and user communication.",
      },
    ],
    workflows: [
      {
        title: "Dependency Check",
        steps: [
          "User marks a page available offline",
          "System resolves required render dependencies",
          "Missing dependencies downgrade the status",
          "Only complete local data earns the offline-ready promise",
        ],
      },
      {
        title: "Reason Toggle",
        steps: [
          "User or system adds an offline reason",
          "offline_action stores the cause",
          "offline_page is derived from active causes",
          "Page leaves the offline set only when every reason is gone",
        ],
      },
      {
        title: "Reconnect Freshness",
        steps: [
          "User returns online",
          "System catches up remote changes",
          "Local content is reconciled against newer state",
          "The UI communicates whether content is current",
        ],
      },
    ],
    designSystem: [
      "The implementation reference uses a long-scroll engineering narrative with anchor sections for promise, cache, reasons, forest, freshness, principles, and reflection.",
      "Interactive demos use section-local React state because the goal is to explain system behavior, not introduce global state overhead.",
      "Plain HTML content remains the source of understanding; GSAP and 3D scenes are enhancement layers, not the only way to read the architecture.",
      "The case study is clearly labeled as independent analysis and not affiliated with Notion.",
    ],
    scope: {
      included: [
        "Notion offline architecture analysis",
        "dependency graph reasoning",
        "offline_page and offline_action provenance model",
        "hierarchy reconciliation explanation",
        "freshness and reconnect principles",
        "reflection for applying the pattern to future products",
      ],
      excluded: [
        "claiming ownership of Notion's implementation",
        "copying the reference HTML directly into production",
        "inventing performance metrics",
        "shipping final screen recordings before final assets exist",
      ],
    },
    roadmap: [
      {
        title: "Static Case Study",
        items: [
          "Explain the product promise",
          "Document dependency and provenance models",
          "Show the hierarchy and freshness tradeoffs",
          "Publish with clear independent-analysis disclaimer",
        ],
      },
      {
        title: "Interactive Version",
        items: [
          "Add dependency toggles",
          "Add reason-state toggles",
          "Add hierarchy reconciliation log",
          "Layer GSAP and Three.js scenes after the plain version works",
        ],
      },
    ],
    impact: [
      "Shows systems thinking by turning a public engineering article into a readable architecture model.",
      "Demonstrates technical judgment around cache boundaries, derived state, hierarchy, and freshness.",
      "Creates a build-in-public artifact that hiring teams can use to understand how the engineer thinks.",
      "Frames reverse engineering as product and architecture communication rather than visual teardown alone.",
    ],
    reflection: [
      "Offline-first product work starts with the promise users hear, not the storage mechanism engineers reach for first.",
      "Derived state is safest when the system preserves why it exists.",
      "The harder part of offline support is not downloading data; it is maintaining trust when data moves, permissions change, or connectivity returns.",
      "If I rebuilt this into a production feature, I would define the minimum offline unit first, then design conflict, permission, and freshness behavior before polishing the interface.",
    ],
  },
  // {
  //   slug: "reverse-engineering-lab",
  //   title: "Reverse Engineering Lab",
  //   subtitle: "Product Teardowns & Architecture Translation",
  //   description:
  //     "A collection of product reverse-engineering studies that turn real and reference products into implementation specs, UX critiques, system diagrams, and product decisions that can guide better frontend architecture.",
  //   tags: [
  //     "Product Teardowns",
  //     "UX Reverse Engineering",
  //     "Implementation Specs",
  //     "Frontend Architecture",
  //     "Technical Writing",
  //     "Product Judgment",
  //   ],
  //   links: [
  //     { label: "Offline-First Study", href: "/projects/offline-first-engineering" },
  //     { label: "ComponentIQ Study", href: "/projects/componentiq" },
  //   ],
  //   problem: [
  //     "Strong frontend engineers need to evaluate product behavior, not only implement assigned screens.",
  //     "Design references often hide system decisions that need to be made explicit before a feature can be built safely.",
  //     "Product teams benefit when teardown work becomes requirements, tradeoffs, and implementation guidance instead of screenshots alone.",
  //     "Portfolio work needs to show how an engineer thinks through ambiguity without claiming ownership of products they only studied.",
  //   ],
  //   productGoal:
  //     "Use reverse-engineered product studies to demonstrate product judgment, architecture translation, and communication quality across real-world UI and system behavior.",
  //   users: [
  //     {
  //       title: "Hiring teams",
  //       description:
  //         "Need fast evidence of senior reasoning: constraints, tradeoffs, scope control, and communication.",
  //     },
  //     {
  //       title: "Frontend teams",
  //       description:
  //         "Need implementation-ready notes that connect UX behavior to state, data, and component boundaries.",
  //     },
  //     {
  //       title: "Product partners",
  //       description:
  //         "Need language that turns observed product behavior into decisions they can evaluate.",
  //     },
  //   ],
  //   systemParts: [
  //     {
  //       title: "Teardown Notes",
  //       description:
  //         "Capture what the product does, where the experience breaks down, and what decisions appear to be driving the interface.",
  //     },
  //     {
  //       title: "Decision Model",
  //       description:
  //         "Translate observations into alternatives, tradeoffs, and recommended implementation paths.",
  //     },
  //     {
  //       title: "Design Handoff",
  //       description:
  //         "Convert reference screens into buildable sections, states, responsive rules, and interaction behavior.",
  //     },
  //     {
  //       title: "Reflection",
  //       description:
  //         "Document what would be improved or simplified if the system were rebuilt today.",
  //     },
  //   ],
  //   architectureTree: `reverse-engineering/
  // source-observation/
  //   product-behavior
  //   interaction-states
  // analysis/
  //   constraints
  //   tradeoffs
  //   decisions
  // handoff/
  //   implementation-spec
  //   responsive-rules
  //   state-model
  // reflection/
  //   risks
  //   improvements`,
  //   architectureNotes: [
  //     "The work separates observed product behavior from implementation assumptions.",
  //     "Each study turns visual analysis into buildable product and engineering decisions.",
  //     "The output is intentionally useful to engineering managers because it shows judgment under ambiguity.",
  //     "Disclaimers matter: reverse-engineered studies should not imply ownership of the original product.",
  //   ],
  //   decisions: [
  //     {
  //       title: "Frame teardown as engineering analysis",
  //       reason:
  //         "The portfolio needs to communicate ownership-level thinking, not visual inspiration collecting.",
  //       tradeoff:
  //         "The writing must be more precise and careful about what is observed versus inferred.",
  //       outcome:
  //         "Readers see product judgment, architecture communication, and implementation thinking in the same artifact.",
  //     },
  //     {
  //       title: "Preserve disclaimers and scope",
  //       reason:
  //         "Reverse engineering can easily sound like claimed product ownership if the boundaries are vague.",
  //       tradeoff:
  //         "The case studies need plain language about what was studied, inferred, and proposed.",
  //       outcome:
  //         "The work stays credible while still showing senior-level reasoning.",
  //     },
  //     {
  //       title: "Turn references into reusable handoff structure",
  //       reason:
  //         "A teardown is more valuable when another engineer could build from it.",
  //       tradeoff:
  //         "It requires documenting state, responsiveness, edge cases, and out-of-scope items.",
  //       outcome:
  //         "The studies become practical engineering artifacts, not one-off portfolio pages.",
  //     },
  //     {
  //       title: "Use reflection to show maturity",
  //       reason:
  //         "Senior engineers communicate what they would simplify or redesign after the first pass.",
  //       tradeoff:
  //         "Reflection can expose uncertainty, but it makes the work more trustworthy.",
  //       outcome:
  //         "The portfolio demonstrates judgment instead of only confidence.",
  //     },
  //   ],
  //   workflows: [
  //     {
  //       title: "Observe",
  //       steps: [
  //         "Study the product or design reference",
  //         "Identify the product promise",
  //         "List visible states and constraints",
  //         "Separate facts from assumptions",
  //       ],
  //     },
  //     {
  //       title: "Translate",
  //       steps: [
  //         "Convert behavior into state models",
  //         "Name the architectural decisions",
  //         "Document alternatives and tradeoffs",
  //         "Define what is intentionally out of scope",
  //       ],
  //     },
  //     {
  //       title: "Package",
  //       steps: [
  //         "Write a senior-level case study",
  //         "Add implementation notes",
  //         "Link related artifacts",
  //         "End with what would change in a rebuild",
  //       ],
  //     },
  //   ],
  //   designSystem: [
  //     "The reverse-engineering section should stay compact and evidence-led.",
  //     "Cards on the projects page should distinguish production products from independent analysis.",
  //     "Each artifact should lead to a technical write-up, ADR, system diagram, or implementation spec.",
  //     "Missing metrics should remain missing rather than being replaced with invented numbers.",
  //   ],
  //   scope: {
  //     included: [
  //       "Notion offline-first architecture analysis",
  //       "ComponentIQ product and auth experience reviews",
  //       "Hoppla planning/product references",
  //       "implementation-spec style handoffs",
  //       "senior-level reflection and tradeoff writing",
  //     ],
  //     excluded: [
  //       "claiming employment or product ownership where the work is a study",
  //       "inventing usage numbers",
  //       "presenting screenshots as production outcomes",
  //       "flattening all studies into generic UI work",
  //     ],
  //   },
  //   roadmap: [
  //     {
  //       title: "Portfolio Layer",
  //       items: [
  //         "Add reverse-engineering project entries",
  //         "Link each study to its related case study",
  //         "Tag independent analysis clearly",
  //         "Use consistent decision-led structure",
  //       ],
  //     },
  //     {
  //       title: "Public Writing Layer",
  //       items: [
  //         "Publish Notion offline-first analysis",
  //         "Publish ComponentIQ auth review",
  //         "Publish one Hoppla product teardown",
  //         "Create ADR-style notes for the strongest decisions",
  //       ],
  //     },
  //   ],
  //   impact: [
  //     "Makes reverse-engineered work visible as senior engineering communication.",
  //     "Adds portfolio surface area for product judgment, systems thinking, and technical writing.",
  //     "Creates a bridge between public engineering content and project case studies.",
  //     "Helps visitors understand how the engineer evaluates software, not just how they build it.",
  //   ],
  //   reflection: [
  //     "Reverse engineering is most valuable when it ends in decisions, not admiration.",
  //     "A careful teardown can show judgment without pretending to own the original product.",
  //     "The next improvement is to add visuals and diagrams for each study so the architecture is as scannable as the writing.",
  //     "If I expanded this section, I would separate production work, independent analysis, and speculative product exercises with clear labels.",
  //   ],
  // },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
