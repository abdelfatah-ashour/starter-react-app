import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.language.label")}
      className="flex items-center gap-0.5 rounded-lg bg-canvas p-0.5"
    >
      <Languages className="ms-1.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
      {LANGUAGES.map((option) => {
        const active = language === option.code;
        return (
          <button
            key={option.code}
            type="button"
            data-testid={`lang-${option.code}`}
            aria-pressed={active}
            onClick={() => setLanguage(option.code)}
            className={cn(
              "rounded-md px-2 py-1 text-[13px] font-medium transition-colors",
              active ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink",
            )}
          >
            {option.code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
