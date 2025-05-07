const { test, expect } = require('@playwright/test');

test('Login, select two products, verify in cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('.shopping_cart_link');
  const cartItems = await page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);
  await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
  await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
});
