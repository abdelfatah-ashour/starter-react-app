import { cn } from "@/lib/utils";
import { formatDelta } from "@/lib/format";

interface DeltaIndicatorProps {
  delta: number;
  /** Whether an increase is good news (revenue) or bad news (churn). */
  higherIsBetter: boolean;
  caption?: string;
}

/** Direction triangle + signed percent, coloured by whether the move is good. */
export function DeltaIndicator({ delta, higherIsBetter, caption }: DeltaIndicatorProps) {
  const rising = delta >= 0;
  const good = rising === higherIsBetter;

  return (
    <p className="flex flex-wrap items-center gap-x-1.5 text-[13px]">
      <span className={cn("flex items-center gap-1 font-semibold", good ? "text-good" : "text-bad")}>
        <svg width="9" height="8" viewBox="0 0 9 8" aria-hidden="true" className="shrink-0">
          <path d={rising ? "M4.5 0 9 8H0z" : "M4.5 8 0 0h9z"} fill="currentColor" />
        </svg>
        <span className="tabular-nums">{formatDelta(delta)}</span>
        <span className="sr-only">{good ? " (improving)" : " (worsening)"}</span>
      </span>
      {caption ? <span className="whitespace-nowrap text-ink-muted">{caption}</span> : null}
    </p>
  );
}
