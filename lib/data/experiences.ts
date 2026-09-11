export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "supernomics",
    company: "Supernomics",
    role: "Frontend & Mobile Engineer",
    period: "Jan 2026 – Present",
    stack: ["React.js", "React Native", "Electron.js", "Tailwind CSS", "Expo", "Monorepos"],
    highlights: [
      "Contributed to monorepo-based AI product architecture, using shared package boundaries to keep web, mobile, and product workflows maintainable as the system expands.",
      "Delivered an AI-powered legal application across web, Electron desktop, and Microsoft Office Add-in environments, maintaining cross-platform feature parity while prioritizing release speed, reliable API integrations, and a consistent user experience.",
      "Delivered a React Native and Expo mobile delivery decisions where cross-platform parity, release speed, and API integration quality mattered more than isolated screens.",
      "Owned a shared component library to reduce repeated UI implementation and make product surfaces easier for engineers to extend consistently.",
      "Translated Figma requirements into production web and mobile interfaces while clarifying API contracts and interaction edge cases before they reached implementation risk.",
    ],
  },
  {
    id: "nesti",
    company: "Nesti",
    role: "Mobile Engineer",
    period: "Aug 2025 – Jan 2026",
    stack: ["React Native", "Alipay Mini App", "Figma", "API Integration"],
    highlights: [
      "Delivered mobile UI implementation quality by turning Figma specifications into production interfaces with attention to platform constraints and interaction detail.",
      "Owned an Alipay mini app to production, balancing mini-app platform limitations with the product requirement for a complete mobile experience.",
      "Integrated product APIs across mobile flows, tightening frontend and backend expectations around data shape, loading states, and error handling.",
    ],
  },
  {
    id: "leja",
    company: "Leja",
    role: "Frontend Engineer",
    period: "Jul 2024 – Oct 2025",
    stack: ["React.js", "Next.js", "MUI", "Ant Design", "SEO"],
    highlights: [
      "Chose server-side rendering for business-critical pages where faster perceived loading, indexability, and retention mattered more than a purely client-rendered implementation.",
      "Owned a Safaricom mini app by aligning Ant Design Mini patterns with product requirements, API contracts, and the commercial need to support sales workflows.",
      "Converted Figma systems into responsive React and MUI interfaces while preserving reusable patterns instead of one-off page implementation.",
      "Raised frontend security quality by accounting for XSS and CSRF risks in the browser layer before sensitive flows reached production.",
      "Improved SEO readiness through rendering and metadata decisions that made product pages more discoverable and easier to maintain.",
    ],
  },
  {
    id: "oaknet",
    company: "Oaknet Business",
    role: "Frontend Engineer",
    period: "2023 – 2024",
    stack: ["Vue3.js", "Pinia", "GraphQL", "JavaScript"],
    highlights: [
      "Owned frontend implementation for a SaaS monitoring and evaluation system, coordinating UI requirements with backend teams so product workflows mapped cleanly to data contracts.",
      "Improved the investment appraisal experience by translating complex domain workflows into clearer interface states and interaction paths.",
      "Used Vue 3 and Pinia to keep state management explicit in data-heavy flows where predictable updates were more important than local component convenience.",
      "Integrated GraphQL APIs in ways that aligned query shape with screen-level needs, reducing unnecessary frontend data handling complexity.",
    ],
  },
  {
    id: "pathology",
    company: "Pathology Network",
    role: "Frontend Developer",
    period: "May 2023 – May 2024",
    stack: ["React.js", "TailwindCSS", "React Query", "Material UI"],
    highlights: [
      "Owned creation of reusable React interface patterns that reduced development time by 30% and improved team efficiency by 20% across repeated healthcare product workflows.",
      "Used React Query for server-state heavy screens where caching, loading states, and refetch behavior needed clearer ownership than component-local state.",
      "Balanced Tailwind CSS and Material UI implementation choices to preserve design consistency while keeping delivery practical for the team.",
      "Clarified requirements with cross-functional partners during Agile delivery so healthcare features shipped with fewer late-stage interpretation gaps.",
    ],
  },
];
