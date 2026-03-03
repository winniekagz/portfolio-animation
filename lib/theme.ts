

export const MENU_ITEMS = [
  {
    label: "Projects",
    href: "/projects",
    preview: "/image/3d.png",
    previewAlt: "Project preview",
  },
  {
    label: "About",
    href: "/about",
    preview: "/image/win.jpeg",
    previewAlt: "Portrait preview",
  },
  {
    label: "Services",
    href: "/services",
    preview: "/image/service.jpg",
    previewAlt: "Services preview",
  },
  {
    label: "Contact",
    href: "/contact",
    preview: "/image/plan.jpg",
    previewAlt: "Contact preview",
  },
] as const;

export type MenuItem = (typeof MENU_ITEMS)[number];
