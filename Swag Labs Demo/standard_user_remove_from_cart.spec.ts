import {test, expect} from "@playwright/test"

test.describe("Removing items from cart", () =>{

    test("Homepage removal of items from cart", async({page})=> {

        await page.goto("https://www.saucedemo.com/")

        const usernameBox = page.getByRole("textbox", {name:"Username"}) ;
        const passwordBox = page.getByRole("textbox", {name:"Password"});
        const loginButton = page.getByRole("button", {name:"Login"});

        await usernameBox.fill("standard_user");
        await passwordBox.fill("secret_sauce");
        await loginButton.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        const firstItem = page.locator('[class="inventory_item"]').nth(0);
        const secondItem = page.locator('[class="inventory_item"]').nth(1);
        const thirdItem = page.locator('[class="inventory_item"]').nth(2);

        const firstItemAddToCart = firstItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const secondItemAddToCart = secondItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const thirdItemAddToCart = thirdItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        
        const cartPlaceholder = page.locator('[id="shopping_cart_container"]');
        const cartCheckNumber = cartPlaceholder.locator('[class="shopping_cart_badge"]')

        await firstItemAddToCart.click();
        await expect(cartCheckNumber).toHaveText("1");

        await secondItemAddToCart.click();
        await expect(cartCheckNumber).toHaveText("2");

        await thirdItemAddToCart.click();
        await expect(cartCheckNumber).toHaveText("3");


        await firstItem.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(cartCheckNumber).toHaveText("2");

        await secondItem.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await expect(cartCheckNumber).toHaveText("1");

        await thirdItem.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        await expect(cartCheckNumber).not.toBeVisible();


    })

    test("Removal items from cart page", async({page}) => {
        await page.goto("https://www.saucedemo.com/")

        const usernameBox = page.getByRole("textbox", {name:"Username"}) ;
        const passwordBox = page.getByRole("textbox", {name:"Password"});
        const loginButton = page.getByRole("button", {name:"Login"});

        await usernameBox.fill("standard_user");
        await passwordBox.fill("secret_sauce");
        await loginButton.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        const firstItem = page.locator('[class="inventory_item"]').nth(0);
        const secondItem = page.locator('[class="inventory_item"]').nth(1);
        const thirdItem = page.locator('[class="inventory_item"]').nth(2);

        const firstItemAddToCart = firstItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const secondItemAddToCart = secondItem.locator('[class="btn btn_primary btn_small btn_inventory "]');
        const thirdItemAddToCart = thirdItem.locator('[class="btn btn_primary btn_small btn_inventory "]');

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
        

    })



})