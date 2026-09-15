import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableHeaderCell } from "@/components/ui/table";
import type { SortDirection } from "@/hooks/useSortable";

interface SortableHeaderProps {
  /** Also forms the hook: `sort-mrr`. */
  columnKey: string;
  label: string;
  direction: SortDirection | null;
  onToggle: () => void;
  align?: "left" | "right";
  className?: string;
}

/** A column header that doubles as the sort control. */
export function SortableHeader({
  columnKey,
  label,
  direction,
  onToggle,
  align = "left",
  className,
}: SortableHeaderProps) {
  const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";

  return (
    <TableHeaderCell aria-sort={ariaSort} className={cn(align === "right" && "text-right", className)}>
      <button
        type="button"
        data-testid={`sort-${columnKey}`}
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1 rounded transition-colors hover:text-ink",
          direction && "font-medium text-ink-soft",
          align === "right" && "flex-row-reverse",
        )}
      >
        <span>{label}</span>
        {direction === "asc" ? (
          <ArrowUp className="size-3.5" aria-hidden="true" />
        ) : direction === "desc" ? (
          <ArrowDown className="size-3.5" aria-hidden="true" />
        ) : null}
      </button>
    </TableHeaderCell>
  );
}
