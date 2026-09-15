import * as stylex from "@stylexjs/stylex";

/**
 * The spacing scale. The key is the value in pixels — `space[12]` is 12px — so
 * a style reads the same as the design it came from and needs no lookup table.
 *
 * The rhythm is multiples of 4, with 2, 6 and 10 as half steps for tight work
 * (icon gaps, badge padding). Anything not on this list does not belong in a
 * margin, padding or gap; widen the scale rather than reaching for a literal.
 *
 * It doubles as the size scale for small square elements — avatars, brand
 * marks, progress tracks — the way utility frameworks do.
 */
export const space = stylex.defineConsts({
  0: "0",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
  40: "40px",
  48: "48px",
  56: "56px",
  72: "72px",
  80: "80px",
});
