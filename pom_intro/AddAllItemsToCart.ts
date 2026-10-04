import {Page, Locator} from "@playwright/test"

export class AddAllItemsToCart{
    readonly page: Page;
    readonly item: Locator;

    constructor(page: Page){
        this.page = page;
        this.item = page.locator('[data-test="inventory-item"]');
    }

    async addAllItems(){
        const itemCount = await this.item.count();
        for(let i = 0; i < itemCount; i++){
            await this.item.locator('button').nth(i).click();
        }
    }
}
