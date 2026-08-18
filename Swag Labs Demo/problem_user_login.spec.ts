import {test,expect} from "@playwright/test"

test.describe("Problem user login", () => {
    test("Login", async ({page}) =>{
        await page.goto("https://saucedemo.com");

        await page.getByRole("textbox", {name: "Username"}).fill("problem_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name:"Login"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    });

    test("Compare UI of inventory items displayed from standard user", async({page}) =>{

        await page.goto("https://saucedemo.com");

        await page.getByRole("textbox", {name: "Username"}).fill("problem_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name:"Login"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await expect(page.locator("#item_4_title_link")).toHaveText("Sauce Labs Backpack");
        await expect(page.locator('[data-test="inventory-item-desc"]').first()).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        await expect(page.getByRole("button", {name: "Add to cart"}).first()).toBeVisible();
        //await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toBeVisible();

        // wrong source od displayed photo, now lets test all photos
        //await expect(page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).toHaveAttribute("src", "/assets/sauce-backpack-1200x1500-CjRW-dJJ.jpg");
        //await expect(page.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]')).toHaveAttribute("src", "/assets/bike-light-1200x1500-DxcZRFOA.jpg");
    })

})