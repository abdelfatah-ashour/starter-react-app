import * as stylex from "@stylexjs/stylex";

/**
 * Icon box sizes. Icons are set in CSS rather than through the icon library's
 * own `size` prop so they stay on the scale and follow the cascade.
 */
export const icon = stylex.defineConsts({
  /** Sort arrows in a column header. */
  xs: "14px",
  /** The default: inside buttons, next to inputs. */
  sm: "16px",
  /** Standalone icon buttons in the top bar. */
  md: "18px",
});

/** Heights of interactive controls, so a row of them lines up. */
export const control = stylex.defineConsts({
  /** Table row actions. */
  sm: "34px",
  /** Square icon buttons. */
  square: "36px",
  /** Buttons, inputs and selects in a form. */
  md: "40px",
});
