import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Standard user can sort items by price (Low to High)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user');
    
    await inventoryPage.sortItems('lohi');
    
    const firstItemPrice = await inventoryPage.inventoryItems.first().locator('.inventory_item_price').innerText();
    expect(firstItemPrice).toBe('$7.99');
});
