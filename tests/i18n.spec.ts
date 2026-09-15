import { test, expect } from "@playwright/test";

test.describe("Internationalisation", () => {
  test("switches the interface between English and French", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByTestId("accounts-table")).toBeVisible();

    // English is the default and the source locale.
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByTestId("nav-dashboard")).toHaveText("Dashboard");
    await expect(page.getByTestId("table-filter")).toHaveAttribute(
      "placeholder",
      /Filter by name/,
    );

    await page.getByTestId("lang-fr").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByTestId("nav-dashboard")).toHaveText("Tableau de bord");
    await expect(page.getByTestId("nav-users")).toHaveText("Utilisateurs");
    await expect(page.getByTestId("table-filter")).toHaveAttribute("placeholder", /Filtrer par nom/);

    // Data values stay as they are; only the interface is translated.
    await expect(page.locator('[data-account-id="acc-001"]')).toContainText("Northwind Logistics");

    // The choice survives a reload.
    await page.reload();
    await expect(page.getByTestId("accounts-table")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByTestId("nav-dashboard")).toHaveText("Tableau de bord");

    await page.getByTestId("lang-en").click();
    await expect(page.getByTestId("nav-dashboard")).toHaveText("Dashboard");

    expect(errors, `console errors:\n${errors.join("\n")}`).toEqual([]);
  });

  test("translates the users page and its form", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("accounts-table")).toBeVisible();
    await page.getByTestId("lang-fr").click();
    await page.getByTestId("nav-users").click();
    await expect(page.getByTestId("users-page")).toBeVisible();

    await expect(page.getByTestId("user-create")).toContainText("Nouvel utilisateur");
    await page.locator('[data-user-id="usr-001"]').getByTestId("user-edit").click();
    const form = page.getByTestId("user-form");
    await expect(form).toBeVisible();
    await expect(page.getByTestId("user-save")).toContainText("Enregistrer");

    // Validation messages are translated too.
    await form.locator('[name="email"]').fill("not-an-email");
    await page.getByTestId("user-save").click();
    await expect(page.getByTestId("form-error")).toHaveText("Saisissez une adresse e-mail valide.");
  });
});
