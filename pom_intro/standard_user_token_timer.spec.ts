import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Session expires (simulated by clearing storage)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user');
    await expect(inventoryPage.title).toBeVisible();

    await page.context().clearCookies();
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();

    await expect(loginPage.errorMessage).toBeVisible();
});
