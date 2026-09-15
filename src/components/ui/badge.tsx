import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { bg, fg } from "@/design/tokens/color.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";
import { recipe, type VariantProps } from "@/design/recipe";

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: radius.full,
    paddingInline: space[10],
    paddingBlock: space[4],
    whiteSpace: "nowrap",
  },
  good: { backgroundColor: bg.successSoft, color: fg.success },
  warn: { backgroundColor: bg.warningSoft, color: fg.warning },
  bad: { backgroundColor: bg.dangerSoft, color: fg.danger },
  brand: { backgroundColor: bg.accentSubtle, color: fg.accentStrong },
  neutral: { backgroundColor: bg.subtle, color: fg.subtle },
});

const badge = recipe({
  base: [text.label, styles.base],
  variants: {
    tone: {
      good: styles.good,
      warn: styles.warn,
      bad: styles.bad,
      brand: styles.brand,
      neutral: styles.neutral,
    },
  },
  defaults: { tone: "neutral" },
});

export type BadgeTone = NonNullable<VariantProps<typeof badge.variants>["tone"]>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge.variants> {
  sx?: stylex.StyleXStyles;
}

export function Badge({ tone, sx, ...props }: BadgeProps) {
  return <span {...props} {...stylex.props(...badge({ tone }), sx)} />;
}
