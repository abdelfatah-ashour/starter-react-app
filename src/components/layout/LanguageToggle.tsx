import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { LANGUAGES } from "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { Inline } from "@/design/primitives";
import { bg, fg } from "@/design/tokens/color.stylex";
import { shadow } from "@/design/tokens/elevation.stylex";
import { duration } from "@/design/tokens/motion.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { icon } from "@/design/tokens/size.stylex";
import { space } from "@/design/tokens/space.stylex";
import { text, weights } from "@/design/text";

const styles = stylex.create({
  group: {
    borderRadius: radius.lg,
    backgroundColor: bg.canvas,
    padding: space[2],
  },
  icon: {
    marginInlineStart: space[6],
    width: icon.sm,
    height: icon.sm,
    flexShrink: 0,
    color: fg.subtle,
  },
  option: {
    borderRadius: radius.md,
    paddingInline: space[8],
    paddingBlock: space[4],
    transitionProperty: "background-color, color",
    transitionDuration: duration.base,
  },
  active: {
    backgroundColor: bg.surface,
    color: fg.default,
    boxShadow: shadow.raised,
  },
  inactive: {
    backgroundColor: "transparent",
    color: { default: fg.subtle, ":hover": fg.default },
  },
});

/** Segmented control for the interface language. */
export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <Inline role="group" aria-label={t("nav.language.label")} gap={2} sx={styles.group}>
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
            {...stylex.props(
              text.bodySm,
              weights.medium,
              styles.option,
              active ? styles.active : styles.inactive,
            )}
          >
            {option.code.toUpperCase()}
          </button>
        );
      })}
    </Inline>
  );
}
