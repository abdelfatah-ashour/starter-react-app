import * as stylex from "@stylexjs/stylex";
import { space } from "@/design/tokens/space.stylex";

/** Shared by Stack, Inline and Grid, so one `gap="12"` means the same everywhere. */
export const gaps = stylex.create({
  0: { gap: space[0] },
  2: { gap: space[2] },
  4: { gap: space[4] },
  6: { gap: space[6] },
  8: { gap: space[8] },
  10: { gap: space[10] },
  12: { gap: space[12] },
  16: { gap: space[16] },
  20: { gap: space[20] },
  24: { gap: space[24] },
  28: { gap: space[28] },
  32: { gap: space[32] },
  40: { gap: space[40] },
});

export type Gap = keyof typeof gaps;

export const aligns = stylex.create({
  start: { alignItems: "flex-start" },
  center: { alignItems: "center" },
  end: { alignItems: "flex-end" },
  stretch: { alignItems: "stretch" },
  baseline: { alignItems: "baseline" },
});

export type Align = keyof typeof aligns;

export const justifies = stylex.create({
  start: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  between: { justifyContent: "space-between" },
});

export type Justify = keyof typeof justifies;
