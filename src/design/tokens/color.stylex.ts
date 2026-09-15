import * as stylex from "@stylexjs/stylex";

/**
 * Semantic colour. Every value points at a custom property declared in
 * `design/theme.css`, which is where light and dark bind their own values —
 * see the note there for why the raw values cannot live in this file.
 *
 * Components name the role ("the muted foreground"), never the colour, so a
 * component never has to know which theme is active.
 */

/** Backgrounds and fills. */
export const bg = stylex.defineVars({
  /** The page behind the panels. */
  canvas: "var(--pb-bg-canvas)",
  /** Cards, dialogs, inputs — anything that sits on the canvas. */
  surface: "var(--pb-bg-surface)",
  /** A quiet fill on a surface: neutral badges, progress tracks. */
  subtle: "var(--pb-bg-subtle)",

  /** Tinted accent fills, lightest first. */
  accentSubtle: "var(--pb-bg-accent-subtle)",
  accentSoft: "var(--pb-bg-accent-soft)",
  /** The brand mark. */
  accentMark: "var(--pb-bg-accent-mark)",
  /** Filled accent controls. */
  accentSolid: "var(--pb-bg-accent-solid)",
  accentSolidHover: "var(--pb-bg-accent-solid-hover)",

  successSoft: "var(--pb-bg-success-soft)",
  warningSoft: "var(--pb-bg-warning-soft)",
  dangerSoft: "var(--pb-bg-danger-soft)",

  /** Filled destructive controls. */
  dangerSolid: "var(--pb-bg-danger-solid)",
  dangerSolidHover: "var(--pb-bg-danger-solid-hover)",

  /** Behind a modal. */
  scrim: "var(--pb-bg-scrim)",
});

/** Text and icons. */
export const fg = stylex.defineVars({
  /** Body text and headings. */
  default: "var(--pb-fg-default)",
  /** Secondary text: table cells, supporting copy. */
  muted: "var(--pb-fg-muted)",
  /** Tertiary text: captions, placeholders, column headers. */
  subtle: "var(--pb-fg-subtle)",
  /** On a solid accent or danger fill. */
  onSolid: "var(--pb-fg-on-solid)",

  accent: "var(--pb-fg-accent)",
  accentStrong: "var(--pb-fg-accent-strong)",
  success: "var(--pb-fg-success)",
  warning: "var(--pb-fg-warning)",
  danger: "var(--pb-fg-danger)",
});

/** Borders, dividers and focus rings. */
export const stroke = stylex.defineVars({
  /** Hairlines: card edges, table rules. */
  default: "var(--pb-stroke-default)",
  /** The border of a focused field. */
  accent: "var(--pb-stroke-accent)",
  /** The border of an invalid field. */
  danger: "var(--pb-stroke-danger)",
  /** The halo around a focused field. */
  ring: "var(--pb-stroke-ring)",
  /** The halo around a focused invalid field. */
  ringDanger: "var(--pb-stroke-ring-danger)",
});

/** Data visualisation. Separate from the UI palette so charts can be retuned alone. */
export const chart = stylex.defineVars({
  /** Bars for every period but the newest. */
  bar: "var(--pb-chart-bar)",
  /** The newest period. */
  barActive: "var(--pb-chart-bar-active)",
  /** The target line and its dots. */
  target: "var(--pb-chart-target)",
  /** Gridlines. */
  grid: "var(--pb-chart-grid)",
  /** Axis tick labels. */
  axis: "var(--pb-chart-axis)",
  /** The hover band behind a column. */
  cursor: "var(--pb-chart-cursor)",
  /** The fill inside a target dot, so the line does not show through. */
  dot: "var(--pb-chart-dot)",
});

/** Health-score bars, keyed by how the score reads rather than by hue. */
export const meter = stylex.defineVars({
  good: "var(--pb-meter-good)",
  fair: "var(--pb-meter-fair)",
  poor: "var(--pb-meter-poor)",
});
