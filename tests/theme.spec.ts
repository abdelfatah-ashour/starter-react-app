import { test, expect } from "@playwright/test";

test.use({ colorScheme: "dark" });

test("app starts in dark when the OS prefers it, with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto("/");
  await expect(page.getByTestId("accounts-table")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  // Toggle to light, then confirm the choice survives a reload.
  await page.getByTestId("theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.getByTestId("accounts-table")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  // Drawer and dialogs still work in a themed run.
  await page.locator('[data-account-id="acc-007"]').click();
  await expect(page.getByTestId("detail-drawer")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("detail-drawer")).toBeHidden();

  expect(errors, `console errors:\n${errors.join("\n")}`).toEqual([]);
});
