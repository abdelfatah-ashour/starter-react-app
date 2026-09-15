import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { color } from "@/styles/tokens.stylex";
import { bp } from "@/styles/breakpoints.stylex";
import { leading } from "@/styles/type.stylex";

export type PageKey = "dashboard" | "users";

const LINKS: PageKey[] = ["dashboard", "users"];

const styles = stylex.create({
  header: {
    position: "sticky",
    top: 0,
    zIndex: 30,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: color.hairline,
    backgroundColor: color.surface,
  },
  bar: {
    display: "flex",
    height: 56,
    alignItems: "center",
    gap: { default: 12, [bp.sm]: 24 },
    paddingInline: { default: 8, [bp.sm]: 16, [bp.lg]: 32 },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  mark: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: 9,
    backgroundColor: color.brand500,
  },
  wordmark: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  link: {
    borderRadius: 8,
    paddingInline: 12,
    paddingBlock: 6,
    fontSize: 14,
    lineHeight: leading.sm,
    fontWeight: 500,
    transitionProperty: "background-color, color",
    transitionDuration: "150ms",
  },
  linkActive: {
    backgroundColor: color.brand50,
    color: color.brand600,
  },
  linkIdle: {
    backgroundColor: { default: "transparent", ":hover": color.canvas },
    color: { default: color.inkMuted, ":hover": color.ink },
  },
  actions: {
    marginInlineStart: "auto",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  period: {
    display: { default: "none", [bp.lg]: "block" },
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.inkMuted,
  },
  icon: { width: 18, height: 18 },
});

interface TopNavProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  period?: string;
  onSignOut: () => void;
}

export function TopNav({ current, onNavigate, period, onSignOut }: TopNavProps) {
  const { t } = useTranslation();

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.bar)}>
        <div {...stylex.props(styles.brand)}>
          <span aria-hidden="true" {...stylex.props(styles.mark)} />
          <h1 {...stylex.props(styles.wordmark)}>{t("app.name")}</h1>
        </div>

        <nav aria-label={t("nav.primary")} {...stylex.props(styles.nav)}>
          {LINKS.map((key) => {
            const active = current === key;
            return (
              <button
                key={key}
                type="button"
                data-testid={`nav-${key}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onNavigate(key)}
                {...stylex.props(styles.link, active ? styles.linkActive : styles.linkIdle)}
              >
                {t(`nav.${key}`)}
              </button>
            );
          })}
        </nav>

        <div {...stylex.props(styles.actions)}>
          {period ? <p {...stylex.props(styles.period)}>{period}</p> : null}
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            data-testid="sign-out"
            onClick={onSignOut}
            aria-label={t("nav.signOut")}
            title={t("nav.signOut")}
          >
            <LogOut aria-hidden="true" {...stylex.props(styles.icon)} />
          </Button>
        </div>
      </div>
    </header>
  );
}
