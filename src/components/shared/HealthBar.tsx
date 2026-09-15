import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Inline } from "@/design/primitives";
import { bg, fg, meter } from "@/design/tokens/color.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";

const styles = stylex.create({
  track: {
    /* Thinner than any spacing step; a bar this size is its own measure. */
    height: 5,
    width: { default: space[56], ["@media (min-width: 1280px)"]: space[72] },
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: radius.full,
    backgroundColor: bg.subtle,
  },
  fill: {
    display: "block",
    height: "100%",
    borderRadius: radius.full,
  },
  /* Inherits its size, so the score reads at 14px in a table row and at 15px
     in the account dialog, matching the text it sits beside. */
  score: { color: fg.muted, fontVariantNumeric: "tabular-nums" },
});

/** Thresholds are the product's, not the design system's. */
const fills = stylex.create({
  good: { backgroundColor: meter.good },
  fair: { backgroundColor: meter.fair },
  poor: { backgroundColor: meter.poor },
});

/** The width is per-row data, so it stays an inline style. */
const width = stylex.create({
  percent: (value: number) => ({ width: `${value}%` }),
});

const fillFor = (score: number) => (score >= 70 ? fills.good : score >= 55 ? fills.fair : fills.poor);

/** 0–100 health score as a track plus the number, used in the table and account dialog. */
export function HealthBar({ score, sx }: { score: number; sx?: stylex.StyleXStyles }) {
  const { t } = useTranslation();
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <Inline as="span" gap={10} sx={sx}>
      <span
        role="img"
        aria-label={t("accounts.healthLabel", { score })}
        {...stylex.props(styles.track)}
      >
        <span {...stylex.props(styles.fill, fillFor(score), width.percent(clamped))} />
      </span>
      <span {...stylex.props(styles.score)}>{score}</span>
    </Inline>
  );
}
