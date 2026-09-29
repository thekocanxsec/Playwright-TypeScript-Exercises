import {Page, Locator} from "@playwright/test"

export class InventoryPage{
    readonly page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator('.title')
        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async verifyPageLoaded(){
        await this.title.waitFor({state: 'visible'});
    }
}
