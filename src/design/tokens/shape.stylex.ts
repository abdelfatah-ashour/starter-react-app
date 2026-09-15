import * as stylex from "@stylexjs/stylex";

/** Corner radii, smallest first. */
export const radius = stylex.defineConsts({
  none: "0",
  /** Chart legend swatches. */
  xs: "3px",
  /** Small inline controls. */
  sm: "4px",
  /** The segments of a toggle group. */
  md: "6px",
  /** Buttons, inputs, selects, nav links — the default control radius. */
  lg: "8px",
  /** The brand mark in the top bar. */
  xl: "9px",
  /** The brand mark on the login screen. */
  xxl: "10px",
  /** Square icon buttons. */
  xxxl: "12px",
  /** Cards, dialogs and other panels. */
  card: "14px",
  /** Pills and circles. */
  full: "9999px",
});

/** Border widths. */
export const border = stylex.defineConsts({
  none: "0",
  thin: "1px",
  thick: "2px",
});
