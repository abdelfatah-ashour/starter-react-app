import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Label-over-value pair used throughout the account dialog. */
export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-[13px] text-ink-muted">{label}</dt>
      <dd className="mt-1 text-[15px] font-semibold break-words text-ink">{children}</dd>
    </div>
  );
}

export function FieldGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-5", className)}>{children}</dl>;
}
