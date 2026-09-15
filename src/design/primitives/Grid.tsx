import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Box, type BoxAttributes, type BoxElement } from "@/design/primitives/Box";
import { gaps, type Gap } from "@/design/primitives/flex";
import { track } from "@/design/tokens/grid.stylex";

const styles = stylex.create({
  grid: { display: "grid" },
});

/**
 * Column counts are a fixed set rather than a number, because StyleX resolves
 * styles at build time. A grid whose column count changes across breakpoints
 * leaves this prop off and sets `gridTemplateColumns` itself, restating the
 * default — see the merge rule in `design/responsive.ts`.
 */
const columnStyles = stylex.create({
  1: { gridTemplateColumns: track[1] },
  2: { gridTemplateColumns: track[2] },
  3: { gridTemplateColumns: track[3] },
  4: { gridTemplateColumns: track[4] },
});

export type GridColumns = keyof typeof columnStyles;

export interface GridProps extends BoxAttributes {
  as?: BoxElement;
  columns?: GridColumns;
  /** A step on the spacing scale, in pixels. */
  gap?: Gap;
  sx?: stylex.StyleXStyles;
}

/** An equal-width column grid. */
export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ columns, gap, sx, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={[styles.grid, columns && columnStyles[columns], gap !== undefined && gaps[gap], sx]}
    />
  ),
);
Grid.displayName = "Grid";
