import * as React from "react";
import * as stylex from "@stylexjs/stylex";

export const visuallyHidden = stylex.create({
  base: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  as?: "span" | "div" | "h1" | "h2" | "h3" | "caption" | "legend" | "p";
}

/**
 * Content for screen readers only. Use it for the structure a sighted reader
 * gets from layout — section headings, table captions, the meaning of a colour.
 */
export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: As = "span", ...props }, ref) => {
    const Component = As as React.ElementType;
    return <Component ref={ref} {...props} {...stylex.props(visuallyHidden.base)} />;
  },
);
VisuallyHidden.displayName = "VisuallyHidden";
