import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { common } from "@/styles/common";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  track: {
    height: 5,
    width: { default: 56, [bp.xl]: 72 },
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: 9999,
    backgroundColor: color.neutralSoft,
  },
  fill: {
    display: "block",
    height: "100%",
    borderRadius: 9999,
  },
  score: { color: color.inkSoft },
});

const tones = stylex.create({
  good: { backgroundColor: color.good },
  warn: { backgroundColor: color.warnBar },
  bad: { backgroundColor: color.bad },
});

/** The fill width is per-instance data, so it stays an inline style. */
const width = stylex.create({
  percent: (value: number) => ({ width: `${value}%` }),
});

const toneFor = (score: number) => (score >= 70 ? tones.good : score >= 55 ? tones.warn : tones.bad);

/** 0–100 health score as a track plus the number, used in the table and account dialog. */
export function HealthBar({ score, sx }: { score: number; sx?: stylex.StyleXStyles }) {
  const { t } = useTranslation();
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <span {...stylex.props(styles.wrapper, sx)}>
      <span
        role="img"
        aria-label={t("accounts.healthLabel", { score })}
        {...stylex.props(styles.track)}
      >
        <span {...stylex.props(styles.fill, toneFor(score), width.percent(clamped))} />
      </span>
      <span {...stylex.props(common.tabularNums, styles.score)}>{score}</span>
    </span>
  );
}
