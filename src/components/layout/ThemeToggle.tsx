import * as stylex from "@stylexjs/stylex";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, buttonIcon } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="square"
      data-testid="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? t("nav.theme.toLight") : t("nav.theme.toDark")}
      title={isDark ? t("nav.theme.toLight") : t("nav.theme.toDark")}
    >
      {isDark ? (
        <Sun aria-hidden="true" {...stylex.props(buttonIcon.md)} />
      ) : (
        <Moon aria-hidden="true" {...stylex.props(buttonIcon.md)} />
      )}
    </Button>
  );
}
