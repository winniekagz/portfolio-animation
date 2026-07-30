import type { ReactNode } from "react";

export function Text({
  children,
  className,
  ...props
}: { children?: ReactNode; className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
}
