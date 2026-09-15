import { test, expect, type Page } from "@playwright/test";

/**
 * Not an acceptance test. `npm run screenshot` captures every state the design
 * in `design/` was drawn for, into `screenshots/`, so the two can be compared
 * side by side.
 */
const viewports = {
  desktop: { width: 1280, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
};

async function ready(page: Page) {
  await page.goto("/");
  await expect(page.getByTestId("accounts-table")).toBeVisible();
  await page.waitForLoadState("networkidle");
}

const shot = (page: Page, name: string, fullPage = true) =>
  page.screenshot({ path: `screenshots/${name}.png`, fullPage, animations: "disabled" });

test("dashboard desktop, no dialog", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await shot(page, "desktop-no-drawer-1280x800");
});

test("dashboard desktop, account dialog open", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.locator('[data-account-id="acc-007"]').click();
  await expect(page.getByTestId("detail-drawer")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, "desktop-1280x800", false);
});

test("dashboard tablet", async ({ page }) => {
  await page.setViewportSize(viewports.tablet);
  await ready(page);
  await shot(page, "tablet-768x1024");
});

test("dashboard mobile", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await ready(page);
  await shot(page, "mobile-375x812");
});

test("users desktop", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("nav-users").click();
  await expect(page.getByTestId("users-page")).toBeVisible();
  await shot(page, "users-1280x800");
});

test("users desktop, edit form with a validation error", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("nav-users").click();
  await page.locator('[data-user-id="usr-006"]').getByTestId("user-edit").click();
  const form = page.getByTestId("user-form");
  await form.locator('[name="email"]').fill("amara.okafor@pulseboard");
  await page.getByTestId("user-save").click();
  await expect(page.getByTestId("form-error")).toBeVisible();
  await shot(page, "users-edit-1280x800", false);
});

test("users mobile", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await ready(page);
  await page.getByTestId("nav-users").click();
  await expect(page.getByTestId("users-page")).toBeVisible();
  await shot(page, "users-mobile-375x812");
});

test("dashboard desktop, dark theme", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await shot(page, "desktop-dark-1280x800");
});

test("dashboard desktop, dark theme with the account dialog open", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("theme-toggle").click();
  await page.locator('[data-account-id="acc-007"]').click();
  await expect(page.getByTestId("detail-drawer")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot(page, "desktop-dark-dialog-1280x800", false);
});

test("users desktop, dark theme", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("theme-toggle").click();
  await page.getByTestId("nav-users").click();
  await expect(page.getByTestId("users-page")).toBeVisible();
  await shot(page, "users-dark-1280x800");
});

test("account dialog at mobile width", async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await ready(page);
  await page.locator('[data-account-id="acc-007"]').click();
  await expect(page.getByTestId("detail-drawer")).toBeVisible();
  await shot(page, "mobile-account-dialog-375x812", false);
});

test("delete confirmation dialog", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await ready(page);
  await page.getByTestId("nav-users").click();
  await page.locator('[data-user-id="usr-009"]').getByTestId("user-delete").click();
  await expect(page.getByTestId("confirm-delete")).toBeVisible();
  await shot(page, "users-confirm-delete-1280x800", false);
});
