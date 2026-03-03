import type { BlogPost } from "@/lib/types";

export const featuredPost: BlogPost = {
  id: "1",
  title: "How we approach narrative design",
  summary: "Scroll-driven storytelling that guides users through a story.",
  date: "2025-02-15",
  contentBlocks: [
    { type: "heading", content: "Story first" },
    { type: "paragraph", content: "We structure each project as a vertical narrative. One idea per section. Scroll reveals the next beat." },
    { type: "heading", content: "Pace with the user" },
    { type: "paragraph", content: "Pinned sections and scrubbed motion tie progress to scroll. You control the pace; we design the sequence." },
    { type: "quote", content: "The best digital stories feel like a conversation, not a slideshow." },
    { type: "heading", content: "From concept to scroll" },
    { type: "paragraph", content: "We prototype in motion early. Typography, spacing, and animation are part of the content model from day one." },
  ],
};
