import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  base: {
    height: 40,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: color.surface,
    paddingInline: 12,
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.ink,
    outline: { default: null, ":focus": "none" },
    "::placeholder": { color: color.inkMuted },
  },
  valid: {
    borderColor: { default: color.hairline, ":focus-visible": color.brand500 },
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${color.brand200}` },
  },
  invalid: {
    borderColor: color.bad,
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${color.badSoft}` },
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  sx?: stylex.StyleXStyles;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, sx, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      {...props}
      {...stylex.props(styles.base, invalid ? styles.invalid : styles.valid, sx)}
    />
  ),
);
Input.displayName = "Input";
