import { test, expect } from '@playwright/test';

test('page contains root element', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#root')).toBeAttached();
});
