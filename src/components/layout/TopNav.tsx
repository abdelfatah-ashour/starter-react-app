import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { Button, buttonIcon } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Inline, Text } from "@/design/primitives";
import { bg, fg, stroke } from "@/design/tokens/color.stylex";
import { duration } from "@/design/tokens/motion.stylex";
import { border, radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";
import { layer } from "@/design/tokens/layer.stylex";
import { text, weights } from "@/design/text";
import { responsive } from "@/design/responsive";

export type PageKey = "dashboard" | "users";

const LINKS: PageKey[] = ["dashboard", "users"];

const styles = stylex.create({
  header: {
    position: "sticky",
    top: 0,
    zIndex: layer.sticky,
    borderWidth: border.none,
    borderBottomWidth: border.thin,
    borderStyle: "solid",
    borderColor: stroke.default,
    backgroundColor: bg.surface,
  },
  bar: {
    height: space[56],
    gap: { default: space[12], ["@media (min-width: 640px)"]: space[24] },
    paddingInline: { default: space[8], ["@media (min-width: 640px)"]: space[16], ["@media (min-width: 1024px)"]: space[32] },
  },
  mark: {
    width: space[28],
    height: space[28],
    flexShrink: 0,
    borderRadius: radius.xl,
    backgroundColor: bg.accentMark,
  },
  link: {
    borderRadius: radius.lg,
    paddingInline: space[12],
    paddingBlock: space[6],
    transitionProperty: "background-color, color",
    transitionDuration: duration.base,
  },
  linkActive: {
    backgroundColor: bg.accentSubtle,
    color: fg.accent,
  },
  linkIdle: {
    backgroundColor: { default: "transparent", ":hover": bg.canvas },
    color: { default: fg.subtle, ":hover": fg.default },
  },
  actions: {
    marginInlineStart: "auto",
  },
  /* The period is context, not navigation: it goes when the bar gets tight. */
  period: {
    display: { default: "none", ["@media (min-width: 1024px)"]: "block" },
  },
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
      <Inline sx={[responsive.gutter, styles.bar]}>
        <Inline gap={12}>
          <span aria-hidden="true" {...stylex.props(styles.mark)} />
          <Text as="h1" variant="titleXs" tone="default">
            {t("app.name")}
          </Text>
        </Inline>

        <Inline as="nav" aria-label={t("nav.primary")} gap={4}>
          {LINKS.map((key) => {
            const active = current === key;
            return (
              <button
                key={key}
                type="button"
                data-testid={`nav-${key}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onNavigate(key)}
                {...stylex.props(
                  text.body,
                  weights.medium,
                  styles.link,
                  active ? styles.linkActive : styles.linkIdle,
                )}
              >
                {t(`nav.${key}`)}
              </button>
            );
          })}
        </Inline>

        <Inline gap={8} sx={styles.actions}>
          {period ? (
            <Text tone="subtle" sx={styles.period}>
              {period}
            </Text>
          ) : null}
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="square"
            data-testid="sign-out"
            onClick={onSignOut}
            aria-label={t("nav.signOut")}
            title={t("nav.signOut")}
          >
            <LogOut aria-hidden="true" {...stylex.props(buttonIcon.md)} />
          </Button>
        </Inline>
      </Inline>
    </header>
  );
}
