import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { DeltaIndicator } from "@/components/shared/DeltaIndicator";
import { formatKpiValue } from "@/lib/format";
import type { Kpi } from "@/types";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  card: {
    paddingInline: 20,
    paddingBlock: 16,
  },
  label: {
    fontSize: { default: 13, [bp.sm]: 14 },
    lineHeight: { default: null, [bp.sm]: leading.sm },
    color: color.inkSoft,
  },
  value: {
    marginTop: 6,
    fontSize: { default: 26, [bp.sm]: 30 },
    lineHeight: { default: "32px", [bp.sm]: "36px" },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
  },
  delta: { marginTop: 8 },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [bp.xl]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 12, [bp.sm]: 16 },
  },
});

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const { t } = useTranslation();
  return (
    <Card data-testid="kpi-card" sx={styles.card}>
      <p {...stylex.props(styles.label)}>{kpi.label}</p>
      <p {...stylex.props(styles.value)}>{formatKpiValue(kpi.value, kpi.format)}</p>
      <div {...stylex.props(styles.delta)}>
        <DeltaIndicator
          delta={kpi.delta}
          higherIsBetter={kpi.higherIsBetter}
          caption={t("kpi.vsLastMonth")}
        />
      </div>
    </Card>
  );
}

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  const { t } = useTranslation();
  return (
    <section aria-label={t("kpi.heading")}>
      <div data-testid="kpi-row" {...stylex.props(styles.row)}>
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}
