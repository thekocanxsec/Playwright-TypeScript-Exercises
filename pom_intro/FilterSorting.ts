import {Page, Locator} from "@playwright/test"

export class FilterSorting{
    readonly page: Page;
    readonly sortDropdown: Locator;

    constructor(page: Page){
        this.page = page;
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
    }

    async sortBy(option: string){
        await this.sortDropdown.selectOption(option);
    }
}
