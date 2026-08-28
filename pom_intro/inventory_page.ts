import {Page,Locator} from "@playwright/test"

export class InventoryPage{
    readonly page: Page;
    readonly addBackpackButton: Locator;
    readonly cartBadge: Locator;

    constructor(page : Page){
        this.page = page;
        this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')

    }
    
    async addToCart(){
        await this.addBackpackButton.click()
    }



}