import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';

test('user can sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await loginPage.goto();

  await loginPage.login('login', 'password');

  await mainPage.expectMainPage();
});

test('user can sign out', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await loginPage.goto();

  await loginPage.login('login', 'password');

  await mainPage.logout();

  await loginPage.expectLoginPage();
});
