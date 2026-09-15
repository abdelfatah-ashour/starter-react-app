import { useState } from "react";
import { useTranslation } from "react-i18next";
import { KpiRow } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AccountsTable } from "@/components/dashboard/AccountsTable";
import { AccountDialog } from "@/components/dashboard/AccountDialog";
import type { Account, Kpi, RevenuePoint } from "@/types";
import { Stack, VisuallyHidden } from "@/design/primitives";

interface DashboardPageProps {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  accounts: Account[];
}

export function DashboardPage({ kpis, revenueSeries, accounts }: DashboardPageProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Account | null>(null);

  return (
    <Stack data-testid="dashboard-page" gap={16}>
      <VisuallyHidden as="h2">{t("nav.dashboard")}</VisuallyHidden>
      <KpiRow kpis={kpis} />
      <RevenueChart series={revenueSeries} />
      <AccountsTable accounts={accounts} selectedId={selected?.id ?? null} onSelect={setSelected} />
      <AccountDialog account={selected} onClose={() => setSelected(null)} />
    </Stack>
  );
}
