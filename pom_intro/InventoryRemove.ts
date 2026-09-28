import {Page, Locator} from "@playwright/test"

export class InventoryRemove{
    readonly page: Page;
    readonly items: Locator;

    constructor(page: Page){
        this.page = page;
        this.items = page.locator('.inventory_item')
    }

    async removeItemFromMenu(item: string){
        const itemToFind = this.items.filter({hasText : item});
        await itemToFind.locator('button').click();
    }
}
