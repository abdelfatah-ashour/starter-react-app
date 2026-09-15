import { useState } from "react";
import { TopNav, type PageKey } from "@/components/layout/TopNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { UsersPage } from "@/pages/UsersPage";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useUsers } from "@/hooks/useUsers";

/**
 * PulseBoard shell. Both pages live under one state root so Users edits survive
 * navigating to the Dashboard and back.
 */
export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const state = useDashboardData();
  const { users, create, update, remove } = useUsers(state.data?.users);

  return (
    <div className="min-h-dvh bg-canvas">
      <TopNav
        current={page}
        onNavigate={setPage}
        period={
          state.data
            ? page === "dashboard"
              ? `${state.data.meta.period} · all regions`
              : state.data.meta.period
            : undefined
        }
      />

      <main className="px-2 py-6 sm:px-4 lg:px-8">
        {state.status === "loading" ? (
          <p className="py-20 text-center text-sm text-ink-muted" role="status">
            Loading PulseBoard…
          </p>
        ) : null}

        {state.status === "error" ? (
          <p className="py-20 text-center text-sm text-bad" role="alert">
            Could not load dashboard data: {state.error}
          </p>
        ) : null}

        {state.status === "ready" ? (
          page === "dashboard" ? (
            <DashboardPage
              kpis={state.data.kpis}
              revenueSeries={state.data.revenueSeries}
              accounts={state.data.accounts}
            />
          ) : (
            <UsersPage users={users} onCreate={create} onUpdate={update} onDelete={remove} />
          )
        ) : null}
      </main>
    </div>
  );
}
