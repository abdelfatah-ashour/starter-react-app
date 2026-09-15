import * as stylex from "@stylexjs/stylex";
import { color, radius, shadow } from "@/styles/tokens.stylex";

/** Style atoms shared by more than one component. */
export const common = stylex.create({
  /** Visible to screen readers only — the old `sr-only` utility. */
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  /** The raised panel every surface in the app is built from. */
  card: {
    backgroundColor: color.surface,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: color.hairline,
    borderRadius: radius.card,
    boxShadow: shadow.card,
  },
  tabularNums: {
    fontVariantNumeric: "tabular-nums",
  },
});
