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

test("Should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Chattogram");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("Should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Chattogram");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formatteDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formatteDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: $300.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("4/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("342");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("34232");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking saved")).toBeVisible();
});
