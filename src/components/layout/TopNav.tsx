import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export type PageKey = "dashboard" | "users";

const LINKS: PageKey[] = ["dashboard", "users"];

interface TopNavProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  period?: string;
  onSignOut: () => void;
}

export function TopNav({ current, onNavigate, period, onSignOut }: TopNavProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-surface">
      <div className="flex h-14 items-center gap-3 px-2 sm:gap-6 sm:px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="size-7 shrink-0 rounded-[9px] bg-brand-500" />
          <h1 className="text-[17px] font-bold tracking-[-0.01em] text-ink">{t("app.name")}</h1>
        </div>

        <nav aria-label={t("nav.primary")} className="flex items-center gap-1">
          {LINKS.map((key) => {
            const active = current === key;
            return (
              <button
                key={key}
                type="button"
                data-testid={`nav-${key}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onNavigate(key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink-muted hover:bg-canvas hover:text-ink",
                )}
              >
                {t(`nav.${key}`)}
              </button>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          {period ? <p className="hidden text-sm text-ink-muted lg:block">{period}</p> : null}
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            data-testid="sign-out"
            onClick={onSignOut}
            aria-label={t("nav.signOut")}
            title={t("nav.signOut")}
            className="text-ink-muted hover:text-ink"
          >
            <LogOut className="size-[18px]" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}
