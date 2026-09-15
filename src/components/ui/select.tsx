import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native select — the acceptance contract requires a real `<select name="role">`,
 * and a native control keeps mobile and keyboard behaviour for free.
 */
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-hairline bg-surface px-3 pe-9 text-sm text-ink",
          "focus:outline-none focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-200",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 end-3 size-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  ),
);
Select.displayName = "Select";
