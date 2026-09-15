import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { KpiRow } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AccountsTable } from "@/components/dashboard/AccountsTable";
import { AccountDialog } from "@/components/dashboard/AccountDialog";
import type { Account, Kpi, RevenuePoint } from "@/types";
import { common } from "@/styles/common";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

interface DashboardPageProps {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  accounts: Account[];
}

export function DashboardPage({ kpis, revenueSeries, accounts }: DashboardPageProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Account | null>(null);

  return (
    <div data-testid="dashboard-page" {...stylex.props(styles.page)}>
      <h2 {...stylex.props(common.srOnly)}>{t("nav.dashboard")}</h2>
      <KpiRow kpis={kpis} />
      <RevenueChart series={revenueSeries} />
      <AccountsTable accounts={accounts} selectedId={selected?.id ?? null} onSelect={setSelected} />
      <AccountDialog account={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
