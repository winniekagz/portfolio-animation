/**
 * Content for the ComponentIQ product page (app/componentiq).
 *
 * Status field is load-bearing: "available" items are live and link to the
 * real Storybook/GitHub/npm; "planned" items are the audit/analysis roadmap
 * and never carry a live href. Keep it that way — see the Current Status
 * section, which exists specifically so this page doesn't overclaim.
 */

export type Status = "available" | "planned";

export type CapabilityItem = {
  label: string;
  status: Status;
  description: string;
  href?: string;
};

export type CapabilityGroup = {
  title: string;
  items: CapabilityItem[];
};

export type FlowStep = {
  title: string;
  description: string;
  href?: string;
};

export type Decision = {
  title: string;
  phase: Status;
  problem: string;
  decision: string;
  tradeoff: string;
  benefit: string;
};

export type DocCard = {
  title: string;
  description: string;
  href: string;
};

export const links = {
  deployment: "https://ai-assisted-design-system-ai-featur.vercel.app/",
  storybook: "https://ai-assisted-design-system.vercel.app/",
  storybookConfigureProject:
    "https://ai-assisted-design-system.vercel.app/?path=/docs/configure-your-project--docs",
  storybookDesignTokens:
    "https://ai-assisted-design-system.vercel.app/?path=/docs/design-system-design-tokens--docs",
  storybookDashboardLayout:
    "https://ai-assisted-design-system.vercel.app/?path=/docs/components-layout-dashboardlayout--docs",
  storybookEnhancedDataTable:
    "https://ai-assisted-design-system.vercel.app/?path=/docs/components-enhanced-data-table--docs",
  npm: "https://www.npmjs.com/package/componentiq",
  github: "https://github.com/winniekagz/ai-assisted-design-system/",
} as const;

export const hero = {
  eyebrow: "Configuration → Components → Audits",
  title: "ComponentIQ",
  subtitle: "Design System & Engineering Audit Platform",
  description:
    "A token-first design system and component library for product teams — the configuration foundation an automated codebase audit can eventually stand on. Live today: tokens, components, and a runtime theming provider, documented in Storybook and shipped as an npm package.",
};

export const problems: { label: string; description: string }[] = [
  {
    label: "Inconsistent components",
    description: "Teams rebuild UI that already exists because engineers don't know what's already there.",
  },
  {
    label: "Undocumented standards",
    description: "Design-system rules live in people's heads, not in anything reviewable or versioned.",
  },
  {
    label: "Inaccessible implementations",
    description: "Accessibility gets checked, if at all, after the UI ships — not while it's built.",
  },
  {
    label: "Architecture drift",
    description: "Without a shared token contract, every team's \"design system\" quietly forks.",
  },
  {
    label: "Manual reviews",
    description: "PR review catches token and pattern issues too late, and inconsistently.",
  },
  {
    label: "Inconsistent engineering quality",
    description: "The same UI decision gets made a different way in every pull request.",
  },
];

export const flowToday: FlowStep[] = [
  {
    title: "Install the package",
    description: "Add componentiq and its global CSS to your project.",
    href: links.storybookConfigureProject,
  },
  {
    title: "Connect tokens",
    description: "Apply semantic colors, typography, spacing, and radius through ComponentIqProvider.",
    href: links.storybookDesignTokens,
  },
  {
    title: "Build with components",
    description: "Compose fields, buttons, badges, tables, and layouts that already follow the system.",
    href: links.storybookDashboardLayout,
  },
];

