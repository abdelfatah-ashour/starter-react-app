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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatCurrencyCompact, formatMonthLong, formatMonthShort } from "@/lib/format";
import type { RevenuePoint } from "@/types";

const AXIS_TICKS = [0, 25_000, 50_000, 75_000, 100_000];

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { dataKey?: string | number; value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const revenue = payload.find((entry) => entry.dataKey === "revenue")?.value;
  const target = payload.find((entry) => entry.dataKey === "target")?.value;

  return (
    <div className="card px-3 py-2 text-[13px] shadow-md">
      <p className="font-semibold text-ink">{formatMonthLong(String(label))}</p>
      <p className="mt-1 text-ink-soft">Revenue {formatCurrency(revenue ?? 0)}</p>
      <p className="text-ink-soft">Target {formatCurrency(target ?? 0)}</p>
    </div>
  );
}

function LegendSwatch({ shape, color, label }: { shape: "square" | "dot"; color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[13px] text-ink-soft">
      <span
        aria-hidden="true"
        className={shape === "square" ? "size-3 rounded-[3px]" : "size-3 rounded-full"}
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

export function RevenueChart({ series }: { series: RevenuePoint[] }) {
  const latest = series.at(-1);
  const summary = latest
    ? `Revenue against target for the last ${series.length} months. Latest month ${formatMonthLong(
        latest.month,
      )}: revenue ${formatCurrency(latest.revenue)} against a target of ${formatCurrency(latest.target)}.`
    : "Revenue against target.";

  return (
    <Card>
      <CardHeader className="block">
        <CardTitle>Revenue vs target</CardTitle>
        <CardDescription>Monthly recurring revenue, last 12 months</CardDescription>
        <div className="mt-3 flex items-center gap-5">
          <LegendSwatch shape="square" color="var(--color-bar-accent)" label="Revenue" />
          <LegendSwatch shape="dot" color="var(--color-target)" label="Target" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div data-testid="revenue-chart" role="img" aria-label={summary} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={series} barCategoryGap="28%" margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--color-hairline)" vertical={false} />
              <XAxis
                dataKey="month"
                tickFormatter={formatMonthShort}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 13 }}
              />
              <YAxis
                domain={[0, 100_000]}
                ticks={AXIS_TICKS}
                tickFormatter={formatCurrencyCompact}
                tickLine={false}
                axisLine={false}
                width={56}
                tick={{ fill: "var(--color-ink-muted)", fontSize: 13 }}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "var(--color-brand-50)", radius: 4 }}
              />
              <Bar dataKey="revenue" name="Revenue" maxBarSize={48} radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {series.map((point, index) => (
                  <Cell
                    key={point.month}
                    fill={index === series.length - 1 ? "var(--color-bar-accent)" : "var(--color-bar)"}
                  />
                ))}
              </Bar>
              <Line
                dataKey="target"
                name="Target"
                type="linear"
                stroke="var(--color-target)"
                strokeWidth={2}
                isAnimationActive={false}
                dot={{ r: 4, fill: "var(--color-surface)", stroke: "var(--color-target)", strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
