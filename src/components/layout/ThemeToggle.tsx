import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

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
      className="text-ink-muted hover:text-ink"
    >
      {isDark ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </Button>
  );
}
