import { test, expect } from '@playwright/test';

test("Locators intro", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    //check if username lable exist and its visible

    await expect(page.getByLabel("Username")).toBeVisible();
    await page.getByLabel("Username").fill("tomsmith");

    //check if password lable exist and its visible
    await expect(page.getByLabel("Password")).toBeVisible();
    await page.getByRole("textbox",{"name": "Password"}).fill("SuperSecretPassword!");

    //one fail test 
    //it failed :) await expect(page.getByRole("textbox",{"name": "FailTest"})).toBeVisible();

    //check if button Login exists and its visible
    await expect(page.getByRole("button", {"name": "Login"})).toBeVisible();
    await page.getByRole("button", {"name": "Login"}).click();


    

});