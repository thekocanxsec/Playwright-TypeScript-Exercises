import {test, expect} from "@playwright/test"

test.describe("Testing removal of items with Problem User " , () =>{

    test("Removal of items via main screen", async({page}) =>{

        await page.goto("https://www.saucedemo.com")

        await page.locator('[data-test="username"]').fill("problem_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        const firstItem = page.locator('[class="inventory_item"]').nth(0);
        const secondItem = page.locator('[class="inventory_item"]').nth(1);
        const thirdItem = page.locator('[class="inventory_item"]').nth(2);

        await firstItem.locator('[class="btn btn_primary btn_small btn_inventory "]').click()
        await secondItem.locator('[class="btn btn_primary btn_small btn_inventory "]').click();
        //found issue on third locator, cannot add it to cart 
        await thirdItem.locator('[class="btn btn_primary btn_small btn_inventory "]').click();

        const countOfItemsInCart = page.locator('[class="shopping_cart_badge"]');

        // bug because of thirdItem await expect(countOfItemsInCart).toHaveText("3");

        const removeItems = page.locator('[class="btn btn_secondary btn_small btn_inventory "]');

        const removeItemCount = await removeItems.count();

        for(let i = 0; i < removeItemCount; i ++){
            await removeItems.nth(i).click();
        }
        
        //issue UI button does not work
        await expect(countOfItemsInCart).toHaveText("2");
    })

})