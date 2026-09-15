import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingInline: 16,
    paddingBlock: 56,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    lineHeight: leading.sm,
    fontWeight: 600,
    color: color.ink,
  },
  description: {
    fontSize: 13,
    color: color.inkMuted,
  },
});

interface EmptyStateProps {
  title: string;
  description?: string;
  "data-testid"?: string;
}

/** Shown in place of table rows when a filter matches nothing. */
export function EmptyState({ title, description, ...props }: EmptyStateProps) {
  return (
    <div {...props} {...stylex.props(styles.wrapper)}>
      <p {...stylex.props(styles.title)}>{title}</p>
      {description ? <p {...stylex.props(styles.description)}>{description}</p> : null}
    </div>
  );
}
