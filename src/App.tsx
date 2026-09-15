import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TopNav, type PageKey } from "@/components/layout/TopNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { UsersPage } from "@/pages/UsersPage";
import { LoginPage } from "@/pages/LoginPage";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useUsers } from "@/hooks/useUsers";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

/**
 * PulseBoard shell. Both pages live under one state root so Users edits survive
 * navigating to the Dashboard and back. Everything sits behind the sign-in gate.
 */
export default function App() {
  const { t } = useTranslation();
  const [page, setPage] = useState<PageKey>("dashboard");
  const { isAuthenticated, signOut } = useAuth();
  const state = useDashboardData();
  const { users, create, update, remove } = useUsers(state.data?.users);

  // Keeps <html lang>/<dir> in step with the active language.
  useLanguage();

  if (!isAuthenticated) return <LoginPage />;

  return (
    <div className="min-h-dvh bg-canvas">
      <TopNav
        current={page}
        onNavigate={setPage}
        onSignOut={signOut}
        period={
          state.data
            ? page === "dashboard"
              ? t("app.allRegions", { period: state.data.meta.period })
              : state.data.meta.period
            : undefined
        }
      />

      <main className="px-2 py-6 sm:px-4 lg:px-8">
        {state.status === "loading" ? (
          <p className="py-20 text-center text-sm text-ink-muted" role="status">
            {t("common.loading")}
          </p>
        ) : null}

        {state.status === "error" ? (
          <p className="py-20 text-center text-sm text-bad" role="alert">
            {t("common.loadError", { message: state.error })}
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
