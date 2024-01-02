const { test, expect } = require("@playwright/test");

test("The main page has a title 'Shared shopping lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists")  
});

test("The main page has a link with the text 'Lists' that links the user to the path /lists", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a >> text=Lists')).toHaveText("Lists");
  await page.locator('a >> text=Lists').click();
  await expect(page).toHaveURL("/lists");
});