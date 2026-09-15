import { test, expect } from "@playwright/test";

/** Start signed out, overriding the config's seeded session. */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Sign in", () => {
  test("gates the app and rejects wrong credentials", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByTestId("login-page")).toBeVisible();
    await expect(page.getByTestId("accounts-table")).toBeHidden();

    const form = page.getByTestId("login-form");
    await form.locator('[name="username"]').fill("root");
    await form.locator('[name="password"]').fill("wrong");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("login-error")).toBeVisible();
    await expect(page.getByTestId("login-page")).toBeVisible();

    expect(errors, `console errors:\n${errors.join("\n")}`).toEqual([]);
  });

  test("trims surrounding whitespace on username and password", async ({ page }) => {
    await page.goto("/");
    const form = page.getByTestId("login-form");
    await form.locator('[name="username"]').fill("  root  ");
    await form.locator('[name="password"]').fill("  root  ");
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("accounts-table")).toBeVisible();
    await expect(page.getByTestId("login-page")).toBeHidden();
  });

  test("accepts the configured credentials and survives a reload", async ({ page }) => {
    await page.goto("/");
    const form = page.getByTestId("login-form");
    await form.locator('[name="username"]').fill("root");
    await form.locator('[name="password"]').fill("root");
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("accounts-table")).toBeVisible();
    await expect(page.getByTestId("login-page")).toBeHidden();

    await page.reload();
    await expect(page.getByTestId("accounts-table")).toBeVisible();
  });

  test("signing out returns to the login screen", async ({ page }) => {
    await page.goto("/");
    const form = page.getByTestId("login-form");
    await form.locator('[name="username"]').fill("root");
    await form.locator('[name="password"]').fill("root");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("accounts-table")).toBeVisible();

    await page.getByTestId("sign-out").click();
    await expect(page.getByTestId("login-page")).toBeVisible();

    await page.reload();
    await expect(page.getByTestId("login-page")).toBeVisible();
  });
});
