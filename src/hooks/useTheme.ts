import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "pulseboard-theme";

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Private mode or blocked storage — fall back to the system preference.
    return null;
  }
};

const systemTheme = (): Theme =>
  typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const currentTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ?? readStored() ?? systemTheme();

/**
 * Light/dark theme, applied as `data-theme` on <html> so every design token
 * re-binds at once. The initial value is set before paint by the inline script
 * in index.html; this hook keeps it in sync and persists the user's choice.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document === "undefined" ? "light" : currentTheme(),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow the OS while the user has not made an explicit choice.
  useEffect(() => {
    if (readStored() || typeof matchMedia !== "function") return;
    const query = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setThemeState(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Preference is session-only when storage is unavailable.
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(currentTheme() === "dark" ? "light" : "dark"),
    [setTheme],
  );

  return { theme, setTheme, toggle };
}
