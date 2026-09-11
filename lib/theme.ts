
export const MENU_ITEMS = [
  {
    label: "Home",
    href: "#hero",
    preview: "/image/3d.png",
    previewAlt: "Hero section",
  },
  {
    label: "About",
    href: "#about",
    preview: "/image/win.jpeg",
    previewAlt: "About section",
  },
  {
    label: "Rabbit Hole",
    href: "#rabbit-hole",
    preview: "/image/service.jpg",
    previewAlt: "Current rabbit hole section",
  },
  {
    label: "Projects",
    href: "#projects",
    preview: "/image/blue-abstract.png",
    previewAlt: "Projects and case studies section",
  },
  {
    label: "Brain",
    href: "#meet-my-brain",
    preview: "/image/plan.jpg",
    previewAlt: "How I think section",
  },
  {
    label: "Background",
    href: "#professional",
    preview: "/image/service.jpg",
    previewAlt: "Professional background section",
  },
  {
    label: "Blog",
    href: "#blog",
    preview: "/image/plan.jpg",
    previewAlt: "Blog section",
  },
  {
    label: "Contact",
    href: "#contact",
    preview: "/image/winblack.jpeg",
    previewAlt: "Contact section",
  },
] as const;

export type MenuItem = (typeof MENU_ITEMS)[number];
