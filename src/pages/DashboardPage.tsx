import { useState } from "react";
import { KpiRow } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AccountsTable } from "@/components/dashboard/AccountsTable";
import { AccountDialog } from "@/components/dashboard/AccountDialog";
import type { Account, Kpi, RevenuePoint } from "@/types";

interface DashboardPageProps {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  accounts: Account[];
}

export function DashboardPage({ kpis, revenueSeries, accounts }: DashboardPageProps) {
  const [selected, setSelected] = useState<Account | null>(null);

  return (
    <div data-testid="dashboard-page" className="flex flex-col gap-4">
      <h2 className="sr-only">Dashboard</h2>
      <KpiRow kpis={kpis} />
      <RevenueChart series={revenueSeries} />
      <AccountsTable accounts={accounts} selectedId={selected?.id ?? null} onSelect={setSelected} />
      <AccountDialog account={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
