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

export class InventoryAdd{
    readonly page: Page;
    readonly items: Locator;

    constructor(page: Page){
        this.page = page;
        this.items = page.locator('.inventory_item')
    }

    async addItemFromMenu(item: string){
        const itemToFind = this.items.filter({hasText : item});

        await itemToFind.locator('button').click();
    }
}

export class AddAllItemsToCart{
    readonly page: Page;
    readonly item: Locator;

    constructor(page: Page){
        this.page = page;
        this.item = page.locator('[data-test="inventory-item"]');
    }

    async AddAllItems(){
        const itemCount = await this.item.count();
        for(let i = 0; i < itemCount; i++){
            await this.item.locator('button').nth(i).click();
        }
    }
}

export class AddMultipleItemsToCart{
    readonly page: Page;
    readonly items: Locator;

    constructor(page: Page){
        this.page = page;
        this.items = page.locator('[data-test="inventory-item"]')
    }

    async addMultipleItemsToCart(...itemNames: string[]){
        for (const item of itemNames){
            const itemToFind = this.items.filter({hasText : item});
            await itemToFind.locator('button').click();
        }

    }
}