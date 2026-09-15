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
import { Box, Text } from "@/design/primitives";
import { bg } from "@/design/tokens/color.stylex";
import { space } from "@/design/tokens/space.stylex";
import { responsive } from "@/design/responsive";

const styles = stylex.create({
  shell: {
    minHeight: "100dvh",
    backgroundColor: bg.canvas,
  },
  main: {
    paddingInline: { default: space[8], ["@media (min-width: 640px)"]: space[16], ["@media (min-width: 1024px)"]: space[32] },
    paddingBlock: space[24],
  },
  message: {
    paddingBlock: space[80],
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
    <Box sx={styles.shell}>
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

      <Box as="main" sx={[responsive.gutter, styles.main]}>
        {state.status === "loading" ? (
          <Text role="status" tone="subtle" align="center" sx={styles.message}>
            {t("common.loading")}
          </Text>
        ) : null}

        {state.status === "error" ? (
          <Text role="alert" tone="danger" align="center" sx={styles.message}>
            {t("common.loadError", { message: state.error })}
          </Text>
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
      </Box>
    </Box>
  );
}
