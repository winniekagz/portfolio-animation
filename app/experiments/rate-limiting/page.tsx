import type { Metadata } from "next";
import { RateLimitingExperiment } from "@/components/experiments/rate-limiting";

export const metadata: Metadata = {
  title: "Rate Limiting Under Load | Labs",
  description:
    "An interactive exploration of rate limiting in distributed systems. Watch how in-memory counters break with multiple servers and learn how Redis solves the problem.",
  openGraph: {
    title: "Rate Limiting Under Load | Labs",
    description:
      "Why does my rate limiter let through more requests than it should? An interactive investigation.",
    type: "article",
  },
};

export default function RateLimitingPage() {
  return <RateLimitingExperiment />;
}
