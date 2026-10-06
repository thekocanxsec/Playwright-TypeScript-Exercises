import {Page, Locator} from "@playwright/test"

export class BurgerMenu{
    readonly page: Page;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn')
        this.logoutLink = page.locator('#logout_sidebar_link')
        this.resetAppStateLink = page.locator('#reset_sidebar_link')
    }

    async logout(){
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    async resetAppState(){
        await this.menuButton.click();
        await this.resetAppStateLink.click();
    }
}
