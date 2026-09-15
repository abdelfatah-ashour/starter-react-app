import { cn } from "@/lib/utils";

const toneFor = (score: number) =>
  score >= 70 ? "bg-good" : score >= 55 ? "bg-warn-bar" : "bg-bad";

/** 0–100 health score as a track plus the number, used in the table and account dialog. */
export function HealthBar({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className="h-[5px] w-14 shrink-0 overflow-hidden rounded-full bg-neutral-soft xl:w-[72px]"
        role="img"
        aria-label={`Health ${score} out of 100`}
      >
        <span
          className={cn("block h-full rounded-full", toneFor(score))}
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </span>
      <span className="tabular-nums text-ink-soft">{score}</span>
    </span>
  );
}
