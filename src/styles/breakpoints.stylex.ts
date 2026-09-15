import * as stylex from "@stylexjs/stylex";

/**
 * Shared media queries. `defineConsts` inlines these at compile time, which is
 * what lets one set of breakpoints be reused across every component file.
 */
export const bp = stylex.defineConsts({
  sm: "@media (min-width: 640px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
});
