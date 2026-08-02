import { test, expect } from '../fixtures.js';

test('user can create a new user', async ({ page, usersPage }) => {
  await usersPage.goto();
  await usersPage.clickCreate();

  await expect(usersPage.emailInput).toBeVisible();
  await expect(usersPage.firstNameInput).toBeVisible();
  await expect(usersPage.lastNameInput).toBeVisible();
  await expect(usersPage.saveButton).toBeVisible();

  const timestamp = Date.now();

  const user = {
    email: `autotest-${timestamp}@test.com`,
    firstName: 'Ivan',
    lastName: 'Ivanov',
  };

  await usersPage.emailInput.fill(user.email);
  await usersPage.firstNameInput.fill(user.firstName);
  await usersPage.lastNameInput.fill(user.lastName);

  await usersPage.saveButton.click(); // ← исправлено saveBu$tton → saveButton

  await expect(page.getByText('Element created')).toBeVisible();

  await usersPage.openList();

  const row = page.getByRole('row', {
    name: new RegExp(user.email),
  });

  await expect(row).toContainText(user.firstName);
  await expect(row).toContainText(user.lastName);
});
