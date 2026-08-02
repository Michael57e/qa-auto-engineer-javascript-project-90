import { test, expect } from '../fixtures.js';

test('user can edit user information', async ({ page, usersPage }) => {
  await usersPage.goto();
  await usersPage.expectUsersList();

  await usersPage.openFirstUser();

  await expect(usersPage.emailInput).toBeVisible();
  await expect(usersPage.firstNameInput).toBeVisible();
  await expect(usersPage.lastNameInput).toBeVisible();
  await expect(usersPage.saveButton).toBeVisible();

  const updatedUser = {
    email: `autotest-${Date.now()}@test.com`,
    firstName: 'Fedor',
    lastName: 'Fedorov',
  };

  await usersPage.emailInput.fill(updatedUser.email);
  await usersPage.firstNameInput.fill(updatedUser.firstName);
  await usersPage.lastNameInput.fill(updatedUser.lastName);

  await usersPage.saveButton.click();

  await expect(page.getByText('Element updated')).toBeVisible();
  await expect(page).toHaveURL(/#\/users/);

  await usersPage.expectUsersList();

  const row = page.getByRole('row', {
    name: new RegExp(updatedUser.email),
  });

  await expect(row).toBeVisible();

  const cells = row.getByRole('cell');

  await expect(cells.nth(2)).toHaveText(updatedUser.email);
  await expect(cells.nth(3)).toHaveText(updatedUser.firstName);
  await expect(cells.nth(4)).toHaveText(updatedUser.lastName);
});
