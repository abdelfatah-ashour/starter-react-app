import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { LANGUAGES } from "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { color, shadow } from "@/styles/tokens.stylex";

const styles = stylex.create({
  group: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    borderRadius: 8,
    backgroundColor: color.canvas,
    padding: 2,
  },
  icon: {
    marginInlineStart: 6,
    width: 16,
    height: 16,
    flexShrink: 0,
    color: color.inkMuted,
  },
  option: {
    borderRadius: 6,
    paddingInline: 8,
    paddingBlock: 4,
    fontSize: 13,
    fontWeight: 500,
    transitionProperty: "background-color, color",
    transitionDuration: "150ms",
  },
  active: {
    backgroundColor: color.surface,
    color: color.ink,
    boxShadow: shadow.raised,
  },
  inactive: {
    backgroundColor: "transparent",
    color: { default: color.inkMuted, ":hover": color.ink },
  },
});

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <div role="group" aria-label={t("nav.language.label")} {...stylex.props(styles.group)}>
      <Languages aria-hidden="true" {...stylex.props(styles.icon)} />
      {LANGUAGES.map((option) => {
        const active = language === option.code;
        return (
          <button
            key={option.code}
            type="button"
            data-testid={`lang-${option.code}`}
            aria-pressed={active}
            onClick={() => setLanguage(option.code)}
            {...stylex.props(styles.option, active ? styles.active : styles.inactive)}
          >
            {option.code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
