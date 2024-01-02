const { test, expect } = require("@playwright/test");

test("The shopping list -specific page has a link to the page with all the shopping lists (i.e. to /lists). The text of the link is 'Shopping lists'", async ({ page }) => {
    await page.goto("/lists");
    await page.locator("input[type=text][name=name]").type("Test topic");
    await page.getByRole('button', { name: 'Create list!' }).click();

    await page.locator('a >> text=Test topic').click();
    await expect(page.locator('a >> text=Shopping lists')).toHaveText('Shopping lists');
    await page.locator('a >> text=Shopping lists').click();
    await expect(page).toHaveURL('/lists');
});

test("Add and then collect item", async ({ page }) => {
    await page.goto("/lists");
    await page.locator("input[type=text][name=name]").type("Add item topic");
    await page.getByRole('button', { name: 'Create list!' }).click();

    await page.locator('a >> text=Add item topic').click();
    await page.locator('input[type=text][name=name]').type("Add item");
    await page.getByRole('button', {name: 'Create item!'}).click();

    await expect(page.locator('li >> text=Add item')).toBeAttached();
    await page.getByTestId('Add item').click();
    await expect(page.locator('del >> text=Add item')).toBeAttached();
});