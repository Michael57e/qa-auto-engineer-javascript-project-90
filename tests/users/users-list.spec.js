import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('users list is displayed correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  await loginPage.goto();
  await loginPage.login('login', 'password');

  await mainPage.expectMainPage();

  await usersPage.goto();
  await usersPage.expectUsersList();
});
