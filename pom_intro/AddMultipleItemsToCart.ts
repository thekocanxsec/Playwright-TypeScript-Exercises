import {Page, Locator} from "@playwright/test"

export class AddMultipleItemsToCart{
    readonly page: Page;
    readonly items: Locator;

    constructor(page: Page){
        this.page = page;
        this.items = page.locator('[data-test="inventory-item"]')
    }

    async addMultipleItems(...itemNames: string[]){
        for (const item of itemNames){
            const itemToFind = this.items.filter({hasText : item});
            await itemToFind.locator('button').click();
        }
    }
}
