import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 9999,
    paddingInline: 10,
    paddingBlock: 4,
    fontSize: 12,
    lineHeight: leading.xs,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  good: { backgroundColor: color.goodSoft, color: color.good },
  warn: { backgroundColor: color.warnSoft, color: color.warn },
  bad: { backgroundColor: color.badSoft, color: color.bad },
  brand: { backgroundColor: color.brand50, color: color.brand700 },
  neutral: { backgroundColor: color.neutralSoft, color: color.inkMuted },
});

export type BadgeTone = "good" | "warn" | "bad" | "brand" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", ...props }: BadgeProps) {
  return <span {...props} {...stylex.props(styles.base, styles[tone])} />;
}
