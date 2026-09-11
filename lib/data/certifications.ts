import type { Certification, Education } from "@/lib/types";

export const certifications: Certification[] = [
  {
    id: "ux-for-developers",
    title: "UX for Developers",
    issuer: "LinkedIn",
    issuedDate: "October 2025",
    // credentialUrl: undefined, // Add when available
  },
  {
    id: "advanced-react",
    title: "Advanced React JS",
    issuer: "Udemy",
    issuedDate: "January 2024",
  },
  {
    id: "understanding-typescript",
    title: "Understanding TypeScript",
    issuer: "Udemy",
    issuedDate: "January 2024",
  },
];

export const education: Education[] = [
  {
    id: "degree",
    institution: "University", // Update with actual institution
    degree: "Bachelor's",
    field: "Computer Science", // Update with actual field
    period: "2018 – 2022", // Update with actual period
  },
];
