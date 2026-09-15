import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { bg, fg, stroke } from "@/design/tokens/color.stylex";
import { border, radius } from "@/design/tokens/shape.stylex";
import { control, icon } from "@/design/tokens/size.stylex";
import { duration } from "@/design/tokens/motion.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";
import { recipe, type VariantProps } from "@/design/recipe";
import { weight } from "@/design/tokens/typography.stylex";

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: space[6],
    whiteSpace: "nowrap",
    borderRadius: radius.lg,
    borderWidth: border.none,
    borderStyle: "solid",
    borderColor: "transparent",
    fontWeight: weight.semibold,
    transitionProperty: "background-color, color, border-color",
    transitionDuration: duration.base,
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
  },

  primary: {
    backgroundColor: { default: bg.accentSolid, ":hover": bg.accentSolidHover },
    color: fg.onSolid,
  },
  outline: {
    borderWidth: border.thin,
    borderColor: stroke.default,
    backgroundColor: { default: bg.surface, ":hover": bg.canvas },
    color: { default: fg.muted, ":hover": fg.default },
  },
  danger: {
    borderWidth: border.thin,
    borderColor: stroke.default,
    backgroundColor: { default: bg.surface, ":hover": bg.dangerSoft },
    color: fg.danger,
  },
  dangerSolid: {
    backgroundColor: { default: bg.dangerSolid, ":hover": bg.dangerSolidHover },
    color: fg.onSolid,
  },
  ghost: {
    backgroundColor: { default: "transparent", ":hover": bg.canvas },
    color: { default: fg.subtle, ":hover": fg.default },
  },

  sm: {
    height: control.sm,
    paddingInline: space[12],
    fontWeight: weight.medium,
  },
  md: {
    height: control.md,
    paddingInline: space[16],
  },
  square: {
    width: control.square,
    height: control.square,
    borderRadius: radius.xxxl,
  },
});

const button = recipe({
  base: [text.body, styles.base],
  variants: {
    variant: {
      primary: styles.primary,
      outline: styles.outline,
      danger: styles.danger,
      dangerSolid: styles.dangerSolid,
      ghost: styles.ghost,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      square: styles.square,
    },
  },
  defaults: { variant: "primary", size: "md" },
});

/** The size a Button's icon should be. Exported so callers stay on the scale. */
export const buttonIcon = stylex.create({
  sm: { width: icon.sm, height: icon.sm },
  md: { width: icon.md, height: icon.md },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button.variants> {
  sx?: stylex.StyleXStyles;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, sx, ...props }, ref) => (
    <button ref={ref} {...props} {...stylex.props(...button({ variant, size }), sx)} />
  ),
);
Button.displayName = "Button";
