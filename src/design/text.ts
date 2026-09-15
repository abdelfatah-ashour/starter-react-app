import * as stylex from "@stylexjs/stylex";
import { fg } from "@/design/tokens/color.stylex";
import { leading, tracking, weight } from "@/design/tokens/typography.stylex";

/**
 * The type scale, as whole styles rather than loose size tokens: each one pairs
 * a size with the line height, weight and tracking that were drawn with it.
 * Picking a size and a line height separately is how a type scale drifts, so
 * the system does not offer that — use a variant, and override one property
 * with `weight`/`leadings` when a specific spot needs it.
 *
 * Largest first.
 */
export const text = stylex.create({
  /** Headline figures — the KPI value. */
  displayLg: {
    fontSize: 30,
    lineHeight: leading.display,
    fontWeight: weight.bold,
    letterSpacing: tracking.tight,
  },
  /** The same figure at phone width. */
  displaySm: {
    fontSize: 26,
    lineHeight: leading.displaySm,
    fontWeight: weight.bold,
    letterSpacing: tracking.tight,
  },
  /** Dialog titles. */
  titleLg: {
    fontSize: 24,
    lineHeight: leading.tight,
    fontWeight: weight.bold,
    letterSpacing: tracking.tight,
  },
  /** The wordmark on the login screen. */
  titleMd: {
    fontSize: 20,
    lineHeight: leading.snug,
    fontWeight: weight.bold,
    letterSpacing: tracking.snug,
  },
  /** The heading of a standalone card, such as the sign-in form. */
  titleSm: {
    fontSize: 19,
    lineHeight: leading.titleSm,
    fontWeight: weight.bold,
    letterSpacing: tracking.snug,
  },
  /** The wordmark in the top bar, and compact dialog titles. */
  titleXs: {
    fontSize: 17,
    lineHeight: leading.normal,
    fontWeight: weight.bold,
    letterSpacing: tracking.snug,
  },
  /** Section headings inside a card. */
  heading: {
    fontSize: 15,
    lineHeight: leading.tight,
    fontWeight: weight.bold,
  },
  /** Emphasised body copy: the value half of a label/value pair. */
  bodyLg: {
    fontSize: 15,
    lineHeight: leading.normal,
    fontWeight: weight.regular,
  },
  /** The default. Body copy, table cells, controls. */
  body: {
    fontSize: 14,
    lineHeight: leading.body,
    fontWeight: weight.regular,
  },
  /** Supporting copy: card descriptions, field labels, hints, errors. */
  bodySm: {
    fontSize: 13,
    lineHeight: leading.normal,
    fontWeight: weight.regular,
  },
  /** Badges and other small caps-height chips. */
  label: {
    fontSize: 12,
    lineHeight: leading.tight,
    fontWeight: weight.semibold,
  },
  /** Avatar initials. */
  micro: {
    fontSize: 11,
    lineHeight: leading.normal,
    fontWeight: weight.bold,
  },
});

export type TextVariant = keyof typeof text;

/** Weight overrides, for the places one variant is used at two weights. */
export const weights = stylex.create({
  regular: { fontWeight: weight.regular },
  medium: { fontWeight: weight.medium },
  semibold: { fontWeight: weight.semibold },
  bold: { fontWeight: weight.bold },
});

export type TextWeight = keyof typeof weights;

/** Line-height overrides, for copy that needs to breathe more than its variant. */
export const leadings = stylex.create({
  /**
   * Take the parent's line height. For text set at a different size inside a
   * block that owns the rhythm — a 13px column header inside a 14px table
   * keeps the table's ratio rather than starting its own.
   */
  inherit: { lineHeight: "inherit" },
  tight: { lineHeight: leading.tight },
  snug: { lineHeight: leading.snug },
  normal: { lineHeight: leading.normal },
  relaxed: { lineHeight: leading.relaxed },
  loose: { lineHeight: leading.loose },
});

export type TextLeading = keyof typeof leadings;

/** Foreground colours, named by role. Also used for standalone icons. */
export const tones = stylex.create({
  /** Body text and headings. */
  default: { color: fg.default },
  /** Secondary text. */
  muted: { color: fg.muted },
  /** Tertiary text: captions, column headers. */
  subtle: { color: fg.subtle },
  /** On a solid accent or danger fill. */
  onSolid: { color: fg.onSolid },
  accent: { color: fg.accent },
  accentStrong: { color: fg.accentStrong },
  success: { color: fg.success },
  warning: { color: fg.warning },
  danger: { color: fg.danger },
  /** Take the colour of the surrounding text. */
  inherit: { color: "inherit" },
});

export type TextTone = keyof typeof tones;
