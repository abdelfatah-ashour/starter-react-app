import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Box, type BoxAttributes, type BoxElement } from "@/design/primitives/Box";
import { aligns, gaps, justifies, type Align, type Gap, type Justify } from "@/design/primitives/flex";

const styles = stylex.create({
  stack: { display: "flex", flexDirection: "column" },
});

export interface StackProps extends BoxAttributes {
  as?: BoxElement;
  /** A step on the spacing scale, in pixels. */
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  sx?: stylex.StyleXStyles;
}

/** Children in a column, separated by one gap from the spacing scale. */
export const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ gap, align, justify, sx, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={[
        styles.stack,
        gap !== undefined && gaps[gap],
        align && aligns[align],
        justify && justifies[justify],
        sx,
      ]}
    />
  ),
);
Stack.displayName = "Stack";
