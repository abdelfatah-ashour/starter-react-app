import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { DeltaIndicator } from "@/components/shared/DeltaIndicator";
import { formatKpiValue } from "@/lib/format";
import type { Kpi } from "@/types";
import { Box, Grid, Text } from "@/design/primitives";
import { space } from "@/design/tokens/space.stylex";
import { leading, size } from "@/design/tokens/typography.stylex";
import { track } from "@/design/tokens/grid.stylex";

const styles = stylex.create({
  card: {
    paddingInline: space[20],
    paddingBlock: space[16],
  },
  /* Both of these step up one place on the type scale at tablet width. The
     `variant` prop resolves at build time, so the responsive half comes through
     `sx` — and restates its default, because StyleX merges one property at a
     time and an override with no default would drop the variant's value. */
  label: {
    fontSize: { default: size[13], ["@media (min-width: 640px)"]: size[14] },
    lineHeight: { default: leading.normal, ["@media (min-width: 640px)"]: leading.body },
  },
  value: {
    marginTop: space[6],
    fontSize: { default: size[26], ["@media (min-width: 640px)"]: size[30] },
    lineHeight: { default: leading.displaySm, ["@media (min-width: 640px)"]: leading.display },
  },
  delta: { marginTop: space[8] },
  row: {
    gridTemplateColumns: { default: track[2], ["@media (min-width: 1280px)"]: track[4] },
    gap: { default: space[12], ["@media (min-width: 640px)"]: space[16] },
  },
});

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const { t } = useTranslation();
  return (
    <Card data-testid="kpi-card" sx={styles.card}>
      <Text variant="bodySm" tone="muted" sx={styles.label}>
        {kpi.label}
      </Text>
      <Text variant="displaySm" tone="default" numeric sx={styles.value}>
        {formatKpiValue(kpi.value, kpi.format)}
      </Text>
      <Box sx={styles.delta}>
        <DeltaIndicator
          delta={kpi.delta}
          higherIsBetter={kpi.higherIsBetter}
          caption={t("kpi.vsLastMonth")}
        />
      </Box>
    </Card>
  );
}

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  const { t } = useTranslation();
  return (
    <section aria-label={t("kpi.heading")}>
      <Grid data-testid="kpi-row" sx={styles.row}>
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </Grid>
    </section>
  );
}
