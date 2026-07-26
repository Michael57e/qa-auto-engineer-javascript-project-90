import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { UsersPage } from '../pages/UsersPage';

test('user can create a new user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const usersPage = new UsersPage(page);

  // Открываем страницу логина
  await loginPage.goto();

  // Логинимся
  await loginPage.login('login', 'password');

  // Проверяем главную страницу
  await mainPage.expectMainPage();

  // Переходим в Users
  await usersPage.goto();

  await usersPage.clickCreate();

  // Проверяем форму
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

  // Сохраняем
  await usersPage.saveButton.click();

  await expect(page.getByText('Element created')).toBeVisible();

  // Возвращаемся к списку
  await usersPage.openList();

  const row = page.getByRole('row', {
    name: new RegExp(user.email),
  });

  await expect(row).toContainText(user.firstName);
  await expect(row).toContainText(user.lastName);
});
