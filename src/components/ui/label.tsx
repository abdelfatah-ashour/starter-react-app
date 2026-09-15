import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { fg } from "@/design/tokens/color.stylex";
import { text, weights } from "@/design/text";

const styles = stylex.create({
  label: {
    display: "block",
    color: fg.muted,
  },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  sx?: stylex.StyleXStyles;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ sx, ...props }, ref) => (
  <label
    ref={ref}
    {...props}
    {...stylex.props(text.bodySm, weights.medium, styles.label, sx)}
  />
));
Label.displayName = "Label";
