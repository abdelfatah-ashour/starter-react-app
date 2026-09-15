import * as stylex from "@stylexjs/stylex";

/**
 * Typed StyleX handles for the design tokens declared in `theme.css`.
 *
 * The values are `var(--…)` references rather than literals on purpose: the
 * light/dark swap happens on `[data-theme]` in plain CSS (see the note in
 * `theme.css`), and pointing the StyleX variables at those custom properties
 * means every component re-themes without knowing a theme exists.
 */
export const color = stylex.defineVars({
  canvas: "var(--color-canvas)",
  surface: "var(--color-surface)",
  hairline: "var(--color-hairline)",

  ink: "var(--color-ink)",
  inkSoft: "var(--color-ink-soft)",
  inkMuted: "var(--color-ink-muted)",

  brand50: "var(--color-brand-50)",
  brand100: "var(--color-brand-100)",
  brand200: "var(--color-brand-200)",
  brand300: "var(--color-brand-300)",
  brand500: "var(--color-brand-500)",
  brand600: "var(--color-brand-600)",
  brand700: "var(--color-brand-700)",

  good: "var(--color-good)",
  goodSoft: "var(--color-good-soft)",
  warn: "var(--color-warn)",
  warnBar: "var(--color-warn-bar)",
  warnSoft: "var(--color-warn-soft)",
  bad: "var(--color-bad)",
  badSoft: "var(--color-bad-soft)",
  neutralSoft: "var(--color-neutral-soft)",
  dangerSolid: "var(--color-danger-solid)",
  dangerSolidHover: "var(--color-danger-solid-hover)",
  scrim: "var(--color-scrim)",

  bar: "var(--color-bar)",
  barAccent: "var(--color-bar-accent)",
  target: "var(--color-target)",

  /** Fixed white for text on a brand/danger fill, which stays dark in both themes. */
  onSolid: "#ffffff",
});

export const font = stylex.defineVars({
  sans: "var(--font-sans)",
});

export const radius = stylex.defineVars({
  card: "var(--radius-card)",
});

export const shadow = stylex.defineVars({
  card: "var(--shadow-card)",
  raised: "var(--shadow-raised)",
  popover: "var(--shadow-popover)",
});
