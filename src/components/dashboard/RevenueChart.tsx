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
import { color, shadow } from "@/styles/tokens.stylex";
import { common } from "@/styles/common";

const AXIS_TICKS = [0, 25_000, 50_000, 75_000, 100_000];

const styles = stylex.create({
  header: { display: "block" },
  legend: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  swatchRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: color.inkSoft,
  },
  swatchSquare: { width: 12, height: 12, borderRadius: 3 },
  swatchDot: { width: 12, height: 12, borderRadius: 9999 },
  content: { paddingTop: 16 },
  plot: { height: 280, width: "100%" },
  tooltip: {
    paddingInline: 12,
    paddingBlock: 8,
    fontSize: 13,
    boxShadow: shadow.popover,
  },
  tooltipMonth: { fontWeight: 600, color: color.ink },
  tooltipFirstRow: { marginTop: 4, color: color.inkSoft },
  tooltipRow: { color: color.inkSoft },
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
    <div {...stylex.props(common.card, styles.tooltip)}>
      <p {...stylex.props(styles.tooltipMonth)}>{formatMonthLong(String(label))}</p>
      <p {...stylex.props(styles.tooltipFirstRow)}>
        {labels.revenue} {formatCurrency(revenue ?? 0)}
      </p>
      <p {...stylex.props(styles.tooltipRow)}>
        {labels.target} {formatCurrency(target ?? 0)}
      </p>
    </div>
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
    <span {...stylex.props(styles.swatchRow)}>
      <span
        aria-hidden="true"
        {...stylex.props(
          shape === "square" ? styles.swatchSquare : styles.swatchDot,
          swatchFill.color(fill),
        )}
      />
      {label}
    </span>
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
        <div {...stylex.props(styles.legend)}>
          <LegendSwatch shape="square" fill={color.barAccent} label={t("chart.revenue")} />
          <LegendSwatch shape="dot" fill={color.target} label={t("chart.target")} />
        </div>
      </CardHeader>
      <CardContent sx={styles.content}>
        <div
          data-testid="revenue-chart"
          role="img"
          dir="ltr"
          aria-label={summary}
          {...stylex.props(styles.plot)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={series}
              barCategoryGap="28%"
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke={color.hairline} vertical={false} />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonthShort}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: color.inkMuted, fontSize: 13 }}
              />
              <YAxis
                domain={[0, 100_000]}
                ticks={AXIS_TICKS}
                tickFormatter={formatCurrencyCompact}
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fill: color.inkMuted, fontSize: 13 }}
              />
              <Tooltip
                content={
                  <ChartTooltip labels={{ revenue: t("chart.revenue"), target: t("chart.target") }} />
                }
                cursor={{ fill: color.brand50, radius: 4 }}
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
                    fill={
                      index === series.length - 1
                        ? color.barAccent
                        : color.bar
                    }
                  />
                ))}
              </Bar>
              <Line
                dataKey="target"
                name="Target"
                type="linear"
                stroke={color.target}
                strokeWidth={2}
                isAnimationActive={false}
                dot={{
                  r: 4,
                  fill: color.surface,
                  stroke: color.target,
                  strokeWidth: 2,
                }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
