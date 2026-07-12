import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';
import { CreateUserPage } from '../pages/CreateUserPage';

test.describe('Users', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin@example.com', 'password');

    const usersPage = new UsersPage(page);
    await usersPage.open();
  });

  test('user creation form is displayed correctly', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const createUserPage = new CreateUserPage(page);

    await usersPage.openCreatePage();

    await createUserPage.expectFormVisible();
  });

  test('should create new user', async ({ page }) => {
    const usersPage = new UsersPage(page);
    const createUserPage = new CreateUserPage(page);

    await usersPage.openCreatePage();

    const user = {
      email: `user${Date.now()}@mail.com`,
      firstName: 'John',
      lastName: 'Smith',
    };

    await createUserPage.createUser(user);

    await createUserPage.expectSuccessNotification();
  });

  test('should display users list', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.expectUsersTableVisible();
  });

  test('should display email, first name and last name for every user', async ({ page }) => {
    const usersPage = new UsersPage(page);

    await usersPage.expectUsersDisplayed();
  });
});
