import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-10 w-full rounded-lg border bg-surface px-3 text-sm text-ink placeholder:text-ink-muted",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200",
        invalid ? "border-bad focus-visible:ring-bad-soft" : "border-hairline focus-visible:border-brand-500",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
