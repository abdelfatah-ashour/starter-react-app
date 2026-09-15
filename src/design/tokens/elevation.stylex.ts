import * as stylex from "@stylexjs/stylex";

/**
 * Shadows. Theme-dependent (a shadow that reads on white is invisible on
 * near-black), so like colour these resolve through `design/theme.css`.
 */
export const shadow = stylex.defineVars({
  /** Panels resting on the canvas. */
  card: "var(--pb-shadow-card)",
  /** A control lifted off its track, such as the active segment of a toggle. */
  raised: "var(--pb-shadow-raised)",
  /** Transient surfaces: tooltips, menus. */
  popover: "var(--pb-shadow-popover)",
});
