import * as stylex from "@stylexjs/stylex";

/** How long a transition runs. */
export const duration = stylex.defineConsts({
  /** Something leaving; exits are quicker than entrances. */
  fast: "120ms",
  /** Hover and press feedback. */
  base: "150ms",
  /** Something entering. */
  slow: "170ms",
});

export const easing = stylex.defineConsts({
  in: "ease-in",
  out: "ease-out",
  /** For a surface that should feel like it has weight. */
  emphasized: "cubic-bezier(0.32, 0.72, 0, 1)",
});
