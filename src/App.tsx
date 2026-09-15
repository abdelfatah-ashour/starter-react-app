import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { TopNav, type PageKey } from "@/components/layout/TopNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { UsersPage } from "@/pages/UsersPage";
import { LoginPage } from "@/pages/LoginPage";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useUsers } from "@/hooks/useUsers";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  shell: {
    minHeight: "100dvh",
    backgroundColor: color.canvas,
  },
  main: {
    paddingInline: { default: 8, [bp.sm]: 16, [bp.lg]: 32 },
    paddingBlock: 24,
  },
  status: {
    paddingBlock: 80,
    textAlign: "center",
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.inkMuted,
  },
  error: {
    paddingBlock: 80,
    textAlign: "center",
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.bad,
  },
});

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
    <div {...stylex.props(styles.shell)}>
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

      <main {...stylex.props(styles.main)}>
        {state.status === "loading" ? (
          <p role="status" {...stylex.props(styles.status)}>
            {t("common.loading")}
          </p>
        ) : null}

        {state.status === "error" ? (
          <p role="alert" {...stylex.props(styles.error)}>
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
