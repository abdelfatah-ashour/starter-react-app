import * as stylex from "@stylexjs/stylex";
import { bg, stroke } from "@/design/tokens/color.stylex";
import { shadow } from "@/design/tokens/elevation.stylex";
import { border, radius } from "@/design/tokens/shape.stylex";

/**
 * Raised panels. Every surface in the app is one of these, so a change to the
 * panel treatment lands everywhere at once.
 */
export const surface = stylex.create({
  /** Cards, dialogs — anything resting on the canvas. */
  card: {
    backgroundColor: bg.surface,
    borderWidth: border.thin,
    borderStyle: "solid",
    borderColor: stroke.default,
    borderRadius: radius.card,
    boxShadow: shadow.card,
  },
  /** Transient surfaces that float over content. */
  popover: {
    backgroundColor: bg.surface,
    borderWidth: border.thin,
    borderStyle: "solid",
    borderColor: stroke.default,
    borderRadius: radius.card,
    boxShadow: shadow.popover,
  },
});
