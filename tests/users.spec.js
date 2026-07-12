import { test } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';
import { CreateUserPage } from '../pages/CreateUserPage';

test.describe('Users', () => {
  let loginPage;
  let usersPage;
  let createUserPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    createUserPage = new CreateUserPage(page);

    await loginPage.goto();
    await loginPage.login();

    await usersPage.open();
    await usersPage.clickCreate();
  });

  test('User creation form is displayed correctly', async () => {
    await createUserPage.checkFormIsVisible();
  });

  test('User can be created successfully', async () => {
    const user = {
      email: `user${Date.now()}@test.com`,
      firstName: 'John',
      lastName: 'Smith',
    };

    await createUserPage.fillForm(user);

    await createUserPage.expectDataSaved(user);

    await createUserPage.save();

    await createUserPage.expectSuccessMessage();
  });
});
