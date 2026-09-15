import * as stylex from "@stylexjs/stylex";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TableHeaderCell } from "@/components/ui/table";
import type { SortDirection } from "@/hooks/useSortable";
import { color } from "@/styles/tokens.stylex";

const styles = stylex.create({
  alignEnd: { textAlign: "end" },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    borderRadius: 4,
    color: { default: "inherit", ":hover": color.ink },
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  reversed: { flexDirection: "row-reverse" },
  sorted: { fontWeight: 500, color: color.inkSoft },
  icon: { width: 14, height: 14 },
});

interface SortableHeaderProps {
  /** Also forms the hook: `sort-mrr`. */
  columnKey: string;
  label: string;
  direction: SortDirection | null;
  onToggle: () => void;
  align?: "left" | "right";
  sx?: stylex.StyleXStyles;
}

/** A column header that doubles as the sort control. */
export function SortableHeader({
  columnKey,
  label,
  direction,
  onToggle,
  align = "left",
  sx,
}: SortableHeaderProps) {
  const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
  const end = align === "right";

  return (
    <TableHeaderCell aria-sort={ariaSort} sx={[end && styles.alignEnd, sx]}>
      <button
        type="button"
        data-testid={`sort-${columnKey}`}
        onClick={onToggle}
        {...stylex.props(
          styles.button,
          direction && styles.sorted,
          end && styles.reversed,
        )}
      >
        <span>{label}</span>
        {direction === "asc" ? (
          <ArrowUp aria-hidden="true" {...stylex.props(styles.icon)} />
        ) : direction === "desc" ? (
          <ArrowDown aria-hidden="true" {...stylex.props(styles.icon)} />
        ) : null}
      </button>
    </TableHeaderCell>
  );
}
