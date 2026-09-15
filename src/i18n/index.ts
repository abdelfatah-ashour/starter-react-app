import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { fr } from "./locales/fr";

export const LANGUAGE_STORAGE_KEY = "pulseboard-language";

export const LANGUAGES = [
  { code: "en", labelKey: "nav.language.english", dir: "ltr" },
  { code: "fr", labelKey: "nav.language.french", dir: "ltr" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const directionOf = (code: string): "ltr" | "rtl" =>
  LANGUAGES.find((language) => language.code === code)?.dir ?? "ltr";

const storedLanguage = (): LanguageCode | null => {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGES.some((language) => language.code === value)
      ? (value as LanguageCode)
      : null;
  } catch {
    // Blocked storage — fall back to the default language.
    return null;
  }
};

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  // English is the source locale and the default; the acceptance contract
  // asserts against its exact strings.
  lng: storedLanguage() ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
