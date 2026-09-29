import {Page, Locator} from "@playwright/test"

export class FooterComponent{
    readonly page: Page;
    readonly twitterLink: Locator;
    readonly facebookLink: Locator;
    readonly linkedinLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.twitterLink = page.locator('[data-test="social-twitter"]')
        this.facebookLink = page.locator('[data-test="social-facebook"]')
        this.linkedinLink = page.locator('[data-test="social-linkedin"]')
    }
}
