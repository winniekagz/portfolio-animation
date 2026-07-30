import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <span className="text-brand-text-muted" aria-hidden>
      <ChevronDown className="h-8 w-8" />
    </span>
  );
}
