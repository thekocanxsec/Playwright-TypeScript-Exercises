import {test,expect} from "@playwright/test"

test.describe("Testing all features for error user", () => {
    test("Login", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.locator('[placeholder="Username"]').fill("error_user")
        await page.locator('[placeholder="Password"]').fill("secret_sauce")
        await page.locator('[data-test="login-button"]').click()

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible


    })

    test("Logout", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.locator('[placeholder="Username"]').fill("error_user")
        await page.locator('[placeholder="Password"]').fill("secret_sauce")
        await page.locator('[data-test="login-button"]').click()
        
        const menuButton = page.locator('[id="react-burger-menu-btn"]')
        await expect(menuButton).toBeVisible()

        await menuButton.click();
        await page.locator('[data-test="logout-sidebar-link"]').click();

        await expect(page).toHaveURL("https://www.saucedemo.com/");

    })

    test("Add items to cart", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.locator('[placeholder="Username"]').fill("error_user")
        await page.locator('[placeholder="Password"]').fill("secret_sauce")
        await page.locator('[data-test="login-button"]').click()


        const allItems = page.locator('[data-test="inventory-item"]');
        
        for(let i = 0; i<5; i++){
            console.log(`Clicking item no: ${i}`);
            await allItems.nth(i).locator('.btn_inventory').click()
        }

        const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        // issue found items 3 4 and 6 are not clickable / not working
        await expect(cartBadge).toHaveText("3");

    })

    test("Remove items from cart main page", async ({page}) => {
        
        await page.goto("https://www.saucedemo.com/")
        await page.locator('[placeholder="Username"]').fill("error_user")
        await page.locator('[placeholder="Password"]').fill("secret_sauce")
        await page.locator('[data-test="login-button"]').click()

        const allItems = page.locator('[data-test="inventory-item"]');
        
        for(let i = 0; i<5; i++){
            console.log(`Clicking item no: ${i}`);
            await allItems.nth(i).locator('.btn_inventory').click()
        }

        for(let i = 0; i<5; i++){
            try{
                console.log(`Removing item no: ${i}`)
                await allItems.nth(i).locator('.btn_secondary').click()
            }
            catch{
                console.log("Bug found")
            }
        }
        
    })

    test("Remove items from cart page", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.locator('[placeholder="Username"]').fill("error_user")
        await page.locator('[placeholder="Password"]').fill("secret_sauce")
        await page.locator('[data-test="login-button"]').click()

        const allItems = page.locator('[data-test="inventory-item"]');
        
        for(let i = 0; i<5; i++){
            console.log(`Clicking item no: ${i}`);
            await allItems.nth(i).locator('.btn_inventory').click()
        }

        await page.locator('[class="shopping_cart_container"]').click()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

        const displayedItems = page.locator('[data-test="inventory-item"]')
        
        const removeButtons = page.locator('.cart_button');

        for(let i = 0; i < 3; i++){
            await removeButtons.nth(0).click();
            await page.waitForTimeout(300);
        }

        await expect(displayedItems).not.toBeVisible();


        
    })




})