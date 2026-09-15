import { Card } from "@/components/ui/card";
import { DeltaIndicator } from "@/components/shared/DeltaIndicator";
import { formatKpiValue } from "@/lib/format";
import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card data-testid="kpi-card" className="px-5 py-4">
      <p className="text-[13px] text-ink-soft sm:text-sm">{kpi.label}</p>
      <p className="mt-1.5 text-[26px] leading-8 font-bold tracking-[-0.02em] text-ink tabular-nums sm:text-[30px] sm:leading-9">
        {formatKpiValue(kpi.value, kpi.format)}
      </p>
      <div className="mt-2">
        <DeltaIndicator delta={kpi.delta} higherIsBetter={kpi.higherIsBetter} caption="vs last month" />
      </div>
    </Card>
  );
}

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  return (
    <section aria-label="Key performance indicators">
      <div data-testid="kpi-row" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}
