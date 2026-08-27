import {test,expect} from "@playwright/test"
import { LoginPage } from "./login_page.spec"

test("Succesful login", async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openPage();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/.*inventory/)
    
})

