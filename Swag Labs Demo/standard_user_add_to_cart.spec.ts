import { test, expect } from "@playwright/test";

test.describe("Adding items to cart and verifying them", () => {

    test("Add first three items to cart and verify cart badge", async ({ page }) => {

    
        await page.goto("https://www.saucedemo.com");
        await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
        await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

    
        const cartIcon = page.locator('[data-test="shopping-cart-link"]');
        await expect(cartIcon).toBeVisible();

        const cartNumber = page.locator('[data-test="shopping-cart-badge"]');

    
        const firstItem = page.locator('[data-test="inventory-item"]').nth(0);
        await expect(firstItem.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
        await firstItem.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        

        await expect(cartNumber).toHaveText("1");
        

        const secondItem = page.locator('[data-test="inventory-item"]').nth(1);
        await expect(secondItem.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Bike Light");
        await secondItem.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

       
        await expect(cartNumber).toHaveText("2");

    
        const thirdItem = page.locator('[data-test="inventory-item"]').nth(2);
        await expect(thirdItem.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Bolt T-Shirt");
        await thirdItem.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        await expect(cartNumber).toHaveText("3");
    });
});