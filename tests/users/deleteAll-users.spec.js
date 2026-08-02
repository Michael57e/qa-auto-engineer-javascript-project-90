import { test, expect } from '../fixtures.js';

test('user can bulk delete users', async ({ page, usersPage }) => {
  await usersPage.goto();

  await expect(page.getByRole('table')).toBeVisible();

  await page.getByRole('checkbox', { name: 'Select all' }).check();

  await expect(
    page.getByRole('heading', { name: /\d+ items selected/ })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByText(/\d+ elements deleted/)).toBeVisible();

  await expect(page.getByText('No Users yet.')).toBeVisible();
});
