import {test,expect} from "@playwright/test"

test.describe("Testing checkout of standard user", () => {

    test("One item checkout and test of token", async({page}) => {
        await page.goto("https://www.saucedemo.com/")

        await page.getByRole("textbox", {name: "Username"}).fill("standard_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        const firstItem = page.locator('[class="inventory_item"]').nth(0);

        await expect(firstItem).toBeVisible();

        await firstItem.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

        await page.locator('[data-test="shopping-cart-badge"]').click()

        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();

        await page.locator('[class="btn btn_action btn_medium checkout_button "]').click();

        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

        const firstName = page.getByRole("textbox", {name: "First Name"})
        const lastName = page.getByRole("textbox", {name: "Last Name"})
        const postalCode = page.getByRole("textbox", {name: "Zip/Postal Code"})

        await firstName.fill("Test")
        await lastName.fill("Test")
        await postalCode.fill("Test")

        await page.locator('[data-test="continue"]').click()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")

        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();

        await expect(page.locator('[data-test="subtotal-label"]')).toContainText("$29.99")
        await expect(page.locator('[data-test="tax-label"]')).toContainText("$2.40")
        await expect(page.locator('[data-test="total-label"]')).toContainText("$32.39")

        await expect(page.locator('[data-test="finish"]')).toBeVisible()
        await page.locator('[data-test="finish"]').click();

        const constWrapper = page.locator('#contents_wrapper')
        const allText = await constWrapper.textContent();

        await expect(allText).toContain("Thank you for your order!")

        //timeout set in playwright.config.ts is modified to keep test running for 25 minutes 
        await page.waitForTimeout(25 * 60 * 1000);

        await page.locator('[id="back-to-products"]').click()

        //failed token expired
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    })


})