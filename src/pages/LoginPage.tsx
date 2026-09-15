import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useAuth } from "@/hooks/useAuth";
import { authConfig } from "@/lib/env";

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
    <div
      data-testid="login-page"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas px-4 py-10"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="size-8 shrink-0 rounded-[10px] bg-brand-500" />
        <h1 className="text-xl font-bold tracking-[-0.01em] text-ink">{t("app.name")}</h1>
      </div>

      <Card className="w-full max-w-[380px] p-7">
        <h2 className="text-[19px] leading-6 font-bold tracking-[-0.01em] text-ink">
          {t("login.title")}
        </h2>
        <p className="mt-1.5 text-sm text-ink-muted">{t("login.subtitle")}</p>

        <form data-testid="login-form" onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <Label htmlFor="login-username">{t("login.username")}</Label>
            <Input
              id="login-username"
              name="username"
              value={username}
              invalid={error}
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1.5"
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
              className="mt-1.5"
            />
          </div>

          {error ? (
            <p data-testid="login-error" role="alert" className="text-[13px] text-bad">
              {t("login.error")}
            </p>
          ) : null}

          <Button type="submit" data-testid="login-submit" className="w-full">
            {t("login.submit")}
          </Button>
        </form>

        <p className="mt-5 text-center text-[13px] text-ink-muted">
          {t("login.hint", { username: authConfig.username, password: authConfig.password })}
        </p>
      </Card>

      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
