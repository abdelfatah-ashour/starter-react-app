import * as stylex from "@stylexjs/stylex";
import { space } from "@/design/tokens/space.stylex";

/**
 * Breakpoints: 640px (sm), 1024px (lg), 1280px (xl). Mobile-first — each is a
 * floor, and `default` covers everything below 640px.
 *
 * Write them as literal strings inside `stylex.create`, never as a shared
 * constant:
 *
 *     paddingInline: { default: space[8], "@media (min-width: 640px)": space[16] }
 *
 * StyleX rewrites overlapping media queries so the widest one wins — it turns
 * the 640px rule into `(min-width: 640px) and (max-width: 1023.99px)` when a
 * 1024px rule sits beside it. That rewrite only fires on keys it can see start
 * with `@media `, and a `defineConsts` reference is still a placeholder at that
 * point. Route a breakpoint through a constant and the rewrite silently stops,
 * leaving two overlapping rules whose winner is decided by emission order —
 * which is how `lg` padding ends up losing to `sm` at desktop width.
 *
 * `defineConsts` is right for every other token; media query keys are the one
 * exception.
 */

export const responsive = stylex.create({
  /** The page gutter, shared by the top bar and the main column so they align. */
  gutter: {
    paddingInline: {
      default: space[8],
      "@media (min-width: 640px)": space[16],
      "@media (min-width: 1024px)": space[32],
    },
  },
});
