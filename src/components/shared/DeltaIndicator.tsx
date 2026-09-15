import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { formatDelta } from "@/lib/format";
import { color } from "@/styles/tokens.stylex";
import { common } from "@/styles/common";

const styles = stylex.create({
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 6,
    fontSize: 13,
  },
  change: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontWeight: 600,
  },
  good: { color: color.good },
  bad: { color: color.bad },
  arrow: { flexShrink: 0 },
  caption: {
    whiteSpace: "nowrap",
    color: color.inkMuted,
  },
});

interface DeltaIndicatorProps {
  delta: number;
  /** Whether an increase is good news (revenue) or bad news (churn). */
  higherIsBetter: boolean;
  caption?: string;
}

/** Direction triangle + signed percent, coloured by whether the move is good. */
export function DeltaIndicator({ delta, higherIsBetter, caption }: DeltaIndicatorProps) {
  const { t } = useTranslation();
  const rising = delta >= 0;
  const good = rising === higherIsBetter;

  return (
    <p {...stylex.props(styles.row)}>
      <span {...stylex.props(styles.change, good ? styles.good : styles.bad)}>
        <svg width="9" height="8" viewBox="0 0 9 8" aria-hidden="true" {...stylex.props(styles.arrow)}>
          <path d={rising ? "M4.5 0 9 8H0z" : "M4.5 8 0 0h9z"} fill="currentColor" />
        </svg>
        <span {...stylex.props(common.tabularNums)}>{formatDelta(delta)}</span>
        <span {...stylex.props(common.srOnly)}>
          {good ? t("kpi.improving") : t("kpi.worsening")}
        </span>
      </span>
      {caption ? <span {...stylex.props(styles.caption)}>{caption}</span> : null}
    </p>
  );
}
