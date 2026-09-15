import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Box, type BoxAttributes, type BoxElement } from "@/design/primitives/Box";
import { aligns, gaps, justifies, type Align, type Gap, type Justify } from "@/design/primitives/flex";

const styles = stylex.create({
  inline: { display: "flex", flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
});

export interface InlineProps extends BoxAttributes {
  as?: BoxElement | "span";
  /** A step on the spacing scale, in pixels. */
  gap?: Gap;
  /** Defaults to `center`, which is what a row of controls almost always wants. */
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  sx?: stylex.StyleXStyles;
}

/** Children in a row, separated by one gap from the spacing scale. */
export const Inline = React.forwardRef<HTMLElement, InlineProps>(
  ({ gap, align = "center", justify, wrap, sx, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={[
        styles.inline,
        gap !== undefined && gaps[gap],
        aligns[align],
        justify && justifies[justify],
        wrap && styles.wrap,
        sx,
      ]}
    />
  ),
);
Inline.displayName = "Inline";
