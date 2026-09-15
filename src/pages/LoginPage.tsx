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
import { Box, Inline, Stack, Text } from "@/design/primitives";
import { bg } from "@/design/tokens/color.stylex";
import { radius } from "@/design/tokens/shape.stylex";
import { space } from "@/design/tokens/space.stylex";

const styles = stylex.create({
  page: {
    minHeight: "100dvh",
    backgroundColor: bg.canvas,
    paddingInline: space[16],
    paddingBlock: space[40],
  },
  mark: {
    width: space[32],
    height: space[32],
    flexShrink: 0,
    borderRadius: radius.xxl,
    backgroundColor: bg.accentMark,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    padding: space[28],
  },
  subtitle: { marginTop: space[6] },
  form: { marginTop: space[24] },
  control: { marginTop: space[6] },
  submit: { width: "100%" },
  hint: { marginTop: space[20] },
});

export function LoginPage() {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setError(!signIn(username, password));
  };

  return (
    <Stack data-testid="login-page" align="center" justify="center" gap={24} sx={styles.page}>
      <Inline gap={12}>
        <span aria-hidden="true" {...stylex.props(styles.mark)} />
        <Text as="h1" variant="titleMd" tone="default">
          {t("app.name")}
        </Text>
      </Inline>

      <Card sx={styles.card}>
        <Text as="h2" variant="titleSm" tone="default">
          {t("login.title")}
        </Text>
        <Text tone="subtle" sx={styles.subtitle}>
          {t("login.subtitle")}
        </Text>

        <Stack
          as="form"
          data-testid="login-form"
          onSubmit={handleSubmit}
          noValidate
          gap={16}
          sx={styles.form}
        >
          <Box>
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
          </Box>

          <Box>
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
          </Box>

          {error ? (
            <Text data-testid="login-error" role="alert" variant="bodySm" tone="danger">
              {t("login.error")}
            </Text>
          ) : null}

          <Button type="submit" data-testid="login-submit" sx={styles.submit}>
            {t("login.submit")}
          </Button>
        </Stack>

        <Text variant="bodySm" tone="subtle" align="center" sx={styles.hint}>
          {t("login.hint", { username: authConfig.username, password: authConfig.password })}
        </Text>
      </Card>

      <Inline gap={8}>
        <LanguageToggle />
        <ThemeToggle />
      </Inline>
    </Stack>
  );
}
