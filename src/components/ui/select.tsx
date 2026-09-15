import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";
import { bg, fg, stroke } from "@/design/tokens/color.stylex";
import { border, radius } from "@/design/tokens/shape.stylex";
import { control, icon } from "@/design/tokens/size.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text } from "@/design/text";

const styles = stylex.create({
  wrapper: {
    position: "relative",
  },
  select: {
    height: control.md,
    width: "100%",
    appearance: "none",
    borderRadius: radius.lg,
    borderWidth: border.thin,
    borderStyle: "solid",
    borderColor: { default: stroke.default, ":focus-visible": stroke.accent },
    backgroundColor: bg.surface,
    paddingInlineStart: space[12],
    paddingInlineEnd: space[36],
    color: fg.default,
    outline: { default: null, ":focus": "none" },
    boxShadow: { default: null, ":focus-visible": `0 0 0 2px ${stroke.ring}` },
  },
  chevron: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    insetInlineEnd: space[12],
    width: icon.sm,
    height: icon.sm,
    transform: "translateY(-50%)",
    color: fg.subtle,
  },
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Applied to the wrapper, which is the control's outer box. */
  sx?: stylex.StyleXStyles;
}

/**
 * Native select — the acceptance contract requires a real `<select name="role">`,
 * and a native control keeps mobile and keyboard behaviour for free.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, sx, ...props }, ref) => (
    <div {...stylex.props(styles.wrapper, sx)}>
      <select ref={ref} {...props} {...stylex.props(text.body, styles.select)}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" {...stylex.props(styles.chevron)} />
    </div>
  ),
);
Select.displayName = "Select";
