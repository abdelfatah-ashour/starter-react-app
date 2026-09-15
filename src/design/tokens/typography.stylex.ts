import * as stylex from "@stylexjs/stylex";

export const family = stylex.defineConsts({
  sans: "var(--pb-font-sans)",
});

/**
 * The sizes the type scale is built from. Prefer a whole style from
 * `design/text.ts`; reach for these only to restate a size across a breakpoint.
 */
export const size = stylex.defineConsts({
  11: "11px",
  12: "12px",
  13: "13px",
  14: "14px",
  15: "15px",
  17: "17px",
  19: "19px",
  20: "20px",
  24: "24px",
  26: "26px",
  30: "30px",
});

export const weight = stylex.defineConsts({
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
});

/** Optical tightening. Larger type needs more of it. */
export const tracking = stylex.defineConsts({
  normal: "0",
  /** 17-20px headings. */
  snug: "-0.01em",
  /** 24px and up. */
  tight: "-0.02em",
});

/**
 * Line heights, as unitless ratios so they inherit correctly into children set
 * at a different size — a table header at 13px inside a 14px table should get
 * the ratio, not the parent's pixel value.
 *
 * Each is the exact ratio nudged up in its last significant digit. StyleX's CSS
 * pipeline rounds to six significant digits and Chrome then truncates to
 * 1/64px, so a mathematically exact 1.4285714... resolves to 19.98px instead of
 * 20px at a 14px font size.
 *
 * Prefer a style from `design/text.ts`, which pairs a size with its line
 * height; reach for these directly only to override one.
 */
export const leading = stylex.defineConsts({
  /** 30px -> 36px */
  display: "1.2",
  /** 26px -> 32px */
  displaySm: "1.23077",
  /** 19px -> 24px */
  titleSm: "1.26316",
  /** 12px -> 16px, 15px -> 20px, 24px -> 32px */
  tight: "1.33334",
  /** 20px -> 28px */
  snug: "1.4",
  /** 14px -> 20px */
  body: "1.42858",
  /** The document default. 13px -> 19.5px, 17px -> 25.5px */
  normal: "1.5",
  /** 15px -> 24px */
  relaxed: "1.6",
  /** 14px -> 24px */
  loose: "1.71429",
});
