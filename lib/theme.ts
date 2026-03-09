
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
    label: "Experience",
    href: "#experience",
    preview: "/image/service.jpg",
    previewAlt: "Experience section",
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
