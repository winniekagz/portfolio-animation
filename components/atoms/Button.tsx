import type { ReactNode } from "react";
import { forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  { children?: ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ children, className, ...props }, ref) {
  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  );
});
