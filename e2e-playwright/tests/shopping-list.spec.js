const { test, expect } = require("@playwright/test");

test("Create topic", async ({ page }) => {
    await page.goto("/lists");
    await page.locator("input[type=text][name=name]").type("Create topic");
    await page.getByRole('button', { name: 'Create list!' }).click();
    await expect(page).toHaveURL("/lists");
    await expect(page.locator('a >> text=Create topic')).toHaveText("Create topic");
});

test("Deactivate topic", async ({ page }) => {
    await page.goto("/lists");
    await page.locator("input[type=text][name=name]").type("Deactivate topic");
    await page.getByRole('button', { name: 'Create list!' }).click();
    await expect(page).toHaveURL("/lists");
    await expect(page.locator('a >> text=Deactivate topic')).toHaveText("Deactivate topic");

    await page.getByTestId('Deactivate topic').click();
    await expect(page.locator('a >> text=Deactivate topic')).not.toBeAttached();
});