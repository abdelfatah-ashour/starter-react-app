import * as stylex from "@stylexjs/stylex";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatMonthLong,
  formatMonthShort,
} from "@/lib/format";
import type { RevenuePoint } from "@/types";
import { Box, Inline, Stack, Text } from "@/design/primitives";
import { chart, fg } from "@/design/tokens/color.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";
import { surface } from "@/design/surface";
import { text } from "@/design/text";

const AXIS_TICKS = [0, 25_000, 50_000, 75_000, 100_000];

const styles = stylex.create({
  /* The chart header stacks: the legend sits under the title, not beside it. */
  header: { display: "block" },
  legend: { marginTop: space[12] },
  swatchLabel: { color: fg.muted },
  swatchSquare: { width: space[12], height: space[12], borderRadius: radius.xs },
  swatchDot: { width: space[12], height: space[12], borderRadius: radius.full },
  content: { paddingTop: space[16] },
  /* Tall enough for twelve columns to stay legible, short enough to stay above the fold. */
  plot: { height: 280, width: "100%" },
  tooltip: {
    paddingInline: space[12],
    paddingBlock: space[8],
  },
});

/** Swatch fills come from the chart palette, so they stay inline styles. */
const swatchFill = stylex.create({
  color: (value: string) => ({ backgroundColor: value }),
});

function ChartTooltip({
  active,
  payload,
  label,
  labels,
}: {
  active?: boolean;
  payload?: { dataKey?: string | number; value?: number }[];
  label?: string;
  labels: { revenue: string; target: string };
}) {
  if (!active || !payload?.length) return null;
  const revenue = payload.find((entry) => entry.dataKey === "revenue")?.value;
  const target = payload.find((entry) => entry.dataKey === "target")?.value;

  return (
    <Stack gap={4} sx={[surface.popover, styles.tooltip]}>
      <Text variant="bodySm" weight="semibold" tone="default">
        {formatMonthLong(String(label))}
      </Text>
      <Stack>
        <Text variant="bodySm" tone="muted">
          {labels.revenue} {formatCurrency(revenue ?? 0)}
        </Text>
        <Text variant="bodySm" tone="muted">
          {labels.target} {formatCurrency(target ?? 0)}
        </Text>
      </Stack>
    </Stack>
  );
}

function LegendSwatch({
  shape,
  fill,
  label,
}: {
  shape: "square" | "dot";
  fill: string;
  label: string;
}) {
  return (
    <Inline as="span" gap={8} sx={[text.bodySm, styles.swatchLabel]}>
      <span
        aria-hidden="true"
        {...stylex.props(
          shape === "square" ? styles.swatchSquare : styles.swatchDot,
          swatchFill.color(fill),
        )}
      />
      {label}
    </Inline>
  );
}

export function RevenueChart({ series }: { series: RevenuePoint[] }) {
  const { t } = useTranslation();
  const latest = series.at(-1);
  const summary = latest
    ? t("chart.summary", {
        count: series.length,
        month: formatMonthLong(latest.month),
        revenue: formatCurrency(latest.revenue),
        target: formatCurrency(latest.target),
      })
    : t("chart.summaryFallback");

  return (
    <Card>
      <CardHeader sx={styles.header}>
        <CardTitle>{t("chart.title")}</CardTitle>
        <CardDescription>{t("chart.subtitle")}</CardDescription>
        <Inline gap={20} sx={styles.legend}>
          <LegendSwatch shape="square" fill={chart.barActive} label={t("chart.revenue")} />
          <LegendSwatch shape="dot" fill={chart.target} label={t("chart.target")} />
        </Inline>
      </CardHeader>
      <CardContent sx={styles.content}>
        <Box
          data-testid="revenue-chart"
          role="img"
          dir="ltr"
          aria-label={summary}
          sx={styles.plot}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={series}
              barCategoryGap="28%"
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke={chart.grid} vertical={false} />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonthShort}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: chart.axis, fontSize: 13 }}
              />
              <YAxis
                domain={[0, 100_000]}
                ticks={AXIS_TICKS}
                tickFormatter={formatCurrencyCompact}
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fill: chart.axis, fontSize: 13 }}
              />
              <Tooltip
                content={
                  <ChartTooltip
                    labels={{ revenue: t("chart.revenue"), target: t("chart.target") }}
                  />
                }
                cursor={{ fill: chart.cursor, radius: 4 }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                maxBarSize={48}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              >
                {series.map((point, index) => (
                  <Cell
                    key={point.month}
                    fill={index === series.length - 1 ? chart.barActive : chart.bar}
                  />
                ))}
              </Bar>
              <Line
                dataKey="target"
                name="Target"
                type="linear"
                stroke={chart.target}
                strokeWidth={2}
                isAnimationActive={false}
                dot={{ r: 4, fill: chart.dot, stroke: chart.target, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
