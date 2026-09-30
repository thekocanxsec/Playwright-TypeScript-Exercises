import {Page, Locator} from "@playwright/test"

export class CheckoutStepTwoPage{
    readonly page: Page;
    readonly finishButton: Locator;
    readonly summaryTotalLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]')
        this.summaryTotalLabel = page.locator('.summary_total_label')
    }

    async finishCheckout(){
        await this.finishButton.click();
    }
}
