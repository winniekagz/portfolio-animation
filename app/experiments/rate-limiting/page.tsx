import type { Metadata } from "next";
import { RateLimitingExperiment } from "@/components/experiments/rate-limiting";

export const metadata: Metadata = {
  title: "Rate Limiting in Next.js with Redis",
  description:
    "An interactive engineering experiment exploring API rate limiting, Redis-backed shared state, concurrency, HTTP 429 responses, and the frontend UX of rate limits.",
  alternates: {
    canonical: "https://labs.winfredkagendo.com/experiments/rate-limiting",
  },
  openGraph: {
    title: "Rate Limiting in Next.js with Redis | Winfred Kagendo Labs",
    description:
      "Why does my rate limiter let through more requests than it should? An interactive investigation into distributed rate limiting.",
    url: "https://labs.winfredkagendo.com/experiments/rate-limiting",
    type: "article",
    authors: ["Winfred Kagendo"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rate Limiting in Next.js with Redis",
    description:
      "An interactive experiment exploring why rate limiters break with multiple servers.",
  },
  keywords: [
    "rate limiting",
    "Next.js",
    "Redis",
    "distributed systems",
    "API protection",
    "HTTP 429",
    "concurrency",
  ],
};

export default function RateLimitingPage() {
  return <RateLimitingExperiment />;
}
