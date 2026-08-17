import {test,expect} from "@playwright/test";


test.describe("Standard user Login-Logout testing", () => {
    test("Check login page", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");

        await expect(page).toHaveTitle("Swag Labs");

        await expect(page.getByRole("textbox", {name: "Username"})).toBeVisible();
        await expect(page.getByRole("textbox", {name: "Password"})).toBeVisible();
        await page.getByRole("textbox", {name: "Username"}).click();
        await page.getByRole("textbox", {name: "Password"}).click();

        await expect(page.getByRole("button", {name: "Login"})).toBeVisible();
        await page.getByRole("button", {name: "Login"}).click();

    });


    test("Click button login withought inputing any credentials", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");

        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();

        await page.getByRole("textbox", {name: "username"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();

        await page.getByRole("textbox", {name: "password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    });

    test("Standard user Positive login", async ({page}) => {
        await page.goto("https:www.saucedemo.com/");

        await page.getByRole("textbox", {name:"Username"}).fill("standard_user");
        await page.getByRole("textbox", {name:"Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    });

    test("Standard user Logout", async ({page}) => {
        await page.goto("https:www.saucedemo.com/");

        await page.getByRole("textbox", {name:"Username"}).fill("standard_user");
        await page.getByRole("textbox", {name:"Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page.getByRole("button", {name: "Open Menu"})).toBeVisible();
        await page.getByRole("button", {name: "Open Menu"}).click();
        
        await expect(page.getByRole("link", {name: "Logout"})).toBeVisible();
        await page.getByRole("link", {name: "Logout"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/");

    });

    test("Logout - then trying to go back to previous page to see if we stay logged in", async ({page}) => {
        await page.goto("https:www.saucedemo.com/");

        await page.getByRole("textbox", {name:"Username"}).fill("standard_user");
        await page.getByRole("textbox", {name:"Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page.getByRole("button", {name: "Open Menu"})).toBeVisible();
        await page.getByRole("button", {name: "Open Menu"}).click();
        
        await expect(page.getByRole("link", {name: "Logout"})).toBeVisible();
        await page.getByRole("link", {name: "Logout"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/");

        // classic way of logout, but now we will try to go back to see if we stayed logged in
        await page.goBack();
        await expect(page).toHaveURL("https://www.saucedemo.com");

        await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in."))
    })
});
