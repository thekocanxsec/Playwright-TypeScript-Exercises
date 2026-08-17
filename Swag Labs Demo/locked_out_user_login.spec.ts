import {test, expect} from "@playwright/test"

test.describe("Locked out user testing", () => {
    test("Login", async ({page}) => {
        await page.goto("https://www.saucedemo.com/");

        await page.getByRole("textbox", {name: "Username"}).fill("locked_out_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

    });

    test("Test if logging in redirects us to main page", async ({page}) => {
        await page.goto("https://saucedemo.com");

        await page.getByRole("textbox", {name: "Username"}).fill("locked_out_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Check wether alert is displayed", async ({page}) => {
        await page.goto("https://saucedemo.com");

        await page.getByRole("textbox", {name: "Username"}).fill("locked_out_user");
        await page.getByRole("textbox", {name: "Password"}).fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click;

        await expect(page.getByText("Epic sadface: Sorry, this user has been locked out."));
    })




})