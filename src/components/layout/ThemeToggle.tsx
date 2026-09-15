import * as stylex from "@stylexjs/stylex";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const styles = stylex.create({
  icon: { width: 18, height: 18 },
});

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      data-testid="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? t("nav.theme.toLight") : t("nav.theme.toDark")}
      title={isDark ? t("nav.theme.toLight") : t("nav.theme.toDark")}
    >
      {isDark ? (
        <Sun aria-hidden="true" {...stylex.props(styles.icon)} />
      ) : (
        <Moon aria-hidden="true" {...stylex.props(styles.icon)} />
      )}
    </Button>
  );
}
