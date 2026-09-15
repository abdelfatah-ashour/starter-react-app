import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { color } from "@/styles/tokens.stylex";

const styles = stylex.create({
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: color.inkSoft,
  },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  sx?: stylex.StyleXStyles;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ sx, ...props }, ref) => (
  <label ref={ref} {...props} {...stylex.props(styles.label, sx)} />
));
Label.displayName = "Label";
