import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    whiteSpace: "nowrap",
    borderRadius: 8,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    fontWeight: 600,
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "150ms",
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
  },
  primary: {
    backgroundColor: { default: color.brand600, ":hover": color.brand700 },
    color: color.onSolid,
  },
  outline: {
    borderWidth: 1,
    borderColor: color.hairline,
    backgroundColor: { default: color.surface, ":hover": color.canvas },
    color: { default: color.inkSoft, ":hover": color.ink },
  },
  danger: {
    borderWidth: 1,
    borderColor: color.hairline,
    backgroundColor: { default: color.surface, ":hover": color.badSoft },
    color: color.bad,
  },
  dangerSolid: {
    backgroundColor: { default: color.dangerSolid, ":hover": color.dangerSolidHover },
    color: color.onSolid,
  },
  ghost: {
    backgroundColor: { default: "transparent", ":hover": color.canvas },
    color: { default: color.inkMuted, ":hover": color.ink },
  },
  sm: {
    height: 34,
    paddingInline: 12,
    fontSize: 14,
    lineHeight: leading.sm,
    fontWeight: 500,
  },
  md: {
    height: 40,
    paddingInline: 16,
    fontSize: 14,
    lineHeight: leading.sm,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
  },
});

export type ButtonVariant = "primary" | "outline" | "danger" | "dangerSolid" | "ghost";
export type ButtonSize = "sm" | "md" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Extra StyleX styles, applied after the variant so they win. */
  sx?: stylex.StyleXStyles;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", sx, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      {...stylex.props(styles.base, styles[variant], styles[size], sx)}
    />
  ),
);
Button.displayName = "Button";
