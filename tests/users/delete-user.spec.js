import { test, expect } from '../fixtures.js';

test('user can delete a user', async ({ page, usersPage }) => {
  await usersPage.goto();
  await usersPage.clickCreate();

  const user = {
    email: `delete-${Date.now()}@test.com`,
    firstName: 'Delete',
    lastName: 'User',
  };

  await usersPage.emailInput.fill(user.email);
  await usersPage.firstNameInput.fill(user.firstName);
  await usersPage.lastNameInput.fill(user.lastName);
  await usersPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  await usersPage.openList();

  const row = page.getByRole('row', {
    name: new RegExp(user.email),
  });

  await expect(row).toBeVisible({ timeout: 10000 });

  await row.getByRole('checkbox').check();

  await expect(
    page.getByRole('heading', { name: '1 item selected' })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByText('Element deleted')).toBeVisible();

  await expect(
    page.getByRole('row', {
      name: new RegExp(user.email),
    })
  ).toHaveCount(0);
});
