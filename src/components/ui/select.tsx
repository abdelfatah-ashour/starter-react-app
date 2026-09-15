import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  wrapper: {
    position: "relative",
  },
  select: {
    height: 40,
    width: "100%",
    appearance: "none",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: color.hairline, ":focus-visible": color.brand500 },
    backgroundColor: color.surface,
    paddingInlineStart: 12,
    paddingInlineEnd: 36,
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.ink,
    outline: { default: null, ":focus": "none" },
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${color.brand200}` },
  },
  chevron: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    insetInlineEnd: 12,
    width: 16,
    height: 16,
    transform: "translateY(-50%)",
    color: color.inkMuted,
  },
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  sx?: stylex.StyleXStyles;
}

/**
 * Native select — the acceptance contract requires a real `<select name="role">`,
 * and a native control keeps mobile and keyboard behaviour for free.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, sx, ...props }, ref) => (
    <div {...stylex.props(styles.wrapper, sx)}>
      <select ref={ref} {...props} {...stylex.props(styles.select)}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" {...stylex.props(styles.chevron)} />
    </div>
  ),
);
Select.displayName = "Select";
