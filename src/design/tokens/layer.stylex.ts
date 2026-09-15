import * as stylex from "@stylexjs/stylex";

/**
 * Stacking order. Every `zIndex` in the app comes from here, so the order is
 * settled in one place instead of by escalation.
 */
export const layer = stylex.defineConsts({
  base: "0",
  /** The sticky top bar. */
  sticky: "30",
  /** The scrim behind a modal. */
  overlay: "40",
  /** The modal itself. */
  modal: "50",
});
