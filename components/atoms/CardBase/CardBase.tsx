import type { ReactNode } from "react";

export function CardBase({
  children,
  className,
  ...props
}: { children?: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
