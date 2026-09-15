import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useAuth } from "@/hooks/useAuth";
import { authConfig } from "@/lib/env";
import { color } from "@/styles/tokens.stylex";
import { leading } from "@/styles/type.stylex";

const styles = stylex.create({
  page: {
    display: "flex",
    minHeight: "100dvh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    backgroundColor: color.canvas,
    paddingInline: 16,
    paddingBlock: 40,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  mark: {
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: color.brand500,
  },
  wordmark: {
    fontSize: 20,
    lineHeight: leading.xl,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    padding: 28,
  },
  title: {
    fontSize: 19,
    lineHeight: "24px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: color.ink,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: leading.sm,
    color: color.inkMuted,
  },
  form: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  control: { marginTop: 6 },
  error: { fontSize: 13, color: color.bad },
  submit: { width: "100%" },
  hint: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
    color: color.inkMuted,
  },
  toggles: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
});

export function LoginPage() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(!signIn(username, password));
  };

  return (
    <div data-testid="login-page" {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.brand)}>
        <span aria-hidden="true" {...stylex.props(styles.mark)} />
        <h1 {...stylex.props(styles.wordmark)}>{t("app.name")}</h1>
      </div>

      <Card sx={styles.card}>
        <h2 {...stylex.props(styles.title)}>{t("login.title")}</h2>
        <p {...stylex.props(styles.subtitle)}>{t("login.subtitle")}</p>

        <form
          data-testid="login-form"
          onSubmit={handleSubmit}
          noValidate
          {...stylex.props(styles.form)}
        >
          <div>
            <Label htmlFor="login-username">{t("login.username")}</Label>
            <Input
              id="login-username"
              name="username"
              value={username}
              invalid={error}
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              sx={styles.control}
            />
          </div>

          <div>
            <Label htmlFor="login-password">{t("login.password")}</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              value={password}
              invalid={error}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              sx={styles.control}
            />
          </div>

          {error ? (
            <p data-testid="login-error" role="alert" {...stylex.props(styles.error)}>
              {t("login.error")}
            </p>
          ) : null}

          <Button type="submit" data-testid="login-submit" sx={styles.submit}>
            {t("login.submit")}
          </Button>
        </form>

        <p {...stylex.props(styles.hint)}>
          {t("login.hint", { username: authConfig.username, password: authConfig.password })}
        </p>
      </Card>

      <div {...stylex.props(styles.toggles)}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