export const flowNext: FlowStep[] = [
  {
    title: "Import repository",
    description: "Connect a GitHub repo with scoped, read-only access.",
  },
  {
    title: "Configure standards",
    description: "Turn on the rulesets that matter: tokens, accessibility, architecture, security.",
  },
  {
    title: "Analyze project",
    description: "Run the same ruleset against the codebase, the same way, every time.",
  },
  {
    title: "Review findings",
    description: "See violations, component coverage, and accessibility/security reports in one place.",
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    title: "Configuration",
    items: [
      {
        label: "Design Tokens",
        status: "available",
        description:
          "A three-layer architecture — TypeScript token contract, default values, and a CSS-variable mapping.",
        href: links.storybookDesignTokens,
      },
      {
        label: "Components",
        status: "available",
        description:
          "Typography, forms, feedback, navigation, DashboardLayout, and an Enhanced Data Table — documented in Storybook.",
        href: links.storybook,
      },
      {
        label: "Theming (ComponentIqProvider)",
        status: "available",
        description: "Wrap once, retheme everywhere — override the full theme or individual tokens per app.",
        href: links.storybookDesignTokens,
      },
      {
        label: "Accessibility Rulesets",
        status: "planned",
        description: "Configurable accessibility standards a project can be audited against.",
      },
      {
        label: "Architecture Rulesets",
        status: "planned",
        description: "Configurable structural/architecture conventions per project.",
      },
      {
        label: "Security Rulesets",
        status: "planned",
        description: "Configurable security conventions per project.",
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      { label: "Findings", status: "planned", description: "A structured list of what an audit run surfaced." },
      { label: "Rule Violations", status: "planned", description: "Specific ruleset breaks, tied back to the rule that defines them." },
      { label: "Component Coverage", status: "planned", description: "How much of a codebase actually uses the shared component library." },
      { label: "Accessibility Reports", status: "planned", description: "Automated accessibility findings per project." },
      { label: "Security Checks", status: "planned", description: "Automated security findings per project." },
    ],
  },
  {
    title: "Developer Experience",
    items: [
      { label: "Storybook", status: "available", description: "Live component docs, examples, and design-token reference.", href: links.storybook },
      { label: "npm Package", status: "available", description: "Install componentiq directly into any React project.", href: links.npm },
      { label: "GitHub", status: "available", description: "Public source for tokens, provider, and components.", href: links.github },
      { label: "Documentation", status: "available", description: "Quick start, token, and component guides in Storybook.", href: links.storybookConfigureProject },
      { label: "CLI", status: "planned", description: "Command-line project setup and audit runs." },
      { label: "CI Integration", status: "planned", description: "Run analysis automatically on every pull request." },
    ],
  },
];

export const decisions: Decision[] = [
  {
    title: "Configuration before auditing",
    phase: "available",
    problem: "You can't meaningfully audit a codebase against standards that don't exist as a versioned contract.",
    decision: "Ship the token and component layer — and ComponentIqProvider — before building any analysis engine.",
    tradeoff: "The more attention-grabbing \"finds your bugs\" feature waits.",
    benefit: "Every future finding will cite a real, versioned rule instead of a guess.",
  },
  {
    title: "A three-layer token architecture",
    phase: "available",
    problem: "Hardcoded colors and spacing don't retheme, and \"design tokens\" often means a loose pile of CSS variables no one owns.",
    decision: "Split tokens into a TypeScript contract, a default-values file, and a CSS-variable mapper.",
    tradeoff: "Three files to reason about instead of one flat object.",
    benefit: "Swapping a theme means passing a different tokens object to ComponentIqProvider — zero component changes.",
  },
  {
    title: "Rules separated from findings",
    phase: "planned",
    problem: "Mixing \"what's allowed\" with \"what a specific run found\" makes rules impossible to reuse, version, or diff.",
    decision: "Model rulesets as their own data, independent of any single analysis run.",
    tradeoff: "More upfront modeling before the first finding ever ships.",
    benefit: "Rules can be shared across projects and reviewed like code, without re-running an audit.",
  },
  {
    title: "Scoped, read-only repository access",
    phase: "planned",
    problem: "Asking a team to grant broad write access to try an unproven audit tool is a large trust ask.",
    decision: "Design repository import as read-only and narrowly scoped from day one.",
    tradeoff: "Automated fixes (auto-opened PRs) need a separate, explicit opt-in later.",
    benefit: "Lowers the trust barrier so teams can adopt analysis before they adopt automation.",
  },
  {
    title: "Repeatable over one-off",
    phase: "planned",
    problem: "Manual PR review catches issues inconsistently, depending on who's reviewing and how much attention is left.",
    decision: "The analysis engine runs the same ruleset the same way every time, on every project.",
    tradeoff: "Rules must be well-specified up front — \"I'll know it when I see it\" doesn't scale.",
    benefit: "Results are comparable across PRs, across projects, and over time.",
  },
];

export const architectureFlow: { label: string; note: string; status: Status }[] = [
  { label: "Repository", note: "read-only import", status: "planned" },
  { label: "Configuration Engine", note: "token contract + ComponentIqProvider", status: "available" },
  { label: "Component Library", note: "Storybook-documented components", status: "available" },
  { label: "Analysis Engine", note: "not built yet", status: "planned" },
  { label: "Rules → Findings → Dashboard", note: "not built yet", status: "planned" },
];

export const docs: DocCard[] = [
  {
    title: "Quick Start",
    description: "Install, connect tokens, and build your first screen.",
    href: links.storybookConfigureProject,
  },
  {
    title: "Design Tokens",
    description: "The three-layer token system and how to override it.",
    href: links.storybookDesignTokens,
  },
  {
    title: "DashboardLayout",
    description: "A full-page shell with a token-driven sidebar — Executive and Playful variants.",
    href: links.storybookDashboardLayout,
  },
  {
    title: "Enhanced Data Table",
    description: "Sortable, searchable tables built on the same token contract.",
    href: links.storybookEnhancedDataTable,
  },
  {
    title: "Architecture & Source",
    description: "Read the actual token, provider, and component source.",
    href: links.github,
  },
];

export type EvidenceItem = {
  title: string;
  description: string;
  href: string;
  status: Status;
  image?: { src: string; alt: string };
};

export const evidence: EvidenceItem[] = [
  {
    title: "Configure Your Project",
    description: "The real onboarding flow: install the package, connect tokens, build with components.",
    href: links.storybookConfigureProject,
    status: "available",
    image: {
      src: "/image/componentIQ/storybook-configure-project.png",
      alt: "ComponentIQ Storybook \"Configure your project\" guide showing install, connect tokens, and build with components steps",
    },
  },
  {
    title: "Design Tokens",
    description: "Token contract, default values, and CSS-variable mapping, with live examples.",
    href: links.storybookDesignTokens,
    status: "available",
    image: {
      src: "/image/componentIQ/storybook-design-tokens.png",
      alt: "ComponentIQ Storybook Design Tokens page showing the three-layer token architecture and ComponentIqProvider usage",
    },
  },
  {
    title: "DashboardLayout",
    description: "Executive and Playful variants of a full-page, token-driven shell.",
    href: links.storybookDashboardLayout,
    status: "available",
  },
  {
    title: "Enhanced Data Table",
    description: "A real dashboard example: sortable, searchable, token-styled data table.",
    href: links.storybookEnhancedDataTable,
    status: "available",
  },
  {
    title: "Projects & Audit Console",
    description:
      "A local development build of the planned analysis dashboard — project status, audit results, and guardrails. Not public yet; browse the source instead.",
    href: links.github,
    status: "planned",
    image: {
      src: "/image/componentIQ/projects-dashboard.png",
      alt: "Local development build of the ComponentIQ projects dashboard showing audit status, blocking issues, and design-system health per project",
    },
  },
];

export const currentStatus = {
  current: [
    "Live Deployment",
    "Design Tokens",
    "Component Library",
    "ComponentIqProvider Theming",
    "Storybook",
    "npm Package",
    "Public GitHub Repo",
  ],
  next: [
    "Repository Import",
    "Configurable Rulesets",
    "Analysis Engine",
    "Findings & Rule Violations",
    "Accessibility Reports",
    "Security Checks",
    "CLI",
    "CI Integration",
  ],
};

export const nav = [
  { label: "Overview", href: "#overview" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Documentation", href: "#documentation" },
  { label: "Architecture", href: "#architecture" },
  { label: "Package", href: "#package" },
  { label: "Roadmap", href: "#roadmap" },
] as const;
