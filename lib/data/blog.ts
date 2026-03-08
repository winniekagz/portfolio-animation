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

export const blogPosts: BlogPost[] = [
  {
    id: "system-design-perf",
    title: "System Design and Web Performance",
    summary:
      "Striking the balance between speed and engineering tradeoffs — how architectural decisions shape the user experience at scale.",
    date: "2024-10-12",
    category: "Engineering",
    readTime: "8 min",
    url: "https://medium.com/@winniekagendo35/system-design-and-web-performance-striking-the-balance-between-speed-and-engineering-tradeoffs-af640ea405fb",
    contentBlocks: [],
  },
  {
    id: "mental-health-productivity",
    title: "How Mental Health Affects Productivity in Software Engineering and Life",
    summary:
      "An honest look at how burnout, anxiety, and mental wellness shape the work and output of software engineers.",
    date: "2024-09-05",
    category: "Life & Wellness",
    readTime: "6 min",
    url: "https://medium.com/@winniekagendo35/how-mental-health-affects-productivity-in-software-engineering-and-life-7130d6b3bd36",
    contentBlocks: [],
  },
  {
    id: "building-legacy",
    title: "Building Your Legacy as a Frontend Engineer: Lessons from Youth Plus Africa",
    summary:
      "Reflections on mentorship, community, and what it means to leave a lasting impact as a frontend engineer in Africa.",
    date: "2024-08-20",
    category: "Career",
    readTime: "5 min",
    url: "https://medium.com/@winniekagendo35/building-your-legacy-as-a-frontend-engineer-lessons-from-youth-plus-africa-de9f541c06e4",
    contentBlocks: [],
  },
  {
    id: "formik-yup-forms",
    title: "Building Dynamic and Reusable Forms with Formik and Yup in React",
    summary:
      "A practical guide to composing scalable, validated form systems using Formik and Yup inside a React application.",
    date: "2024-07-14",
    category: "Tutorial",
    readTime: "7 min",
    url: "https://medium.com/@winniekagendo35/building-dynamic-and-reusable-forms-with-formik-and-yup-in-react-a38524f8d0f5",
    contentBlocks: [],
  },
  {
    id: "fullscreen-api",
    title: "Fullscreen JavaScript API: Enhancing User Experience and Performance",
    summary:
      "How the native Fullscreen API unlocks richer, more immersive web experiences and what you need to know to use it well.",
    date: "2024-06-02",
    category: "JavaScript",
    readTime: "5 min",
    url: "https://medium.com/@winniekagendo35/fullscreen-javascript-api-enhancing-user-experience-and-performance-f391b8bae8f8",
    contentBlocks: [],
  },
  {
    id: "microinteractions",
    title: "Crafting Captivating UX: A Guide to Microinteractions for Front-end Devs",
    summary:
      "The small moments that make interfaces feel alive — a deep dive into designing and implementing microinteractions.",
    date: "2024-05-18",
    category: "UX Design",
    readTime: "6 min",
    url: "https://medium.com/@winniekagendo35/crafting-captivating-ux-a-guide-to-microinteractions-for-front-end-devs-9acdd2dc31ed",
    contentBlocks: [],
  },
];
