import {test, expect} from "@playwright/test"

test.describe("Testing of performance glitched user, UI/UX", () => {

    test.fail("Login test and main page", async({page}) => {
        await page.goto("https://www.saucedemo.com/");

        await page.locator('[data-test="username"]').fill("performance_glitch_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");

        const startTime = Date.now();

        await page.locator('[data-test="login-button"]').click()
        //await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        const endTime = Date.now();
        const duration = endTime - startTime;

        //we will fail it here because we have to be alerted that there are some issues in performance.
        await expect(duration).toBeLessThan(500);


        const containerDisplayed = page.locator('[data-test="title"]')

        await expect(containerDisplayed).toBeVisible({timeout : 1})

    })

    test("Logout check", async({page}) => {
        await page.goto("https://www.saucedemo.com/");

        await page.locator('[data-test="username"]').fill("performance_glitch_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click()

        await page.locator('[id="react-burger-menu-btn"]').click()
        await page.locator('[data-test="logout-sidebar-link"]').click()

        await expect(page).toHaveURL("https://www.saucedemo.com/")


    })

    test("Add to cart and remove from cart page", async({page}) => {
        await page.goto("https://www.saucedemo.com/")

        const usernameBox = page.getByRole("textbox", {name:"Username"}) ;
        const passwordBox = page.getByRole("textbox", {name:"Password"});
        const loginButton = page.getByRole("button", {name:"Login"});

        await usernameBox.fill("performance_glitch_user");
        await passwordBox.fill("secret_sauce");
        await loginButton.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");



        const firstItem = page.locator('[class="inventory_item"]').nth(0);
        const secondItem = page.locator('[class="inventory_item"]').nth(1);
        const thirdItem = page.locator('[class="inventory_item"]').nth(2);

        const firstItemAddToCart = firstItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const secondItemAddToCart = secondItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const thirdItemAddToCart = thirdItem.locator('[class="btn btn_primary btn_small btn_inventory "]');

        const timerStart = Date.now();

        await firstItemAddToCart.click();
        await secondItemAddToCart.click();
        await thirdItemAddToCart.click();

        const cartButton = page.locator('[class="shopping_cart_link"]');
        cartButton.click()

        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

        const items = page.locator('[class="cart_item"]')

        for(let i = 0; i<3; i++){
            await expect(items.nth(i)).toBeVisible();
        }
    

        for(let i = 0; i<3; i++){
            await items.nth(0).locator('button').click();
        }

        const timerStop = Date.now();
        const result = timerStop - timerStart;

        await expect(result).toBeLessThan(2000);
    })




})