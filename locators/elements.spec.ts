import {test, expect} from '@playwright/test';

test("Locating elements",{tag : "@elementTags"} , async ({page}) => {{
    await page.goto("https://the-internet.herokuapp.com/login"); // set goto url for testing

    // this constant is used to locate button element for purpose of testing
    const locator = page.getByRole("button", {name : "Login"});

    await locator.hover();


    const labelLocatorForUsername = page.getByLabel("username");

    await labelLocatorForUsername .fill("tomsmith");
    

    const labelLocatorForPassword = page.getByLabel("password");
    await labelLocatorForPassword.fill("SuperSecretPassword!");

    await locator.click();

    await expect(page.getByText("You logged into a secure area!")).toBeVisible();

}});