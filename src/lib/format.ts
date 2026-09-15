import type { KpiFormat } from "@/types";

/** `$85,370` — whole dollars, no cents. */
export const formatCurrency = (value: number) =>
  "$" + Math.round(value).toLocaleString("en-US");

/** Compact axis money: `$75k`. */
export const formatCurrencyCompact = (value: number) =>
  value === 0 ? "0" : `$${Math.round(value / 1000)}k`;

/** Plain count: `15`. */
export const formatNumber = (value: number) => value.toLocaleString("en-US");

/** Fraction to percent with one decimal: 0.032 -> `3.2%`. */
export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

/** Signed change: 0.055 -> `+5.5%`, -0.004 -> `-0.4%`. */
export const formatDelta = (value: number) => {
  const pct = (value * 100).toFixed(1);
  return `${value >= 0 ? "+" : ""}${pct}%`;
};

/** Formats a KPI according to its declared format. */
export const formatKpiValue = (value: number, format: KpiFormat) => {
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "percent":
      return formatPercent(value);
    case "number":
    case "score":
      return formatNumber(value);
  }
};

/** `2026-08-31` -> `Aug 31, 2026`; null -> em dash. */
export const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

/** `2026-08` -> `Aug` for chart ticks. */
export const formatMonthShort = (month: string) => {
  const date = new Date(`${month}-01T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
};

/** `2026-08` -> `Aug 2026` for chart tooltips. */
export const formatMonthLong = (month: string) => {
  const date = new Date(`${month}-01T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
};
