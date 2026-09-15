import * as stylex from "@stylexjs/stylex";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TableHeaderCell } from "@/components/ui/table";
import type { SortDirection } from "@/hooks/useSortable";
import { fg } from "@/design/tokens/color.stylex";
import { duration } from "@/design/tokens/motion.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { icon } from "@/design/tokens/size.stylex";
import { space } from "@/design/tokens/space.stylex";
import { weight } from "@/design/tokens/typography.stylex";

const styles = stylex.create({
  alignEnd: { textAlign: "end" },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: space[4],
    borderRadius: radius.sm,
    color: { default: "inherit", ":hover": fg.default },
    transitionProperty: "color",
    transitionDuration: duration.base,
  },
  /* Puts the arrow on the leading side, so it stays beside a right-aligned column. */
  reversed: { flexDirection: "row-reverse" },
  sorted: { fontWeight: weight.medium, color: fg.muted },
  icon: { width: icon.xs, height: icon.xs },
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
        {...stylex.props(styles.button, direction && styles.sorted, end && styles.reversed)}
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
