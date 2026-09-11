import type { RabbitHole } from "@/lib/types";

export const currentRabbitHole: RabbitHole = {
  id: "rate-limiting",
  topic: "Rate Limiting",
  startingQuestion: "How do I stop someone from abusing an API?",
  connections: [
    "Rate limiting",
    "Multiple application instances",
    "Shared state",
    "Redis",
    "Atomic operations",
    "Concurrency",
    "Distributed systems",
  ],
  currentQuestion: "How do sliding window counters handle edge cases at scale?",
  status: "investigating",
  punchline: "Well... that escalated.",
  // figjamUrl: "https://figma.com/...",
  experimentUrl: "/experiments/rate-limiting",
};

// Archive of past rabbit holes (for future use)
export const pastRabbitHoles: RabbitHole[] = [
  // {
  //   id: "idempotency",
  //   topic: "Idempotent Payments",
  //   startingQuestion: "How do I make sure we don't charge someone twice?",
  //   connections: [
  //     "Idempotency keys",
  //     "Request deduplication",
  //     "Database constraints",
  //     "Distributed locks",
  //     "Exactly-once semantics",
  //   ],
  //   status: "completed",
  //   punchline: "Turns out 'exactly once' is a lie we tell ourselves.",
  // },
];
