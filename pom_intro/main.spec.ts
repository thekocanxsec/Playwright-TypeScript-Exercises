import {test,expect} from "@playwright/test"
import { LoginPage } from "./login_page"

test("Succesful login", async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/.*inventory/)

    
})

test("Bad login details", async ({page}) =>{
    const loginPage = new LoginPage(page);

    await loginPage.openPage();
    await loginPage.login("wrong", "credentials")

    const errorMessage = page.locator('[data-test="error"]')
    await expect(errorMessage).toBeVisible();
})
