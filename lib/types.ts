/** PRD §7 Data & Content Models */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  date: string;
  category?: string;
  readTime?: string;
  url?: string;
  contentBlocks: ContentBlock[];
};

export type ContentBlock = {
  type: "heading" | "paragraph" | "quote";
  content: string;
};
