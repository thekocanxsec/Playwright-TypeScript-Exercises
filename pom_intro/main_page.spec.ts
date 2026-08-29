import {test,expect} from "@playwright/test"
import { LoginPage} from "./login_page"
import {InventoryPage,InventoryAdd,AddAllItemsToCart,AddMultipleItemsToCart} from "./inventory_page"

test("Succesful login", async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/.*inventory/)

    
});


test("Bad login details", async ({page}) =>{
    const loginPage = new LoginPage(page);

    await loginPage.openPage();
    await loginPage.login("wrong", "credentials");

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
});


test("Add backpack to cart", async ({page}) => {
    const inventoryPage = new InventoryPage(page)
    const loginPage = new LoginPage(page)
    
    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce")

    await inventoryPage.addToCart();
    await expect(inventoryPage.cartBadge).toHaveText("1");
});


test("Add certain item to cart with name of item", async ({page}) => {
    const loginPage = new LoginPage(page);
    const itemAdd = new InventoryAdd(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await itemAdd.addItemFromMenu("Sauce Labs Backpack");
    await itemAdd.addItemFromMenu("Sauce Labs Bike Light");

    await expect(inventoryPage.cartBadge).toHaveText("2");

})

test("Add all items to cart", async ({page}) => {
    const loginPage = new LoginPage(page);
    const itemAdd = new AddAllItemsToCart(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await itemAdd.AddAllItems();

    await expect(inventoryPage.cartBadge).toHaveText("6");
})

test("Add multiple items to cart", async({page}) =>{
    const loginPage = new LoginPage(page);
    const addItemsToCart = new AddMultipleItemsToCart(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await addItemsToCart.addMultipleItemsToCart("Sauce Labs Backpack","Sauce Labs Bike Light");

})
