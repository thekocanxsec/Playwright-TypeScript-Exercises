import {Page, Locator} from "@playwright/test"

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('[]')
        this.passwordInput = page.locator('[]')
        this.loginButton = page.locator('[]')
    }

    async openPage(){
        await this.page.goto("https://www.saucedemo.com/")
    }

    async login(user: string, pass: string){
        await this.usernameInput.fill(user)
        await this.passwordInput.fill(pass)
        await this.loginButton.click()
    }
}