import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";

const styles = stylex.create({
  field: { minWidth: 0 },
  term: { fontSize: 13, color: color.inkMuted },
  value: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: 600,
    overflowWrap: "break-word",
    color: color.ink,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: 24,
    rowGap: 20,
  },
});

/** Label-over-value pair used throughout the account dialog. */
export function Field({
  label,
  children,
  sx,
}: {
  label: string;
  children: ReactNode;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <div {...stylex.props(styles.field, sx)}>
      <dt {...stylex.props(styles.term)}>{label}</dt>
      <dd {...stylex.props(styles.value)}>{children}</dd>
    </div>
  );
}

export function FieldGrid({ children, sx }: { children: ReactNode; sx?: stylex.StyleXStyles }) {
  return <dl {...stylex.props(styles.grid, sx)}>{children}</dl>;
}
