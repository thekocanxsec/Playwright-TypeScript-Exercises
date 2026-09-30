import {Page, Locator} from "@playwright/test"

export class CheckoutCompletePage{
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.completeHeader = page.locator('.complete-header')
        this.backHomeButton = page.locator('[data-test="back-to-products"]')
    }

    async returnHome(){
        await this.backHomeButton.click();
    }
}
