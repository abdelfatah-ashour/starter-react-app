import * as React from "react";
import * as stylex from "@stylexjs/stylex";

/**
 * The elements a layout primitive may render as. Deliberately a closed list —
 * full polymorphism costs more in type complexity than it returns here.
 */
export type BoxElement =
  | "div"
  | "p"
  | "span"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "nav"
  | "form"
  | "fieldset"
  | "dl"
  | "dt"
  | "dd"
  | "ul"
  | "ol"
  | "li";

/**
 * The attributes every layout primitive forwards. Wider than
 * `HTMLAttributes` so that `as="form"` can carry `onSubmit` and `noValidate`
 * without each primitive needing its own generic element type.
 */
export type BoxAttributes = React.FormHTMLAttributes<HTMLElement>;

export interface BoxProps extends BoxAttributes {
  as?: BoxElement;
  sx?: stylex.StyleXStyles;
}

/**
 * An unstyled element with a `sx` slot. The escape hatch: reach for it when a
 * layout does not fit Stack, Inline or Grid, rather than styling a bare `div`.
 */
export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: As = "div", sx, ...props }, ref) => {
    const Component = As as React.ElementType;
    return <Component ref={ref} {...props} {...stylex.props(sx)} />;
  },
);
Box.displayName = "Box";
