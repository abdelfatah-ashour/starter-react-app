import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY, directionOf, type LanguageCode } from "@/i18n";

/**
 * Active language plus the document `lang`/`dir` wiring, so switching to an
 * RTL locale flips the whole layout.
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.language as LanguageCode;
  const direction = directionOf(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const setLanguage = useCallback(
    (next: LanguageCode) => {
      void i18n.changeLanguage(next);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // Choice is session-only when storage is unavailable.
      }
    },
    [i18n],
  );

  return { language, direction, setLanguage };
}
