import {test, expect} from "@playwright/test"

test.describe("Problem user add to cart", () => {
    
    test("Normal add to cart", async({page}) => {
        page.goto("https://www.saucedemo.com/");

        const usernameBox = page.getByRole("textbox", {name: "Username"});
        const passwordBox = page.getByRole("textbox", {name: "Password"});
        const loginButton = page.getByRole("button", {name: "Login"});

        await usernameBox.fill("problem_user");
        await passwordBox.fill("secret_sauce");
        await loginButton.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")


        const cartIcon = page.locator('[class="shopping_cart_link"]');
        await expect(cartIcon).toBeVisible();

        const cartNumber = page.locator('[data-test="shopping-cart-badge"]')

        const firstItem = page.locator('[data-test="inventory-item"]').nth(0)
        await firstItem.locator('[id="add-to-cart-sauce-labs-backpack"]').click();

        await expect(cartNumber).toHaveText("1");

    })



})