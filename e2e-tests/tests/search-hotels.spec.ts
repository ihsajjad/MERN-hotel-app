import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Sign in successfull!")).toBeVisible();
});

test("Should show search result", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Chattogram");

  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Chattogram")).toBeVisible();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});
