import * as stylex from "@stylexjs/stylex";

/**
 * Line heights of the type scale the design was built on, as unitless ratios so
 * they inherit correctly into children at a different font size. Sizes not
 * listed here inherit the document default of 1.5.
 *
 * The ratios are the exact ones (12->16, 14->20, 20->28, 24->32) nudged up in
 * the last digit that survives minification. StyleX's CSS pipeline rounds to six
 * significant digits and Chrome then truncates to 1/64px, so an exact
 * 1.4285714... ends up as 19.98px rather than 20px at a 14px font size.
 */
export const leading = stylex.defineConsts({
  /** 12px text -> 16px */
  xs: "1.33334",
  /** 14px text -> 20px */
  sm: "1.42858",
  /** 16px text -> 24px */
  base: "1.5",
  /** 20px text -> 28px */
  xl: "1.4",
  /** 24px text -> 32px */
  xxl: "1.33334",
});
