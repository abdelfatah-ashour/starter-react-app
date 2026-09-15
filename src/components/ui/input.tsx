import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { bg, fg, stroke } from "@/design/tokens/color.stylex";
import { border, radius } from "@/design/tokens/shape.stylex";
import { control } from "@/design/tokens/size.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";

const styles = stylex.create({
  base: {
    height: control.md,
    width: "100%",
    borderRadius: radius.lg,
    borderWidth: border.thin,
    borderStyle: "solid",
    backgroundColor: bg.surface,
    paddingInline: space[12],
    color: fg.default,
    outline: { default: null, ":focus": "none" },
    "::placeholder": { color: fg.subtle },
  },
  valid: {
    borderColor: { default: stroke.default, ":focus-visible": stroke.accent },
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${stroke.ring}` },
  },
  invalid: {
    borderColor: stroke.danger,
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${stroke.ringDanger}` },
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
      {...stylex.props(text.body, styles.base, invalid ? styles.invalid : styles.valid, sx)}
    />
  ),
);
Input.displayName = "Input";
