import * as stylex from "@stylexjs/stylex";

/**
 * Column tracks for `gridTemplateColumns`. Named so a responsive grid can
 * restate its own default without a hand-written `repeat()` string — see the
 * merge rule in `design/responsive.ts`.
 */
export const track = stylex.defineConsts({
  1: "repeat(1, minmax(0, 1fr))",
  2: "repeat(2, minmax(0, 1fr))",
  3: "repeat(3, minmax(0, 1fr))",
  4: "repeat(4, minmax(0, 1fr))",
});
