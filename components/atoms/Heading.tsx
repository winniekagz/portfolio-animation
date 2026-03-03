import type { ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headingTagByLevel: Record<HeadingLevel, HeadingTag> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export function Heading({
  level = 2,
  children,
  className,
  ...props
}: {
  level?: HeadingLevel;
  children?: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = headingTagByLevel[level];
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}
